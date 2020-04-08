import { call, put, take } from "redux-saga/effects";
import {
  FETCH_NEWS,
  LOAD_MORE_NEWS,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE
} from "../actions/types";

export const getPage = (state) => state.page

const fetchNewsRequest = async (page=0) => {
  try {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?tags=front_page&page=${page}`
    );
    const json = await response.json();
    return {data: json.hits, page: json.page}
  } catch (e) {
    console.log("Request failure");
  }
};

function* fetchNews(page = 0) {
  try {
    const response = yield call(fetchNewsRequest, page);
    if (response.error) {
      yield put({ type: FETCH_NEWS_FAILURE, data: response });
    } else {
      yield put({ type: FETCH_NEWS_SUCCESS, data: response });
    }
  } catch (e) {
    yield put({ type: FETCH_NEWS_FAILURE, message: e.message });
  }
}

export default function* newsSaga() {
  while(true){
    const { page = 0 } = yield take(FETCH_NEWS);
    yield call(fetchNews, page);
  }
}

export function* moreNewsSaga() {
  while(true){
    const {page} = yield take(LOAD_MORE_NEWS);
    yield put({type:FETCH_NEWS, page })
  }
}
