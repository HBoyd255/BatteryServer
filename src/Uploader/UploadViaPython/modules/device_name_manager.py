import socket
import urllib

"""
module - device_name_manager.py


This module is responsible for getting and encoding the name of the device.

Functions:
get_device_name: Returns the name of the current device.
encode_name: URL encodes a given name.  
get_encoded_device_name: Gets the URL encoded device name.
"""


def get_device_name():
    """
    Returns the name of the current device.

    Returns:
        str: The name of the device.
    """
    return socket.gethostname()


def encode_name(name):
    """
    URL encodes a given name.

    Args:
        name (srt): The string to URL encode.

    Returns:
        str: Rhe URL encoded name.
    """
    return urllib.parse.quote_plus(name)


def get_encoded_device_name():
    """
    Gets the name of the current device, and returns the url encoded
    version.

    Returns:
        srt: The URL encoded name of the current device.
    """
    return encode_name(get_device_name())
