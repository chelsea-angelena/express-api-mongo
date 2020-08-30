require('dotenv').config();
require('./models/User');
require('./models/Track');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');
const pass = process.env.MONGO_PASS;
const port = process.env.PORT;
const name = process.env.MONGO_NAME;
const myurl = process.env.MONGO_URL;
const app = express();
app.use(cors());
app.use(logger('combined'));

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = require('mongodb').MongoClient;

const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${name}:${pass}${myurl}`;

const client = mongoose.connect(uri, {
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

app.get('/', requireAuth, (req, res) => {
	res.send(`Your email is: ${req.user.email}`);
});

app.listen(port, () => console.log(`listening on ${port}`));
