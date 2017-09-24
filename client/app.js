import io from 'socket.io-client';
import 'font-awesome/css/font-awesome.css';
import './styles/styles.css';
import {Chat} from './scripts/chat';
import {LoginForm} from './scripts/login';

const socket = io();
const chat = new Chat(document.getElementById('chat-wrapper'));
const loginForm = new LoginForm(document.getElementById('modal-wrapper'));

loginForm.onSubmit((username) => {
  socket.emit('log in', username);
  loginForm.hide();
  chat.show();
});

loginForm.show();

chat.onMessage((message) => {
  socket.emit('chat message', message);
  chat.addMessage(message, 'message-dispatched');
});

socket.on('chat message', chat.addMessage.bind(chat));
socket.on('user update', chat.updateUsers.bind(chat));
