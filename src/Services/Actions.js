import axios from "axios";

/***************Common Post API***************/
export const AuthApi = async (body, url) => {
  try {
    const request = JSON.stringify(body);
    const res = await axios.post(url, request, { headers: { 'Content-Type': 'application/json' } });
    return res;
  } catch (results) {
    return results;
  }
};

/***************Common Post API***************/
export const CommonApi = async (body, url) => {
  const token = localStorage.getItem('token');
  try {
    const request = JSON.stringify(body);
    const res = await axios.post(url, request, { headers: { 'Content-Type': 'application/json','x-access-token': token } });
    return res;
  } catch (results) {
    return results;
  }
};





