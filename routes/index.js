const router = require('express').Router();

router.use('/api', require('./userRoutes.js.js'));

module.exports = router;