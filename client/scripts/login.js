export class LoginForm {
  constructor(element) {
    this._element = element;
    this._loginForm = this._element.querySelector('#login-form');
    this._usernameInput = this._element.querySelector('#username');
  }

  show() {
    this._element.classList.remove('hidden');
  }

  hide() {
    this._element.classList.add('hidden');
  }

  _formSubmitHandler(event) {
    event.preventDefault();
    const username = this._usernameInput.value;
    if(this._isValid(username)) {
      this._handleSubmit(username);
    } else {
      alert('The username can\'t be empty');
    }
  }

  onSubmit(handleSubmit) {
    this._handleSubmit = handleSubmit;
    this._loginForm.addEventListener('submit', this._formSubmitHandler.bind(this));
  }


  _isValid(input) {
  return input.value !== '';
  }
}
