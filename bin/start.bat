@echo off
cd %cd%

cd ../backend/bin
start  mongoStart.bat

cd ../
start yarn start

cd ../frontend
yarn start
