#!/usr/bin/env bash

cd `dirname $0`

cd ../frontend
npm i
npm run build

mv ./public ../backend/

cd ../backend/bin

bash mongoStart.sh

cd ../
npm i
npm run start:pro
