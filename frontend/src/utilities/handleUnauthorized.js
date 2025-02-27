export const handleUnauthorized = (data, navigate) => {
  if (data.unauthorized) {
    localStorage.removeItem("username");
    navigate("/Login");
    console.error(data.error);
    return true;
  }
  return false;
};
