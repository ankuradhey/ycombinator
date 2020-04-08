import { all } from 'redux-saga/effects';
import newsSaga, { moreNewsSaga } from './news'

export default function* rootSaga() {
    yield all([
        newsSaga(),
        moreNewsSaga()
    ]);
}