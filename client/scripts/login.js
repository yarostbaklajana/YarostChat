export default function (socket) {
  const loginForm = document.getElementById('login-form');
  const loginInput = document.getElementById('login-input');
  const modalWrapper = document.getElementById('modal-wrapper');

  loginForm.addEventListener('submit', handleLoginSubmit);

  function handleLoginSubmit (e) {
    e.preventDefault();
    if(isValid(loginInput)) {
      const username = loginInput.value;
      socket.emit('user logged', username);
      closeModal(modalWrapper);
    } else {
      alert('The username is empty!');
    }
  }

  function isValid(input) {
    return input.value !== '';
  }

  function closeModal (modal) {
    modal.classList.add('hidden');
  }
};


