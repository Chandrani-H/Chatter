const mongoose = require('mongoose');

const messageTimeStamp = {
    createdAt: "sendAt",
    updatedAt: "lastEditedAt",
  };

  const MessageSchema = mongoose.Schema({
    from: {type: String, required: true }, //userName
    body: {type: String, required: true },
    attatchment: Buffer}, 
    messageTimeStamp
);

module.exports = mongoose.model('Message', MessageSchema);