window.onload = () =>{
    //uses imported socket library inside of index.njk file to create 
    // our client web socket
    const socket = io();

    const form = document.getElementById('form')
    const input = document.getElementById('input')

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        //emit sends a piece of data to our server

        //First parameter is the name of the event we are sending
        //Customizable and can be whatever that is not 'connect' or 'disconnect'

        //Second parameter is the data we are sending
        socket.emit('lalala', input.value)

        input.value = '' //removes input text after submission
    })

    socket.on('server sent data', (dataFromServer)=>{
        const item = document.createElement('p')
        item.textContent = dataFromServer
        const messages = document.getElementById('all-messages')
        messages.appendChild(item);
    });
}