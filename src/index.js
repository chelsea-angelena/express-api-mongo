require('dotenv').config();
require('./models/User');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const router = express.Router();
const db = require('./db/db');

const app = express();

db();
app.use(cors());
app.use(logger('combined'));

app.use(bodyParser.json());
app.use(router);

require('./routes/authRoutes')(router);
app.get('/', requireAuth, (req, res) => {
	res.send(`Your email is: ${req.user.email}`);
});

app.listen(process.env.PORT, () =>
	console.log(`listening on ${process.env.PORT}`)
);
