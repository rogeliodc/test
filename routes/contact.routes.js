const {Router } =require('express');
const router =Router();
const { contactos, findContact, delContact } = require('../controllers/contact.controller');


router.get('/contacts', contactos)
router.get('/contacts/:id', findContact);
router.delete('/contacts/:id', delContact);

module.exports = router;