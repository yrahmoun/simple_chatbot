const axios = require("axios");

async function get_trending_movies() {
  const base_url = "https://api.themoviedb.org/3/trending/movie/week";
  const tmdb_api_key = process.env.TMDB_API_KEY;

  try {
    const response = await axios.get(`${base_url}?api_key=${tmdb_api_key}`);
    const results = response.data.results;
    const movies_fetched = results.map(({ title, overview, vote_average }) => ({
      title,
      overview,
      vote_average,
    }));
    return JSON.stringify(movies_fetched);
  } catch (error) {
    console.error(error);
    return "failed to fetch movies";
  }
}

async function get_weather(location) {
  try {
    const encodedLocation = encodeURIComponent(location);
    const response = await axios.get(
      `https://wttr.in/${encodedLocation}?format=j1`
    );
    const data = response.data.current_condition[0];
    const area = response.data.nearest_area[0];
    const result = {
      current: data,
      locatonInfo: area,
    };
    return JSON.stringify(result);
  } catch (error) {
    console.error(error);
    return "failed to fetch the weather. Please try again.";
  }
}

async function get_user_info(ip) {
  const ip_geo_api = process.env.IP_GEO_API;
  const base_url = "https://api.ipgeolocation.io/ipgeo";

  if (!ip) {
    return "Failed to fetch data. please try again.";
  }
  try {
    const response = await axios.get(`${base_url}?apiKey=${ip_geo_api}&ip=${ip}`);
    return JSON.stringify(response.data);
  } catch (error) {
    console.error(error);
    return "Failed to fetch data. please try again.";
  }
}

module.exports = { get_weather, get_trending_movies, get_user_info };
