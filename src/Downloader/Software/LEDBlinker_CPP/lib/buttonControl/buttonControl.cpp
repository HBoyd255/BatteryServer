#include "buttonControl.h"

#include <Heltec.h>

/**
 * Counts the number of consecutive button presses.
 *
 * It works by storing the last 16 button presses in a 16 bit integer.
 * Each 0 is a button press and each 1 is a button release.
 * The consecutive press counter is incremented when the last 4 button
 * presses are 0, 0, 0, 1 (in that order) indicating that the button has been
 * held for exactly the last 3 calls of this function, this nullifies bouncing
 * and duplicate presses.
 *
 * The function returns the number of consecutive presses when the button has
 * not been pressed for 16 calls.
 *
 * This function is designed to be called repeatedly in a loop, and I found a
 * 8 milliseconds delay between calls to be sufficient.
 *
 * @param pinNumber The pin number of the button.
 * @return uint16_t The number of consecutive button presses.
 */
uint16_t countConsecutivePresses(uint16_t pinNumber) {
    // The button history is stored in a 16 bit integer.
    static uint16_t buttonHistory = 0;
    // The number of consecutive button presses.
    static uint16_t consecutivePressCount = 0;

    // Shift the button values to the left by one bit and record the current
    // button value.
    buttonHistory = buttonHistory << 1 | digitalRead(pinNumber);

    // Increment the consecutive press counter if the last 4 button presses
    // are 0, 0, 0, 1 (in that order).
    consecutivePressCount += ((buttonHistory & 15) == 8);

    uint16_t valueToReturn;

    // If the button has not been pressed for 16 calls, return the number of
    // consecutive presses and reset the consecutive press counter.
    if (buttonHistory == UINT16_MAX) {
        valueToReturn = consecutivePressCount;
        consecutivePressCount = 0;
    } else {
        // if the button has been pressed for in the last 16 calls, return 0.
        valueToReturn = 0;
    }
    return valueToReturn;
}
