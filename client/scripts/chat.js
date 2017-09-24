class Chat {
  constructor (element) {
    this._chatContainer = element;
  }

  show () {
    this._chatContainer.classList.remove('hidden');
  }

  onMessage(handleSubmit) {
    this._handleMessageReceiving = handleSubmit;
    this._chatContainer.querySelector('#chat-form').addEventListener('submit', this._chatSubmitHandler.bind(this));
  }

  _chatSubmitHandler (event) {
    event.preventDefault();
    const messageInput = this._chatContainer.querySelector('#message');
    this._handleMessageReceiving(messageInput.value);
    messageInput.value = '';
  }

  updateUsers (users) {
    const usersList = this._chatContainer.querySelector('#users');
    usersList.innerHTML = '';
    users.forEach((username) => {
      this._addListElement(username, [ 'user' ], usersList);
    });
  }

  addMessage (msg, className) {
    const messagesList = this._chatContainer.querySelector('#messages');
    const messageClassName = className ? className : 'message-received';
    this._addListElement(msg, [ 'message', messageClassName ], messagesList);
    this._scrollToTop(messagesList);
  }

  _scrollToTop (container) {
    container.scrollTop = container.scrollHeight;
  }

  _addListElement (innerContent, classNames, list) {
    const li = document.createElement('LI');
    classNames.forEach((className) => {
      li.classList.add(className);
    });
    li.innerHTML = innerContent;
    list.appendChild(li);
  }

}

export {Chat};