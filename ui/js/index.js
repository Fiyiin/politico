/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

const loginbutton = document.getElementById('login');
const signupbutton = document.getElementById('signup');

loginbutton.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: document.getElementById('username').value,
      password: document.getElementById('password').value,
    }),
  })
    .then(res => res.json())
    .then((res) => {
      console.log(res.status)
      if (res.data[0].token) {
        localStorage.setItem('token', res.data[0].token);
        localStorage.setItem('firstname', res.data[0].user.firstname);
        if (res.data[0].user.is_admin === true) {
          window.location.href = 'public/admin.html';
        } else {
          window.location.href = 'public/home.html';
        }
      }
      if (res.error === 'the password is incorrect') {
        const error = document.getElementById('errmsg');
        error
      } 
    })
    .catch((error) => {
      console.log(error);
    });
});

signupbutton.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('http://localhost:3000/api/v1/auth/signup', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      firstname: document.getElementById('fname').value,
      lastname: document.getElementById('lname').value,
      phoneNumber: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      password: document.getElementById('pwd').value,
      confirmPassword: document.getElementById('conpwd').value,
    }),
  })
    .then(res => res.json())
    .then((res) => {
      if (res.data[0].token) {
        localStorage.setItem('token', res.data[0].token);
        window.location.href = 'public/home.html'
      } else {

      }
    }) 
    .catch((error) => {
      console.log(error);
    });
});