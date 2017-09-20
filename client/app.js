import io from 'socket.io-client';
import './styles/styles.css';

const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const list = document.getElementById('messages');
form.addEventListener('submit', handleSubmit);

function handleSubmit (e) {
  e.preventDefault();
  const message = input.value;
  socket.emit('chat message', message);
  input.value = '';
}

socket.on('chat message', appendMessage);

function appendMessage (msg) {
  const li = document.createElement('LI');
  li.classList.add('message');
  li.textContent = msg;
  list.appendChild(li);
  scrollToTop();
}

function scrollToTop () {
  list.scrollTop = list.scrollHeight;
}