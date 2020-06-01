# JsonApp Setup Wizard Server

## Set up

1. Copy this repo.
2. Instal missing dependencies using NodeJS `npm i` or `npm install` command.
3. Now you need a local repository placed in the server **root** directory.
    - The local repo directory should be named **resources_guru_config_json_files** (so you don't have to adjust code in the server).
    - I've implemented your repo [resources_guru_config_json_files](https://github.com/norakomi/resources_guru_config_json_files). Clonig it should take care of the directory naming.
      I suspect you should have no problems with the authorization.
    - If you for some reason clone or create repository with a different directory name you'll need to adjust code in the server.
        - look for *REPO_DIR_NAME* and *JSON_FILES_PATH* constants in the server.js file and adjust them accordingly.
4. Check if the .gitignore file contains the repo directory.

## Run server

1. Command `node server` starts the server on port 5005.
    - Setup Wizard checks the server availability periodically (every 30 seconds).

### Note

At the moment json files are pulled/pushed/commited from/to UnpublishedApps dir only. 