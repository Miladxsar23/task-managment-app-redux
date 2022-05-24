import { put, call, takeLatest, takeEvery, delay } from "redux-saga/effects";
import * as api from "./api";
//generate watchers
function* rootSaga() {
  //define watcher
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasks);
  yield takeEvery("TIMER_STARTED", handleProgressTimer);
}
//watcher is subProgram.They are executed when an particular action of the dispatched
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

// handleProgressTimer
function* handleProgressTimer({ payLoad }) {
  while (true) {
    yield delay(1000)
    yield put({
      type: "TIMER_INCREAMENT",
      payLoad: { taskId: payLoad.taskId },
    });
  }
}
export default rootSaga;
