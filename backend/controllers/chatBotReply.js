const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function getResponse(prompt) {
  try {
    console.log(prompt);
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
}

module.exports = getResponse;
