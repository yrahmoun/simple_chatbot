const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the weather of a location given by the user",
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
  {
    type: "function",
    function: {
      name: "get_trending_movies",
      description: "Get the current trending movies of the week.",
    },
  },
  {
    type: "function",
    function: {
      name: "get_user_info",
      description:
        "Get info about the user, including country,timezone and current time",
    },
  },
];

module.exports = tools;
