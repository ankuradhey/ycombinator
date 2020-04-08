import React from 'react';
import styles from './Footer.module.css';

export default function Footer(){
    return (
        <footer className={styles.footer}>
                <button className={styles.moreButton} type="button">More</button>
        </footer>
    )
}