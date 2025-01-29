import sequelize from '../config/database.js';

// export const getEnrollments = async (req, res) => {
//   try {
//     const enrollments = await sequelize(
//       'SELECT e.id, c.name, c.department, c.credits FROM enrollments e ' +
//       'JOIN courses c ON e.course_id = c.id ' +
//       'WHERE e.user_id = ?',
//       [req.user.id]
//     );
//     res.json(enrollments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const createEnrollment = async (req, res) => {
//   const { courseId } = req.body;

//   try {
//     // Check if the user is already enrolled in the course
//     const [existingEnrollment] = await sequelize(
//       'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
//       [req.user.id, courseId]
//     );

//     if (existingEnrollment) {
//       return res.status(400).json({ message: 'You are already enrolled in this course' });
//     }

//     // Create the enrollment
//     await query('INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)', [req.user.id, courseId]);
//     res.status(201).json({ message: 'Enrollment successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };