## VibeTrack - Strucutre and Functionality
> Incomplete, will finish up the rest after Sprint 2 is done. As of right now I have only included the components that are related to connecting the MongoDB -> server -> client end.

### Directory Structure:
* server
    * db
        * [conn.mjs](#conn-mjs)
    * routes
        * [record.mjs](#record-mjs)
        * [user.mjs](#user-mjs)
        * [email.mjs](#email-mjs)
        * [scrape.mjs](#scrape-mjs)
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
            * [create.js](#create-js)
            * [edit.js](#edit-js)
            * navbar.js
            * [recordList.js](#record-list-js)
            * [userList.js](#user-list-js)
            * specialEventScraper.js
            * geocoding.py
        * realm
            * constant.js
            * Login.js
            * Private.js
            * Signup.js
            * UserContext.js
        * routes
            * Contact.js
            * [Data.js](#data-js)
            * Discover.js
            * Home.js
            * Profile.js
            * Safety.js
            * Search.js
            * Special.js
            * Template.js
            * Test.js
    * App.js
    * index.js
* package-kock.json
* package.json
* Database
    * [Venues.Venues.json](#venues-venues-json)
    * Venues.User.json

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
<a name="record-mjs"></a>
### /routes/record.mjs & /routes/user.mjs 
* Defines an Express.js router that handles various HTTP  for the "Venues" database. 
* Uses MongoDB operations for data manipulation and includes routes for:
    * retrieving all records
    * retrieving a single record by its ID
    * creating a new record
    * updating an existing record by ID
    * deleting a record by ID.


```javascript
    import express from "express";
    import db from "../db/conn.mjs";
    import { ObjectId } from "mongodb";

    const router = express.Router();

    // This section will help you get a list of all the records.
    router.get("/", async (req, res) => {
    let collection = await db.collection("Venues");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
    });

    // This section will help you get a single record by id
    router.get("/:id", async (req, res) => {
    let collection = await db.collection("Venues");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });

    // This section will help you create a new record.
    router.post("/", async (req, res) => {
    let newDocument = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        website: req.body.website,
        // etc...
    };
    let collection = await db.collection("Venues");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
    });

    // This section will help you update a record by id.
    router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates =  {
        $set: {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        website: req.body.website,
        // etc...
        }
    };
    let collection = await db.collection("Venues");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
    });

    // This section will help you delete a record
    router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("Venues");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
    });

    export default router;
    
```

**Note:** This function helps retrieve a single record by searching for the corresponding _id (ObjectID) in the "Venues" (Venues.Venues) collection.

```javascript
    router.get("/:id", async (req, res) => {
    let collection = await db.collection("Venues");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });
```

Similarly, you can query another record that contain the matching keyname by changing the query statement: ```let query = {key: req.params.key};```

```javascript
    router.get("/:key", async (req, res) => {
    let collection = await db.collection("Venues");
    let query = {key: req.params.key};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });
```
- - - -
<a name="user-mjs"></a>
### /routes/user.mjs
* ```user.mjs``` also works in a similar fashion. However, instead of parsing by ```"/:id"```, it uses ```"/:code"``` to find and fetch user records. 

```javascript
    let query = {code: req.params.code};
```

* In this case, ```"/:id"``` and ```"/:code"``` act as placeholders that can be filled with actual values when certain route paths are accessed. For example, in ```App.js``` (/client/src/App.js),

    * We have ```<Route path="/data/:id" element={<Data />} />```  which specified that it wants to access a record in the "Venues" collection using ```:id``` as parameter. 

    * While ```<Route path="/profile/:user" element={<Profile />} />``` indicates that it will parse the ```:code``` to find the corresponding user record in "User" collection.

* This way, you can use these parameters to identify which specific record you want to retrieve from the respective collections ("User" or "Venues" or etc.). 
* It's a common pattern in routing to use dynamic segments like ```:id``` or ```:user``` to handle different resources or entities in a RESTful API.
- - - -
<a name="scrape-mjs"></a>
### /routes/scrape.mjs
* Performs web scraping on a specific URL (https://www.visitsanmarcos.com/listen-san-marcos/live-this-week/)
* Uses Axios to make HTTP request, and Cheerio to parse and manipulate the HTML response. 

```javascript
    import cheerio from "cheerio";
    import axios from "axios";

    export const scrape = async () => {
    try {
        const response = await axios.get('https://www.visitsanmarcos.com/listen-san-marcos/live-this-week/'); // Replace with your target URL
        const $ = cheerio.load(response.data); // Creates HTML response an an object

        const eventInfo = [];
        // Div container holding all events
        const eventContainer = $('.contentRender');
        // For each date and events under that date
        eventContainer.find('h3').each((_, dayElement) => {
        // Date of event
        const day = $(dayElement).text();
        // Grab the list of events under that date
        const eventsElements = $(dayElement).nextUntil('h3', 'div');
        // iterate through each event 
        eventsElements.each((_, eventElement) => {
            // Grab the event
            const divText = $(eventElement).text();
            eventInfo.push({ day, divText });
        });
        });
        return eventInfo;
    } catch (error) {
        throw new Error('Error scraping data');
    }
    };
```
- - - -
<a name="email-mjs"></a>
### /routes/email.mjs
* Uses Nodemailer to send an email using provided parameters:
    * recipient address (to)
    * subject
    * email body (text), with credentials for a Gmail account specified for authentication. 
* **Note**: Temporarily disables SSL certificate validation using ```process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;,``` which should be used with caution.
    * Error: TLS (SSL) certificate it's been given is self-signed.

```javascript
    import nodemailer from 'nodemailer';

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    export const sendEmail = (to, subject, text) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service
        auth: {
            user: 'vibetracktxt@gmail.com', // Replace with your email
            pass: 'hmcs yeju buty xujk', // Replace with your email password
        },
        });

        const mailOptions = {
        from: 'vibetracktxt@gmail.com',
        to,
        subject,
        text,
        };

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            reject(new Error('Email not sent'));
        } else {
            console.log('Email sent: ' + info.response);
            resolve('Email sent');
        }
        });
    });
    };
```
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
    try {
        const eventInfo = await scrape(); // Use the scrapeData function
        res.json(eventInfo); // Send structured data as JSON response
    } catch (error) {
        res.status(500).send(error.message);
    }
    });

    app.post('/send-email', async (req, res) => {
    try {
        const { to, subject, text } = req.body;
        const result = await sendEmail(to, subject, text);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
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

<a name="create-js"></a>
### /src/components/create.js 

* Renders a form for creating a new venue. 
    * uses local state (```const [form, setForm] = useState```) to manage form inputs
    * handles form submission by sending a POST request to a server
    * navigates to a record list page upon successful submission.

```javascript
    import React, { useState } from "react";
    import { useNavigate } from "react-router";
    import '../css/create.css';

    export default function Create() {
    const [form, setForm] = useState({ // Define a state variable 'form'
        name: "",
        phone: "",
        // etc.
    });
    const navigate = useNavigate();

    function updateForm(value) {  // Function to update form state
        return setForm((prev) => {
        // Update multiple fields in the form state object without directly mutating it
        // Create a new state object by merging the previous state with the new values provided in value
        return { ...prev, ...value };
        });
    }

    async function onSubmit(e) { // Function to handle form submission
        e.preventDefault();

        const newVenue = { ...form }; // Create a new object with form data

        await fetch("http://localhost:5050/record/", { // Send a POST request to the server
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newVenue),
        })
        .catch(error => {
        window.alert(error);
        return;
        });

        setForm({ // Reset form state after submission
        name: "",
        phone: "",
        //etc.
        });

        // Navigate to the record list page after successful submission
        navigate("/recordList");
    }

    return ( // Render form submission panel
        <div style={{ color: "#000000", paddingBottom: "10px" }}>
        <h3 style={{ color: "#000000" }}>Create New Venue</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
            />

            {/* More form fields here */}

            <div className="form-group">
            <input
                type="submit"
                value="Create Venue"
                className="btn btn-primary"
            />
            </div>
        </form>
        </div>
    );
    }
```

- - - -
<a name="edit-js"></a>
### /src/components/edit.js 
*  Allows users to modify the details of a venue.
    * fetches the venue data based on the provided ID
    * fills the form with the fetched existing data
    * handles form submission to update the venue
    * navigates to the record list page after successful submission.

```javascript
    import React, { useState, useEffect } from "react";
    import { useParams, useNavigate } from "react-router";
    import '../css/edit.css';

    export default function Edit() {
    const [form, setForm] = useState({ // Define a state variable 'form'
        _id: "",
        name: "",
        // etc.
    });
    const params = useParams(); // Get the parameters from the URL
    const navigate = useNavigate(); // Navigate function from react-router-dom

    useEffect(() => { // Fetch venue data when component mounts or params.id changes
        async function fetchData() {
        // Send a GET request to the server with the 'id' parameter
        const id = params.id.toString(); 
        const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);

        if (!response.ok) { // Check if the response is successful
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const venue = await response.json();  // Parse the response (object in database) as JSON
        if (!venue) { // Check if a venue was found
            window.alert(`Venue with id ${id} not found`);
            navigate("/");
            return;
        }

        setForm(venue); // Update the 'venueData' state with the fetched data
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    function updateForm(value) { // Function to update form state
        return setForm((prev) => {
        // Update multiple fields in the form state object without directly mutating it
        // Create a new state object by merging the previous state with the new values provided in value
        return { ...prev, ...value };
        });
    }

    async function onSubmit(e) { // Extract form fields for the request body
        e.preventDefault();
        const editedVenue = {
        _id : form._id,
        name: form.name,
        // etc.
        };
        
        // Send a PATCH request to update the venue
        await fetch(`http://localhost:5050/record/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(editedVenue),
        headers: {
            'Content-Type': 'application/json'
        },
        });

        navigate("/recordList");
    }

    return (
        <div>
        <h3 style={{ color: '#000000', paddingBottom: '10px' }}>Update Venue</h3>
        <form onSubmit={onSubmit} style={{ color: '#000000' }}>
        <div className="form-group">
            <label htmlFor="_id">_ID: (Read Only) </label>
            <input
                type="text"
                className="form-control"
                id="_id"
                value={form._id}
                readOnly // Add the readOnly attribute here
            />
            </div>
            <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
            />
            </div>
            
            {/* More form fields here */}

            <div className="form-group">
            <input
                type="submit"
                value="Update Venue"
                className="btn btn-primary"
            />
            </div>
        </form>
        </div>
    );
    }
```

* **Note**: Let's take a look into this function ```async function fetchData()``` 

```javascript
    async function fetchData() {
    // Send a GET request to the server with the 'id' parameter
    const id = params.id.toString(); 
    const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);
    
    if (!response.ok) { // Check if the response is successful
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }

    const venue = await response.json();  // Parse the response (object in database) as JSON
    if (!venue) { // Check if a venue was found
        window.alert(`Venue with id ${id} not found`);
        navigate("/");
        return;
    }
    }
```

* ```const id = params.id.toString(); ``` : the id parameter received from the URL (presumably as a number or another type) into a string. This ensures that it can be used as part of the URL in the fetch request.

* ```const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);```: sends an HTTP GET request to the server.
    * Includes the base URL http://localhost:5050/record/ and appends the id parameter from the URL.

* ```const venue = await response.json(); ```: waits for  the server to send back a JSON response. The parsed JSON data will be stored in the variable ```venue```.

* Because ```/server/routes/record.mjs``` sets up a route handler for GET requests with an id parameter. When a client sends a GET request to an endpoint like "/some_id_here", the function inside the callback will be executed.

```javascript
    router.get("/:id", async (req, res) => {
    let collection = await db.collection("Venues");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });
```

* Similarly,  we can create another .js function that receives a venue's name/phone number/etc. as part of the URL such as ```const id = params.name; ```

* Also in a similar fashion, we can retrieve an entry from the user database using ```const response = await fetch(`http://localhost:5050/user/${params.code}`);```

* However, we will need to make changes to ```/server/routes/record.mjs```, specifically the query command:

```javascript
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
```

- - - -
<a name="record-list-js"></a>
### /src/components/recordList.js 
* Fetches and displays records from "Venues" collection in a table. Also provides options to edit individual records or delete them. 

```javascript
    import React, { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import '../css/recordList.css';

    const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.phone}</td>
        <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`} style={{ color: '#000000' }}>Edit</Link>
        </td>
    </tr>
    );

    export default function RecordList() {
    const [records, setRecords] = useState([]); // Define a state variable 'record'

    useEffect(() => { 
        async function getRecords() { // Define an function to fetch data
        // Send a GET request to the server 
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) { // Check if the response is successful
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const records = await response.json(); // Parse the response (object in database) as JSON

        setRecords(records);  // Update the 'record' state with the fetched data
        }
        getRecords();  // Call fetchData function

        return;
    }, [records.length]);

    async function deleteRecord(id) { // Deletes a record by its ID
        await fetch(`http://localhost:5050/record/${id}`, {
        method: "DELETE"
        });

        //  Create a new array that excludes the record with the matching _id.
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    function recordList() {   // Renders the list of records 
        return records.map((record) => {
        return (
            <Record
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            key={record._id}
            />
        );
        });
    }
    return (
        <div >
        <h3>Record List</h3>
        <table style={{ marginTop: 20, color: '#000000' }}>
            <thead>
            <tr>
                <th className="column">Name</th>
                <th className="column">Phone</th>
            </tr>
            </thead>
            <tbody>{recordList()}</tbody>
        </table>
        </div>
    );
    }
```

* ```const response = await fetch(`http://localhost:5050/record/`);``` was used to retrieve the entire collection of entries from the database. 
* This is because the server is set up in such a way that a GET request to ```http://localhost:5050/record/``` returns all the records in the database collection. Look at ```/server/routes/record.mjs```:

```javascript
    router.get("/", async (req, res) => {
    let collection = await db.collection("Venues");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
    });
```
- - - -
<a name="data-js"></a>
### /src/routes/Data.js 
* Fetches specific venue data based on the provided id parameter from the server and display the venue's name, address, about section, and a button indicating its current status (open or closed) along with an image gallery.
* **Note**: ```Data.js``` has been trimmed out some functions (map, image gallery, convert hours, etc.) to make it easier and shorter for explanation.

```javascript
    import React, { useState, useEffect } from "react";
    import { useParams } from "react-router-dom";
    import "leaflet/dist/leaflet.css";
    import '../css/Template.css';

    function Data(props) {
    const [venueData, setVenueData] = useState({
        name: "",
        address: "",
        about: "",
        website: "",
        phone: 0,
    });

    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5050/record/${params.id}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const venue = await response.json();
            if (!venue) {
                window.alert(`Venue with id ${params.id} not found`);
                return;
            }
            setVenueData(venue);
        }

        fetchData();
    }, [params.id]);

    return (
        <div>
        <div className="about-section">
            <div className="item">
            <h2 className="h2 section-title" style={{ 'float': 'left', 'textAlign': 'left' }}>{venueData.name}</h2>
            <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.address}</p>
            <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.about}</p>
            {isOpen ? (
                <button style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '1.5em' , 'backgroundColor':'#65e0ab'}} className="btn btn-primary">OPEN NOW</button>
            ) : (
                <button style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '1.5em' }} className="btn btn-primary">CLOSED</button>
            )}
            </div>
            <div className="item" >
            <ImageGallery items={images}
            showPlayButton={false} 
            showFullscreenButton={false}/></div>
        </div>

        </div>
    );
    };

    export default Data;
```

* Similar to ```edit.js```, ```Data.js``` retrieves the _id parameter from the URL and fetches the returned JSON data that contians the matching _id. The parsed JSON data will be stored in the variable ```venue```.
* Which we can then access and use in the return function such as ```{venueData.name}```, ```{venueData.about}```, etc.

- - - -
<a name="venues-venues-json"></a>
### /Database/Venues.Venues.json
* Example: JSON structure of an club entry in "Venues" collection: 
``` json
    {
    "_id": {
        "$oid": "651e5014c7ff119bb2ec6dcc"
    },
    "name": "Patio Dolcetto",
    "address": "322 Cheatham St, San Marcos, TX 78666",
    "latitude": 29.87682,
    "about": "Located in San Marcos and inspired by the beautiful river, Patio Dolcetto embodies the energy and class of the city with the laid back atmosphere of the Hill Country. Treat yourself to great wines, craft ciders, cocktails, martinis, craft beers and good food on the romantic patio. And trust us, you're going to want to save room for dessert! Enjoy dining and imbibing at Patio Dolcetto. ",
    "phone": {
        "$numberLong": "5123663605"
    },
    "website": "https://patiodolcetto.com/",
    "image": [
        "https://i.imgur.com/u5W6rwg.jpg",
        "https://i.imgur.com/IULQRj5.png",
        "https://i.imgur.com/6UEK0dF.png",
        "https://i.imgur.com/vtCdpiL.jpg",
        "https://i.imgur.com/49UGL9h.jpg",
        "https://i.imgur.com/t86NgVo.png",
        "https://i.imgur.com/F8NNrvx.png"
    ],
    "friday": "4:00 PM - 12:00 AM",
    "instagram": "https://www.instagram.com/patiodolcetto/",
    "monday": "4:00 PM - 11:00 PM",
    "saturday": "4:00 PM - 12:00 AM",
    "sunday": "12:00 PM - 10:00 PM",
    "thursday": "4:00 PM - 11:00 PM",
    "tuesday": "4:00 PM - 11:00 PM",
    "wednesday": "4:00 PM - 11:00 PM",
    "yelp": "https://www.yelp.com/biz/patio-dolcetto-san-marcos",
    "amenities": "Takes Reservations,Offers Takeout,No Delivery,Many Vegetarian Options,Accepts Credit Cards,Not Accepts Apple Pay,Not Accepts Cryptocurrency,Outdoor Seating,Romantic, Intimate, Classy, Casual,Quiet,Casual Dress,Good for Groups,Good for Dinner,Street Parking, Private Lot Parking,Waiter Service,Free Wi-Fi,Best nights on Saturday,Happy Hour Specials,Beer & Wine Only,Smoking Outside Only,Wheelchair Accessible,Gender-neutral restrooms,Heated Outdoor Seating,Covered Outdoor Seating,Not Good For Kids,Not Good For Dancing,No Drive-Thru,Dogs Not Allowed,No TV,Bike Parking,Compostable containers available",
    "longtitude": -97.93679,
    "facebook": null,
    "price": "$$",
    "rating": 4.7,
    "review": 456,
    "tags": "Wine Bars,Pizza,Tapas,Small Plates"
    },
```

* ```_id```: ObjectID type, default value of _id field of each document, which is generated during the creation of any document. Object ID is treated as the primary key within any MongoDB collection.
* In order to access ```_id```, we need to convert it to string type:
    * ```let query = {_id: new ObjectId(req.params.id)};```
    * ```const id = params.id.toString(); ```
    * ```const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);```
        