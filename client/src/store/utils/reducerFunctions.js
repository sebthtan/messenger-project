export const setConvosToStore = (state, conversations) => {
  const convosMap = {}
  const newState = state.map(convo => {
    convosMap[convo.id] = convo
    const convoCopy = { ...convo }
    return convoCopy
  })

  conversations.forEach(convo => {
    if (Object.keys(convosMap).includes(convo.id.toString())) {
      newState[newState.indexOf(convosMap[convo.id])] = convo
    } else {
      newState.push(convo)
    }
  })

  return newState
}

export const addMessageToStore = (state, payload) => {
  const { message, sender, activeConvo } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };

    if (message.senderId === newConvo.otherUser.id) {
      newConvo.unreadCounter = 1;
    }

    newConvo.latestMessageText = message.text;

    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;

      if (message.senderId === convoCopy.otherUser.id && activeConvo !== convoCopy.otherUser.username) {
        convoCopy.unreadCounter++;
      }

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const markStoreMessagesRead = (state, recipientId) => {
  return state.map(convo => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo }
      convoCopy.messages.forEach(message => message.unread = false)
      convoCopy.unreadCounter = 0
        return convoCopy
    } else {
      return convo
    }
  })
}

export const changeConvoTypingStatus = (state, payload) => {
  const { sender, isTyping } = payload
  return state.map(convo => {
    if (convo.otherUser.id === sender.id) {
      const convoCopy = { ...convo }
      convoCopy.typingStatus = isTyping
      return convoCopy
    } else {
      return convo
    }
  })
}
