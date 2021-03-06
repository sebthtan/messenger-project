const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require('sequelize')

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const conversation = await Conversation.findOne({
        where: {
          id: conversationId
        }
      })

      if (conversation.dataValues.user1Id !== req.user.id && conversation.dataValues.user2Id !== req.user.id) {
        return res.sendStatus(401)
      }

      const message = await Message.create({ senderId, text, conversationId, unread: true });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      if (req.user.id !== req.body.sender.id) {
        return res.sendStatus(401);
      }
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (sender.id in onlineUsers) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      unread: true,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put('/read', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const currentUserId = req.user.id;
    const { otherUserId } = req.body;
    const convo = await Conversation.findConversation(currentUserId, otherUserId)

    await Message.update(
      {
        unread: false
      }, {
      where: {
        [Op.and]: {
          senderId: otherUserId,
          conversationId: convo.id
        }
      },
    }
    )

    res.sendStatus(204)

  } catch (e) {
    next(e)
  }
})

module.exports = router;
