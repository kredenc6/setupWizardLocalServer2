# JsonApp Setup Wizard Server

## Set up

1. Copy this repo.
2. If needed instal missing dependencies using NodeJS `npm i` or `npm install` command.

## Run server

1. Command `node server` starts the server on port 5005.
    - it clones needed repo automatically, however it's possible you'll be asked for your GitHub credentials
    - setup wizard checks the server availability periodically (every 30 seconds).

### Note

At the moment json files are pulled/pushed/commited from/to UnpublishedApps dir only. 