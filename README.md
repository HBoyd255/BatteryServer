# Battery Server V3

A Google App scripts based project to monitor and display the current battery percentages of my various smart devices.

This project is going to be a remake/continuation of my previous project [BatteryServer_V2](https://github.com/H-Boyd/BatteryServer_V2).

This project contains 3 main sections;

1. Device Client (Uploader): This client-side application runs on each individual device, monitoring the battery level and regularly uploading this data to the server.

2. Server Application: This is the heart of the system that receives and processes battery level data sent from each device. It organizes and stores the information for retrieval.

3. User Client (Downloader): This application retrieves the battery levels for each device from the server, providing a comprehensive view of all monitored devices.

## TO-DO

### Uploader

- [x] fix python code so I can handle HTTP codes.

### Server

- [x] Create html page
- [x] Add the ability to upload the "is_charging" status

### Downloader

- [ ] Rewrite the ESP32 code.
- [ ] Design a board for the.

### KiCad Libraries used

- [heltec_htit-wb32](https://github.com/bartloeff/heltec_htit-wb32)

- [Heltec WiFi LoRa 32 Shield](https://grabcad.com/library/heltec-wifi-lora-32-shield-1)

- [Switch Push Button](https://www.snapeda.com/parts/1825910-6/TE%20Connectivity/view-part/?ref=search&t=momentary%20switch)

- [Red 617nm LED Indication](https://www.snapeda.com/parts/WP7113ID/Kingbright/view-part/?ref=search&t=led)
