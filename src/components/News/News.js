import React, { Component } from 'react';
import Moment from 'react-moment';
import styles from './News.module.css';

class News extends Component{
        constructor(props){
            super(props);
            this.upvoteNews = this.upvoteNews.bind(this);
            this.hideNews = this.hideNews.bind(this);
        }

        upvoteNews(){
            this.props.upvoteNews(this.props.objectID);
        }

        hideNews(){
            this.props.hideNews(this.props.objectID);
        }


        render(){
            return(
                 !this.props.hidden ? (<dl className={`row ${this.props.evenOdd? styles.newsItemEven: styles.newsItemOdd}`} >
                        <span className={`${styles.serialNo}`}>{this.props.index}. </span> 
                        <span className={`${styles.upvotesCount}`}> {this.props.points} </span>
                        <button className={`${styles.upvote}`} onClick={this.upvoteNews} type="button">&nbsp;</button>
                        <span className={`${styles.newsTitle}`}>{this.props.title && this.props.title.substring(0, 50)} </span>
                        <span className={`d-md-none d-lg-inline  ${styles.newsUrl}`}> ({this.props.url && this.props.url.substring(0,300)})</span>
                        <span className={`${styles.subdetails}`}> by </span>
                        <span className={`${styles.authorName}`}> {this.props.author}</span>
                        <Moment style={{padding:'0 10px'}} fromNow>{this.props.created_at}</Moment>
                        <button className={`${styles.newsTitle}`} type="button" onClick={this.hideNews}>[ hide ]</button>
                </dl>) : "" 
            );
        }
}

export default News;