import {
  takeLatest,
  call,
  put,
  delay,
  take,
} from "@redux-saga/core/effects";
import { channel } from "redux-saga";
import * as api from "./api";
function* rootSagas() {
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasks);
  yield takeLatesById(["TIMER_STARTED", "TIMER_STOPPED"], handleProgressTimer);
}

function* fetchTasks() {
  try {
    yield put({
      type: "REQUEST_STARTED",
    });
    yield delay(2000);
    const { data } = yield call(api.fetchTasks);
    yield put({
      type: "FETCH_TASKS_SUCCEED",
      payLoad: { tasks: data },
    });
  } catch (error) {
    yield put({
      type: "REQUEST_FAILED",
      payLoad: { error },
    });
  }
}

//handleProgressTimer
export function* handleProgressTimer({ type, payLoad }) {
  if (type === "TIMER_STARTED") {
    while (true) {
      yield delay(1000);
      yield put({
        type: "TIMER_INCREAMENT",
        payLoad: { taskId: payLoad.taskId },
      });
    }
  }
}

function* takeLatesById(actionType, saga) {
  let channelsMap = {};
  while (true) {
    const action = yield take(actionType);
    const { taskId } = action.payLoad;
    if (!channelsMap[taskId]) {
      channelsMap[taskId] = channel();
      yield takeLatest(channelsMap[taskId], saga);
    }
    yield put(channelsMap[taskId], action);
  }
}

export default rootSagas;
