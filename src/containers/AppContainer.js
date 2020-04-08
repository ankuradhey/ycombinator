import { connect } from 'react-redux';
import App from '../components/App'
import { fetchNews, loadMoreNews, upvoteNews } from '../store/actions/news';

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNews: () => dispatch(fetchNews()),
        loadMoreNews: (page) => dispatch(loadMoreNews(page)),
        upvoteNews: (newsId) => dispatch(upvoteNews(newsId))
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.news
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);