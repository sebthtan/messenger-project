const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

const getUnreadMessages = (convo) => {
  let unreadMessages = 0
  for (let i = convo.messages.length - 1; i >= 0; i--) {
    const message = convo.messages[i]
    if (message.senderId === convo.otherUser.id && message.unread) {
      unreadMessages++;
    } else {
      return unreadMessages
    }
  }
  // this return is needed for new conversations
  return unreadMessages
}

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message, order: ["createdAt", "ASC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (convoJSON.otherUser.id in onlineUsers) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set property for latest message preview
      convoJSON.latestMessageText = convoJSON.messages[convoJSON.messages.length - 1].text;
      conversations[i] = convoJSON;
      
      // set property for notification count
      convoJSON.unreadCounter = getUnreadMessages(convoJSON)
    }
    
    // sort conversations so that most recently modified conversations appear at the top
    conversations.sort((a, b) => b.messages[b.messages.length - 1].createdAt - a.messages[a.messages.length - 1].createdAt)
    
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
