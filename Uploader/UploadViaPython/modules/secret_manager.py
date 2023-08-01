import json

"""
module - secret_manager.py

This modules is responsible for retrieving my Google AppScripts deployment id
from a json file.

Allows my to put my code on github without exposing my deployment id, 
by including the json file in a .gitignore file

Functions:
get_deployment_id: returns the deployments id from a json file, as a string.
"""


def get_deployment_id(id_file_path):
    """
    retrieves the deployment id from a json file, and returns it as a string.

    Opens file in read mode, parses its contents as json data, retrieves the
    deployment id and returns it.

    Args:
        id_file_path (str): The full path of the json file that contains the
                            deployment id.

    Raises:
        KeyError: Raised when "id" is not found in the json file.
        Exception: Raised when the file cant be found or opened.
        Exception: Raised when the json data can not be parsed properly.

    Returns:
        str: The deployment id retrieved from the json file, as a string.
    """
    try:
        with open(id_file_path, "r") as file:
            data = json.load(file)
            deployment_id = data.get("id")
            if deployment_id is None:
                raise KeyError("ID not found in JSON data")
            return deployment_id
    except (FileNotFoundError, IOError) as e:
        raise Exception(
            f"Error occurred while opening or reading JSON file: {e}"
        )
    except json.JSONDecodeError as e:
        raise Exception(f"Error occurred while parsing JSON: {e}")
