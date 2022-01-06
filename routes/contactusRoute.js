const express = require('express');
const router = express();
const contact = require('../controllers/contactuscontroller');
const { authenticate } = require('../middleware/auth');


router.get('/contactus', authenticate, contact.contactus);
router.get('/newcontact', authenticate, contact.newcontact);
router.post('/addcontact', authenticate, contact.addcontact);
router.get('/editcontact/:id', authenticate, contact.editcontact);
router.post('/updatecontact/:id', authenticate, contact.updatecontact);
router.get('/deletecontact/:id', authenticate, contact.delete);
router.get('/multipleDeletecontact', authenticate, contact.multipleDeletecontact)


module.exports = router;