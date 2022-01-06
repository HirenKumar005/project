const express = require('express');
const router = express();
const portfolio = require('../controllers/portfoliocontroller');
const { authenticate } = require('../middleware/auth');
const { upload } = require('../services/multer');

router.get('/portfolio', authenticate, portfolio.portfoliodata);
router.get('/newportfolio', authenticate, portfolio.newportfolio);
router.post('/addportfolio', authenticate, upload.array('profile', 10), portfolio.addportfolio);
router.get('/editportfolio/:id', authenticate, upload.array('profile', 10), portfolio.editportfolio);
router.post('/updateportfolio/:id', authenticate, upload.array('profile', 10), portfolio.updateportfolio);
router.get('/deleteportfolio/:id', authenticate, portfolio.delete);
router.get('/multipleDeleteportfolio', authenticate, portfolio.multipleDelete)
module.exports = router;