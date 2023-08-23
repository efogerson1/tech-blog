const loginForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value;
  

    // will redirect user to the dashboard handlebars page if login name and password is correct
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');

      } else {
        alert("Incorrect username or password.");
      }
    }
  };
  

//   will match class in handlebars later
  document.querySelector('.login-form').addEventListener('submit', loginForm);