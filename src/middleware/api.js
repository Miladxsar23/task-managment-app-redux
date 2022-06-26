import axios from "axios";
export const CALL_API = "CALL_API";
const API_BASE_URL = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };
function makeCall(endpoint, method = "GET", body) {
  const url = `${API_BASE_URL}${endpoint}`;
  const params = {
    method,
    url,
    data: body,
    headers,
  };
  return axios(params)
    .then((resp) => {
      return resp;
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
  makeCall(callApi.endpoint, callApi.method, callApi.body)
    .then((resp) => {
      setTimeout(() => {
        next({
          type: successType,
          payLoad: resp.data,
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