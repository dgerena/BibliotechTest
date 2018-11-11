const bodyParser = require('body-parser');
const express = require('express');
const jsend = require('jsend');
const app = express();

const book = require('./routes/book.route');
const index = require('./routes/index');
const initialSetup = require('./config/initialSetup.config');
const user = require('./routes/user.route');

initialSetup();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jsend.middleware);

app.use('/user', user);
app.use('/book', book);

app.use('/', index);

app.all('*', function (req, res) {
	res.status(404).json({
		status: "failure",
		data: {
			message: "No route found"
		}
	});
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`));
}

module.exports = app;