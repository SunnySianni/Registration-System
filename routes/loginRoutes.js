import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {git
  res.render('loginForm', {
    title: 'Login',
    errorMessage: null,
    username: '',
  });
});

export default router;
