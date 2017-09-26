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
  chat.onMessage((message) => {
    socket.emit('chat message', message);
  });
  socket.on('chat message', chat.addMessage.bind(chat));
  socket.on('user list update', chat.updateUsers.bind(chat));
  chat.show();
});

loginForm.show();
