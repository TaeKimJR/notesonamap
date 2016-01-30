import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './notesView.css';
import NoteListItem from './noteListItem.jsx';


class NotesView extends React.Component {
    render() {
        return (
            <div styleName="notesView-container">
                <div styleName="notes-list">
                    {
                        this.props.notes.map((note) => {
                            return (
                                <NoteListItem
                                    key={note.id}
                                    note={note}
                                    viewNoteFunction={this.props.viewNoteFunction}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

NotesView.propTypes = {
    notes: React.PropTypes.arrayOf(React.PropTypes.object),
    viewNoteFunction: React.PropTypes.func
};

export default CSSModules(NotesView, styles);
