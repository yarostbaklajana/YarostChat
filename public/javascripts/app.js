import io from 'socket.io-client';

const socket = io();

const form = document.getElementById('submit-form');
form.addEventListener('submit', handleSubmit);

function handleSubmit (e) {
  e.preventDefault();
  const input = document.getElementById('form-input');
  socket.emit('chat message', input.value);
  input.value = '';
}

socket.on('chat message', function (msg) {
  const message = document.createElement('P');
  message.textContent = msg;
  document.getElementById('messages').appendChild(message);
});