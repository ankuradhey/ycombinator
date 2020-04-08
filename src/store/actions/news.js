import { FETCH_NEWS, LOAD_MORE_NEWS}  from './types';

export function fetchNews(){
    return {
        type: FETCH_NEWS
    }
}

export function loadMoreNews(page){
    return {
        type: LOAD_MORE_NEWS,
        page
    }
}