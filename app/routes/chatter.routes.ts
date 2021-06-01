import express from "express";
const router = express.Router();

    const chatter = require('../controllers/chatter.controller.ts');

    // Create a new User
    // app.post('/user', chatter.createUser);
    router.post("/user", chatter.createUser);

    //Connect User
    router.post('/connectUser', chatter.connectUser);

    //Create a new ChatRoom (post)
    router.post('/chatroom', chatter.createChatRoom);

    //Add User to ChatRoom (update/put/patch)
    router.post('/enterUser', chatter.userEntersChatRoom);

    //Add message to ChatRoom (post)
    router.post('/chatroom/:chatroom', chatter.addMessage);

    //Retreive ChatRoom messages (get)
    router.get('/chatroom/:chatroom', chatter.getMessages);


    //Update ChatRoom message (update/put/patch)
    //Delete ChatRoom (delete)
    //Delete ChatRoom message (delete)
    //Delete/Remove User from ChatRoom (delete)
    //Retrieve Chatroom users (get)

export default router;