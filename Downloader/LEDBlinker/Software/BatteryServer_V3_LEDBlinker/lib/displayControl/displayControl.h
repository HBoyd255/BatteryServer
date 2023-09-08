#ifndef TABLE_DISPLAY_H
#define TABLE_DISPLAY_H

#include <ArduinoJson.h>

// Initialise the display.
void startDisplay();

// Draw a string centred on the screen.
void displayCentredString(uint8_t, String);

// Draw a table of the charge of up to 5 devices in the list, starting with the
// lowest charged device at the top of the screen.
void displayHomeScreen(DynamicJsonDocument *);

// Draw the snooze screen, showing the time remaining on the snooze timer and
// the charge information of the lowest charged device in the list.
void displaySnoozeScreen(DynamicJsonDocument *, uint16_t);

// Display a blank screen.
void displayBlankScreen();

#endif  // TABLE_DISPLAY_H