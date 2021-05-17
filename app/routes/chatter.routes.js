module.exports = (app) => {
    const chatter = require('../controllers/chatter.controller.js');

    // Create a new User
    app.post('/user', chatter.createUser);

    //Create a new ChatRoom (post)
    app.post('/chatroom', chatter.createChatRoom);

    //Add User to ChatRoom (update/put/patch)
    app.post('/enterUser', chatter.userEntersChatRoom);

    //Add message to ChatRoom (post)
    app.post('/chatroom/:chatroom', chatter.addMessage);

    //Retreive ChatRoom messages (get)
    app.get('/chatroom/:chatroom', chatter.getMessages);


    //Update ChatRoom message (update/put/patch)
    //Delete ChatRoom (delete)
    //Delete ChatRoom message (delete)
    //Delete/Remove User from ChatRoom (delete)
    //Retrieve Chatroom users (get)
}