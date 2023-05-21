require('dotenv').config();
require('../models/User');
const mongoose = require('mongoose');
module.exports = () => {
	const PASSWORD = process.env.DB_PASSWORD;
	const USERNAME = process.env.DB_USERNAME;
	const CLUSTER = process.env.MONGO_CLUSTER;
	const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}`;

	mongoose.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	});

	mongoose.connection.on('connected', () => {
		console.log('Connected to mongo instance');
	});

	mongoose.connection.on('error', (err) => {
		console.error('Error connecting to mongo', err);
	});
};
