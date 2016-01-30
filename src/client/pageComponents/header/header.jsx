import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './header.css';


class Header extends React.Component {
    render() {
        return (
            <div styleName="header-container">
                <div styleName="title-container">
                    Notes on a Map, powered by Google Maps & Leaflet
                    <a href="" styleName="github-link">Check out the code on Github</a>
                </div>
            </div>
        );
    }
}

export default CSSModules(Header, styles);
