#!/bin/bash

# Exit on fail
set -e

# Bundle install
yarn

# Start services
yarn start

# Finally call command issued to the docker service
exec "$@"
