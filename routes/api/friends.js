const express = require('express');
const router = express.Router();

const {
  createFriend,
  readAllFriends,
  readOneFriend,
  updateFriend,
  deleteFriend,
} = require('../../controllers/friendController');
// const authenticateToken = require('../../server').authenticateToken;

router.post('/createFriend', createFriend);
router.get('/readAllFriends/:userId', readAllFriends);
router.get('/readOneFriend/:id', readOneFriend);
router.put('/updateFriend/:id', updateFriend);
router.delete('/deleteFriend/:id', deleteFriend);

// // attempting to authenticate with jwt
// router.post('/createFriend/', authenticateToken, createFriend);
// router.get('/readAllFriends/:userId', authenticateToken, readAllFriends);
// router.get('/readOneFriend/:id', authenticateToken, readOneFriend);
// router.put('/updateFriend/:id', authenticateToken, updateFriend);
// router.delete('/deleteFriend/:id', authenticateToken, deleteFriend);

module.exports = router;
