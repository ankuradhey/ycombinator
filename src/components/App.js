import React, { Component } from 'react';
import Header from './Header/Header';
import News from './News/News';
import Footer from './Footer/Footer';

import Loader from '../loader.gif';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  news = {
    loading: false,
    data: [
            {
              objectID: "22800136",
              title: "Ask HN: What is your blog and why should I read it?",
              author: "jppope",
              url: "http://med.stanford.edu/news/all-news/2020/04/stanford-researchers-devise-treatment-that-relieved-depression-i.html",
              points: 594,
              created_at: "2020-04-07T03:33:56.000Z"
            }, 
            {
              objectID: "2280",
              title: "Ask HN: What is your blog and why should I read it?",
              author: "jppope",
              url: "http://med.stanford.edu/news/all-news/2020/04/stanford-researchers-devise-treatment-that-relieved-depression-i.html",
              points: 594,
              created_at: "2020-04-07T03:33:56.000Z"
            }
          ]
  };

  componentWillMount(){
    
  }
 
  render(){
    return (
        <div className="container">
          <Header />
          <div className="news-container container">
            {
              !this.news.loading && this.news.data.length ? (
                <div>
                  {
                    this.news.data.map((item, indx) => 
                      
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
          <Footer />
        </div>
    );
  }
}

export default App;
