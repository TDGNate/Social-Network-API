const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => timeSince(date)
    },
    username: {
      type: String,
      require: true
    },
    reactions: [reactionSchema]
  },
  {
    toJson: {
      virtuals: true,
      getters: true,
    },
  }
)

thoughtSchema
  .virtual('reactionCount')
  .get(() => this.reactions.length);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;