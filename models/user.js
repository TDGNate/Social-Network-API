const { Schema, model } = require('mongoose');

const checkEmail = (email) => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // return true or fase based on if it's a valid email 
  return regEx.test(email)
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      max_length: 40,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      require: true,
      validate: [checkEmail, "Please add a valid email"],
      unique: true
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought"
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

userSchema
  .virtual('friendCount')
  .get(() => this.friends.length);

const User = model('user', userSchema);

module.exports = User;
