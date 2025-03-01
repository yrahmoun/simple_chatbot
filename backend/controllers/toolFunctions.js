const axios = require("axios");

async function get_weather(location) {
  try {
    const response = await axios.get(`https://wttr.in/${location}?format=j1`);
    const data = response.data.current_condition[0];
    const area = response.data.nearest_area[0];
    const city = area.areaName[0].value;
    const country = area.country[0].value;
    const description = data.weatherDesc[0].value;
    const temp_C = data.temp_C;
    const temp_F = data.temp_F;
    const observationTime = data.localObsDateTime;
    const result = `The weaher in ${location} is ${description}, with a temperature of ${temp_C}°C (${temp_F}°F).
    Location: ${city}, ${country}.
    Observation time: ${observationTime}.`;
    return result;
  } catch (error) {
    console.error(error);
    return "failed to fetch the weather. Please try again.";
  }
}

module.exports = { get_weather };
