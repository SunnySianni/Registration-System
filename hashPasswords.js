// import bcrypt from 'bcrypt';

// // List of plain-text passwords to hash
// const passwords = [
//   'admin-password',
//   'professor1-password',
//   'professor2-password',
//   'student1-password',
//   'student2-password',
// ];

// // Function to hash passwords
// const hashPasswords = async () => {

//   for (const plainTextPassword of passwords) {
  
//     try {
//       const hash = await bcrypt.hash(plainTextPassword, 10);
//       console.log(`Plain Password: ${plainTextPassword}`);
//       console.log(`Hashed Password: ${hash}\n`);
//     } catch (error) {
//       console.error('Error hashing password:', error);
//     }
//   }
// };

// // Run the function
// hashPasswords();
