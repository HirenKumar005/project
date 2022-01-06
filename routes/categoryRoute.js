const express = require('express');
const router = express();
const category = require('../controllers/categorycontroller');
const { authenticate } = require('../middleware/auth');


router.get('/category', authenticate, category.data);
router.get('/newCategory', authenticate, category.newCategory);
router.post('/addCategory', authenticate, category.addCategory);
router.get('/edit/:id', authenticate, category.editCategory);
router.post('/updateCategory/:id', authenticate, category.updateCategory);
router.get('/delete/:id', authenticate, category.delete);
router.get('/multipleDelete', authenticate, category.multipleDelete)





module.exports = router;