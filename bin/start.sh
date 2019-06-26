#!/usr/bin/env bash

cd `dirname $0`

cd ../frontend
npm i
npm run build

cp -r ./public ../backend/

cd ../backend/bin

if [ ! -d "./runningData" ]; then
  mkdir ./runningData/
fi

cd ../
npm i
npm run start:pro
