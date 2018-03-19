@echo off
cd %cd%

cd ../server/bin
start  mongoStart.bat

cd ../
start npm start

cd ../frontend
npm start
