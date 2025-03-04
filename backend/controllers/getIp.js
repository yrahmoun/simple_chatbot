const axios = require("axios");

const getLocalIp = async () => {
  try {
    const response = await axios.get("https://api64.ipify.org?format=json");
    const data = response.data;
    return data.ip;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getIp = async (req) => {
  let ip = req.socket.remoteAddress;
  if (ip === "::1") {
    ip = await getLocalIp();
  }
  if (ip.includes("::ffff:")) {
    ip = ip.split("::ffff:")[1];
  }
  return ip;
};

module.exports = getIp;
