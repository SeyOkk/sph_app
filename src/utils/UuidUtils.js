import { v4 as uuidV4 } from "uuid";

// 从本地存储中获取uuid
export const getUuidByLocalStorage = () => {
  let userToken = localStorage.getItem("USER_TOKEN");
  if (!userToken) {
    userToken = uuidV4();
    localStorage.setItem("USER_TOKEN", userToken);
  }
  return userToken;
};
