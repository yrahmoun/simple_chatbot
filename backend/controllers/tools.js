const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the current weather for a location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city that the user wants a location of",
          },
        },
        required: ["location"],
      },
    },
  },
];

module.exports = tools;
