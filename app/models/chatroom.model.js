const mongoose = require('mongoose');

const chatRoomTimeStamp = {
    createdAt: "createdOn",
    updatedAt: "lastActive",
  };

const ChatRoomSchema = mongoose.Schema({
    name: { type: String, required: true, lowercase: true, unique: true },
    description: String,
    members: [{userName: {type: String, required: true}, admin: {type: Boolean, default: false}, owner: {type: Boolean, default: false}}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    },
    chatRoomTimeStamp
);

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);