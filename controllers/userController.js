// User Controllers

const { User } = require("../models")

module.exports = {

  // Get all Users
  async getUsers(req, res) {
    try {

      await User.find()
      .then((users) =>
         res.json(users)
      )

    } catch (err) {

      res.status(500).json(err)
    }

  },

  // Get One User
  async getOneUser(req, res) {
    try {
      await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate("thoughts")
        .populate("friends")
      .then((user) =>
       !user ? res.status(400).json({ message: 'no users' }) : res.json(user)
      )
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // Create a User 
  async createUser(req, res) {
    await User.create(req.body)
      .then((user) =>
        res.json(user)
      )
      .catch((err) => {
        console.log(err);

        return res.status(500).json(err);
      });
  },

  // Update a User 
  async updateUser(req, res) {
    try {

      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) => {
          if (!user) {

            res.status(400).json({ message: "No user to update" })
          }

          res.status(200).json(user)
      })
    } catch (err) {

      res.status(500).json(err)
    }
  },

  // Delete a User 
  async deleteUser(req, res) {
    try {

      await User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(400).json({ message: "there is no user with that ID" })
          
          return;
        }
      })
        .then(() => res.json({ message: 'user and students deleted!' }))
      
    } catch (err) {

      res.status(500).json(err)
    }
  },
  
  // Add a friend 
  async addFriend(req, res) {
    try {

      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) => {

          res.status(200).json(user.friends)
        })
    } catch (err) {
      
      res.status(500).json(err)
    }
  },

  // Remove a friend 
  async removeFriend(req, res) {
    try {

      await  User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) => {

          res.status(200).json(user.friends)
        })
    } catch (err) {
      
      res.status(500).json(err)
    }
  },
    
}