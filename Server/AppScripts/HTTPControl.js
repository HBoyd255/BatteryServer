const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const TABLE_RANGE = sheet.getRange("A3");
const SORTED_TABLE_RANGE = sheet.getRange("C3");

/**
 * Validates the input parameters for selecting devices.
 *
 * This function checks that the given parameters object is not null,
 * that it has a "selector" property, and that if the "selector" property
 * is "specific", then a "device" property must also be provided.
 *
 * @param {Object} givenParameters - The input parameters to validate.
 * @throws {Error} Throws an error if the parameters are not valid.
 */
function validateDoGetInput(givenParameters) {
  if (!givenParameters) {
    throw new Error("No parameters provided");
  }

  if (!givenParameters.selector) {
    throw new Error("No selector provided");
  }

  if (givenParameters.selector === "specific" && !givenParameters.device) {
    throw new Error("No specific device provided");
  }
}

/**
 * Ensures the requested device count is within acceptable bounds.
 *
 * This function checks the requested device count and adjusts it to fit
 * within the total number of devices available, with a lower bound of 1.
 * If no device count is given, or if it's less than 1, the function returns 1.
 * If the given device count exceeds the total device count, the function
 * returns the total device count.
 * If the given device count is within bounds, the function returns the given
 * device count as is.
 *
 * @param {number} givenDeviceCount - The requested number of devices.
 * @param {number} totalDeviceCount - The total number of available devices.
 * @returns {number} The adjusted number of devices that fits within the bounds.
 */
function wrapDeviceCount(givenDeviceCount, totalDeviceCount) {
  if (!givenDeviceCount || givenDeviceCount < 1) {
    return 1;
  }

  if (givenDeviceCount > totalDeviceCount) {
    return totalDeviceCount;
  }
  return givenDeviceCount;
}

/**
 * Handles HTTP GET requests and routes to appropriate handlers based on the
 * "selector" parameter.
 *
 * The function accepts an "event" object, which should contain the HTTP request
 * parameters.
 * Based on the "selector" parameter, it either fetches all devices,
 * the lowest charged devices, or a specific device.
 * The "count" parameter is optional and is only considered when
 * "selector" is "lowest".
 * The "device" parameter is required when "selector" is "specific".
 * Returns a JSON response containing the status and either the requested data
 * or an error message.
 *
 * @param {Object} event - The HTTP request event object.
 * @throws {Error} If invalid or insufficient parameters are provided.
 * @returns {TextOutput} A TextOutput object representing the HTTP response in
 * JSON format.
 */
function doGet(event) {
  try {
    validateDoGetInput(event.parameter);

    let data = event.parameter;

    let selector = data.selector;

    let devices = [];

    totalDeviceCount = countItemsInTable(TABLE_RANGE);

    switch (selector) {
      case "all":
        devices = getLowestValues(SORTED_TABLE_RANGE, totalDeviceCount);
        break;

      case "lowest":
        let requestedDevicesCount = wrapDeviceCount(
          data.count,
          totalDeviceCount
        );
        devices = getLowestValues(SORTED_TABLE_RANGE, requestedDevicesCount);
        break;

      case "specific":
        let specificDevice = data.device;
        devices = getSpecificValue(TABLE_RANGE, specificDevice);
        break;

      default:
        throw new Error("invalid selector provided");
    }

    return createJsonOutput({ status: "success", data: devices });
  } catch (error) {
    return createJsonOutput({ status: "error", message: error.message });
  }
}

/**
 * Handles HTTP POST requests and updates the charge of a specified device in
 * the table.
 *
 * The function accepts an "event" object, which should contain the HTTP
 * request body.
 * The body must be a JSON string that includes "device" and "charge" properties.
 * "device" is the name of the device and "charge" is its current charge level.
 * It parses the body, validates the input, and updates the device's charge in
 * the table.
 * Returns a JSON response indicating the status of the operation and a message.
 *
 * @param {Object} event - The HTTP request event object.
 * @throws {Error} If the request body is not valid JSON, or if
 * the "device" or "charge" property is missing.
 * @returns {TextOutput} A TextOutput object representing the HTTP response
 * in JSON format.
 */
function doPost(event) {
  try {
    try {
      var data = JSON.parse(event.postData.contents);
    } catch (e) {
      throw new Error("Invalid JSON");
    }
    let device = data.device;
    let charge = data.charge;

    if (!device) {
      throw new Error("Device not provided");
    }

    if (!charge) {
      throw new Error("Charge not provided");
    }

    setValueInTable(TABLE_RANGE, device, charge);

    return createJsonOutput({
      status: "success",
      message: device + " charge updated",
    });
  } catch (error) {
    return createJsonOutput({ status: "error", message: error.message });
  }
}

/**
 * Creates a JSON formatted text output using the Google Apps Script
 * ContentService.
 *
 * The function accepts an object, stringifies it into a JSON format,
 * and creates a text output using the ContentService.
 * It sets the MIME type of the output to JSON.
 *
 * @param {Object} data - The data object to be converted into JSON.
 * @returns {TextOutput} A TextOutput object representing the HTTP response
 * in JSON format.
 */
function createJsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
