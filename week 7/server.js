const express = require('express');
const nunjucks = require('nunjucks');

//New library
const cookieParser = require('cookie-parser');

//Initialize our express application

let app = express();

//Initialize our templating library
//Connect nunjucks -> express
nunjucks.configure("views", {
    autoescape: true,
    express: app
})

// Connect express -> nunjucks
app.set('view engine', 'njk');

//set up our middleware

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}));

//New middleware
app.use(cookieParser());

// Routes come after middleware, but before the listen
app.get('/', (request, response)=>{

    if(request.cookies.visits){
        console.log(request.cookies.visits);
        let visits = request.cookies.visits;
        visits++
        response.cookie('visits', visits, {
            expires: new Date(Date.now() + 1000 * 60 * 60)
        });
    } else {
     //3 parameters
    //First: name of cookie to be stored
    //Second: value you want to assign it
    //Third: when the cookie expires
    let oneHourInMs = 1000 * 60 * 60;
    response.cookie('visits', 1, {
        expires: new Date(Date.now() + oneHourInMs)
    });
    
    }


    response.render('index.njk', { numVisits: request.cookies.visits})

});

app.get('/about', (request, response) => {
    response.render(about.njk);
})

app.listen(7001, ()=> {
    console.log('http://localhost:7001')
});