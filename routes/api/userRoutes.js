const router = require('express').Router();

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require("../../controllers/userController")


// No user id routes 
router
  .route("/")
  .get(getUsers)
  .post(createUser)

// routes for IDs 
router
  .route("/:userId")
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser)

router
  .route("/friends/:friendId")
  .post(addFriend)
  .delete(removeFriend)

module.exports = router