import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('loginForm', {
    title: 'Login',
    errorMessage: null,
    username: '',
  });
});

export default router;
