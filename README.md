# Battery Server V3

A Google App scripts based project to monitor and display the current battery percentages of my various smart devices.


This project is going to be a remake/continuation of my previous project [BatteryServer_V2](https://github.com/H-Boyd/BatteryServer_V2).

This project contains 3 main sections;

1. Device Client (Uploader): This client-side application runs on each individual device, monitoring the battery level and regularly uploading this data to the server.

2. Server Application: This is the heart of the system that receives and processes battery level data sent from each device. It organizes and stores the information for retrieval.

3. User Client (Downloader): This application retrieves the battery levels for each device from the server, providing a comprehensive view of all monitored devices.

## TO-DO
- [ ] finish writing this to-do list.
- [ ] modify the existing python code to upload data via json.
- [ ] Add store uploaded json data.
