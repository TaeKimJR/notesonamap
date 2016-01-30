import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './notesView.css';


class NotesView extends React.Component {
    render() {
        return (
            <div styleName="notesView-container">
                NOTES VIEW
            </div>
        );
    }
}

export default CSSModules(NotesView, styles);
