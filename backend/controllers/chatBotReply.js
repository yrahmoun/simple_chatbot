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
    return { error: "failed toget a response" };
  }
}

async function getModels() {
  try {
    const response = await groq.models.list();
    const models = response.data.map(({ id, owned_by }) => ({ id, owned_by }));
    return models;
  } catch (error) {
    console.error("Error fetching models:", error);
    return null;
  }
}

module.exports = { getResponse, getModels };
