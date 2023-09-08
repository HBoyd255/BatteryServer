#ifndef WIFI_CONTROL_H
#define WIFI_CONTROL_H

#include <ArduinoJson.h>

// Start the wifi connection.
void startWifi();

// Retrieve data from the server.
void retrieveData(DynamicJsonDocument*);

#endif  // WIFI_CONTROL_H