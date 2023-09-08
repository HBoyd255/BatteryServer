#ifndef TIMER_CONTROL_H
#define TIMER_CONTROL_H

#include <heltec.h>

// The number of milliseconds in a day, hour, minute and second.
#define MILLISECONDS_PER_HOUR 3600000
#define MILLISECONDS_PER_MINUTE 60000
#define MILLISECONDS_PER_SECOND 1000

// The number of seconds remaining until a given time
uint32_t secondsRemaining(uint32_t);

// Returns true if the expiration time has passed.
bool hasTimeExpired(uint32_t);

// Sets the expiration time to the current time plus the time to add.
void setExpirationTime(uint32_t *, uint32_t);

// Toggles the expiration time between the current time plus the delay and 0.
void toggleDelay(uint32_t *, uint32_t);

#endif  // TIMER_CONTROL_H