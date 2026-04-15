// how do we know this is a npm project?
// A: Because there is a variable that containes express.

// what command do we run to start an npm project?
// A: We use npm start server.js

// how do we create the node_modules folder if it doesn't exist?
// A: npm init -y

// what does the below chunk of code do?
// A: It calls all external libraries and puts them into variables to be used
const express = require('express');
const multer = require('multer');
const nunjucks = require('nunjucks');
const nedb = require('@seald-io/nedb');

// what is app?
// A: Variable that calls the express server and is used to fully create your web app
const app = express();
// what is database?
// A: Database makes sure all of the data stored on the server is saved even after server is closed
const database = new nedb({ filename: 'data.db', autoload: true });

// what is this configuring?
// A: Folder that is created once the server is used
const upload = multer({
	dest: 'public/uploads',
});

// what do each of these statements do?
// write the answer next to the line of code
app.use(express.static('public')); // A: Says where local host file is
app.use(express.urlencoded({ extended: true })); // A: Accept all types of input
app.set('view engine', 'njk'); // A: Templates nunjuck files to express server
nunjucks.configure('views', {
	autoescape: true,
	express: app,
}); // A: Connects nunjucks files to express server and puts into views folder

// what type of request is this? what does it do?
// A: It's a get request, and it gets the info from your files and sends back to frontend when a user is using your project
// It's requesting the slash route, and responds with the webpage
app.get('/', (request, response) => {
	// how many different responses can we write? list them.
	// A: .json, .send, .render, .response, .redirect
	// how many parameters does response.render use? list them.
	// A: Two, file name and title
	// write out the render for index.njk using the database
});

// what are the three parameters in this function?
// A: Route, upload.single, callback
app.post('/upload', upload.single('theimage'), (req, res) => {
	let currentDate = new Date();

	// what type of data structure is this?
	// A: Object
	let data = { 
		dataCaption: req.body.text,
		date: currentDate.toLocaleString(),
		timestamp: currentDate.getTime(),
	};

	// why do we write this if statement?
	// A: to check if the file was actually uploaded
	if (req.file) {
		data.image = '/uploads/' + req.file.filename;
	}

	// what does the insert function do?
	// A: it saves and puts into database
	database.insert(dataToBeStored);

	resopnse.redirect('/');
});

// what does the number signify?
// A: Indicates server number
// how do we access this on the web?
// A: localhost:6001
app.listen(6001, () => {
	console.log('server started on port 6001');
});

// continue answering the questions in the index.njk
