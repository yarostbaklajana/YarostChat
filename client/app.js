import io from 'socket.io-client';
import 'font-awesome/css/font-awesome.css';
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
  appendMessage(message, 'message-dispatched');
  input.value = '';
}

socket.on('chat message', appendMessage);

function appendMessage (msg, className) {
  const li = document.createElement('LI');
  li.classList.add('message');
  li.classList.add(className ? className : 'message-received');
  li.textContent = msg;
  list.appendChild(li);
  scrollToTop();
}

function scrollToTop () {
  list.scrollTop = list.scrollHeight;
}