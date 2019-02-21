const createParty = document.getElementById('createParty');
const partyName = document.getElementById('pName');
const hqAddress = document.getElementById('hqAddress');
const logoUrl = document.getElementById('logoUrl');
const str = '<p>Party Successfully Added</p>';
const div = document.getElementById('New');
const token = localStorage.getItem('token');

createParty.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('http://localhost:3000/api/v1/parties', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({
      name: partyName.value,
      hqAddress: hqAddress.value,
      logoUrl: logoUrl.value,
    }),
  })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        div.insertAdjacentHTML('afterbegin', str);
      }
    })
    .catch((error) => {
      console.log(error);
    });
})