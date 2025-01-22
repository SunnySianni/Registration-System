export const validateRegistration = (username, password, role) => {
    const errors = [];
  
    if (!username || username.length < 3) {
      errors.push('Username must be at least 3 characters long');
    }
  
    if (!password || password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
  
    if (!['student', 'faculty', 'admin'].includes(role)) {
      errors.push('Invalid role');
    }
  
    return errors;
  };