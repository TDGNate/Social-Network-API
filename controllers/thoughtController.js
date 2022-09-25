// Thoughts Controller

const { Thought, User } = require("../models")

module.exports = {

  // Get All Thoughts 
  async getThoughts(req, res) {
    try {

      await Thought.find()
        .then((thought) => {

          res.json(thought)
        })
    } catch (err) {

      res.status(500).json(err)
    }
  },

  // Get One Thought
  async getOneThought(req, res) {
    try {

      await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => {

          if (!thought) {
            res.status(400).json({ message: 'There is no thought that matches that ID' })

            return;
          }

          res.json(thought)
        })

    } catch (err) {

      res.status(500).json(err)
    }
  },

  // Create A Thought 
  async createThought(req, res) {
    try {

      await Thought.create(req.body)
        .then((thought) => {

          const user = User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
          )

          if (!user) {

            res.status(400).json({ message: "There is no user to update their thoughts" })

            return;
          }


          res.status(200).json(thought)
        })

    } catch (err) {

      res.status(500).json(err)
    }
  },

  // Update A Thought 
  async updateThought(req, res) {
    try {

      await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) => {

          if (!thought) {
            res.status(400).json({ message: 'There is no thought that matches that ID to update' })

            return;
          }

          res.status(200).json(thought)

        })

    } catch (err) {

      res.status(500).json(err)
    }
  },

  // Delete A Thought 
  async deleteThought(req, res) {
    try {

      await Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => {

          if (!thought) {
            res.status(400).json({ message: "there is no thought with that ID to delete" })

            return;
          }

          res.status(200).json({
            message: "User has been deleted!",
            deleted: thought
          })

        })

    } catch (err) {

      res.status(500).json(err)
    }
  },

  // Create A Reaction 
  async createReaction(req, res) {
    try {

      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) => {

          if (!thought) {
            res.status(400).json({ message: "no thought found" })

            return;
          }

          res.status(200).json(thought.reactions)

        })
    } catch (err) {

      res.status(500).json(err)

    }
  }
}
