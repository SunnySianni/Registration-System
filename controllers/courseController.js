import sequelize  from '../config/database.js';

// export const getAllCourses = async (req, res) => {
//   try {
//     const courses = await sequelize('SELECT * FROM courses');
//     res.json(courses);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getCourseById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [course] = await sequelize('SELECT * FROM courses WHERE id = ?', [id]);
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
//     res.json(course);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };