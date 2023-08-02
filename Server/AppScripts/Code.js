
const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const BATTERY_TABLE_RANGE = sheet.getRange("A3");
const SORTED_BATTERY_TABLE_RANGE = sheet.getRange("C3");


function testCode() {
  console.log(getSpecificValue(BATTERY_TABLE_RANGE, "HPEnvy"));
}



function doGet(event) {

  try {
    let data = event.parameter


    if (!data) {
      throw new Error("no parameters provided");

    }

    let selector = data.selector;

    if (!selector) {
      throw new Error("no selector provided");
    }


    let devices = []

    totalDeviceCount = countItemsInTable(BATTERY_TABLE_RANGE)


    switch (selector) {
      case "all":
        devices = getLowestValues(SORTED_BATTERY_TABLE_RANGE, totalDeviceCount);
        break;

      case "lowest":
        let count = data.count;
        if (!count || count < 1) {
          count = 1;
        }
        else if (count > totalDeviceCount) {
          count = totalDeviceCount;
        }

        devices = getLowestValues(SORTED_BATTERY_TABLE_RANGE, count);
        break;

      case "specific":

        let specificDevice = data.device;
        if (!specificDevice) {
          throw new Error('no specific device provided');
        }

        devices = getSpecificValue(BATTERY_TABLE_RANGE, specificDevice);
        break;

      default:
        throw new Error('invalid selector provided');
    }

    return createJsonOutput(
      { "status": "success", "data": devices }
    );
  }
  catch (error) {
    return createJsonOutput(
      { "status": "error", "message": error.message }
    )
  }
}








function doPost(event) {
  try {
    try {
      var data = JSON.parse(event.postData.contents);
    } catch (e) {
      throw new Error("Invalid JSON");
    }
    var device = data.device;
    var charge = data.charge;

    if (!device) {
      throw new Error("Device not provided");
    }

    if (!charge) {
      throw new Error("Charge not provided");
    }

    setValueInTable(BATTERY_TABLE_RANGE, device, charge)

    return createJsonOutput(
      { "status": "success", "message": device + " charge updated" }
    )

  }
  catch (error) {
    return createJsonOutput(
      { "status": "error", "message": error.message }
    )
  }
}

function createJsonOutput(data) {
  return ContentService.createTextOutput(
    JSON.stringify(data)
  ).setMimeType(ContentService.MimeType.JSON);
}

