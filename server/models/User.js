const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const shelterSchema = require('./Shelter');


const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/[\w.]+@\w\.\w{3}/, 'Unacceptable Email. Try Again.'],
      },
      password: {
        type: String,
        required: true,
      },
      // set savedBooks to be an array of data that adheres to the bookSchema
      savedShelters: [shelterSchema],
    },
  );

  // hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  // custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  const User = model('User', userSchema);

  module.exports = User;


