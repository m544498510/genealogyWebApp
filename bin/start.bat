@echo off
cd %cd%

cd ../backend/bin
start  mongoStart.bat

cd ../
start npm start

cd ../frontend
npm start
