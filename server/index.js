const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'sudo.quartz@gmail.com',
		pass: process.env.PASSWORD,
	},
});

app.post('/api/send-email', (req, res) => {
	const { email, subject, string } = req.body;

	const mailOptions = {
		from: 'sudo.quartz@gmail.com',
		to: email,
		subject: subject,
		text: string,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
			res.status(500).send('Error sending email');
		} else {
			console.log('Email sent: ' + info.response);
			res.status(200).send('Email sent successfully');
		}
	});
});



app.get('/api/dashboard', async (req, res) => {
	try {
		const options = {
			method: 'GET',
			url: 'https://latest-stock-price.p.rapidapi.com/price',
			params: {
				Indices: 'NIFTY 50'
			},
			headers: {
				'X-RapidAPI-Key': process.env.APIKEY,
				'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
			}
		}
		const resp = await axios.request(options);
		res.send(resp.data);
	} catch (err) {
		console.log(err);
	}
})


app.post('/api/share-day', async (req, res) => {
	const options2 = {
		method: 'GET',
		url: 'https://apistocks.p.rapidapi.com/daily',
		params: {
			symbol: 'AAPL',
			dateStart: req.body.date,
			dateEnd: req.body.date
		},
		headers: {
			'X-RapidAPI-Key': process.env.APIKEY,
			'X-RapidAPI-Host': 'apistocks.p.rapidapi.com'
		}
	};

	try {
		const response = await axios.request(options2);
		console.log(response.data);
		res.send(response.data);
	} catch (error) {
		console.error(error);
	}
})

app.listen(3001, () => {
	console.log(`Server is running on 3001`);
})