import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/user.mjs";
import { scrape } from "./routes/scrape.mjs"; // Import the scrapeData function
import { sendEmail } from "./routes/email.mjs"; // Import the sendEmail function

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
