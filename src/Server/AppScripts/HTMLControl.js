function testHTMLControl() {
  let totalDeviceCount = countItemsInTable(TABLE_RANGE);

  let devices = getSpecificValue(SORTED_TABLE_RANGE, "HPEnvy",true);;

  assignIcons(devices);

  console.log(devices);
}

function assignIcons(devices) {
  for (let i = 0; i < devices.length; i++) {
    let charge = devices[i].charge;

    if (charge >= 0 && charge <= 10) {
      icon = "fas fa-battery-empty";
    } else if (charge > 10 && charge <= 35) {
      icon = "fas fa-battery-quarter";
    } else if (charge > 35 && charge <= 65) {
      icon = "fas fa-battery-half";
    } else if (charge > 65 && charge < 90) {
      icon = "fas fa-battery-three-quarters";
    } else if (charge >= 90 && charge <= 100) {
      icon = "fas fa-battery-full";
    }
    devices[i].icon = icon;
  }
}

function createHtmlOutput(devices) {
  let template = HtmlService.createTemplateFromFile("battery-list");

  assignIcons(devices);

  template.devices = devices;

  htmlOutput = template.evaluate();

  htmlOutput.setTitle("Battery Server");

  //TODO set Favicon
  // htmlOutput.setFaviconUrl("https://www.google.com/favicon.ico")

  return htmlOutput;
}
