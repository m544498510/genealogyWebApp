@echo off
cd %cd%

md runningData
cd runningData

F:\env\mongo\bin\mongod.exe
