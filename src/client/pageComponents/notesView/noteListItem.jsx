import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './noteListItem.css';

class NoteListItem extends React.Component {
    render() {
        return (
            <div styleName="noteListItem">
                <img
                    styleName="pointImg"
                    src="images/point.png"
                    onClick={ this.props.viewNoteFunction.bind(null, this.props.note.id) }
                />
                <div styleName="noteText">{ this.props.note.text }</div>
            </div>
        );
    }
}

NoteListItem.propTypes = {
    note: React.PropTypes.object,
    viewNoteFunction: React.PropTypes.func
};

export default CSSModules(NoteListItem, styles);
