import React from 'react';
import styles from './Header.module.css';
import Icon from '../../y18.gif';

export default function Header(){
    return (
        <header className="navbar navbar-expand-md navbar-dark bg-orange">
                <img src={Icon} alt="logo" className={styles.logo}/>
                <a href="/" className={styles.headerLink}>Top</a>
        </header>
    )
}