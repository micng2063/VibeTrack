## Research React-Native

**Title**: Research for Sign-up feature and related techlogies

**Why**: Implementing a sign-up feature allows new users to register for the application, providing a secure way to create personalized accounts.

**Expectations**:

* Create a user interface for the sign-up page.

* Validate user input for registration details (e.g., name, email, password).

* Implement registration logic on the server-side.

* Connect to MongoDB to store user account information.

**Actions**:

* Design an user-friednly sign-up form with fields for email, password and required informations.

* Frontend validation to ensure all required fields are filled out correctly.

* Set up an endpoint (e.g., POST /api/signup) in Express to handle registration requests.

* Verify that the provided email is valid and not already in use.

* Save the user's registration details in the MongoDB database.

* Handle scenarios such as existing email, server errors, etc., and provide appropriate error messages.
* Respond to client indicating the registration outcome (success or failure).

* (Tentative) Use algorithm (bcrypt, SHA, etc) to mask user's password before storing in database.

* (Tentative) Implement security practices (e.g., HTTPS, data protection) and guard against common vulnerabilities.

**User Story**: [SCRUM-1: Sign-in - As a user, I would like to have a sign-in feature so I can gain access to exclusive features such as Invite Friends, Safety Alerts, Reviews, etc.](https://cs3398f23romulans1.atlassian.net/browse/SCRUM-1)

**Reference**: 

* [Signup Form Using Node.js and MongoDB](https://www.geeksforgeeks.org/signup-form-using-node-js-and-mongodb/)

* [Register and Login System in MERN Stack](https://dev.to/crackingdemon/register-and-login-system-in-mern-stack-1n98)

* [How to Build a Full-Stack Authentication App With React, Express, MongoDB, Heroku, and Netlify](https://www.freecodecamp.org/news/how-to-build-a-fullstack-authentication-system-with-react-express-mongodb-heroku-and-netlify/)

* [Github: registration-and-login-app-using-react-express-and-mongodb](https://github.com/Aklilu-Mandefro/registration-and-login-app-using-react-express-and-mongodb)