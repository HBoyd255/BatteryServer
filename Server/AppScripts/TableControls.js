function testTableControls() {


  var returned = findNameInTable("BBB")

  if (returned.isFound) {
    console.log("The value was found at " + returned.range.getA1Notation())
  }
  else {
    console.log("The value was not found but the last cell is " + returned.range.getA1Notation())
  }

}

function updateValueInTable(key,value){

  
}


function findNameInTable(nameToFind) {
  const startOfTable = "A2"
  var incrementalRange = ss.getRange(startOfTable);
  while (1) {
    if (incrementalRange.isBlank()) {
      return { isFound: false, range: incrementalRange };  //Not found
    }
    if (incrementalRange.getValue() == nameToFind) {
      return { isFound: true, range: incrementalRange };  // Found
    }
    incrementalRange = incrementalRange.offset(1, 0)
  }

}