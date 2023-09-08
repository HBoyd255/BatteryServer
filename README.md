# Battery Server V3

A Google App scripts based project to monitor and display the current battery percentages of my various smart devices.

This project is going to be a remake/continuation of my previous project [BatteryServer_V2](https://github.com/H-Boyd/BatteryServer_V2).

This project contains 3 main sections;

1. Device Client (Uploader): This client-side application runs on each individual device, monitoring the battery level and regularly uploading this data to the server.

2. Server Application: This is the heart of the system that receives and processes battery level data sent from each device. It organizes and stores the information for retrieval.

3. User Client (Downloader): This application retrieves the battery levels for each device from the server, providing a comprehensive view of all monitored devices.

## Contents

- [Getting Started](GettingStarted/)
  - [iOS Client](GettingStarted/iosClient/README.md)
  - [iOS Client](GettingStarted/iosClient/README.md)
- [Libraries used](#Libraries-used)

## Libraries used

- KiCad
  - [heltec_htit-wb32](https://github.com/bartloeff/heltec_htit-wb32)
  - [Heltec WiFi LoRa 32 Shield](https://grabcad.com/library/heltec-wifi-lora-32-shield-1)
  - [Switch Push Button](https://www.snapeda.com/parts/1825910-6/TE%20Connectivity/view-part/?ref=search&t=momentary%20switch)
  - [Red 617nm LED Indication](https://www.snapeda.com/parts/WP7113ID/Kingbright/view-part/?ref=search&t=led)
- Ardiuno
  - [ArduinoJson 6.21.3](arduinojson.org)
  - [Heltec ESP32 Dev-Boards 1.1.1](http://heltec.cn)
- Python
  - [psutil 5.9.4](https://github.com/giampaolo/psutil)
  - [Requests 2.31.0](https://requests.readthedocs.io/en/latest/)

## TO-DO

- [ ] Write a quick-start for the App scripts Server.
- [ ] Write a quick-start for the Python Client.
- [ ] Set the Favicon for the HTML page.
- [ ] Rewrite README.md.

### Possible future features

- Add the ability to upload the "is_charging" status.
- Add more ways to display the information from the server.
