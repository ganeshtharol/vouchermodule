import axios from "axios";

/***************Common Post API***************/
export const CommonPostApi = async (body, url) => {
  try {
    const request = JSON.stringify(body);
    const res = await axios.post(url, request, { headers: { 'Content-Type': 'application/json' } });
    return res;
  } catch (results) {
    return results;
  }
};





