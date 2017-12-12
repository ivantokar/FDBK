const express = require('express')
	, nodemailer = require('nodemailer')
	, validateInput = require('../validations/contact')
	, Message = require('../model/Message')
	, sequelize = require('../db_connect');

let router = express.Router();

router.post('/', (request, response) => {
	const { errors, isValid } = validateInput(request.body);

	if (isValid) {
		if (process.env.MESSAGE_SENDING === 'yes') {
			let transporter = nodemailer.createTransport({
				service: process.env.MAIL_SERVICE,
				auth: {
					user: process.env.MAIL_USER,
					pass: process.env.MAIL_PASSWORD
				}
			});

			let options = {
				from: process.env.MAIL_FROM,
				to: process.env.MAIL_TO,
				subject: process.env.MAIL_SUBJECT,
				text: request.body.email +'\n\n'+ request.body.message
			};

			transporter.sendMail(options, (error) => {
				if (error) {
					return console.log(error);
				}
			});
		}

		if (process.env.MESSAGE_STORING === 'yes') {
			sequelize.sync().then(() => {
				return Message.create({
					email: request.body.email,
					message: request.body.message,
				});
			}).catch(err => {
				console.error(err);
			});
		}

		response.status(200).json({ success: true, message: 'Thank you for contacting us. We will get back to you soon!' });
	} else {
		response.status(202).json(errors);
	}
});

module.exports = router;