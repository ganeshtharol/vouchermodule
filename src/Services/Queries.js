import { useDispatch } from "react-redux";
import { setSuccessResponse, setUserResponse } from "../Reducer/mainReducer";
const Queries = () => {
  const dispatch = useDispatch();

  /***************Common Post API***************/
  const CommonPostApi = async (body, url) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      if (response.ok) {
        await setSuccessResponse(result, dispatch);
        await setUserResponse(result?.data, dispatch);
        localStorage.setItem("token", result?.data?.token)
      }
      else {
        await setSuccessResponse(result, dispatch);
        localStorage.setItem("token", '')
      }
    } catch (results) {
      if (!results.ok) {
        await setSuccessResponse({
          message: "Something went wrong"
        }, dispatch);
        localStorage.setItem("token", '')
      }
    }
  };

  return {
    CommonPostApi
  };
};

export default Queries

