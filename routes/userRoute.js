const express = require('express');
const router = express();
const user = require('../controllers/usercontroller');
const { generateToken, authenticate } = require('../middleware/auth');
const { User } = require('../models/user');
const { upload } = require('../services/multer');
router.get('/', user.loging);
router.post('/auth', generateToken, user.auth);
router.get('/register', user.register);
router.post('/signup', upload.single('profile'), user.signup);
router.get('/forgot', user.forgot);
router.post('/verifyemail', user.verifyemail);
router.post('/verifyotp', user.verifyotp);
router.post('/resetpassword', user.resetpassword)
router.get('/dashboard', authenticate, user.dashboard);
router.get('/viewprofile', authenticate, user.viewprofile);
router.get('/updateProfile', authenticate, user.updateProfile);
router.post('/update', authenticate, upload.single('profile'), user.update);
router.get('/updatePassword', authenticate, user.updatePassword);
router.post('/updatePass', authenticate, user.updatePass);
router.get('/logout', authenticate, user.logout);


module.exports = router;