document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorMessage.textContent = '';
      loginButton.disabled = true;
      loginButton.textContent = 'Logging in...';
  
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:3001/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }
  
        // Store token and user details in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('fullName', data.user.fullName);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('role', data.user.role);
  
        // Redirect to the dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        errorMessage.textContent = error.message;
      } finally {
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
      }
    });
  });
  