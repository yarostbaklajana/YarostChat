import io from 'socket.io-client';

const socket = io();

const form = document.getElementById('submit-form');
form.addEventListener('submit', handleSubmit);

function handleSubmit (e) {
  const inputValue = document.getElementById('form-input').value;
  socket.emit('chat message', inputValue);
}