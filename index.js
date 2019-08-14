const express = require("express");
const Promise = require("promise");
const request = require("request");
const bodyParser = require("body-parser");
const mailer = require("./mailer.js");
const cors = require("cors");
const port = 1984;

const app = express();

app.use(cors());

const jsonParser = bodyParser.json();


app.get("/", (req, res) => {
	res.send("Inquiry system test: OK!");
});


/*
	Expected Format:
	{
		name: "justin doe",
		email: test@gmail.com,
		phoneNumber: 9514444444,
		message: " stuff ",
	}
*/
app.post("/inquiry", jsonParser, async (req, res) => {
	let tmp = req.body;
	let message = `
	Customer Name: ${tmp.name}
	Customer Email: ${tmp.email}
	Customer Number: ${tmp.phoneNumber}

	message: ${tmp.message}`;
	let response = await mailer(message);

	res.send(response);
});


app.get("/inquiry", jsonParser, (req, res) => {
	res.send("wip");
	//get open inquiries....
});

app.delete("/inquiry/:id", jsonParser, (req, res) => {
	res.send("wip");
	//delete the recent inquiry...
}); 

console.log(`listening... ${port}`);
app.listen(port);
