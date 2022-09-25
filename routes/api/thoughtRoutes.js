const router = require('express').Router();

const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought
} = require("../../controllers/thoughtController")

router
  .route("/")
  .get(getThoughts)
  .post(createThought)

router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought)

// router
//   .route("/:thoughtId/reactions")
//   .post(createReaction)
//   .delete(deleteReaction);

module.exports = router;
