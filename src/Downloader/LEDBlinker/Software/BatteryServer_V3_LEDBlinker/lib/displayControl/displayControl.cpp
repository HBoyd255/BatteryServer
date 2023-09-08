#include <heltec.h>
#include <ArduinoJson.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

#include "displayControl.h"

/**
 * Initialise the display.
 *
 * This function initialises the display and sets the font and text alignment.
 */
void startDisplay() {
    Heltec.begin(true /*DisplayEnable Enable*/,
                 false /*LoRa Disable*/,
                 true /*Serial Enable*/);
    Heltec.display->setTextAlignment(TEXT_ALIGN_LEFT);
    Heltec.display->setFont(ArialMT_Plain_10);
}

/**
 * Write a string on the display with right alignment.
 *
 * @param xRightPosition The x-coordinate of the rightmost point of the string.
 * @param yTopPostion The y-coordinate of the top of the string.
 * @param stringToDraw The string to be drawn to the screen.
 */
void drawRightAlignedString(uint8_t xRightPosition,
                            uint8_t yTopPostion,
                            String stringToDraw) {
    // Calculate the width of the string
    uint8_t stringPixelWidth = Heltec.display->getStringWidth(stringToDraw);

    // Calculate the x-coordinate of the leftmost point of the string
    uint8_t xLeftPostion = xRightPosition - stringPixelWidth;

    // Draw the string using the Calculated x-coordinate
    Heltec.display->drawString(xLeftPostion, yTopPostion, stringToDraw);
}

/**
 * Write a horizontally centred string at a given y position.
 *
 * @param yTopPostion The y-coordinate of the top of the string.
 * @param stringToDraw The string to be drawn to the screen.
 */
void drawCentredString(uint8_t yTopPostion, String stringToDraw) {
    // Calculate the width of the string
    uint8_t stringPixelWidth = Heltec.display->getStringWidth(stringToDraw);

    // Calculate the x-coordinate of the leftmost point of the string
    uint8_t xLeftPostion = ((SCREEN_WIDTH - stringPixelWidth) >> 1);

    // Make sure the string doesn't start off the left of the screen.
    if (xLeftPostion < 0) {
        xLeftPostion = 0;
    }

    // Draw the string using the Calculated x-coordinate
    Heltec.display->drawString(xLeftPostion, yTopPostion, stringToDraw);
}

void displayCentredString(uint8_t yTopPostion, String stringToDraw) {
    Heltec.display->clear();
    drawCentredString(yTopPostion, stringToDraw);
    Heltec.display->display();
}

/**
 * Draw a battery icon on the display with a charge level bar.
 *
 * The battery icon is drawn with a variable width and a height of 8 pixels.
 * This icon can at a glance show the charge level of a device.
 *
 * @param x The x-coordinate of the top-left corner of the battery icon.
 * @param y The y-coordinate of the top-left corner of the battery icon.
 * @param width The width of the battery icon.
 * @param charge The charge level in percentage (0 to 100).
 */
void drawBattery(uint8_t x, uint8_t y, uint8_t width, uint8_t charge) {
    // Draw the body of the battery
    Heltec.display->drawRect(x, y, width + 4, 8);

    // Draw the positive terminal of the battery
    Heltec.display->drawRect(x + width + 3, y + 2, 3, 4);

    // Calculate the length of the bar inside the battery
    int16_t chargeBarLength = charge * width * 0.01;

    // Make sure the bar stays within range
    if (chargeBarLength < 0) {
        chargeBarLength = 0;
    } else if (chargeBarLength > width) {
        chargeBarLength = width;
    }

    // Draw the bar inside the battery
    Heltec.display->fillRect(x + 2, y + 2, chargeBarLength, 4);
}

/**
 * Draws a row at a given high on the screen that displays the device name,
 * Charge value represented by a battery icon, and the charge value shown as
 * a percentage.
 *
 * @param y The y-coordinate of the top-left corner of row,
 * @param device The name of the device this row represents.
 * @param charge The charge level of the given device in percentage (0 to 100).
 */
void drawRow(uint8_t y, String device, uint8_t charge) {
    // Write the name of the device, with right alignment
    drawRightAlignedString(62, y, device);

    // Draw the battery icon
    drawBattery(66, y + 2, 20, charge);

    // Write the battery percentage
    Heltec.display->drawString(95, y, String(charge) + "%");
}

/**
 * Draw a table of up to 5 of the lowest charged devices in the list to the
 * display, starting with the lowest charged device at the top of the display.
 *
 * @param ptr_deviceList A pointer to the Json document containing the
 * information about each device.
 */
void displayHomeScreen(DynamicJsonDocument* ptr_deviceList) {
    // Clear Screen
    Heltec.display->clear();

    // Draw a border around the screen.
    Heltec.display->drawRect(0, 0, 128, 64);

    // Calculate the number of devices received
    uint8_t retrievdDeviceCount = (*ptr_deviceList)["data"].size();

    uint8_t const ROW_HEIGHT = 11;
    uint8_t const TOP_BUFFER = 3;

    // For each device, draw a row on the display.
    for (uint8_t i = 0; i < retrievdDeviceCount; i++) {
        drawRow((ROW_HEIGHT * i) + TOP_BUFFER,
                (*ptr_deviceList)["data"][i]["device"],
                (*ptr_deviceList)["data"][i]["charge"]);
    }

    // Show the screen
    Heltec.display->display();
}

/**
 * Draw the snooze screen.
 *
 * This screen displays how long is remaining on the snooze timer, and the
 * charge information of the lowest charged device in the list.
 *
 * @param ptr_deviceList A pointer to the Json document containing the
 * information about each device.
 * @param expirationTime The time at which the snooze timer will expire.
 */
void displaySnoozeScreen(DynamicJsonDocument* ptr_deviceList, uint16_t snoozeRemaining) {
    // Clear Screen
    Heltec.display->clear();

    // Draw a border around the screen.
    Heltec.display->drawRect(0, 0, 128, 64);

    // Display how long is remaining on the snooze timer.
    drawCentredString(6, "Snoozing for");
    drawCentredString(18, String(snoozeRemaining) + " seconds.");

    // Display the charge information of the lowest charged device in the list.
    drawCentredString(30, "And the lowest charge is:");
    drawRow(42,
            (*ptr_deviceList)["data"][0]["device"],
            (*ptr_deviceList)["data"][0]["charge"]);

    // Show the screen
    Heltec.display->display();
}

/**
 * Draw the blank screen.
 *
 * This screen is used to clear the display.
 */
void displayBlankScreen() {
    // Clear Screen
    Heltec.display->clear();

    // Show the blank screen
    Heltec.display->display();
}