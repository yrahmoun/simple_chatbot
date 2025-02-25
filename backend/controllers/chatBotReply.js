const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function getResponse(messages) {
  try {
    const response = await groq.chat.completions.create({
      messages: messages,
      model: "llama3-70b-8192",
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response:", error);
    return {error: "failed toget a response"};
  }
}

module.exports = getResponse;
