const express = require('express');
const router = express();
const testimonial = require('../controllers/tesimonialcontroller');
const { authenticate } = require('../middleware/auth');
const { upload } = require('../services/multer');


router.get('/testimonial', authenticate, testimonial.testimonialdata);
router.get('/newtestimonial', authenticate, testimonial.newtestimonial);
router.post('/addtestimonial', authenticate, upload.single('profile'), testimonial.addtestimonial);
router.get('/edittestimonial/:id', authenticate, testimonial.edittestimonial);
router.post('/updatetestimonial/:id', authenticate, upload.single('profile'), testimonial.updatetestimonial);
router.get('/deletetestimonial/:id', authenticate, testimonial.delete);
router.get('/multipleDeletetestimonial', authenticate, testimonial.multipleDelete)





module.exports = router;