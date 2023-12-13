# How to Run VibeTrack
## Requirement
* Node.js and npm [Donwload](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Java [Downoad](https://www.oracle.com/java/technologies/downloads/)
* Source-code editor of choice 
## Set Up and Run
* Clone VibeTrack repo (branch: development) [BitBucket repo](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/)
* Install all the necessary dependencies from the main package.json. Clean cache if needed.
```
cd VibeTrack
npm cache clean --force
npm install --legacy-peer-deps
```
* Create the file `/server/config.env` with your Atlas URI and the server port:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
```
* Start server (on a seperate terminal):
```
cd VibeTrack/server
npm install --legacy-peer-deps
npm start
```
![Output](https://i.imgur.com/zhlm4wW.png)
* Start Web server (on another seperate terminal):
```
cd VibeTrack/client
npm install --legacy-peer-deps
npm start
```
![Output](https://i.imgur.com/Uznj5Rz.png)

> The following project was created following this tutorial: Mern Stack code for the [Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

