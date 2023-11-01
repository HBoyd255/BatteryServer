function testHTMLControl() {
  let totalDeviceCount = countItemsInTable(TABLE_RANGE);

  let devices = getSpecificValue(SORTED_TABLE_RANGE, "HPEnvy", true);

  assignIcons(devices);

  console.log(devices);
}

/**
 * Takes a list of devices and assigns an icon to each device. based on its
 * charge.
 *
 * the icon parameter is a string that stores the name of the icon to be
 * assigned. The name of each item is based on the Font Awesome icon library.
 * 
 * The function throws an error if any of the devices have a charge value
 *
 * @param {array} devices - list of devices.
 * @throws {Error} Throws an error if any of the devices have a charge value
 * that is not between 0 and 100.
 */
function assignIcons(devices) {
  for (let i = 0; i < devices.length; i++) {
    let charge = devices[i].charge;

    let icon = "";

    // Threshold values for battery icons
    const EMPTY_LOWER = 0;
    const EMPTY_UPPER = 10;

    const HALF_LOWER = 35;
    const HALF_UPPER = 65;

    const FULL_LOWER = 90;
    const FULL_UPPER = 100;

    if (charge >= EMPTY_LOWER && charge <= EMPTY_UPPER) {
      icon = "fas fa-battery-empty";
    } else if (charge > EMPTY_UPPER && charge <= HALF_LOWER) {
      icon = "fas fa-battery-quarter";
    } else if (charge > HALF_LOWER && charge <= HALF_UPPER) {
      icon = "fas fa-battery-half";
    } else if (charge > HALF_UPPER && charge < FULL_LOWER) {
      icon = "fas fa-battery-three-quarters";
    } else if (charge >= FULL_LOWER && charge <= FULL_UPPER) {
      icon = "fas fa-battery-full";
    } else {
      throw new Error("Charge value is not in range");
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
