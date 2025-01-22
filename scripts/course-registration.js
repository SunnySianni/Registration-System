document.addEventListener('DOMContentLoaded', () => {
    const availableCourses = document.getElementById('availableCourses');
    const logoutButton = document.getElementById('logoutButton');

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    fetchAvailableCourses();

    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
    });

    async function fetchAvailableCourses() {
        try {
            const response = await fetch('http://localhost:3001/api/courses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch available courses');
            const courses = await response.json();
            displayCourses(courses);
        } catch (error) {
            console.error('Error fetching available courses:', error);
        }
    }

    function displayCourses(courses) {
        availableCourses.innerHTML = '';
        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course-card';
            courseElement.innerHTML = `
                <h3>${course.name}</h3>
                <p>Department: ${course.department}</p>
                <p>Credits: ${course.credits}</p>
                <button class="enroll-button" data-course-id="${course.id}">Enroll</button>
            `;
            availableCourses.appendChild(courseElement);
        });

        // Add event listeners to enroll buttons
        const enrollButtons = document.querySelectorAll('.enroll-button');
        enrollButtons.forEach(button => {
            button.addEventListener('click', enrollCourse);
        });
    }

    async function enrollCourse(e) {
        const courseId = e.target.getAttribute('data-course-id');
        try {
            const response = await fetch('http://localhost:3001/api/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ courseId })
            });
            if (!response.ok) throw new Error('Failed to enroll in course');
            alert('Successfully enrolled in the course!');
            fetchAvailableCourses(); // Refresh the course list
        } catch (error) {
            console.error('Error enrolling in course:', error);
            alert('Failed to enroll in the course. Please try again.');
        }
    }
});