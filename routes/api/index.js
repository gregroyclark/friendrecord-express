// const path = require('path');
const router = require('express').Router();
const friendRoutes = require('./friends');
const userRoutes = require('./users');

// Friend routes
router.use('/friends', friendRoutes);

// User routes
router.use('/users', userRoutes);

// router.use(function (req, res) {
//   res.sendFile(path.join(__dirname, '../../../frontend/', 'index.html'));
// });

module.exports = router;
