/*
	File: mailer.js
	Auth: Jesse Parnell
	Desc: Handles mailing of inquiries.
*/

const nodemailer = require("nodemailer");

const mailer = (message) => {

	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "bailys.ai.helper@gmail.com",
			pass: "bailys1992",
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
