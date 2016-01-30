import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import Header from './pageComponents/header/header.jsx';
import MapView from './pageComponents/mapView/mapView.jsx';
import NotesView from './pageComponents/notesView/notesView.jsx';


class App extends React.Component {
    render() {
        return (
            <div styleName="app-container">
                <div styleName="header-container">
                    <Header />
                </div>
                <div styleName="app-content-container">
                    <div styleName="mapView-container">
                        <MapView />
                    </div>
                    <div styleName="notesView-container">
                        <NotesView />
                    </div>
                </div>
            </div>
        );
    }
}

App = CSSModules(App, styles);

ReactDOM.render(<App />, document.getElementById('app'));
