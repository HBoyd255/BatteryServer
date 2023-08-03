function createHtmlOutput(devices) {
  let template = HtmlService.createTemplateFromFile("battery-list");

  template.devices = devices;

  htmlOutput = template.evaluate();

  htmlOutput.setTitle("Battery Server");

  return htmlOutput;
}
