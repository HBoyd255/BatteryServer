
function testCode() {
}






function doPost(e) {
  data = JSON.parse(e.postData.contents)

  device = data.device;
  charge = data.charge;

  tableRange = sheet.getRange("A2");

  setValueInTable(tableRange, device, charge)

  return ContentService.createTextOutput(device + " has got " + charge);
}


