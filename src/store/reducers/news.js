import { FETCH_NEWS, LOAD_MORE_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE}  from '../actions/types';


const news = (state = {}, action) => {
    switch(action.type){
        case FETCH_NEWS: 
            return {
                ...state,
                loading: true,
                error: false,
                totalNews: 0,
                page: 1
            };
        case FETCH_NEWS_SUCCESS: 
            let news = action.payload;
            const totalNews = state.news.length + news.length;
            const page = state.page + 1;

            return {
                ...state,
                news: [
                    ...state.news,
                    news
                ],
                loading: false,
                error: false,
                totalNews,
                page
            };
        case FETCH_NEWS_FAILURE: 

            return {
                ...state,
                loading:false,
                error: true
            };
        case LOAD_MORE_NEWS: 

            return {
                ...state,
                loading: true,
                error: false
            }

        default: 
            return state;
        
    }
}

export default news;