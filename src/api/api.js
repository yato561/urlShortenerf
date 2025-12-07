import api from "./axiosClient";

export const get = async (endpoint) => {
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error(`GET ${endpoint} failed:`, err);
    throw err;
  }
};

export const post = async (endpoint, data) => {
  try {
    const res = await api.post(endpoint, data);
    return res.data;
  } catch (err) {
    console.error(`POST ${endpoint} failed:`, err);
    throw err;
  }
};

export const del = async (endpoint) => {
  try {
    const res = await api.delete(endpoint);
    return res.data;
  } catch (err) {
    console.error(`DELETE ${endpoint} failed:`, err);
    throw err;
  }
};

export const put = async (endpoint, data) => {
  try {
    const res = await api.put(endpoint, data);
    return res.data;
  } catch (err) {
    console.error(`PUT ${endpoint} failed:`, err);
    throw err;
  }
};