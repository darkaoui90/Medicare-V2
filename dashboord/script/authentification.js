const VALID_CREDENTIALS = {
      username: 'secretaire',
      password: 'admin123'
    };
    const DASHBOARD_URL = "dashboard.html";

    const form = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;

      if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = DASHBOARD_URL;
      } else {
        errorMsg.textContent = "Identifiants incorrects.";
        errorMsg.classList.remove('hidden');


      }
    });
