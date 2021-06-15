import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { Box } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import { SenderBubble, OtherUserBubble, } from "../ActiveChat";
import moment from "moment";
import TypingIndicator from './TypingIndicator'

const styles = {
  root: {
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    height: '70vh',
  }
};

const Messages = (props) => {
  const typingStatus = useSelector(state => state.conversations.find(
    (conversation) => conversation.otherUser.username === state.activeConversation).typingStatus)
  const { classes } = props
  const { messages, otherUser, userId } = props;

  return (
    <Box className={classes.root}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
      {typingStatus &&
        <TypingIndicator otherUser={otherUser} />
      }
    </Box>
  );
};

export default withStyles(styles)(Messages);
