const express = require("express");
const router = express.Router();
const getResponse = require("../controllers/chatBotReply");
const verifyToken = require("../middleware/authMiddleware");
const Messages = require("../models/messagesModel");

router.get("/fetch-messages", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const chat = await Messages.findOne({ userId });
    if(!chat) {
      return res.status(200).json([]);
    }
    return res.status(200).json(chat.messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error fetching chat" });
  }
});

router.post("/chatbot-reply", verifyToken, async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "please send a prompt." });
  }
  const userId = req.userId;
  const chat = await Messages.findOne({ userId });
  let savedChat;
  if (!chat) {
    const newChat = new Messages({
      userId,
      messages: [{ role: "user", content: prompt }],
    });
    savedChat = await newChat.save();
  } else {
    chat.messages.push({ role: "user", content: prompt });
    savedChat = await chat.save();
  }
  const filteredMessages = savedChat.messages.map(({ role, content }) => ({
    role,
    content,
  }));
  const reply = await getResponse(filteredMessages);
  if (reply.error) {
    savedChat.messages.pop();
    await savedChat.save();
    return res.status(500).json({ error: reply.error });
  }
  savedChat.messages.push({ role: "assistant", content: reply });
  await savedChat.save();
  res.status(200).json({ reply });
});

module.exports = router;
