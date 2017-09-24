class LoginForm {
  constructor(element) {
    this._element = element;
  }

  show() {
    this._element.classList.remove('hidden');
  }

  hide() {
    this._element.classList.add('hidden');
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    const username = this._element.querySelector('#username').value;
    if(this.isValid(username)) {
      this._handleSubmit(username);
    } else {
      alert('The username can\'t be empty');
    }
  }

  onSubmit(handleSubmit) {
    this._handleSubmit = handleSubmit;
    this._element.querySelector('#login-form').addEventListener('submit', this._formSubmitHandler.bind(this));
  }


  isValid(input) {
  return input.value !== '';
  }
}

export  {LoginForm};


