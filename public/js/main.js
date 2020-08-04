
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
/*const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
  
});*///////////////////  PUTIN CA MARCHE CES PUTIN DE QUERY de chiotte
////// DONC MODE BOURRIN
////////////// Get username et room from url ////////////////////////////
const str = location.search;

const group = str.split('?');
const usr = group[1].split('&');
const username1 = usr[0].split('=');
const room1 = usr[1].split('=');
const username = username1[1];
const room = room1[1];
//console.log(group[1]);
//console.log(usr[0]);
//console.log(usr[1]);
console.log(username1[1]);
console.log(room1[1]);
//const username="avni";
//const room = "salope"
////////////////////////////////////////////////////
/// initialisation du socket
const socket = io();

// rejoint la chatroom
socket.emit('joinRoom', { username, room });

// Get room and utilisateurs
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit a chaque submit ajout d'un event
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emition de message au server
  socket.emit('chatMessage', msg);

  // nettoyage input mesage après envoi
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.id} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}
// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}`;
}
