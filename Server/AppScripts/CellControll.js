
/**
 * The test file for code in this file 
 * @date 7/31/2023 - 8:40:29 PM
 * @author H-Boyd
 */
function testCellControl() {

}


/**
 * Takes a cell in A1 notation and returns the indices of its column, then its
 * row.
 * @date 7/31/2023 - 9:29:49 PM
 * @author H-Boyd
 *
 * @param {string} cell - The target string in a1 notation.
 * @returns {number[]} The numerical index of the column., The numerical
 * index of the row.
 * @throws {Error} if the given string cannot be interpreted as cell range
 * then a range error is thrown.
 */
function getCellIndices(cellA1) {
  const cellRange = ss.getRange(cellA1)
  const rowIndex = cellRange.getRow();
  const columnIndex = cellRange.getColumn();
  return [columnIndex, rowIndex]
}



/**
 * Returns the corresponding letter for a given index on the ASCII table.
 * 
 * @date 7/31/2023 - 8:31:28 PM
 * @author H-Boyd
 *
 * @param {number} index - An integer between 1 and 26 (inclusive).
 * @returns {string} The letter corresponding to the given index.
 * @throws {Error} If the index is not a number, or is out of range (1 - 26)
 * an error is thrown.
 */

function getLetter(index) {
  // Ensure the index is a number
  if (typeof index != "number") {
    throw new Error("Index must be a number")
  }
  // Ensure the index is withing the correct range
  if (index < 1 || index > 26) {
    throw new Error("Index must be between 1 and 26");
  }
  //"A".charCodeAt(0) retrieves the unicode value for 'A' adding this value, minus one,
  // to the given index provides a unicode value.
  //String.fromCharCode then creates a sting from the unicode value.
  return String.fromCharCode(index + "A".charCodeAt(0) - 1);
}


/**
 * Takes two indices as numbers and generates the corresponding A1 notation cell.
 * @date 7/31/2023 - 9:01:27 PM
 * @author H-Boyd
 *
 * @param {number} columnIndex - The index of column as a number
 * @param {number} rowIndex - The index of row as a number
 * @returns {string} A string representing the cell's location in A1 notation.
 * @throws {Error} If either given values are either not numbers, or out of
 * range (1 - 702) an error is thrown.
 */
function createA1Notation(columnIndex, rowIndex) {

  //Ensure that both provided values are numbers.
  if ((typeof columnIndex != "number") || (typeof rowIndex != "number")) {
    throw new Error("Both indices must be numbers");
  }

  // Ensure that both indices are between 1 and 702, where 702 is FF in A1
  // notation.
  if ((columnIndex < 1 || columnIndex > 702) || (rowIndex < 1 || rowIndex > 702)) {
    throw new Error("Indices must be between 1 and 702");
  }

  // If the column is less than 27, only one letter is needed.
  if (columnIndex < 27) {
    return (getLetter(columnIndex) + rowIndex);
  }

  // The numerical value of the leftmost letter in the column.
  const columnMostSignificantDigit = Math.floor((columnIndex - 1) / 26)

  // The numerical value of the rightmost letter in the column.
  const columnLeastSignificantDigit = ((columnIndex - 1) % 26) + 1

  return (getLetter(columnMostSignificantDigit) +
    getLetter(columnLeastSignificantDigit) + rowIndex);
}

