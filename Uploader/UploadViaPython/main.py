import modules.log_file_manager as lfm
import modules.device_name_manager as name
import modules.battery_manager as battery_manager
import modules.secret_manager as secrets
import modules.url_manager as url
import modules.path_manager as path

"""
This script gets the current device's name and battery charge and uploads it
to a Google AppScripts server.
"""

# Constants
SECRETS_DIRECTORY_NAME = "secrets"
ID_FILE_NAME = "DeploymentID.json"

LOG_DIRECTORY_NAME = "logs"
LOG_FILE_TYPE = "log"
MAX_LOG_FILE_LENGTH = 100


# DRY_RUN is a mode that allows the code to run, without calling to the server.
# PSEUDO_BATTERY allows for testing the code on a device without a battery
flags = {"DRY_RUN": False, "PSEUDO_BATTERY": True}


def main():
    # Get the name of the pc
    computer_name = name.get_encoded_device_name()

    # Get the program is not running in PSEUDO_BATTERY mode.
    if not flags["PSEUDO_BATTERY"]:
        # Get the charge of the pc's battery
        charge = battery_manager.get_battery_charge()
    else:
        charge = 51

    id_file_path = path.create_full_path(SECRETS_DIRECTORY_NAME, ID_FILE_NAME)

    # Retrieve the app scripts deployment ID from the json file
    id_string = secrets.get_deployment_id(id_file_path)

    # Create the URL for setting the battery information
    url_string = url.create_url(id_string)

    # Call the url to update the server with the current battery charge
    if not flags["DRY_RUN"]:
        data = {"device": computer_name, "charge": charge}
        response = url.send_data_to_URL(url_string, data)
        response.raise_for_status()  # Raises stored HTTPError, if one occurred.
        response_json = response.json()
        if "message" in response_json:
            lfm.log_text(
                response_json["status"] + ": " + response_json["message"]
            )

    else:
        print("Dry run mode: would have called url '" + url_string + "'")


if __name__ == "__main__":
    # Set the default exit code to 0
    exit_code = 0

    # Create a log file bases on the name of the current device
    # E.G HPEnvy.log
    log_file_name = path.add_extension(name.get_device_name(), LOG_FILE_TYPE)
    log_file_path = path.create_full_path(LOG_DIRECTORY_NAME, log_file_name)

    # Configure the logger
    lfm.configure_logger(log_file_path)

    try:
        main()
    except Exception as e:
        lfm.logging.exception("An error occurred: %s", str(e))
        # If there is an error, set the exit code to 1.
        exit_code = 1

    # Log the current flags and the main functions exit code.
    lfm.log_flags(flags)
    lfm.log_exit_code(exit_code)

    # Add a line to the log file to separate the executions.
    lfm.line_break(log_file_path)

    # trim the log file down to a 100 line maximum.
    lfm.trim_log_file(log_file_path, MAX_LOG_FILE_LENGTH)

    exit(exit_code)
