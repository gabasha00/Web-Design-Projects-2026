const express = require("express");

const app = express ();

app.use(express.static("public"));
//allows us to send and receive json data
app.use(express.urlencoded({ extended: true }));

let guestbookMessages = [];

//First parameter is the url or location where we want to get data from
//Second param is function, action to happen when route is hit
app.get("/test", (request, response)=>{
    response.send("my server is working");

});

app.get("/", (request, response)=> {
    response.send("now setting up my / route")
});
//Anytime we make changes to our server we need to restart the server

app.get("/gb", (request, response) => {
    response.sendFile("guestbook.html", { root: "./public" });
});

app.post("/sign", (request, response) => {
    console.log(request.body);

    let guest = request.body.guest;
    let message = request.body.message;

    guestbookMessages.push({
        person: guest,
        note: message
    })

    console.log("sign route has been hit");
    //response.send("hey");
    response.redirect("/gb");
});

app.get("/all-messages", (request, response) => {
    response.json({ allMessages: guestbookMessages });
});

app.listen(8000, ()=> {
    console.log("server is running")
})