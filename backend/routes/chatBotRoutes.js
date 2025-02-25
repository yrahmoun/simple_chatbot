const express = require("express");
const router = express.Router();
const getResponse = require("../controllers/chatBotReply");

router.post("/chatbot-reply", async (req, res) => {
  const prompt = req.body.prompt;
  const reply = await getResponse(prompt);
  res.status(200).json({reply});
})

module.exports = router;