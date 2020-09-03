import axios from "axios";
import { API_USERNAME, API_PASSWORD, API_URL } from "../config";
import { encode } from "base-64";

const api = axios.create({
  baseURL: API_URL,
});
let token = "Basic " + encode(API_USERNAME + ":" + API_PASSWORD);
api.defaults.headers.common["Authorization"] = token;

export const registerUser = (payload) =>
  api.post(`/sign-up`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const loginUser = (payload) =>
  api.post(`/sign-in`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getCovidStatus = () => api.get(`covid-status`);

const apis = {
  registerUser,
  loginUser,
  getCovidStatus,
};

export default apis;
