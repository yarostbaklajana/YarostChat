export class Chat {
  constructor (element) {
    this._chatContainer = element;
    this._messageInput = this._chatContainer.querySelector('#message');
    this._usersList = this._chatContainer.querySelector('#users');
    this._messagesList = this._chatContainer.querySelector('#messages');
    this._chatForm = this._chatContainer.querySelector('#chat-form');
  }

  show () {
    this._chatContainer.classList.remove('hidden');
  }

  onMessage(handleSubmit) {
    this._handleMessageSubmit = handleSubmit;
    this._chatForm.addEventListener('submit', this._chatSubmitHandler.bind(this));
  }

  _chatSubmitHandler (event) {
    event.preventDefault();
    this._handleMessageSubmit(this._messageInput.value);
    this._addSentMessage(this._messageInput.value);
    this._messageInput.value = '';
  }

  updateUsers (users) {
    this._usersList.innerHTML = '';
    users.forEach((username) => {
      this._addListElement(username, [ 'user' ], this._usersList);
    });
  }

  _addSentMessage(msg) {
    this._addListElement(msg, ['message', 'message-dispatched'], this._messagesList);
    this._scrollToTop(this._messagesList);
  }

  addMessage (msg) {
    this._addListElement(msg, [ 'message', 'message-received' ], this._messagesList);
    this._scrollToTop(this._messagesList);
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
