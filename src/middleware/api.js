import axios from "axios";
export const CALL_API = "CALL_API";
const API_BASE_URL = "http://localhost:3001";
function makeCall(endpiont) {
  const url = `${API_BASE_URL}${endpiont}`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((failure) => {
      return failure;
    });
}
const apiMiddleware = (store) => (next) => (action) => {
  const callApi = action[CALL_API];
  if (typeof callApi === "undefined") return next(action);
  const [requestStartedType, successType, failureRype] = callApi.types;

  next({ type: requestStartedType });
  makeCall(callApi.endpiont)
    .then((resp) => {
      setTimeout(() => {
        next({
          type: successType,
          payLoad: { tasks: resp.data },
        });
      }, 2000);
    })
    .catch((error) => {
      next({
        type: failureRype,
        payLoad: { error },
      });
    });
};
export default apiMiddleware;
