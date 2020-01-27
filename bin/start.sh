#!/usr/bin/env bash

cd `dirname $0`

cd ../frontend
yarn install
yarn build

cp -r ./public ../backend/

cd ../backend/bin

if [ ! -d "./runningData" ]; then
  mkdir ./runningData/
fi

cd ../
yarn install
yarn start:pro
