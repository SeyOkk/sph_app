export const setToken = (token) => localStorage.setItem("TOKEN", token);

export const getToken = () => localStorage.getItem("TOKEN");

export const removeItem = (key) => localStorage.removeItem(key);

export const setUserInfo = (data) =>
  localStorage.setItem("USER", JSON.stringify(data));

export const getUser = () => JSON.parse(localStorage.getItem("USER"));
