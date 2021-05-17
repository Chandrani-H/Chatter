const User = require('../models/user.model.js');
const Message = require('../models/message.model.js');
const ChatRoom = require('../models/chatroom.model.js');
const chatterRoutes = require('../routes/chatter.routes.js');

// Register a new User (post)
exports.createUser = (req, res) => {
    // Validate request
    if(!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "User data cannot be empty"
        });
    }
    
    console.log('%O', req.body);

    // Create a new User
    const user = new User({
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password,
    });
    
    //  what happens when uppercase- TURNS INTO LOWERCASE 
    // or not unique? DOES NOT SET
    //  password: String, HASH IT OR CRASH IT
    // does it get auto-set is_active: YES

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while registering the User."
        });
    });
};


//Create a new ChatRoom (post)
exports.createChatRoom = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.currentUser) {
        return res.status(400).send({
            message: "User name or chatroom name cannot be empty"
        });
    }
    
    console.log('%O', req.body);

    const messageFromChatter = new Message({
        from: "Chatter",
        body: "Welcome to this ChatRoom!"
        //can attach emoji or random gif here
    });

    // Create a ChatRoom
    const chatroom = new ChatRoom({
        name: req.body.name, 
        description: req.body.description,
        //add chatroom owner
        members: [{userName: req.body.currentUser, admin: true, owner: true}],
        messages: [messageFromChatter]
    });

    //Call function to add chatroom name to User schema

    // Save ChatRoom in the database
    chatroom.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating chatroom."
        });
    });
};


//Add User to ChatRoom (update/put/patch)
exports.userEntersChatRoom = (req, res) => {

};


//Add message to ChatRoom (post)
exports.addMessage = (req, res) => {
    // Validate request
    if(!req.body.currentUser || !req.body.message || !req.params.chatroom) {
        return res.status(400).send({
            message: "Missing fields"
        });
    }
    
    console.log('%O', req.body);
    console.log('%O', req.params);

    const message = new Message({
        from: req.body.currentUser,
        body: req.body.message
        //can enable attachment later
    });

    // Find the ChatRoom & update
    ChatRoom.findOneAndUpdate(
        {name: req.params.chatroom},
        {"$push" : {messages: message}},
        {new:true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "ChatRoom not found " + req.params.chatroom
                });
            }
            res.send(data);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ChatRoom not found " + req.params.chatroom
                });                
            }
            return res.status(500).send({
                message: "Error updating chatroom " + req.params.chatroom
            });
        });
};


//Retreive ChatRoom messages (get)
exports.getMessages = (req, res) => {
    // Validate request
    if(!req.body.currentUser || !req.params.chatroom) {
        return res.status(400).send({
            message: "Missing fields"
        });
    }
    
    console.log('%O', req.body);
    console.log('%O', req.params);

    ChatRoom.findOne({name: req.params.chatroom})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving chatroom data."
        });
    });
};


//Update ChatRoom message (update/put/patch)
//Delete ChatRoom (delete)
//Delete ChatRoom message (delete)
//Delete/Remove User from ChatRoom (delete)
//Retrieve Chatroom users (get)

