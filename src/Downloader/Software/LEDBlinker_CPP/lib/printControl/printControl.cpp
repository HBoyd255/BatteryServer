
#include "printControl.h"

#include <Heltec.h>

/**
 * Print a 16 bit number in binary to the serial monitor.
 *
 * @param data The 16 bit number to be printed.
 */
void printBinary(uint16_t data) {
    for (int8_t x = 0; x < 16; x++) {
        Serial.print((data >> (15 - x)) & 1);
    }
    Serial.println();
}