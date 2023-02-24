const express = require('express');
const { createMessage, getAllMessages } = require('../controllers/messages');


const router = express.Router();

router.post('/', createMessage)
router.get('/', getAllMessages);


module.exports = router;



