import { combineReducers } from 'redux';
import news from './news'


const rootReducer = combineReducers({
    news: news,
})


export default rootReducer;