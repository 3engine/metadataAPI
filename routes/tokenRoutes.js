const express = require('express');
const router = express.Router();
const {getTokenByID} = require('../controllers/tokenController');

router.get('/:tokenID', getTokenByID);

module.exports = router;
