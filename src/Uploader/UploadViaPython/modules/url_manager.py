import json
import requests

"""
module - url_manager.py

This module creates an calls google script urls, and returns errors if the
request times out.

Functions:
create_url: Stitches together a URl from the provided deployment id.
send_data_to_URL: Sends a JSON-encoded POST request to a provided URL.
"""


def create_url(id):
    """
    Stitches together a URl from the provided deployment id.

    Args:
        id (str): the deployment id to add to the url.

    Returns:
        str: the full URL to execute
    """
    url = f"https://script.google.com/macros/s/{id}/exec"
    return url


def send_data_to_URL(url, data):
    """
    Sends a JSON-encoded POST request to a provided URL.

    Args:
        url (str): The URL to send the request
        data (dict): The data to be sent in the request body. This data is
                     JSON-encoded before being sent.

    Returns:
        requests.models.Response: The HTTP response received from the server.

    Raises:
        Exception: Raised when the request to the URL times out after 5 seconds.
    """

    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(
            url, data=json.dumps(data), headers=headers, timeout=5
        )
        response_json = (
            response.json()
        )  # This will raise json.JSONDecodeError if the response isn't in JSON format
        if response_json.get("status") != "success":
            raise Exception("Server error: " + response_json.get("message", "Unknown error"))
        return response
    except requests.exceptions.Timeout as e:
        raise Exception(f"Error: {e}")
