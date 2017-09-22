import io from 'socket.io-client';
import 'font-awesome/css/font-awesome.css';
import './styles/styles.css';
import initChat from './scripts/chat';
import initLogin from './scripts/login';

const socket = io();
initLogin(socket);
initChat(socket);
