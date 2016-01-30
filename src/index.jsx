import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './index.css';

class HelloWorld extends React.Component {
    render() {
        return <h1 styleName="app">Hello World</h1>;
    }
}

const App = CSSModules(HelloWorld, styles);

ReactDOM.render(<App />, document.getElementById('app'));
