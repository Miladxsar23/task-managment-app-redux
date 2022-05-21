import { fork, put, call, takeLatest } from "redux-saga/effects";
import * as api from "./api";
function* rootSaga() {
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasks);
}
function* fetchTasks() {
  try {
    yield put({
      type: "REQUEST_STARTED",
    });
    const { data } = yield call(api.fetchTasks);
    yield put({
      type: "FETCH_TASKS_SUCCEED",
      payLoad: { tasks: data },
    });
  } catch (e) {
    yield put({
      type: "REQUEST_FAILED",
      payLoad: { error: e.message },
    });
  }
}
export default rootSaga;
