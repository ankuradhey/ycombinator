import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  FETCH_NEWS,
  LOAD_MORE_NEWS,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "../actions/types";

export const getPage = (state) => state.page

const fetchNewsRequest = async (page) => {
  try {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?tags=front_page&page=${page}`
    );
    return response;
  } catch (e) {
    console.log("Request failure");
  }
};

function* fetchNews(loadMore) {
  try {
    let page = 0;
    if(loadMore){
        page = yield select(getPage);
    }
    const response = yield call(fetchNewsRequest, page);
    if (response.error) {
      yield put({ type: FETCH_NEWS_FAILURE, data: response.data });
    } else {
      yield put({ type: FETCH_NEWS_SUCCESS, data: response.data });
    }
  } catch (e) {
    yield put({ type: FETCH_NEWS_FAILURE, message: e.message });
  }
}

export default function* newsSaga() {
  yield takeLatest(FETCH_NEWS, fetchNews);
}

export function* moreNewsSaga() {
    yield takeLatest(LOAD_MORE_NEWS, fetchNews, true);
}
