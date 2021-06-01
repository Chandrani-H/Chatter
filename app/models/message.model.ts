import mongoose from 'mongoose';

// const messageTimeStamp = {
//     createdAt: "sendAt",
//     updatedAt: "lastEditedAt",
//   };

  const MessageSchema = new mongoose.Schema({
    from: { type: String, required: true },
    body: { type: String, required: true },
    attatchment: Buffer
  });

module.exports = mongoose.model('Message', MessageSchema);