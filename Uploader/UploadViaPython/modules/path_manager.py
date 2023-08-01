import os

"""
module - path_manager.py

This module provides function to get and manipulate file and directory paths

Functions:
ascend_directories: Ascends a given number of levels in a directory path.
get_module_file_path: Returns the file path of the current module.
get_project_path: Gets the full path of the current project directory
add_extension: Adds a specific file_type extension to a file name.
create_full_path: Creates a full path by joining the project directory,
                  relative directory and file name together.
"""

# This module is located in PROJECT\modules\path_manager.py
# so has a Depth of 2
MODULE_DEPTH = 2


def ascend_directories(path, levels_to_ascend):
    """
    Ascends a given number of levels in a directory path.

    Args:
        path (str): the initial directory path.
        levels_to_ascend (int): the number ov levels to ascend by.

    Returns:
        str: the directory path after ascending.
    """
    for x in range(levels_to_ascend):
        path = os.path.dirname(path)
    return path


def get_module_file_path():
    """
    Returns the file path of the current module.

    Returns:
        str: The file path of the current module.
    """
    return __file__


def get_project_path():
    """
    Gets the full path of the project directory by ascending up from this module
    to the project directory.

    MODULE_DEPTH is defined as a constant value based on the location of this
    file in the project.

    For example if this module is located in PROJECT\modules\path_manager.py,
    then MODULE_DEPTH should be equal to 2.

    Returns:
        str: The directory of this project.
    """
    return ascend_directories(get_module_file_path(), MODULE_DEPTH)


def add_extension(file_name_extensionless, file_type):
    """
    Adds a specific file_type extension to a file name.

    Args:
        file_name_extensionless (str): The name of the file (with no file type
                                       specified)
        file_type (str): The type of file, with no dot.

    Returns:
        str: the combined file name and type
    """
    return file_name_extensionless + "." + file_type


def create_full_path(relative_directory, file_name):
    """
    Creates a full path by joining the project directory, relative directory
    and file name together.

    Args:
        relative_directory (str): A given relative directory to add to the full
                                  path.
        file_name (str): A given file name to add to the full path.

    Returns:
        str: The full file path.
    """
    full_path = os.path.join(get_project_path(), relative_directory, file_name)
    return full_path
