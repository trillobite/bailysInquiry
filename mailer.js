/*
	File: mailer.js
	Auth: Jesse Parnell
	Desc: Handles mailing of inquiries.
*/

const nodemailer = require("nodemailer");
const fs = require("fs");
const env = "./pass.env"; //path to the env file.
let pass = undefined;

//load up the env password to link gmail.
const load = async (path) => {
	let pass = undefined;

	await fs.readFile(path, (err, data) => {
		if(err) {
			throw err;
		}

		pass = data;		
	});

	return pass;
};

//handles the actual mailing process...
const mailer = async (message) => {

	let pass = await load(env); //get the password...

	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "bailys.ai.helper@gmail.com",
			pass: pass, //password from env.
		}
	});

	let mailOptions = {
		to: "events@baily.com",
		subject: "Baily.com Inquiry",
		text: message,
	};

	transporter.sendMail(mailOptions, (err, res) => {
		if(err) {
			console.log(err);
		} else {
			console.log("Message sent:", res.response);
		}
	});

};

module.exports = mailer;
