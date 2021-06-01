const User = require('../models/user.model.ts');
const Message = require('../models/message.model.ts');
const ChatRoom = require('../models/chatroom.model.ts');
const chatterRoutes = require('../routes/chatter.routes.ts');
import { Request, Response } from "express";

// Register a new User (post)
exports.createUser = (req: Request, res: Response) => {
    // Validate request
    if(!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "User data cannot be empty"+req.body
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
    try {
        const data: String = user.save();
        if(data) {
            res.status(200).send(data);
        }
      } catch (e) {
        res.status(500).send(e.message || "Some error occurred while registering the User.");
      }
      
    // user.save()
    // .then(data => {
    //     res.status(200).send(data);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while registering the User."
    //     });
    // });
};


//Connect a User
exports.connectUser = (req: Request, res: Response) => {
    console.log('%O', req.body);
    // Validate request
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Enter username & password"
        });
    }

    // Find the user & update as active
    try {
        const data: string = User.findOneAndUpdate(
        {username: req.body.username},
        {is_active: true}, {new:true},
        function(err: Error, docs: Object) {
            if(err) {
                res.status(404).send({
                    message: "User not found or could not be updated" + req.body.username
                });
            } else {
                console.log("Document:", docs);
            }
        });

        if(!data) {
            res.status(404).send({
                message: "ChatRoom not found " + req.params.chatroom
            });
        }

        let current = new Date();
        const token = btoa(req.body.username + current.toLocaleString());
        res.status(200).send({"token": token});

        } catch (e) {
            if(e.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ChatRoom not found " + req.params.chatroom
                });                
            }
            return res.status(500).send({
                message: "Error updating chatroom " + req.params.chatroom
            });
        }

    res.status(200).send("");
};


//Create a new ChatRoom (post)
exports.createChatRoom = (req: Request, res: Response) => {
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
    try {
        const data: String = chatroom.save();
        if(data) {
            res.status(200).send(data);
        }
      } catch (e) {
        res.status(500).send(e.message || "Some error occurred while creating chatroom.");
      }

    // chatroom.save()
    // .then(data => {
    //     res.send(data);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while creating chatroom."
    //     });
    // });
};


//Add User to ChatRoom (update/put/patch)
exports.userEntersChatRoom = (req: Request, res: Response) => {

};


//Add message to ChatRoom (post)
exports.addMessage = (req: Request, res: Response) => {
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

    try {
        const data: String = ChatRoom.findOneAndUpdate(
        {name: req.params.chatroom},
        {"$push" : {messages: message}},
        {new:true});

        if(!data) {
            res.status(404).send({
                message: "ChatRoom not found " + req.params.chatroom
            });
        }
        res.send(data);

        } catch (e) {
            if(e.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ChatRoom not found " + req.params.chatroom
                });                
            }
            return res.status(500).send({
                message: "Error updating chatroom " + req.params.chatroom
            });
        }

};


//Retreive ChatRoom messages (get)
exports.getMessages = (req: Request, res: Response) => {
    // Validate request
    if(!req.body.currentUser || !req.params.chatroom) {
        return res.status(400).send({
            message: "Missing fields"
        });
    }
    
    console.log('%O', req.body);
    console.log('%O', req.params);

    try {
        const data: String = ChatRoom.findOne({name: req.params.chatroom})
        res.send(data);
    } catch(e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving chatroom data."
        });
    }
};


//Update ChatRoom message (update/put/patch)
//Delete ChatRoom (delete)
//Delete ChatRoom message (delete)
//Delete/Remove User from ChatRoom (delete)
//Retrieve Chatroom users (get)

