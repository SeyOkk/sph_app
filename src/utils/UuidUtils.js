import { v4 as uuidV4 } from "uuid";

// 从本地存储中获取uuid
export const getUuidByLocalStorage = () => {
  let userToken = localStorage.getItem("temp_token");
  if (!userToken) {
    userToken = uuidV4();
    localStorage.setItem("temp_token", userToken);
  }
  return userToken;
};
