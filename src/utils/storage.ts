import { validatenull } from "@/utils/validate";
import config from "@/config";

const keyName = config.key + "-";

export const setCookie = (name: string, value: any, date = 300) => {
  const expires = new Date();
  name = keyName + name;
  expires.setTime(expires.getTime() + date * 24 * 60 * 60 * 1000);
  // path = path == "" ? "" : ";path=" + path;
  document.cookie =
    name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
};
/**
 *
 * @param {获取cookie值} name
 * @returns
 */
export const getCookieValue = (name: string) => {
  name = keyName + name;

  //读cookie属性，这将返回文档的所有cookie
  const allcookies = document.cookie;
  //查找名为name的cookie的开始位置
  name += "=";
  const pos = allcookies.indexOf(name);
  //如果找到了具有该名字的cookie，那么提取并使用它的值
  if (pos != -1) {
    //如果pos值为-1则说明搜索"version="失败
    const start = pos + name.length; //cookie值开始的位置
    let end = allcookies.indexOf(";", start); //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
    if (end == -1) {
      end = allcookies.length;
    } //如果end值为-1说明cookie列表里只有一个cookie
    const value = allcookies.substring(start, end); //提取cookie的值
    return value; //对它解码
  } else {
    return ""; //搜索失败，返回空字符串
  }
};
/**
 *
 * @param {删除cookie} name
 * @param {项目} path
 */
export const deleteCookie = (name: string, path = "/") => {
  name = keyName + name;

  const expires = new Date(0);
  path = path == "" ? "" : ";path=" + path;
  document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
};
/**
 * 存储localStorage
 */
export const setStore = (params: any) => {
  let { name, content, type } = params;
  name = keyName + name;
  const obj = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime()
  };

  if (type) {
    window.sessionStorage.setItem(name, JSON.stringify(obj));
  } else {
    window.localStorage.setItem(name, JSON.stringify(obj));
  }
};
/**
 * 获取localStorage
 */

export const getStorage = (params: any) => {
  let { name, debug } = params;
  name = keyName + name;
  let obj: any = {};
  let content;
  obj = window.sessionStorage.getItem(name);
  if (validatenull(obj)) obj = window.localStorage.getItem(name);
  if (validatenull(obj)) return;
  try {
    obj = JSON.parse(obj);
  } catch (e) {
    return obj;
  }
  if (debug) {
    return obj;
  }
  if (obj.dataType === "string") {
    content = obj.content;
  } else if (obj.dataType === "number") {
    content = Number(obj.content);
  } else if (obj.dataType === "boolean") {
    content = eval(obj.content);
  } else if (obj.dataType === "object") {
    content = obj.content;
  }
  return content;
};
/**
 * 删除localStorage
 */
export const removeStorage = (params: any) => {
  let { name } = params;
  name = keyName + name;
  window.sessionStorage.removeItem(name);
  window.localStorage.removeItem(name);
};

/**
 * 获取全部localStorage
 */
export const getAllStorage = (params: any) => {
  const list = [];
  const { type } = params;
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStorage({
          name: window.sessionStorage.key(i),
          type: "session"
        })
      });
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStorage({
          name: window.localStorage.key(i)
        })
      });
    }
  }
  return list;
};

/**
 * 清空全部localStorage
 */
export const clearStorage = () => {
  window.sessionStorage.clear();
  window.localStorage.clear();
};
