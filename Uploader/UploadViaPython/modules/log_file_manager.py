import logging

"""
module - log_file_manager.py

This module manages a provided log file.

Each log file should be unique to the device, as long as it is not ran on 
two devices with the same name.

Functions:
configure_logger: Configures the logger for the application,
line_break: Adds a line break in the form of a row of hyphens to a given file.      
trim_log_file: Trims the given file down to a specified number of lines.
log_flags: Logs which debug flags are enables
log_exit_code: Logs the exit code of the application.


"""

# 80 is the default max number of characters that should be placed on
# one line.
LINE_WIDTH = 80


def configure_logger(log_file_path):
    """
    Configures the logger for the application,
    the logger with then divert logging to the given file.

    The log format will be set to include the time of logging, the log level
    name and the log message. The date and time is formatted as
    'Year-Month-Day Hour:Minute:Second'.

    Args:
        log_file_path (str): The full path of the file where logs will be
                             written.
    """
    logging.basicConfig(
        filename=log_file_path,
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )


def line_break(log_file_path):
    """
    Adds a line break in the form of a row of hyphens to a given file.

    This code opens a given file in append mode, adds 'LINE_WIDTH' hyphens and
    then a new line character. this is used to separate different executions
    in the log file.

    Args:
        log_file_path (str): The full path of the log file.
    """

    try:
        with open(log_file_path, "a") as log_file:
            log_file.write("-" * LINE_WIDTH)
            log_file.write("\n")
    except FileNotFoundError:
        logging.error(f"{log_file_path} not found")
    except IOError:
        logging.error(f"IO error with {log_file_path}")


def trim_log_file(log_file_path, max_lines):
    """
    Trims the given file down to a specified number of lines.

    If the log file currently has more than 'max_lines' lines, removes the
    oldest entries until it has 'max_lines' lines. If the file already has
    'max_lines' lines or fewer, does nothing.

    Args:
        log_file_path (str): The path of the log file.
        max_lines (int): The maximum number of lines the log file should have.
    """

    # Open the file in read mode and read all lines into a list
    try:
        with open(log_file_path, "r") as log_file:
            lines = log_file.readlines()
        line_count = len(lines)

        # Calculate how many lines need to be removed to get down to max_lines
        lines_to_remove = line_count - max_lines

        # If lines must be removed
        if lines_to_remove > 0:
            # Open the file in write mode (this automatically clears the file)
            with open(log_file_path, "w") as log_file:
                # Rewrite the file with just the last x lines
                log_file.write("".join(lines[lines_to_remove:line_count]))
    except FileNotFoundError:
        logging.error(f"{log_file_path} not found")
    except IOError:
        logging.error(f"IO error with {log_file_path}")


def log_flags(flags):
    """
    Logs which debug flags are enables

    For example, if DRY_RUN is enabled, add "'DRY_RUN' is enabled." to the
    log file.

    Args:
        flags (dict): a dictionary containing each debug flag.
    """
    for flag, is_enabled in flags.items():
        if is_enabled:
            logging.info(f"'{flag}' is enabled.")


def log_exit_code(exit_code):
    """
    Logs the exit code of the application.

    If the exit code is 0, its is logged as a message, indicating a
    successful execution.
    If the exit code it not 0, it is logged as an error, as something will
    have gone wrong.

    Args:
        exit_code (int): The exit code of the application.
    """

    if exit_code == 0:
        logging.info("Exit code: 0")
    else:
        logging.error(f"Exit code: {exit_code}")
