sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();


function testTableControls() {


  var tableRange = sheet.getRange("A2");

  setValueInTable(tableRange, "EEEE", 19);



}

/**
 * Searches for a key within a table starting from a specified range and returns
 * the adjacent cell's value.
 * If the key is not found, throws an error.
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} tableStartingRange - The range 
 * within the table from where to start the search.
 * @param {string} key - The key to search for in the table.
 * @returns {Object} - The value of the cell adjacent to the found key.
 * @throws {Error} Will throw an error if the key is not found in the table.
 */
function getValueInTable(tableStartingRange, key) {
  var returned = findNameInTable(tableStartingRange, key)
  if (returned.isFound) {
    const cellToReturn = returned.range.offset(0, 1);
    const valueToReturn = cellToReturn.getValue();
    return valueToReturn;
  }
  else {
    throw new Error('Name not found in table');
  }
}

/**
 * Sets a value in a given table for a specified key. If the key doesn't exist,
 * adds it to the table.
 * @date 8/1/2023 - 8:00:19 PM
 * @author H-Boyd
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} tableStartingRange - The first
 * cell in a table.
 * @param {String} key - The key to match in the table.
 * @param {any} value - The data to add to the table.
 */
function setValueInTable(tableStartingRange, key, value) {
  var returned = findNameInTable(tableStartingRange, key);
  if (!returned.isFound) {
    returned.range.setValue(key);
  }
  const cellToPopulate = returned.range.offset(0, 1);
  cellToPopulate.setValue(value);
}



/**
 * Iterates through each key in a table trying to find a given match key.
 * if a matching key is found, its range is returned along with the isFound
 * boolean set to true. If a match is not found the final range is still 
 * returned but isFound returned as false.
 * @date 8/1/2023 - 7:37:46 PM
 * @author H-Boyd
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} startingRange - The first cell
 * in the table.
 * @param {String} key - The name to locate in the table.
 * @returns {{ isFound: boolean; range: GoogleAppsScript.Spreadsheet.Range; }}
 * @throws {Error} Will throw an error if the startingRange is not valid.
 */
function findNameInTable(startingRange, key) {
  // Check if the provided startingRange is a Range object.
  if (!(startingRange instanceof GoogleAppsScript.Spreadsheet.Range)) {
    throw new Error('Invalid startingRange provided');
  }
  //The index of the last row on the sheet to contain any data
  var lastRow = startingRange.getSheet().getLastRow();

  for (
    var incrementalRange = startingRange;
    incrementalRange.getRowIndex() <= lastRow;
    incrementalRange = incrementalRange.offset(1, 0)) {

    if (incrementalRange.getValue() == key) {
      // If key match is found.
      return { isFound: true, range: incrementalRange };
    }
    else if (incrementalRange.ifBlank()) {
      // If the end of the table is reached.
      return { isFound: false, range: incrementalRange };
    }

  }
  // If not found
  return { isFound: false, range: incrementalRange };
}











