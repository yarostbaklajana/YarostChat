export default function (socket) {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('message-input');
  const messages = document.getElementById('messages');
  const users = document.getElementById('users');

  form.addEventListener('submit', handleSubmit);
  socket.on('chat message', appendMessage);
  socket.on('user update', updateUserList);

  function handleSubmit(e) {
    e.preventDefault();
    const message = input.value;
    socket.emit('chat message', message);
    appendMessage(message, 'message-dispatched');
    input.value = '';
  }

  function appendMessage(msg, className) {
    const messageClassName = className ? className : 'message-received';
    addListItem(msg, [ 'message', messageClassName ], messages);
    scrollToTop(messages);
  }

  function updateUserList(usernames) {
    users.innerHTML = '';
    usernames.forEach((username) => {
      addListItem(username, [ 'user' ], users);
    });
  }

  function addListItem(text, classNames, list) {
    const li = document.createElement('LI');
    classNames.forEach((className) => {
      li.classList.add(className);
    });
    li.textContent = text;
    list.appendChild(li);
  }

  function scrollToTop(container) {
    container.scrollTop = container.scrollHeight;
  }
};