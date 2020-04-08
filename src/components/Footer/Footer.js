import React from 'react';
import styles from './Footer.module.css';

export default function Footer(props){

    function loadMore(){
        props.loadMoreNews(props.page)
    }

    return (
        <footer className={styles.footer}>
                <button className={styles.moreButton} type="button" onClick={loadMore}>More</button>
        </footer>
    )
}