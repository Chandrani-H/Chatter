import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    // padding: theme.spacing(3),
    margin: theme.spacing(3),
    width: '100%',
  },
  contentPaper: {
    padding: theme.spacing(3),
    // margin: theme.spacing(3),
    // width: '100%',
  },
  chatarea: {
    height: '70vh',
    padding: theme.spacing(3),
    width: "100%",
    display: "flex" 
  },
  chatTextfeild: {
    display: "flex",
    // margin: theme.spacing(3),
  },
  
  bubble: {
    border: "0.5px solid black",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    // display: "inline-block"
  }
});


 
class ClippedDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openedChat: "MyChat",
      messages: ["test message 1", "test message 2"], // TODO : Make this an array of JSON maybe?
      inputMessage: "",
    };

    // This binding is necessary to make `this` work in the callback
    this.createChatClick = this.createChatClick.bind(this);
    this.openChatClick = this.openChatClick.bind(this);
    this.trachClick = this.trachClick.bind(this);
    this.renderChat = this.renderChat.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChangeMessgeFeild = this.handleChangeMessgeFeild.bind(this);
  }


  createChatClick() {
    console.log("createChatClick Clicked!")
    // TODO : Add backend code to create chat here
  }

  openChatClick(chatName) {
    console.log("openChatClick Clicked!", chatName)

    this.setState({
      openedChat: chatName
    })

    // TODO : Add backend code to fetch messages here

    // use following to set messages
    // Remove ...prevState.messages to not add old messages back here
    this.setState(prevState => ({
      messages: [...prevState.messages, "You have opened " + chatName]
    }))
  }

  trachClick() {
    console.log("trachClick Clicked!")
    // TODO : Add backend code to trash chat here
  }

  renderChat() {    
    const { classes } = this.props;

    // You can find the open chat name in this.state.openedChat
    return (
      <div>
        {this.state.messages.length>0?
          this.state.messages.map((value, index) => {
            // TODO : Return a bubble here?
            return <div key={index} className={classes.bubble}>
              <Typography>{value}</Typography>
            </div>
          }):
          <div>No messages yet</div>
        }
      </div>
    )
  }

  sendMessage(){
    console.log("Sending message", this.state.inputMessage);
    // TODO : send message here
  }

  handleChangeMessgeFeild = (event) => {
    // This is called when ever the text feild value is changed
    // we take this and put it into state.inputMessage
    // state.inputMessage is then used in sendMessage to send the message
    console.log(event.target.value)
    this.setState({
      inputMessage: event.target.value
    })
  };

  render() {
    const { classes } = this.props;


    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Chatter
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {['MyChat', 'Chat2', 'Chat3', 'Anon'].map((text, index) => (
                <ListItem button key={index} onClick={() => {this.openChatClick(text)}}>
                  <ListItemIcon>{<MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Create chat'].map((text, index) => (
                <ListItem button key={index} onClick={this.createChatClick}>
                  <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <List>
              {['Trash'].map((text, index) => (
                <ListItem button key={index} onClick={this.trachClick}>
                  <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>

        
        <div className={classes.content}>
          <Toolbar />
          <Paper className={classes.contentPaper}>

          {
            // Tertinary operator checking if the openedChat is set empty
            // If it is set empty, it shows the Welcome text
            this.state.openedChat === ""?
            <div>
              <Typography variant="h1">Welcome to Chatter</Typography>
              <Typography variant="subtitle1">Select a chat <u>on the left</u> or <b>Create new</b> to start talking</Typography>
            </div>:
            <div>
              <h1>{this.state.openedChat}</h1>

              {/* If the opened chat is not empty, it calls the renderChat function with the open*/}
              <div className={classes.chatarea}>
                {this.renderChat()}
              </div>
              <div className={classes.chatTextfeild}>
                <TextField 
                  fullWidth id="outlined-basic"
                  variant="outlined"
                  style={{flexGrow: "1", marginRight: "15px"}}
                  value={this.state.inputMessage}
                  onChange={this.handleChangeMessgeFeild}

                  onKeyUp={(event) => {
                    // Lamda function to call sendMessage() when enter key is lifted up
                    if (event.key== 'Enter')
                        this.sendMessage();
                  }}
                />
                <Button variant="contained" color="primary" onClick={this.sendMessage}>Send</Button>
              </div>

            </div>
          }
        </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ClippedDrawer);