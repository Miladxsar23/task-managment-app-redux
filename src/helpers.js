export function fakeAnalyticsApi(eventType, data) {
  return new Promise((resolve, reject) => {
    resolve("success!");
  });
}
