document.addEventListener('DOMContentLoaded', () => {
    const studentName = document.getElementById('studentName');
    const courseList = document.getElementById('courseList');
    const logoutButton = document.getElementById('logoutButton');

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    fetchUserInfo();
    fetchEnrolledCourses();

    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
    });

    async function fetchUserInfo() {
        try {
            const response = await fetch('http://localhost:3001/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch user info');
            const data = await response.json();
            studentName.textContent = data.fullName;
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    async function fetchEnrolledCourses() {
        try {
            const response = await fetch('http://localhost:3001/api/enrollments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch enrolled courses');
            const courses = await response.json();
            displayCourses(courses);
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
        }
    }

    function displayCourses(courses) {
        courseList.innerHTML = '';
        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course-card';
            courseElement.innerHTML = `
                <h3>${course.name}</h3>
                <p>Department: ${course.department}</p>
                <p>Credits: ${course.credits}</p>
            `;
            courseList.appendChild(courseElement);
        });
    }
});