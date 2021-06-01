import mongoose from 'mongoose';

// const chatRoomTimeStamp = {
//     createdAt: "createdOn",
//     updatedAt: "lastActive",
//   };

const ChatRoomSchema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true, unique: true },
    description: String,
    members: [{userName: {type: String, required: true}, admin: {type: Boolean, default: false}, owner: {type: Boolean, default: false}}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    }
);

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);