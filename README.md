# Substitution Caption - Data and CG serving tool

## About the project

This project is built using electron, express and mongoDB as database.

This application will be handling team and player data and it will reflect same data on the CG page.

## Before You Begin
Make sure you have installed all of the following prerequisites on your machine:
* Git - [Download & Install Git](https://git-scm.com/downloads).
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* CasparCG Server - [Download CasparCG Server](https://casparcg.com/docs/downloads/server-client).

## Downloading the project

```bash
$ git clone https://github.com/Subverzon/substitution-caption.git
```

## Quick Install
Once you've downloaded the project and installed all the prerequisites, you're just a few steps away from starting the application.

To install the dependencies, run this in the application folder from the command-line:

```bash
$ npm install
```

## Usage
Add these configuration to your .env file in the root this project:

```shell
MONGO_URI=YOURMONGOCONNECTIONURI
PORT=SERVERPORT
```

## Running Your Application

Run your application using npm:

```bash
$ npm start
```

Your application should run and you will see access link on the application.

So in your browser just go to the url on the application or click on Open Panel.

That's it! Your application should be running.


## Using the application

### Data Panel

Once you have opened the panel, you can create team and players for the team.

### CG Panel

Click on Open CG button on the application to open CG route.

* CG route contains bundle of graphic assets including pages and dashboard
* Add /fifa at the end to open dashboard of fifa bundle.
* Change data and click submit to send data to caption graphic.
* Enable Live Update to update data even after animation.

### CG Caption

Click on Open CG button on the application to open CG route.

Add /fifa/substitution-caption at the end to open Caption page from fifa bundle.

## Adding in CasparCG

### AMCP Commands

Use AMCP commands to add Caption to CasparCG server.

#### CG ADD
```bash
CG [channel: int]-[layer: int] ADD [Flash Layer: int] [URL: string]
CG 1-1 ADD 0 http://localhost:8010/cg/fifa/substitution-caption
```

#### CG PLAY
```bash
CG [channel: int]-[layer: int] PLAY
CG 1-1 PLAY
```

#### CG STOP
```bash
CG [channel: int]-[layer: int] STOP
CG 1-1 STOP
```

## Building the project

To build the project first install electron-packager.
```bash
$ npm install -g electron-packager
```

Use pack and build commands to build the installer

```bash
$ npm run pack
```

```bash
$ npm run build
```