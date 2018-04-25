# Junior Developer

## Assumptions

Following assumptions were made because no CSV file was provided for Input.
1. There will be information for various locations of one vessel in the radar in one csv.
2. Multiple csv's will be provided for multiple vessels 
3. geoJson will be created and table will be updated containing ID and Name of Vessel given in CSV. 
4. Multiple locations of the certain vessel will be shown on map when the name of vessel is clicked.

I have tried to follow the simplest approach possible and build a very simple frontend but interactive frontend.

### I was trying to deploy it for you using docker so that it would be the easiest way for you to execute but unfortunately I wasn't able to do it successfully. Reason: I was unable to load Python file in docker & Couldn't invest more time to this.


## Simple Installation

In order to run on server side, you need to follow the steps below:
### OS: Linux Ubuntu

### NodeJS Version 9 or latest
### python Version 2.7 or latest

#### packages required for python: 
1. pip:
	RUN `curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py`
	RUN `python get-pip.py`
2. pandas: RUN `pip install pandas`
3. geojson: RUN `pip install geojson`

## How to Build on Local System

Create Node Module:

1. Open Terminal in extracted NodeJS folder.
2. Run `sudo npm install`


## How to Run on Local Server (node-modules are mandatory before running) 
1. Open Terminal in the cloned SIE Folder 
2. Run `npm start`
3. You will be able to see message `Service is running on port 8080`

## How to use FrontEnd on your browser (Chrome & FireFox tested)
1. Open browser and load `localhost:8080`
2. Click Choose File and load any csv from "./csv's for input" directory.

Result: In return that csv file will be download in "./csv" directory and a geoJson will be created in "./json" directory, which will be loaded on Client side and a new row will be created in the table, with a clickable name field to find the location of that particular vessel on the Map.


