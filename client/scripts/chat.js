export class Chat {
  constructor(element) {
    this._chatContainer = element;
    this._messageInput = this._chatContainer.querySelector('#message');
    this._usersList = this._chatContainer.querySelector('#users');
    this._messagesList = this._chatContainer.querySelector('#messages');
    this._chatForm = this._chatContainer.querySelector('#chat-form');
    this._emojiContainer = this._chatContainer.querySelector('#emoji-container');
    this._emojiMap = {
      ':)': 'smile',
      ':(': 'sad',
      '(poop)': 'poop',
      '(heart eyes)': 'hearteyes',
      '(thumb up)': 'thumbsup'
    }
  }

  show() {
    this._mapEmojiToImages(this._emojiMap)
        .then((emojiUrls) => {
          this._imagesMap = emojiUrls.reduce((imagesMap, emoji) => {
            imagesMap[emoji.symbol] = emoji.src;
            return imagesMap;
          }, {});
          this._fillEmojiContainer(this._imagesMap);
          this._emojiContainer.addEventListener('click', this._handleEmojiSelect.bind(this));
          this._chatContainer.classList.remove('hidden');
        });
  }

  onMessage(handleSubmit) {
    this._handleMessageSubmit = handleSubmit;
    this._chatForm.addEventListener('submit', this._chatSubmitHandler.bind(this));
  }

  _handleEmojiSelect(event) {
    const target = event.target;
    if (target.dataset.symbol) {
      const symbol = target.dataset.symbol;
      this._messageInput.value += symbol;
    }
  }

  _chatSubmitHandler(event) {
    event.preventDefault();
    this._handleMessageSubmit(this._messageInput.value);
    this._addSentMessage(this._messageInput.value);
    this._messageInput.value = '';
  }

  updateUsers(users) {
    this._usersList.innerHTML = '';
    users.forEach((username) => {
      this._addListElement(username, ['user'], this._usersList);
    });
  }

  _fillEmojiContainer(map) {
    Object.keys(map).forEach((key) => {
      const image = this._createImage();
      image.src = map[key];
      image.classList.add('emoji__select');
      image.dataset.symbol = key;
      this._emojiContainer.appendChild(image);
    });
  }

  _addSentMessage(msg) {
    const messageWithEmojis = this._replaceSymbolsWithEmoji(msg, this._imagesMap);
    const sentMessage = this._createMessageContainer('', messageWithEmojis);
    this._addListElement(sentMessage, ['message', 'message-dispatched'], this._messagesList);
    this._scrollToTop(this._messagesList);
  }

  addMessage(props) {
    const messageBody = this._replaceSymbolsWithEmoji(props.message, this._imagesMap);
    const receivedMessage = this._createMessageContainer(props.name, messageBody);
    this._addListElement(receivedMessage, ['message', 'message-received'], this._messagesList);
    this._scrollToTop(this._messagesList);
  }

  _createMessageContainer(name, message) {
    const container = document.createElement('div');
    const nameEl = document.createElement('p');
    const messageBody = document.createElement('p');
    nameEl.classList.add('user__name');
    nameEl.innerHTML = name;
    messageBody.classList.add('message__body');
    messageBody.innerHTML = message;
    container.appendChild(nameEl);
    container.appendChild(messageBody);
    return container.outerHTML;
  }

  _mapEmojiToImages(emojiMap) {
    return Promise.all(Object.keys(emojiMap).map((key) => {
      return import(`./../images/emoji/${emojiMap[key]}.svg`)
          .then((src) => {
            return {
              symbol: key,
              src: src
            };
          })
          .catch((e) => {
            alert(e);
          });
    }));
  }

  _replaceSymbolsWithEmoji(message, emoticons) {
    return Object.keys(emoticons).reduce((messageHtml, currentKey) => {
      const image = this._createImage();
      image.src = emoticons[currentKey];
      return this._replaceAll(messageHtml, currentKey, image.outerHTML);
    }, message);
  }

  _replaceAll(target, search, replacement) {
    return target.split(search).join(replacement);
  };

  _createImage() {
    const img = document.createElement('IMG');
    img.classList.add('emoji');
    return img;
  }

  _scrollToTop(container) {
    container.scrollTop = container.scrollHeight;
  }

  _addListElement(innerContent, classNames, list) {
    const li = document.createElement('LI');
    classNames.forEach((className) => {
      li.classList.add(className);
    });
    li.innerHTML = innerContent;
    list.appendChild(li);
  }
}
