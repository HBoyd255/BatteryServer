import psutil

"""
module - battery_manager.py

This module is used to get the battery percentage of the current device,

It uses psutil to get system-level information about the devices battery.

Functions:
get_battery_charge: Returns a string of the current battery percentage.

"""


def get_battery_charge():
    """
    Returns the current battery percentage of the device, as a string.

    If no battery is found / if the script runs on a device with no battery,
    an Exception is raised with the message "Battery not found".

    Raises:
        Exception: If no battery is found

    Returns:
        str: the current battery percentage as a string.
    """
    battery = psutil.sensors_battery()
    if battery is None:
        raise Exception("Battery not found")
    return str(battery.percent)
