const express = require("express");
const path = require("path");
const emailjs = require("emailjs-com");
const cors = require('cors');
require('dotenv').config()

const app = express();
global.XMLHttpRequest = require("xhr2");
// Automatically allow cross-origin requests
app.use(cors());

// Initializing express middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, ".", "public")));

// Initializing email server
emailjs.init(process.env.USERID);

app.post("/contact/message", (req, res) => {
  const { name, email, message } = req.body;

  var templateParams = {
    to_email: `${email}`,
    to_name: name,
    message,
  };
  emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       return res.json({ message: { name: email, data: response.text } });
    }, function(error) {
       console.log('FAILED...', error);
       return res.status(400).json({ err: "message not sent" });
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "public", "index.html"));
});

const port = process.env.PORT || 9001;
app.listen(port);

console.log(`express app listening on port ${port}`);
