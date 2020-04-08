import { connect } from 'react-redux';
import App from '../components/App'
import { fetchNews, loadMoreNews, upvoteNews, hideNews } from '../store/actions/news';

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNews: () => dispatch(fetchNews()),
        loadMoreNews: (page) => dispatch(loadMoreNews(page)),
        upvoteNews: (newsId) => dispatch(upvoteNews(newsId)),
        hideNews: (newsId) => dispatch(hideNews(newsId))
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.news
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);