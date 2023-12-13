# VibeTrack 
> A nightclub tracker web app that aims to provide an enhanced experience for customers, helping them discover nearby clubs that cater to their preferences and interests.

> Live demo at [https://vibetrack.vercel.app/](https://vibetrack.vercel.app/) For our development branch, please visit [this branch](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/)

![Landing Page](https://i.imgur.com/hkGI2GY.png)

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Project Status](#project-status)
* [Installation and Setup](#setup)
* [Sprint 3](#sprint-3) | [Sprint 2](#sprint-2) | [Sprint 1](#sprint-1)
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
![Home](https://i.imgur.com/1B1BZ69.gif)
![TripFinder](https://i.imgur.com/b0VBA1t.gif)
![Safety and Alert](https://i.imgur.com/btdSVDQ.gif)
![Login and User](https://i.imgur.com/UTQqDlt.gif)

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
<a name="sprint-3"></a>
## Sprint 3 Review
### Review and Retrospective
* In this sprint, our main objective is to further polish our planned features and seamlessly integrate all components to ensure readiness for deployment. 
* [Sprint 3 Retrospective](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint3_Retrospective.md)
* Burnup report
![Burnup Chart](https://i.imgur.com/q3ZXKkO.png)

### Screenshots

### Contributions
* __Isaiah__: Implemented function to retrieve user's geolocation and saved contacts for Alert button on each Venue page. Attempted to deploy with Firebase
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint3_Jira.md#isaiah) 
* __Benu__: Implemented functions for user feedback and redirecting pages for error (500 Server Error, 404 Not Found)
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint3_Jira.md#benu) 
* __Michelle__: Resolve issues with CSS rendering on different browsers. Patched up components to be ready for deployment. Attempted to deploy with vercel.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint3_Jira.md#michelle) 
* __Nilu__: Implemented mini Invite button for each Event on Special Event page. Attempt to create email template.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint3_Jira.md#nilu) 
* __Jayce__: Implemented functions for Search feature: route finder function using react-leaflet-routing and search on map function.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint3_Jira.md#jayce) 

### Future Implementation
* Re-deploy with Firebase or other alternatives
* Ensure web application is compatible and mobile-friendly
* Transform our backend database of all  San Marcos venues into an open-source dataset and API

- - - -
<a name="sprint-2"></a>
## Sprint 2 Review
### Review and Retrospective
* For this sprint, our primary goal is to implement the our major planned features, such as login/signup, search, safety alert/invitation. We also implemented additional functions that aim to enhance the user experience (rating, feedback, recommendation).
* [Sprint 2 Retrospective](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Retrospective.md)
* Burnup report
![Burnup Chart](https://i.imgur.com/GnqQ1Yi.png)

### Screenshots
* __Homepage__ and __Discover__ and __Special Event__ 
![Homepage, Discover and Special Event](https://i.imgur.com/vV0zUhs.png)

* __Signup__ and __Password Reset__ 
![Signup and Password Reset](https://i.imgur.com/iqKOYVT.png)

* __Venue__,  __Search__, __User Profile__, and __Emergency Contact__ 
![Venue, Search, User Profile and Emergency Contact](https://i.imgur.com/slPczc9.png)

* __Invitation__ and __Safety__ 
![Invitation and Safety](https://i.imgur.com/2fbKizV.png)

### Contributions
* __Isaiah__: Implemented a feature to send an email to an emergency contact
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#isaiah) 
* __Benu__: Implemented functions that aim to enhance and personalize user experiences, such as rating venue, getting recommendation, sending feedback, etc.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#benu) 
* __Michelle__: Implemented login and signup feature. Further expanded the database and worked on the interface for a more professional design.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#michelle) 
* __Nilu__: Implemented a feature of sending email to friends or families to join clubs & added CSS style to the page. Also, I successfully added the data from web scraping inside the container of my special event. 
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#nilu) 
* __Jayce__: Implemented a search feature where we have a function to sort the top 10 nearest clubs to the user, a function to search a deserted club by name and I incorporated the clubs marker on map. Also worked on css to stylize our search feature.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#jayce) 

### Next Steps
* __Isaiah__: 
	* Implement mini Alert button into each Venue page
	* Deploy application to Firebase/Heroku/etc.

* __Benu__:
	* Further modify the favorites to show current ratings of venues
	* Finish the feedback function
	* Implement more functions to enhance user experience.

* __Michelle__: 
	* Work with Jayce to combine the Discover and Search feature together. 
	* Improve on user-related features to enhance security.
	* Patch up Benu�s user experience enhancing functions into assigned component
	* Look into using OpenAI for chatbox as customer support.

* __Nilu__:
	* Connect Special Event feature with react-calendar for each venue page
	* Implement mini Invite button into Special Event page
 
* __Jayce__:
	* Implement filter by tag feature
	* Further implement search feature
	* Implement SimpleGMap into application (if free) to show route


### Issues to Resolve
* Database: Reformat venue.address so that it can be trimmed and look nicer in Search/Discover function
* Data: Data page changes parameter when clicking on other feature (e..g go to Safety), need to consider path restriction
- - - -
<a name="sprint-1"></a>

## Sprint 1 Review
### Review and Retrospective
* For this sprint, our primary goal is to set up a web application for our nightclub tracker project with basic interface and features (Map, Calendar, Special Events). We are also working on the Database feature but will focus more onto that in Sprint 2.
* [Sprint 1 Retrospective](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Retrospective.md)
* Burnup report
![Burnup Chart](https://i.imgur.com/33S2DqW.png)

### Screenshots
* __Homepage__ and __Discover__ (displaying all venue entries in our database)
![Homepage and Discover](https://i.imgur.com/T4wKCAL.png)
* __Record__ and __Data__ (displaying all venue entries in table form and displaying specific venue following a template)
![Database record and specific venue listing](https://i.imgur.com/xyoETic.png)
* __Special Event__ and __Create/Edit/Login/Safety__ (displaying upcoming events and prompting to edit/create new documents)
![Special event and create/edit component](https://i.imgur.com/ZVCOVVj.png)

### Contributions
* __Isaiah__: Designed basic app sketeton and web scraped data for special event page
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#isaiah) 
* __Benu__: Research webscraping and how to make a MongoDB database, created basic database for venues using Excel.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#benu) 
* __Michelle__: Stylize interface, create a client/server connection and integrate database from MongoDB into project.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#michelle) 
* __Nilu__:Designed Special Event Page using HTML, CSS & javascript & added it to our Vibetrack
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#nilu) 
* __Jayce__: Incorporated Map API into web app, customized and adjusted Map (marker, view, and default coordination),
			Implemented function to convert address to coordinate.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#jayce) 

### Next Steps
* __Isaiah__: 
	* Create safety page with user options allowing them to choose what clubs they will visit that night
	* Create option to add and invite friends to clubs that night
* __Benu__:
	* Create a database for the user information
	* Possible favorite feature
	* Possible review feature 
	* created a test app for the basic star ratings function.
* __Michelle__: 
	* Continue expanding and integrating database into application (opening hours, social Media, image gallery)
	* Continue improving interface to be more user-friendly and easy-to-navigate 
	* Research and implement user authenthication (sign-in/-up) along with Benu
* __Nilu__:
	* I will continue to integrate database to the special event & add some more style to my Special event page. 
* __Jayce__:
	* Develop a search feature that allows users to find nightclubs by entering keywords 
	* Integrate Location-Based Search
	* Implement a feature to indicate whether a nightclub is currently open or closed.

### Issues to Resolve
* Data: Map's marker not display correctly: Wrong center even when assigned argument is coordinates retrieve from DB
* Data: Need to resize images to be more uniform in dimension. Window.toScroll not working properly.
* Route: If on localhost:3000/data/ and then click on Record List/Create/etc. on navigation bar, route will redirect to localhost:3000/data/recordList, etc.

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