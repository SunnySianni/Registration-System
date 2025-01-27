document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        errorMessage.textContent = ''; // Clear any previous error message
        loginButton.disabled = true; // Disable the login button to prevent multiple clicks
        loginButton.textContent = 'Logging in...'; // Indicate login process

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        try {
            // Send login request to the backend
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Parse the response from the backend
            const data = await response.json();

            if (!response.ok) {
                // Log backend response for debugging
                console.log('Backend response:', data);
                throw new Error(data.message || 'Invalid username or password');
            }

            // Store the token and role in localStorage
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            // Redirect to the dashboard
            window.location.href = 'dashboard.html';
        } catch (error) {
            // Display error message
            console.error('Login error:', error);
            errorMessage.textContent = error.message;
        } finally {
            // Re-enable the login button
            loginButton.disabled = false;
            loginButton.textContent = 'Login';
        }
    });
});
