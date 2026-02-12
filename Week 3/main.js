window.onload = () => {
    console.log('script ready');

    //retrieving button element on page
    let button = document.getElementById("send")
    //click event to detect when it has been clicked
    button.addEventListener("click", ()=> {
        let text = document.getElementById("search");
        console.log(text.value)
        //call my function when button has been pressed
        request(text.value);

        //resetting text value to be empty
        text.value = "";
    });

    // remember to call function
   
};

//added async inside function header so that await can be used
async function request(inputText){
    let baseURL = "http://www.omdbapi.com/?"

    let params = new URLSearchParams({
        apikey: "179a08c2",
        s: inputText,
        type: "movie",
    });

    console.log(baseURL + params);

    let url = baseURL + params;

    //this retrieves entire request
    let response = await fetch(url);

    let json = await response.json();

    console.log(json);

    let movies = json.Search;
    console.log(movies);

    for (let movie of movies){
        //1. retrieve where on webpage should be added
        let container = document.getElementById("container");
        //2. Create item to be added
        let m = document.createElement("div")
        m.textContent = movie.Title + " " + movie.Year
        //To add the poster element:
        let img = document.createElement("img")
        img.src = movie.Poster
        //3. add image to div
        m.appendChild(img)
        //4. add div to the container
        container.appendChild(m)
    }
}