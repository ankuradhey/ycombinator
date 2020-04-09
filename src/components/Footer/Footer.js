import React from 'react';

export default function Footer(props){

    function loadMore(){
        props.loadMoreNews(props.page)
    }

    return (
        <footer className="footer">
                <button className="moreButton" type="button" onClick={loadMore}>More</button>
        </footer>
    )
}