const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
)