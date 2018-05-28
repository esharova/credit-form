#!/bin/bash

set -e

docker pull docker-infra.cian.ru/nodejs-build:node_upgrade

docker run \
    --rm \
    -w /srv/build \
    -v "$(pwd)/:/srv/build" \
    docker-infra.cian.ru/nodejs-build:node_upgrade \
    /bin/sh -c "rm -rf dist node_modules"

rm -rf .cache
mkdir .cache
rm -rf .config
mkdir .config
docker run \
    --rm \
    -w /srv/build \
    -u `id -u $USER` \
    -v "/opt/node_cache:/opt/node_cache" \
    -v "$(pwd)/:/srv/build" \
    -v "$(pwd)/.cache:/.cache" \
    -v "$(pwd)/.config:/.config" \
    docker-infra.cian.ru/nodejs-build:node_upgrade \
    /bin/sh -c "cp /etc/.npmrc .npmrc; yarn install --ignore-engines --pure-lockfile --cache-folder /opt/node_cache; node_modules/jest/bin/jest.js $*"

tar cf ./node_modules.tar node_modules

./node_modules/.bin/cmdt build
cd dist/assets
tar cfv ../../credit-application-form-finance-frontend.tar *
