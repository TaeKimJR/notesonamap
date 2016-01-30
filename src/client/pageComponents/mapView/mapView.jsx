import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './mapView.css';


class MapView extends React.Component {
    render() {
        return (
            <div styleName="mapView-container">
                MAP VIEW
            </div>
        );
    }
}

export default CSSModules(MapView, styles);
