import React, { Component } from 'react';
import Header from './Header/Header';
import News from './News/News';
import Footer from './Footer/Footer';

import Loader from '../loader.gif';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount(){
    this.props.fetchNews();
  }

 
  render(){
    return (
        <div className="container">
          <Header />
          <div className="news-container container">
            {
              !this.props.news.loading && this.props.news.data && this.props.news.data.length ? (
                <div>
                  {
                    this.props.news.data.map((item, indx) => 
                      
                      <News 
                        evenOdd={indx%2===0? true: false}
                        key={item.objectID}
                        index={indx+1}
                        upvoteNews={this.props.upvoteNews}
                        hideNews={this.props.hideNews}
                        { ...item }
                      />
                      
                    )
                  }
                </div>
              )
               : (
                <div className="loader"> <img src={Loader} alt="loader"/>  </div>
              )

            }
          </div>
          <Footer loadMoreNews={this.props.loadMoreNews} page={this.props.news.page}/>
        </div>
    );
  }
}

export default App;
