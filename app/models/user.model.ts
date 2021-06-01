import mongoose from 'mongoose';

// const userTimeStamp = {
//     createdAt: "joinedAt",
//     updatedAt: "profileUpdatedAt",
//   };

const UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: true },
    email: { type: String, lowercase: true, unique: true, required: false },
    password: {type: String, required: true },
    is_active: { type: Boolean, default: false },
    chatrooms: [{name: String}]
    }
);

module.exports = mongoose.model('User', UserSchema);