document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const logoutButton = document.getElementById('logoutButton');

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    fetchUserProfile();

    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
    });

    profileForm.addEventListener('submit', updateProfile);

    async function fetchUserProfile() {
        try {
            const response = await fetch('http://localhost:3001/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch user profile');
            const data = await response.json();
            fullNameInput.value = data.fullName;
            emailInput.value = data.email;
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }

    async function updateProfile(e) {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }

        const updatedProfile = {
            fullName: fullNameInput.value,
            email: emailInput.value,
            ...(newPassword && { password: newPassword })
        };

        try {
            const response = await fetch('http://localhost:3001/api/users/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedProfile)
            });
            if (!response.ok) throw new Error('Failed to update profile');
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    }
});