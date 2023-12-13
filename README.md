# VibeTrack 
* Course: CS 3398 - Software Engineering | Instructor: Dr. Ted Lehr, Senior Lecturer

> A nightclub tracker web app that aims to provide an enhanced experience for customers, helping them discover nearby clubs that cater to their preferences and interests.

> Live demo at [https://vibetrack.vercel.app/](https://vibetrack.vercel.app/) For our development branch, please visit [this branch](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/)

![Landing Page](https://i.imgur.com/hkGI2GY.png)

| This reposition is a continuation following our team's original project for CS3398. The initial repository can be located on [our BitBucket account](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Project Status](#project-status)
* [Installation and Setup](#setup)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)

<a name="general-information"></a>
## General Information 
- We are creating a web app that aims to provide an enhanced experience for nightlife enthusiasts, helping them discover nearby clubs that cater to their preferences and interests within their vicinity.
- Through our web app, our goal is to promote an elevated quality of the nightlife experience itself, providing a convenient way to discover and access nightlife venues while fostering a safe and responsible community.

<a name="technologies-used"></a>
## Technologies Used
* React - version 18.2.0
* Node - version 20.7.0
* Express - version 4.18.2
* MongoDB - version 7.0
	* Realm Java SDK 
* Vercel - version 32.7.0
* Language
	* JavaScript
	* HTML, CSS
	* Python

<a name="features"></a>
## Features 
* **Interface**: Ensuring an aesthetically pleasing and user-friendly interface that is easy to navigate, and includes key details such as operating hours, address, social media and photo gallery.
* **Searching**: Providing seamless search and filter function within the app, enabling users to effortlessly discover nearby clubs with distinctive features that match with their preferences.
* **Sign-in**: Allowing users to sign up/in with their mobile number or email. By signing up, users will have access to exclusive features such as Invite Friends, Safety Alert, Rating, etc.
* **Special Events**: Consistently providing updates on upcoming special events such as music concerts, sporting games, festivals, etc., to nearby clubs and venues. 
* **Safety Alert**: Empower users to share their location and the venue they are attending my emergency contact.
* **Invite Friends**: Enable users to directly send invitations via email to friends and family with Special Event information.
* **User Experience**: Tailor a personalized experience for user when using the app, such as being able to rate and favorite venues as well as giving feedback and receiving customer support.
* **Database**: Create a database of nightclubs in the Austin area for easier data management and retrieval.

<a name="screenshots"></a>
## Screenshots 
![Home](https://github.com/micnguyen-rnb90/VibeTrack/blob/main/Document/Screenshot-Home.gif)
![TripFinder](https://github.com/micnguyen-rnb90/VibeTrack/blob/main/Document/Screenshot-TripFinder.gif)
![Safety and Alert](https://github.com/micnguyen-rnb90/VibeTrack/blob/main/Document/Screenshot-InviteAlert.gif)
![Login and User](https://github.com/micnguyen-rnb90/VibeTrack/blob/main/Document/Screenshot-Login.gif)

<a name="project-status"></a>
## Project Status
The current status of this project is marked as **_completed_**. However, there are still opportunities for additional improvements, which the team plans to reassess in upcoming releases.
> [Jira SCRUM Board](https://cs3398f23romulans1.atlassian.net/jira/software/projects/SCRUM/boards/1) 

<a name="setup"></a>
## Installation and Setup
### Requirements
* Node.js and npm [Donwload](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Java [Downoad](https://www.oracle.com/java/technologies/downloads/)
* Source-code editor of choice 
### How to Run
* Clone VibeTrack repo (branch: development) [BitBucket repo](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/)
* Install all the necessary dependencies from the main package.json. Clean cache if needed.
```
cd VibeTrack
npm cache clean --force
npm install
```
* Create the file `/server/config.env` with your Atlas URI and the server port:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
```
* Start Backend server (on a seperate terminal):
```
cd VibeTrack/server
npm install --legacy-peer-deps
npm start
```
![Output](https://i.imgur.com/zhlm4wW.png)
* Start Client server (on another seperate terminal):
```
cd VibeTrack/client
npm install --legacy-peer-deps
npm start
```
![Output](https://i.imgur.com/Uznj5Rz.png)

- - - -
<a name="room-for-improvement"></a>
## Future Vision <!-- Include areas you believe need improvement / could be improved. Also add TODOs for future development. -->
- Given that this is a course project, we have limited time to develop it to our full vision. Nevertheless, our goal is to develop a functional, user-friendly web app that offers information about nightclubs in the Austin area. If we choose to pursue this project beyond the classroom, we hope to broaden its reach, potentially extending the database across the country for a more expansive impact.
- Additionally, if we were to continue working on this project beyond the classroom, we will try to find additional resources like more time, expertise in specific areas, and potentially additional developers could help in expanding its scope statewide.
- User feedback and engagement would be crucial in fine-tuning and enhancing the app's features and functionalities. Therefore, we also would like to gather feedback from fellow Texas State students through beta testing. 

## Room for improvement: 
* For our current tier (Hobby), Vercel only allows **32 Deployments every 3600 seconds (1 hour)**, creating limitations on website accessibility. Moving forward, we will explore alternative hosting options for our project
	* Maybe return to Firebase but we will need to consider how the server API should be hosted.
* Our project currently **does not offer mobile support**, and we plan to address this in the future to cater to mobile users.
    * Additionally, there is an issue with **CSS rendering on different browsers** (Firefox vs. Chrome, Microsoft Edge, etc.) which was temporarily resolved. However, reimplementation with Bootstrap is in consideration for a more robust solution.
* **Refactoring** is a crucial task that requires prioritization. In the CS3398 course (Fall 2023), our primary goal was to deliver a functional product. However, for future development, our next objective will focus on optimization through code refactoring and thorough testing.

- - - -
<a name="contact"></a>
## Contact Team
* Isaiah Gage ( [Email](frb32@txstate.edu) & [LinkedIn](https://www.linkedin.com/in/isaiah-gage-059085196/) )
* Benu Liburd ( [Email](bjl98@txstate.edu) )
* Michelle Nguyen ( [Email](rnb90@txstate.edu) & [LinkedIn](https://www.linkedin.com/in/michelle-nguyen-370711287/) )
* Nilu Sah  ( [Email](zys5@txstate.edu) & [LinkedIn](https://www.linkedin.com/in/nilu-sah/) )
* Jayce Turambe ( [Email](jnn56@txstate.edu) & [LinkedIn](https://www.linkedin.com/in/jayce90/) )
