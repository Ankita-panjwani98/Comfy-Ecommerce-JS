
window.addEventListener('load', async (event) => {


  document.getElementById('loginForm').addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const email = document.getElementById('email').value;
    const password = md5(document.getElementById('password').value);


    const user = await getUser(email);


    if (user.length > 0) {
      const lgnData = {
        email: email,
        password: password,
      };

      if (user[0].password === lgnData.password) {
        createSession(user[0].id, email, 'user');

        window.location.href = "../pages/index.html";
      } else {
      document.getElementById('error-msg').innerText = 'Invalid user Id or Password';
      }
    } else {
      document.getElementById('error-msg').innerText = 'No such user exists';
    }

  });
});




async function getUser(email) {

  let res = await axios.get('http://localhost:3000/user?email=' + email);

  let data = res.data;


  return data;

}


