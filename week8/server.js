const express = require("express");
const multer = require('multer');
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app
})
app.set('view engine', "njk")

app.get('/', (request, response) => {
    response.render("index.njk", {dataToBeSent: "hello"});
});

app.get("/make-a-post", (request, response) => {
    response.render("make-post.njk");
});

app.listen(9001, () => {
    console.log('server has started on port 9001')
})