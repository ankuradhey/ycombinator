import React, { Component } from 'react';
import Moment from 'react-moment';
import styles from './News.module.css';

class News extends Component{
        constructor(props){
            super(props);
            this.state = {
                hidden: false,
                upvotes: 0
            }
        }

        render(){
            return(
                <dl className={`row ${this.props.evenOdd? styles.newsItemEven: styles.newsItemOdd}`}>
                        <span className={styles.serialNo}>{this.props.index}. </span> 
                        <span className={styles.upvotesCount}> {this.props.points} </span>
                        <button className={styles.upvote} type="button">&nbsp;</button>
                        <span className={styles.newsTitle}>{this.props.title} </span>
                        (<span className={styles.newsUrl}> {this.props.url}</span>)
                        <span className={styles.subdetails}> by </span>
                        <span className={styles.authorName}> {this.props.author}</span>
                        <Moment style={{padding:'0 10px'}} fromNow>{this.props.created_at}</Moment>
                        <button className={styles.newsTitle} type="button">[ hide ]</button>
                </dl>
            );
        }
}

export default News;