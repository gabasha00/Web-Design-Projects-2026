// how do we know this is a npm project?
// A: Because there is a variable that containes express and package.json

// what command do we run to start an npm project?
// A: We use npm init -y

// how do we create the node_modules folder if it doesn't exist?
// A: npm install

// what does the below chunk of code do?
// A: It imports all external libraries and puts them into variables to be used throughout code
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
// A: Folder that is created once the server is used, creates folder where assets are stored
const upload = multer({
	dest: 'public/uploads',
});

// what do each of these statements do?
// write the answer next to the line of code
app.use(express.static('public')); // A: Any front-end files from our sites and assets are served.
// Allows express to expose those files
app.use(express.urlencoded({ extended: true })); // A: Accept all types of input / any type of file uploaded
app.set('view engine', 'njk'); // A: Sets express the ability to use and send njk data and file
nunjucks.configure('views', {
	autoescape: true,
	express: app,
}); // A: Connects nunjucks files to express server and puts into views folder

// what type of request is this? what does it do?
// A: It's a get request, and it gets the info from your files and sends back to frontend when a user is using your project
// It's requesting the slash route, and responds with the webpage
app.get('/', (request, response) => {
	// how many different responses can we write? list them.
	// A: .json, .send, .render, .redirect, .sendFile
	// how many parameters does response.render use? list them.
	// A: Two, file name and title
	// write out the render for index.njk using the database
	// A: 
	// database.find({}, (err, foundData) => {
	//	})
	// response.render('index.njk', {serverData: foundData})
 });

// what are the three parameters in this function?
// A: Route (/ upload), upload.single, callback function
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
// A: Indicates port number
// how do we access this on the web?
// A: localhost:6001
app.listen(6001, () => {
	console.log('server started on port 6001');
});

// continue answering the questions in the index.njk
