## VibeTrack - Realm Web SDK Strucutre and Functionality
> Incomplete, will finish up the rest after Sprint 2 is done. 

> Realm Web SDK enables browser-based applications to access data stored in MongoDB Atlas and interact with Atlas App Services like Functions, authentication, and GraphQL.

### Directory Structure:
* server
    * db
        * [conn.mjs](#conn-mjs)
    * routes
        * [user.mjs](#user-mjs)
        * ...
    * [config.env](#config-env)
    * [loadEnvironment.mjs](#load-environment-mjs)
    * [server.mjs](#server-mjs)
    * [package.json](#package-json)
    * [package-lock.json](#package-lock-json)
* client
    * public
    * src
        * css
            * ...
        * components
            * ...
        * realm
            * [constant.js](#constant-js)
            * [Login.js](#login-js)
            * [Private.js](#private-js)
            * [Signup.js](#signup-js)
            * [Security.js](#security-js)
            * [Reset.js](#reset-js)
            * [UserContext.js](#user-context-js)
        * routes
            * [Profile.js](#profile-js)
            * ...
    * App.js
    * index.js
* package-kock.json
* package.json
* Database
    * [Venues.User.json](#venues-user-json)
    * ...
* App Service
    * [onUserCreation](#on-user-creation)


## Server

<a name="conn-mjs"></a>
### /db/conn.mjs 
* Establishes a connection to a MongoDB database using the provided ATLAS_URI environment variable. 

* Uses the MongoClient from the mongodb package to connect to a MongoDB Atlas cluster, and upon successful connection, it selects "Venues" database and exports it for use in the project application.

```javascript
    import { MongoClient } from "mongodb";
    const connectionString = process.env.ATLAS_URI || "";

    const client = new MongoClient(connectionString);

    let conn;
    try {
        console.log("Connecting to MongoDB Atlas...");
        conn = await client.connect();
    } catch(e) {
        console.error(e);
    }

    let db = conn.db("Venues");

    export default db;
```
- - - -
<a name="user-mjs"></a>
### /routes/user.mjs 
* Defines an Express.js router that handles various HTTP  for the "User" database. 
* Uses MongoDB operations for data manipulation and includes routes for:
    * retrieving all records
    * retrieving a single record by user's code
    * creating a new record
    * updating an existing record by user's code
    * deleting a record by user's code.
* Note: Due to some issues with retrieving each user's ```_id``` (ObjectID) upon registration, we are fetching the record by using a ```"code"```, which are automatically generated after signing up.
    * This is technically the actual ```id``` of the user that is stored in the App Service.
    * To prevent confusion between this and ```_id``` stored in the database, we refer to ```id``` as ```code``` instead.

![User ID in App Services](https://i.imgur.com/RIeOcRS.png)

```javascript
    import express from "express";
    import db from "../db/conn.mjs";
    //import { ObjectId } from "mongodb";

    const router = express.Router();

    // This section will help you get a list of all the records.
    router.get("/", async (req, res) => {
    let collection = await db.collection("User");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
    });

    // This section will help you get a single record by id
    router.get("/:code", async (req, res) => {
    let collection = await db.collection("User");
    let query = {code: req.params.code};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });

    // This section will help you create a new record.
    router.post("/", async (req, res) => {
    let newDocument = {
        code: req.body.code,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        ...
    };
    let collection = await db.collection("User");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
    });

    // This section will help you update a record by id.
    router.patch("/:code", async (req, res) => {
    let query = {code: req.params.code};
    const updates =  {
        $set: {
        code: req.body.code,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        ...
        }
    };

    let collection = await db.collection("User");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
    });

    // This section will help you delete a record
    router.delete("/:code", async (req, res) => {
    let query = {code: req.params.code};

    const collection = db.collection("User");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
    });

    export default router;
    
```

**Note:** This function helps retrieve a single record by searching for the corresponding user's code (string) in the "User" (Venues.User) collection.

```javascript
    // This section will help you get a single record by user's code
    router.get("/:code", async (req, res) => {
    let collection = await db.collection("User");
    let query = {code: req.params.code};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });
```

Similarly, you can query another record that contain the matching keyname by changing the query statement: ```let query = {phone: req.params.phone};```

```javascript
    router.get("/:phone", async (req, res) => {
    let collection = await db.collection("User");
    let query = {phone: req.params.phone};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });
```

* **Note**: ```record.mjs``` also works in a similar fashion. However, instead of parsing by ```"/:code"```, it uses ```"/:id"``` to find and fetch user records. 

```javascript
    let query = {_id: new ObjectId(req.params.id)};
```

* In this case, ```"/:id"``` and ```"/:code"``` act as placeholders that can be filled with actual values when certain route paths are accessed. For example, in ```App.js``` (/client/src/App.js),

    * We have ```<Route path="/data/:id" element={<Data />} />```  which specified that it wants to access a record in the "Venues" collection using ```:id``` as parameter. 

    * While ```<Route path="/profile/:user" element={<Profile />} />``` indicates that it will parse the ```:code``` to find the corresponding user record in "User" collection.

* This way, you can use these parameters to identify which specific record you want to retrieve from the respective collections ("User" or "Venues" or etc.). 
* It's a common pattern in routing to use dynamic segments like ```:id``` or ```:user``` to handle different resources or entities in a RESTful API.
- - - -

<a name="config-env"></a>
### /config.env
* Declares ATLAS_URI as an environment variable storing the connection string for a MongoDB Atlas cluster.
* Allows the application to securely connect to the database without exposing sensitive credentials directly in the code, therefore enhancing security.

```
    ATLAS_URI=mongodb+srv://<username>:<password>@venues.qwb5ogw.mongodb.net/?retryWrites=true&w=majority
```
- - - -
<a name="load-environment-mjs"></a>
### /loadEnvironment.mjs
* Uses the dotenv package to load environment variables from ```config.env```
* Allows application to securely access sensitive information, keeping passwords, API keys, and other sensitive data out of the code. 

```javascript
    import dotenv from "dotenv";
    dotenv.config({ path: "./config.env" });
```
- - - -
<a name="package-json"></a>
### /package.json
* Used in Node.js to define various aspects of the project, including:
    * packages and applications it depends on
    * information about its unique source control
    * specific metadata like the project's name, description, and author.
* Crucial for managing project dependencies and providing information for package installation and execution.
* ```npm install``` when you change the dependencies on the project.
- - - -
<a name="package-lock-json"></a>
### /package-lock.json
* Ensures that the same dependencies are installed consistently across different environments, such as development and production environments.
* Also helps preventing issues with installing different package versions, which can lead to conflicts and errors.
- - - -
<a name="server-mjs"></a>
### /server.mjs
* Sets up an Express server on port 5050, applies middleware for handling CORS (Cross-Origin Resource Sharing) and parsing JSON requests
* Routes requests (for example) to   ```'/record' ``` endpoint to a module located at ```./routes/record.mjs```
* Handles GET and POST requests: 
    * ```/scrape``` route fetches and sends structured event data in JSON format
    * ```/send-email``` route sends an email using provided information and returns a success or error response.

```javascript
    import express from "express";
    import cors from "cors";
    import "./loadEnvironment.mjs";
    import records from "./routes/record.mjs";
    import users from "./routes/user.mjs";
    import { scrape } from "./routes/scrape.mjs"; 
    import { sendEmail } from "./routes/email.mjs"; 

    const PORT = 5050;
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.get('/scrape', async (req, res) => {
        ...
    });

    app.post('/send-email', async (req, res) => {
        ...
    });

    app.use("/record", records);
    app.use("/user", users);

    // start the Express server
    app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });

```
* How to run: Start Client server (on another seperate terminal):

```powershell
    cd VibeTrack/client
    npm install
    npm start
```

* If you run the application at this point, you will get the following message in your terminal as the connection establishes.
![Output](https://i.imgur.com/Uznj5Rz.png)
- - - -

## Client

<a name="constant-js"></a>
### /src/realm/constant.js 

* Contains the App Services App ID, which is unique ID for every app.

```javascript
    export const APP_ID = "vibetrack-mfspm";
```

- - - -
<a name="user-context-js"></a>
### /src/realm/UserContext.js 
*  Create a React Context on top of all our routes to get access to our user’s details, such as their profile and access tokens. 
* Whenever we need to call a function on a user’s behalf, we can easily do that by consuming this React Context through child components. 
    * Also implements functions that will do all the interactions with our Realm Server. 
    * Such as authentication, registration, fetching the current user, and logging out, all powered by the Realm web app. 
    

```javascript
    import { createContext, useState } from "react";
    import { App, Credentials } from "realm-web";
    import { APP_ID } from "./constants";
    
    // Creating a Realm App Instance
    const app = new App(APP_ID);
    
    // Creating a user context to manage and access all the user related functions across different components and pages.
    export const UserContext = createContext();
    
    export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    // Function to log in user into our App Service app using their email & password
    const emailPasswordLogin = async (email, password) => {
    const credentials = Credentials.emailPassword(email, password);
    const authenticatedUser = await app.logIn(credentials);
    setUser(authenticatedUser);
    return authenticatedUser;
    };
    
    // Function to sign up user into our App Service app using their email & password
    const emailPasswordSignup = async (email, password) => {
    try {
        await app.emailPasswordAuth.registerUser(email, password);
        // Since we are automatically confirming our users, we are going to log in the user using the same credentials once the signup is complete.
        return emailPasswordLogin(email, password);
    } catch (error) {
        throw error;
    }
    };
    
 
    // Function to prompt user to enter email for reset password link (with token and tokenID)
    const emailPasswordReset = async (email) => {
    try {
        await app.emailPasswordAuth.sendResetPasswordEmail({ email });
        return true;
    } catch (error) {
        throw error;
    }
    };

    // Function to prompt user to reset their password
    const passwordReset = async (token, tokenId, password) => {
    try {
        await app.emailPasswordAuth.resetPassword(token, tokenId, password);
    } catch (error) {
        throw error;
    }
    };

    // Function to fetch the user (if the user is already logged in) from local storage
    const fetchUser = async () => {
    if (!app.currentUser) return false;
    try {
        await app.currentUser.refreshCustomData();
        // Now, if we have a user, we are setting it to our user context
        // so that we can use it in our app across different components.
        setUser(app.currentUser);
        return app.currentUser;
    } catch (error) {
        throw error;
    }
    }
    
    // Function to logout user from our App Services app
    const logOutUser = async () => {
    if (!app.currentUser) return false;
    try {
        await app.currentUser.logOut();
        // Setting the user to null once loggedOut.
        setUser(null);
        return true;
    } catch (error) {
        throw error
    }
    }

    //  Any component nested within this Provider can use these values, making user-related functions accessible throughout the application.
    return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser }}>
    {children}
    </UserContext.Provider>;
    }
```
* Referencing from [ Realm.Auth.EmailPasswordAuth ](https://www.mongodb.com/docs/realm-sdks/js/10.0.0-beta.9/Realm.Auth.EmailPasswordAuth.html)
    * **Note**: ```resetPassword(password, token, id)Promise<void> ``` (in document) has the wrong order
    * Should be ```resetPassword(token, id, password)Promise<void>``` [(Github's Realm community discussion post)](https://github.com/realm/realm-js/issues/3723#issuecomment-862344406)

- - - -
<a name="private-js"></a>
### /src/components/Private.js 
* Wrapper page that only allows authenticated users to access the app’s private pages, such as:
    * User profile which contains the user's own private information (name, last name, birthdate, etc.)
    * Contact list (emergency contacts, friends) and favorite list
    * Security management (request for password reset)
    * TBA...

```javascript
    import { useContext } from "react";
    import { Navigate, Outlet, useLocation } from "react-router-dom";
    import { UserContext } from "./UserContext";
    
    const PrivateRoute = () => {
    
    const { user } = useContext(UserContext);
    const location = useLocation();
    const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;
    
    return !user ? <Navigate to={redirectLoginUrl} /> : <Outlet /> ;
    }
    
    export default PrivateRoute;
```

* In ```App.js```,the ```PrivateRoute``` components checks if a user is authenticated (logged in) using the UserContext, and if not, redirects to the login page (```http://localhost:3000/login?redirectTo=/```).

```javascript
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/signup" element={<Signup />} />
    <Route exact path="/reset" element={<Reset />} />
    <Route element={<PrivateRoute />}>
        <Route path='/profile/:user' element={<Profile />} />
        <Route path='/contact/:user' element={<Contact />} />
        <Route path="/security/" element={<Settings />} />
    </Route>
```

- - - -
<a name="login-js"></a>
### /src/routes/Login.js 
* Define a React component responsible for rendering a login form. 
* Use ```hooks``` and ```context``` from ```react-router-dom``` and ```UserContext``` to manage form input, user authentication, and redirection after successful login. 

```javascript
    import { useContext, useEffect, useState } from "react";
    import { Link, useLocation, useNavigate } from "react-router-dom";
    import { UserContext } from "./UserContext";
    import etc...

    const Login = () => {
    // Initialize necessary hooks and context
    const navigate = useNavigate();
    const location = useLocation();
    
    // Retrieve the emailPasswordLogin and other functions from the UserContext
    const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

    // State to manage form input values
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    //Function to be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    
    // Function to redirect the user to the appropriate page once the authentication is done.
    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }

    // Function to check if the user is already logged in and if so we are redirecting the user to the home page.
    // Otherwise we will do nothing and let the user to login.
    const loadUser = async () => {
        if (!user) {
        const fetchedUser = await fetchUser();
        if (fetchedUser) {
            redirectNow();
        }
        }
    }

    // Run only once when the component is mounted.
    // Hence this is helping us in verifying whether the user is already logged in or not.
    useEffect(() => {
        loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function to handle form submission
    // Pass user details to emailPasswordLogin function to validate the user credentials and log in the user into our App.
    const onSubmit = async (event) => {
        try {
        const user = await emailPasswordLogin(form.email, form.password);
        if (user) {
            redirectNow();
        }
        } catch (error) {
        if (error.statusCode === 401) {
            alert("Invalid username/password. Try again!");
        } else {
            alert(error);
        }
        }
    };

    // Render the login form
    return (
        <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", color:'#000', backgroundColor:"#fff"}}>
        <h1 style={{marginBottom:"10px"}}>Login</h1>
        <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={form.email}
            onChange={onFormInputChange}
            ...
        />
        <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={form.password}
            onChange={onFormInputChange}
            ...
        />

        <Button variant="contained" color="primary" onClick={onSubmit}>Login</Button>

        <p>Don't have an account? <Link to="/signup" style={{ marginLeft: "5px" }}>Signup</Link></p>
        </form>
    );
    }

    export default Login;

```
- - - -
<a name="signup-js"></a>
### /realm/Signup.js
* Define a React component responsible for rendering a signup form. 
* Use ```hooks``` and ```context``` from ```react-router-dom``` and ```UserContext``` to manage form input, user registration, and redirection after successful registration.

```javascript
    import { useContext, useState } from "react";
    import { Link, useLocation, useNavigate } from "react-router-dom";
    import { UserContext } from "./UserContext";
    import ...

    const Signup = () => {
    // Initialize necessary hooks and context 
    const navigate = useNavigate();
    const location = useLocation();
    
    // Retrieve the emailPasswordSignup function from UserContext
    const { emailPasswordSignup } = useContext(UserContext);

    // State to manage form input values, including first and last name
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",  
        lastName: "" 
    });

    // Function to handle form input changes (See Login.js for more detailed explanation)
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    // Function to redirect user after signup (See Login.js for more detailed explanation)
    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }

    // Function to handle form submission (See Login.js for more detailed explanation)
    const onSubmit = async () => {
        try {
        const user = await emailPasswordSignup(form.email, form.password, form.name, form.lastName);
        if (user) {
            redirectNow();
        }
        } catch (error) {
        alert(error);
        }
    };

    // Render the signup form
    return (
        <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", color:'#000', backgroundColor:"#fff"}}>
        <h1 style={{marginBottom:"10px"}}>Signup</h1>
        <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={form.email}
            onInput={onFormInputChange}
            ...
        />
        <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={form.password}
            onInput={onFormInputChange}
            ...
        />

        {/*More field here*/}

        <Button variant="contained" color="primary" onClick={onSubmit}Signup</Button>

        <p> Have an account already? <Link to="/login" style={{ marginLeft: "5px" }}>Login</Link>
        </p>
        </form>
    );
    }

    export default Signup;

```
<a name="security-js"></a>
### /realm/Security.js
*  Render a form to allow users to request a password reset by entering their email, which MongoDB Atlas Service will send a password reset confirmation email to.
![Reset Password: Confirmation Email](https://i.imgur.com/W3xS8BH.png) 

```javascript
    import { useContext, useState } from "react";
    import { UserContext } from "./UserContext";
    import ..

    const Security = () => {
    // State to manage the form input
    const [form, setForm] = useState({ 
        email: "",
    });

    // Retrieve the emailPasswordReset function from the UserContext
    const { emailPasswordReset } = useContext(UserContext);

    // Handle changes in the form input fields
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    // Handle the submission of the reset email form
    const sendResetEmail = async () => {
        try {
        // Call the emailPasswordReset function with the provided email
        const user = await emailPasswordReset(form.email);

        // If no user is returned, display an alert and do not proceed
        if (!user) {
            alert("Please provide an email address.");
            return;
        }

        // Display a success message and reset the form
        alert("Password reset email sent successfully!");
        setForm({ email: "" });
        } catch (error) {
        // Handle any errors that may occur during the process
        alert(error.message);
        }
    };

    return (
        <form
        style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            margin: "auto",
            color: "#000",
            backgroundColor: "#fff"
        }}
        >
        <h1 style={{ marginBottom: "10px" }}>Reset Password</h1>
        <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={form.email}
            onInput={onFormInputChange}
        />
        <Button variant="contained" color="primary" onClick={sendResetEmail}>
            Send Reset Email
        </Button>
        </form>
    );
    };

    export default Security;

```

* **Note**: We use the ```Send a password reset email``` method and use the Realm Web SDK to send a password reset email to a user. 
* The email contains a link to the configured Password Reset URL. (e.g. ```http://localhost:3000/reset?token=4d0aa1c35dfea1a499f1dc5fa663559337ce4983f236e9bd13a90ff23400a5719173352414a6e1b52af11e0335464f36c3d3c04e274026e82b4d935626b2096a&tokenId=653ee9787b81d248de70168b```)

![User Authenthication](https://i.imgur.com/TrZOwRl.png)

- - - -
<a name="reset-js"></a>
### /realm/Reset.js
* Renders a form allowing users to reset their password using a token and token ID, in addition to setting a new password.
* Once the user submits a password reset, by sending a password reset email (```Security.js```), Realm Web SDK generates a pair of unique token and tokenId values that they can use to complete the password reset within 30 minutes of the initial request.
* Generated token and tokenID example: ```http://localhost:3000/reset?token=4d0aa1c35dfea1a499f1dc5fa663559337ce4983f236e9bd13a90ff23400a5719173352414a6e1b52af11e0335464f36c3d3c04e274026e82b4d935626b2096a&tokenId=653ee9787b81d248de70168b```)

```javascript
    import { useContext, useState } from "react";
    import { UserContext } from "./UserContext";
    import ...

    const Reset = () => {
        // State to manage the form input (password, token, tokenId)
        const [form, setForm] = useState({ 
            password: "",
            token: "", // New input field for token
            tokenId: "" // New input field for tokenId
        });

        const { passwordReset } = useContext(UserContext);

        // Handler for form input changes
        const onFormInputChange = (event) => {
            const { name, value } = event.target;
            setForm({ ...form, [name]: value });
        };

        const resetPasswordWithToken = async () => {
            try {
                // Destructure form values (password, token, tokenId)
                const { token, tokenId, password } = form;

                // Validate that password, token, and tokenId are provided
                if (!password || !token || !tokenId) {
                    alert("Please provide all required information.");
                    return;
                }

                // Call the passwordReset function with the provided values
                await passwordReset(token, tokenId, password);

                alert("Password reset successfully!");
            } catch (error) {
                // Modify the error message to include the password, token, and tokenId
                alert(`Error resetting password:\n\nPassword: ${form.password}\nToken: ${form.token}\nToken ID: ${form.tokenId}\n\n${error.message}`);
            }
        };

        return (
            <form >
                <h1>Reset Password</h1>
                {/* Input field for the new password */}
                <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={form.password}
                    onChange={onFormInputChange}
                    ...
                />
                {/* Input field for the token */}
                <TextField
                    label="Token"
                    variant="outlined"
                    name="token"
                    value={form.token}
                    onChange={onFormInputChange}
                    ...
                />
                {/* Input field for the token ID */}
                <TextField
                    label="Token ID"
                    variant="outlined"
                    name="tokenId"
                    value={form.tokenId}
                    onChange={onFormInputChange}
                    ...
                    }
                />

                <Button variant="contained" color="primary" onClick={resetPasswordWithToken}>Reset Password</Button>
            </form>
        );
    };
    export default Reset;

```
* **Note**: The more convenient approach for user is to automatically parse the URL and retrieve the token and tokenID, however URLSearchParams does not work as intended. 

``` javascript
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const tokenId = urlParams.get('tokenId');
```
* Because of this, as of right now the user would need to manually copy and paste the token and tokenID into the form.

- - - -
<a name="profile-js"></a>
### /routes/Profile.js
* Fetches specific user data based on the provided ```code``` parameter from the server and display the user's name, last name, email, etc.
* **Note**: As of right now, in order to access ```Profile.js``` , the user would need to add their user's ```code``` to the URL (e..g ```http://localhost:3000/profile/6532c592d72f558fd3bdf8d5```)
    * We will look into how to implement a function that can store the user code as cookie in the future.

```javascript
    import React, { useState, useEffect } from "react";
    import { useParams } from "react-router";
    import { useContext } from 'react';
    import { UserContext } from '../realm/UserContext';
    // Additional imports...

    export default function Profile() {
    const [form, setForm] = useState({
        _id: "",
        code: "",
        name: "",
        lastName: "",
        phone: "",
        email: "",
        // Add more fields as needed...
    });

    const params = useParams();

    useEffect(() => {
        async function fetchData() {
        const code = params.code.toString();
        const response = await fetch(`http://localhost:5050/user/${params.code}`);

        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const user = await response.json();
        if (!user) {
            window.alert(`User with code ${code} not found`);
            return;
        }

        setForm(user);
        }

        fetchData();
    }, [params.code]);

    function updateForm(value) {
        return setForm(prev => {
        return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedUser = {
        _id: form._id,
        code: form.code,
        name: form.name,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        // Add more fields as needed...
        };

        await fetch(`http://localhost:5050/user/${params.code}`, {
        method: "PATCH",
        body: JSON.stringify(editedUser),
        headers: {
            'Content-Type': 'application/json'
        },
        });

        window.alert("Information updated successfully!");
    }

    const [menuCollapse] = useState(false)

    const { logOutUser } = useContext(UserContext);

    const logOut = async () => {
        try {
        const loggedOut = await logOutUser();
        if (loggedOut) {
            window.location.reload(true);
        }
        } catch (error) {
        alert(error)
        }
    }

    return (
        <div>
        <h3>General Information</h3>
        <form onSubmit={onSubmit} style={{ color: '#000000' }}>
            <div className="grid-about">
            <div className="item">
                <div className="form-group">
                <label htmlFor="name">First Name: </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                />
                </div>
            </div>
            <div className="item">
                <div className="form-group">
                <label htmlFor="lastName">Last Name: </label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => updateForm({ lastName: e.target.value })}
                />
                </div>
          </div>
          {/* Add more fields here */}
          <div className="form-group">
            <input
              type="submit"
              value="Update Information"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>

```

* Similar to  ```Data.js``` (from MERN), ```Profile.js``` retrieves the code parameter from the URL and fetches the returned JSON data that contains  the matching _id. The parsed JSON data will be stored in the variable ```user```.
* Which we can then access and use in the return function such as ```{user.name}```, ```{user.about}```, etc.

- - - -
<a name="venues-user-json"></a>
### /Database/Venues.User.json
* Example: JSON structure of an club entry in "User" collection: 
``` json
    {
    "_id": {
        "$oid": "653aaae8a809310239c03a72"
    },
    "code": "653aaae8a809310239c03a71",
    "name": "Michelle",
    "lastName": "Nguyen",
    "email": "rnb90@txstate.edu",
    "phone": "5125125120",
    "gender": "Female",
    "birthdate": "2000-06-03",
    "emergencyName1": "Michelle Nguyem",
    "emergencyEmail1": "rnb90@txstate.edu",
    "emergencyName2": "Michelle Nguyep",
    "emergencyEmail2": "micnguyen2063@gmail.com"
    },
```

* ```_id```: ObjectID type, default value of _id field of each document, which is generated during the creation of any document. Object ID is treated as the primary key within any MongoDB collection.
* In order to access ```_id```, we need to convert it to string type:
    * ```let query = {_id: new ObjectId(req.params.id)};```
    * ```const id = params.id.toString(); ```
    * ```const response = await fetch(`http://localhost:5050/user/${params.id.toString()}`);```

* **However**, we are identifying each user by their unique user ```code```, such ```_id``` isn't exactly needed.
* **Note**: The best practice to store the emergency contacts would be to hold each as an ```Array<String>```. However, there is currently some issue when trying to access it after a user is just registered (values are NULL). We will look into this in the future.
```
    json.parse: unexpected character at line 1 column 1 of the JSON data
```

- - - -
<a name="on-user-creation"></a>
### /App Service/onUserCreation

* Will run immediately after a user is created with the user object in the payload. 
* Useful for creating and linking custom user data for newly registered users. If this function fails, the user will not be created successfully and login will fail.

``` javascript
    exports = async function onUserCreation(user) {
    const customUserDataCollection = context.services
        .get("mongodb-atlas")
        .db("Venues")
        .collection("User");
    try {
        await customUserDataCollection.insertOne({
        // Save the user's account ID to your configured user_id_field
        code: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        birthdate: user.birthdate,
        emergencyName1: user.emergencyName1,
        emergencyEmail1: user.emergencyEmail1,
        emergencyName2: user.emergencyName2,
        emergencyEmail2: user.emergencyEmail2,
        });
    } catch (e) {
        console.error(`Failed to create custom user data document for user:${user.id}`);
        throw e
    }
    }

```