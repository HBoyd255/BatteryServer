#ifndef SYSTEM_INFO_H
#define SYSTEM_INFO_H

#include <Arduino.h>

// The number of milliseconds in a day, hour, minute and second.
#define MILLISECONDS_PER_HOUR MILLISECONDS_PER_MINUTE * 60
#define MILLISECONDS_PER_MINUTE MILLISECONDS_PER_SECOND * 60
#define MILLISECONDS_PER_SECOND 1000

// Sleep for 8 hours.
#define SLEEP_DELAY MILLISECONDS_PER_HOUR * 8

// Snooze for one hour.
#define SNOOZE_DELAY MILLISECONDS_PER_HOUR * 1

// Poll the server ever 30 seconds.
#define SERVER_POLL_DELAY MILLISECONDS_PER_SECOND * 30

// Pin Definitions
#define LED_PIN 21
#define BUTTON_PIN 22

// Serial Baud Rate
#define SERIAL_BAUD_RATE 115200

#endif  // SYSTEM_INFO_H