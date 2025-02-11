const express = require('express');
const router = express.Router();
const { getOpenAICompletion } = require('../controllers/aiController');

router.post('/openai', getOpenAICompletion);

module.exports = router;