import requests

"""
module - url_manager.py

This module creates an calls google script urls, and returns errors if the
request times out.

Functions:
create_log_file_path: Creates the path for the log file from given device name.
configure_logger: Configures the logger for the application.
"""


def create_url(id, device_name, charge):
    """
    Stitches together a URl from the provided deployment id, device name and
    battery charge.

    Example URL - "https://script.google.com/macros/s/DEPLOYMENT_ID/exec?
                   type=battery&mode=set&device=HPEnvy&charge=40"

    Args:
        id (str): the deployment id to add to the url.
        device_name (str):  the device name to add to the url.
        charge (str):  the charge to add to the url.

    Returns:
        str: the full URL to execute
    """
    url = (
        "https://script.google.com/macros/s/"
        + id
        + "/exec?type=battery&mode=set&device="
        + device_name
        + "&charge="
        + charge
    )
    return url


def call_URL(url):
    """
    Sends a request to a provided URL.

    Args:
        url (str): the url to call.

    Raises:
        Exception: Raised when the request to the URL times out after
        5 seconds.
    """
    try:
        requests.get(url, timeout=5)
    except requests.exceptions.Timeout as e:
        raise Exception(f"Error: {e}")
