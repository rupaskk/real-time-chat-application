const socket = io('http://localhost:8500');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('msginp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('Bell Notification Sound.mp3');
const append = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

const username = prompt('please enter your good name to join');
 socket.emit('new-user-joined',username);

socket.on('user-joined',username=>{
    append(`${username} has joined the chat`,'right');
})
form.addEventListener('submit',(e)=> {
    e.preventDefault();  // page will not reload again and again
    message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})
socket.on('receive',data=>{
    append(`${data.username} : ${data.message}`,'left');
})

socket.on('left',data=>{
    append(`${username} has left the chat`,'left');
})

//console.log('rupa');
 

