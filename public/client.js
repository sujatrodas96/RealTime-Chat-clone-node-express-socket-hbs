const socket = io();

let nme;
let txtarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message_area');
do {
  nme = prompt('Please enter your name: ');
} while (!nme);

txtarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendmessage(e.target.value);
    e.target.value = ''; // Clear the text from the textarea
  }
});

function sendmessage(message) {
  let msg = {
    user: nme,
    message: message.trim()
  };

  appenmessage(msg, 'outgoing');

  // Send to server
  socket.emit('message', msg);
//   savedata();
}

function appenmessage(msg, type) {
  let maindiv = document.createElement('div');
  let classname = type;
  maindiv.classList.add(classname, 'message');

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    <br>
  `;

  maindiv.innerHTML = markup;
  messagearea.appendChild(maindiv);
}

// function savedata() {
//   // For save the entire content and save the new data
//   localStorage.setItem('messagedata', messagearea.innerHTML, () => {
//     showalldata();
//   });
// }

// function showalldata() {
//   // For displaying all the data
//   messagearea.innerHTML = localStorage.getItem('messagedata');
// }

// showalldata();

// Receive messages

socket.on('message', (msg) => {
  appenmessage(msg, 'incoming');
//   savedata();
});
