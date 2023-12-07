#ifndef TIMER_CONTROL_H
#define TIMER_CONTROL_H

#include <heltec.h>

// The number of seconds remaining until a given time
uint32_t secondsRemaining(uint32_t);

// Returns true if the expiration time has passed.
bool hasTimeExpired(uint32_t);

// Sets the expiration time to the current time plus the time to add.
void setExpirationTime(uint32_t *, uint32_t);

// Toggles the expiration time between the current time plus the delay and 0.
void toggleDelay(uint32_t *, uint32_t);

#endif  // TIMER_CONTROL_H