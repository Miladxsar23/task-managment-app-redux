import { channel } from "redux-saga";
import { take, put, call, takeLatest, delay } from "redux-saga/effects";
import * as api from "./api";
//generate watchers
function* rootSaga() {
  //define watcher
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasks);
  yield takeLatesById(["TIMER_STARTED", "TIMER_STOP"], handleProgressTimer);
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
function* handleProgressTimer({ type, payLoad }) {
  while (true) {
    if(type === "TIMER_STOP") break
    yield delay(1000)
    yield put({
      type: "TIMER_INCREAMENT",
      payLoad: { taskId: payLoad.taskId },
    });
  }
}

function* takeLatesById(actionType, saga) {
  let channelsMap = {}
  while(true) {
    const action = yield take(actionType)
    const {taskId} = action.payLoad
    if(!channelsMap[taskId]) {
      channelsMap[taskId] = channel()
      yield takeLatest(channelsMap[taskId], saga)
    }
    yield put(channelsMap[taskId], action)
  }
}
export default rootSaga;
