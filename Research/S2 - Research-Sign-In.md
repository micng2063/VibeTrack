## Research for Sign-in Feature

**Title**: Research for Sign-in feature and related techlogies

**Why**: Implementing a sign-in feature is crucial for user authentication and authorization. It ensures that only authorized users can access certain parts of the application, providing a secure and personalized experience.

**Expectations**:

* Create a user interface for the sign-in page

* Validate user input for email and password

* Implement authentication logic on the server-side

* Connect to MongoDB to verify user credentials

**Actions**:

* Design a user-friendly Sign-in form with fields for email and password.

* Validate that email and password fields are filled out correctly

* Set up server endpoint (e.g., POST /api/signin) in Express to handle sign-in requests

* Verify user credentials in the database.

* Create a JSON Web Token for upon successful authentication

* Handle errors (e.g., incorrect password, non-existent user) with appropriate error messages.

* Respond to the client indicating the sign-in outcome

* (Tentative) Implement security practices (e.g., HTTPS, data protection) and guard against common vulnerabilities.

**User Story**: [SCRUM-1: Sign-in - As a user, I would like to have a sign-in feature so I can gain access to exclusive features such as Invite Friends, Safety Alerts, Reviews, etc.](https://cs3398f23romulans1.atlassian.net/browse/SCRUM-1)

**Reference**: 

* [How To Add Login Authentication to React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications)

* [Implement Email/Password Authentication in React](https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/)

* [Register and Login System in MERN Stack](https://dev.to/crackingdemon/register-and-login-system-in-mern-stack-1n98)

* [How to Build a Full-Stack Authentication App With React, Express, MongoDB, Heroku, and Netlify](https://www.freecodecamp.org/news/how-to-build-a-fullstack-authentication-system-with-react-express-mongodb-heroku-and-netlify/)

* [Github: registration-and-login-app-using-react-express-and-mongodb](https://github.com/Aklilu-Mandefro/registration-and-login-app-using-react-express-and-mongodb)