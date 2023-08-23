const signup = async (event) => {

    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()
  
    if (username && password) {

      const response = await fetch('/api/users', {
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


  
  const signupForm = document.querySelector('.signup-form')
  signupForm.addEventListener('submit', signup);