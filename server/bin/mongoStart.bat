@echo off
cd %cd%

md runningData
cd runningData
md mongoData
cd mongoData

F:\soft\mongoDB\bin\mongod.exe --dbpath %cd%
