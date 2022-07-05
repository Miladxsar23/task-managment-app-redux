import { fakeAnalyticsApi } from "../helpers";
const analytics = (store) => (next) => (action) => {
  if (!action || !action.meta || !action.meta.analytics) return next(action);
  const { event, data } = action.meta.analytics;
  fakeAnalyticsApi(event, data)
    .then((res) => console.log("recorded: ", event, data))
    .catch((failure) =>
      console.log(
        "an error occured whilte sending analytics",
        failure.toString()
      )
    );
  const result = next(action);
  return result;
};

export default analytics;
