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
