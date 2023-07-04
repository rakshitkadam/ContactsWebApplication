const express = require('express');

const router = express.Router();
const { getContacts, updateContact, createContact, deleteContact, getContact} = require('../Controllers/contactControllers');
const { validateToken } = require('../Middleware/validateTokenHandlers');

router.use(validateToken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;