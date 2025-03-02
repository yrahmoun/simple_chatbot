const Groq = require("groq-sdk");
const tools = require("./tools");
const functions = require("./toolFunctions");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const handleToolCall = async (result, messages, botModel) => {
  const tool = result.tool_calls[0];
  const functionName = tool.function.name;
  const argument_object = JSON.parse(tool.function.arguments);
  if (functions[functionName]) {
    const functionResponse = await functions[functionName](argument_object);
    messages.push({
      role: "tool",
      tool_call_id: tool.id,
      name: functionName,
      content: functionResponse,
    });
    try {
      const secondResponse = await groq.chat.completions.create({
        model: botModel,
        messages: messages,
      });
      return secondResponse.choices[0].message.content;
    } catch (error) {
      console.error(error);
      return "failed to execute prompt. Please try again.";
    }
  }
  return "failed to execute prompt. Please try again.";
};

async function getResponse(messages, botModel) {
  try {
    const response = await groq.chat.completions.create({
      messages: messages,
      model: botModel,
      tools: tools,
      tool_choice: "auto",
    });
    const result = response.choices[0].message;
    if (result.tool_calls) {
      const toolResponse = await handleToolCall(result, messages, botModel);
      return toolResponse;
    }
    return result.content;
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
