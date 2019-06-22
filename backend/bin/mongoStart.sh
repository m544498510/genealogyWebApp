#!/usr/bin/env bash

cd `dirname $0`

if [ ! -d "./runningData" ]; then
  mkdir ./runningData/
fi

if [ ! -d "./runningData/mongoData" ]; then
  mkdir ./runningData/mongoData
fi

mongod --dbpath ./runningData/mongoData/
