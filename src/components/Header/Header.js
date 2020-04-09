import React from 'react';
import Icon from '../../y18.gif';

export default function Header(){
    return (
        <header className="navbar navbar-expand-md navbar-dark bg-orange">
                <img src={Icon} alt="logo" className="logo"/>
                <a href="/" className="headerLink">Top</a>
        </header>
    )
}