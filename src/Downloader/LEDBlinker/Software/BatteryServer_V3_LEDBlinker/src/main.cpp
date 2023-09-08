#include <Heltec.h>

#include <ArduinoJson.h>

#include "buttonControl.h"
#include "displayControl.h"
#include "timerControl.h"
#include "wifiControl.h"

#define LED_PIN 21
#define BUTTON_PIN 22

// Sleep for 8 hours.
#define SLEEP_DELAY MILLISECONDS_PER_HOUR * 8

// Snooze for one hour.
#define SNOOZE_DELAY MILLISECONDS_PER_HOUR * 1

// Poll the server ever 30 seconds.
#define SERVER_POLL_DELAY MILLISECONDS_PER_SECOND * 30

void setup() {
    Serial.begin(115200);
    pinMode(LED_PIN, OUTPUT);
    pinMode(BUTTON_PIN, INPUT_PULLUP);

    startDisplay();

    displayCentredString(10, "Connecting to wifi");

    startWifi();

    displayCentredString(10, "Retrieving Data.");

    Serial.println("Setup Complete");
}

void loop() {
    static uint32_t sleepExpirationTime = 0;
    static uint32_t snoozeExpirationTime = 0;
    static uint32_t pollRefreshTime = 0;

    static DynamicJsonDocument deviceList(1024);

    bool b_sleepState = !hasTimeExpired(sleepExpirationTime);
    bool b_snoozeState = !hasTimeExpired(snoozeExpirationTime);
    bool b_ledEnabled = !(b_snoozeState || b_sleepState);

    if (hasTimeExpired(pollRefreshTime)) {
        Serial.println("Polling Server");

        retrieveData(&deviceList);

        setExpirationTime(&pollRefreshTime, SERVER_POLL_DELAY);
    }

    if (b_sleepState) {  // If sleeping

        // Display a blank screen, essentially turning off the display.
        displayBlankScreen();

        // Print to the serial monitor, How many seconds are left to sleep.
        uint32_t sleepRemaining = secondsRemaining(sleepExpirationTime);
        Serial.println(String(sleepRemaining) + " seconds left of sleep.");
    }

    else {
        if (b_snoozeState) {
            // Get the number of seconds remaining on the snooze timer.
            uint16_t snoozeRemaining = secondsRemaining(snoozeExpirationTime);

            // Display the snooze screen.
            displaySnoozeScreen(&deviceList, snoozeRemaining);
        } else {
            // Display the home screen.
            displayHomeScreen(&deviceList);
        }
    }

    // Turn the LED on if the lowest charge is less than 35%.
    bool b_ledOn = b_ledEnabled && (deviceList["data"][0]["charge"] < 35);
    digitalWrite(LED_PIN, b_ledOn);

    switch (countConsecutivePresses(BUTTON_PIN)) {
        case 1:
            Serial.println("Single Press");
            toggleDelay(&snoozeExpirationTime, SNOOZE_DELAY);
            break;
        case 2:
            Serial.println("Double Press");
            toggleDelay(&sleepExpirationTime, SLEEP_DELAY);
            break;
    }

    // Sleep for 8 milliseconds to allow appropriate time between each read
    // of the button.
    delay(8);
}
