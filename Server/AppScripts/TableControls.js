/**
 * Retrieves a number of devices with the lowest charges from a table on
 * a Google Spreadsheet.
 *
 * The function starts retrieving from the provided range and continues
 * until it retrieves the required count.
 * The function assumes that the table is sorted in ascending order based on
 * the charges of the devices.
 * If the provided starting range is not a valid range object, it throws
 * an error.
 *
 * @param {Range} startingRange - The range object where the retrieval starts.
 * @param {number} numDevicesToRetrieve  - The number of devices to retrieve.
 * @returns {Array.<{device: string, charge: number}>} - An array of objects,
 * each containing a device name and its charge.
 * @throws {Error} Throws an error if the provided starting range is not
 * a valid range object.
 */
function getLowestValues(startingRange, numDevicesToRetrieve) {
  // Check if the provided startingRange is a Range object.
  if (typeof startingRange.getA1Notation !== "function") {
    throw new Error("Invalid startingRange provided");
  }
  let devices = [];
  let incrementalRange = startingRange;

  for (let x = 0; x < numDevicesToRetrieve; x++) {
    devices.push({
      device: incrementalRange.getValue(),
      charge: incrementalRange.offset(0, 1).getValue(),
    });
    incrementalRange = incrementalRange.offset(1, 0);
  }

  return devices;
}

/**
 * Retrieves the charge of a specific device from a table on
 * a Google Spreadsheet.
 *
 * The function searches for a specific device name starting from
 * a provided cell.
 * If the device name is found, it returns an array of an object with the
 * device name and its charge.
 * If the device is not found, it throws an error.
 *
 * @param {Range} startingRange - The range object where the search starts.
 * @param {string} deviceName - The name of the device to search for.
 * @returns {Array.<{device: string, charge: number}>} - An array of an object
 * containing the device name and its charge.
 * @throws {Error} Throws an error if the device name is not found in the table.
 */
function getSpecificValue(startingRange, deviceName) {
  let returned = findNameInTable(startingRange, deviceName);

  if (!returned.isFound) {
    throw new Error("Device not found in table");
  } else {
    let foundRange = returned.range;
    return [
      {
        device: foundRange.getValue(),
        charge: foundRange.offset(0, 1).getValue(),
      },
    ];
  }
}

/**
 * Counts the number of items in a table on a Google Spreadsheet starting
 * from a given range.
 *
 * The function iteratively checks each row in the table starting from
 * the provided range. It increments the counter for each non-blank row,
 * and stops when it encounters a blank row, assuming that it's the end of
 * the table. An error is thrown if the provided range is not valid.
 *
 * @param {Range} startingRange - The range object where counting starts.
 * @returns {number} The number of non-blank rows in the table starting
 * from the given range.
 * @throws {Error} Throws an error if the provided range is not
 * a valid Range object.
 */
function countItemsInTable(startingRange) {
  // Check if the provided startingRange is a Range object.
  if (typeof startingRange.getA1Notation !== "function") {
    throw new Error("Invalid startingRange provided");
  }
  // The index of the last row on the sheet to contain any data
  let lastRow = startingRange.getSheet().getLastRow();

  let rowCount = 0;

  for (
    let incrementalRange = startingRange;
    incrementalRange.getRowIndex() <= lastRow;
    incrementalRange = incrementalRange.offset(1, 0)
  ) {
    if (incrementalRange.isBlank()) {
      // If the end of the table is reached.
      return rowCount;
    }
    rowCount += 1;
  }

  return rowCount;
}

/**
 * Searches for a key within a table starting from a specified range and returns
 * the adjacent cell's value.
 * If the key is not found, throws an error.
 *
 * @param {Range} startingRange - The range within the table from where to
 * start the search.
 * @param {string} key - The key to search for in the table.
 * @returns {Object} - The value of the cell adjacent to the found key.
 * @throws {Error} Will throw an error if the key is not found in the table,
 * or if the provided starting ranges is not the correct range object.
 */
function getValueInTable(startingRange, key) {
  // Check if the provided startingRange is a Range object.
  if (typeof startingRange.getA1Notation !== "function") {
    throw new Error("Invalid startingRange provided");
  }
  let returned = findNameInTable(startingRange, key);
  if (returned.isFound) {
    const cellToReturn = returned.range.offset(0, 1);
    const valueToReturn = cellToReturn.getValue();
    return valueToReturn;
  } else {
    throw new Error("Name not found in table");
  }
}

/**
 * Sets a value in a given table for a specified key. If the key doesn't exist,
 * adds it to the table.
 *
 * @param {Range} startingRange - The first cell in a table.
 * @param {string} key - The key to match in the table.
 * @param {any} value - The data to add to the table.
 * @throws {Error} Will throw an error if the provided starting ranges is not
 * the correct range object.
 */
function setValueInTable(startingRange, key, value) {
  // Check if the provided startingRange is a Range object.
  if (typeof startingRange.getA1Notation !== "function") {
    throw new Error("Invalid startingRange provided");
  }
  let returned = findNameInTable(startingRange, key);
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
 *
 * @param {Range} startingRange - The first cell in the table.
 * @param {string} key - The name to locate in the table.
 * @returns {{ isFound: boolean; range: Range; }}
 * @throws {Error} Will throw an error if the startingRange is not valid.
 */
function findNameInTable(startingRange, key) {
  // Check if the provided startingRange is a Range object.
  if (typeof startingRange.getA1Notation !== "function") {
    throw new Error("Invalid startingRange provided");
  }
  //The index of the last row on the sheet to contain any data
  let lastRow = startingRange.getSheet().getLastRow();

  for (
    let incrementalRange = startingRange;
    incrementalRange.getRowIndex() <= lastRow;
    incrementalRange = incrementalRange.offset(1, 0)
  ) {
    if (incrementalRange.getValue() == key) {
      // If key match is found.
      return { isFound: true, range: incrementalRange };
    } else if (incrementalRange.isBlank()) {
      // If the end of the table is reached.
      return { isFound: false, range: incrementalRange };
    }
  }
  // If not found
  return { isFound: false, range: incrementalRange };
}
