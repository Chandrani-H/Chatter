import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(3),
    width: '100%',
  },
  chatarea: {
    height: '80vh',
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  function render() {
    const messages = [];//get messages
    return (
      <div>
        {messages.map((value, index) => {
          return <Typography key={index}>{value}</Typography>
        })}
      </div>
    )
  }

  // openChat = () => {
  //   console.log('test')
  // }

  // createChat = () => {
  //   console.log('test')
  // }

  // deleteChat = () => {

  // }

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
              <ListItem button key={text}>
                <ListItemIcon>{<MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Create chat'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <List>
            {['Trash'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <div className={classes.content}>
      <Toolbar />
      <div className={classes.chatarea}>
      <Typography>chat message</Typography>
      </div>
      <TextField id="outlined-basic" variant="outlined" style={{width: '95%'}}/>
      </div>
    </div>
  );
}
