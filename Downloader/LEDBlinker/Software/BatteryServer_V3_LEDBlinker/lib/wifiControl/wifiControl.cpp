#include <heltec.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>

#include "deploymentURL.h"
#include "wifiCredentials.h"

void startWifi() {
    WiFi.begin(WIFI_NAME, WIFI_PASSWORD);

    uint32_t seconds_waiting_for_wifi = 0;

    while (WiFi.status() != WL_CONNECTED) {
        delay(100);
    }
}

/**
 * Retrieve the data from the specified URL and store it in the specified JSON
 * object.
 *
 * @param prt_deviceList A pointer to the JSON object to store the data in.
 */
void retrieveData(DynamicJsonDocument* prt_deviceList) {
    // Check if the ESP32 is connected to the internet
    if (WiFi.status() == WL_CONNECTED) {
        // Create an HTTP client object
        HTTPClient http;

        // Start a connection with the URL specified in wifiCredentials.h
        http.begin(SECRET_URL);

        // Set the behavior of the HTTP client regarding redirects
        http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);

        // Perform an HTTP GET request and store the resulting status code
        int httpCode = http.GET();

        // Create a string to store the payload in
        String payload;

        // If the HTTP GET request succeeds, store the payload in a string
        if (httpCode > 0) {
            payload = http.getString();
            http.end();
        }

        // Deserialize the JSON
        DeserializationError error = deserializeJson(*prt_deviceList, payload);

        // Test if parsing succeeds.
        if (error) {
            Serial.print("deserializeJson() failed: ");
            Serial.println(error.c_str());
            return;
        }
    }
}