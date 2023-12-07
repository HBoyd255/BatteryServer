#include <Heltec.h>

#include "timerControl.h"



/**
 * Returns the number of seconds remaining until the expiration time.
 * 
 * @param expirationTime The time to compare against.
 * @return uint32_t The number of seconds remaining.
 */
uint32_t secondsRemaining(uint32_t expirationTime) {
    return (expirationTime - millis()) / 1000;
}

/**
 * Returns true if the expiration time has passed.
 * 
 * @param expirationTime The time to compare against.
 * @return bool True if the expiration time has passed.
 */
bool hasTimeExpired(uint32_t expirationTime) {
    return (expirationTime < millis());
}

/**
 * Sets the expiration time to the current time plus the time to add.
 * Essentially setting a timer for a given amount of time.
 * 
 * @param prt_expirationTime A pointer to the expiration time to set.
 * @param timeToAdd The time to add to the current time.
 */
void setExpirationTime(uint32_t *prt_expirationTime, uint32_t timeToAdd) {
    *prt_expirationTime = millis() + timeToAdd;
}

/**
 * Toggles the expiration time between the current time plus the delay and 0.
 * Basically, if there is still time remaining, reset the timer.
 * This is useful for quickly toggling a timer on and off without having to
 * keep track of the state of the timer.
 * 
 * @param expirationTime A pointer to the expiration time to toggle.
 * @param delay The delay to add to the current time.
 */
void toggleDelay(uint32_t *expirationTime, uint32_t delay) {
    if (hasTimeExpired(*expirationTime)) {
        setExpirationTime(expirationTime, delay);
    } else {
        setExpirationTime(expirationTime, 0);
    }
}
