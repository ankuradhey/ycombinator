import { FETCH_NEWS, LOAD_MORE_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE}  from '../actions/types';


const news = (state = {}, action) => {
    switch(action.type){
        case FETCH_NEWS: 
            return {
                totalNews: 0,
                page: action.page || 0,
                data: [],
                ...state,
                loading: true,
                error: false,
            };
        case FETCH_NEWS_SUCCESS: 
            let news = action.data.data;
            const totalNews = state.data.length + news.length;
            const page = action.data.page + 1;

            return {
                ...state,
                data: [
                    ...state.data,
                    ...news
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