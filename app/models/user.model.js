const mongoose = require('mongoose');

const userTimeStamp = {
    createdAt: "joinedAt",
    updatedAt: "profileUpdatedAt",
  };

const UserSchema = mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    password: {type: String, required: true },
    is_active: { type: Boolean, default: false },
    chatrooms: [{name: String}]
    }, userTimeStamp
);

module.exports = mongoose.model('User', UserSchema);