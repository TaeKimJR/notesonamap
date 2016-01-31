import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './index.css';
import { bindComponentFunction } from './behavioral/util.es6';
import Header from './pageComponents/header/header.jsx';
import MapView from './pageComponents/mapView/mapView.jsx';
import NoteListItem from './pageComponents/notesView/noteListItem.jsx';
import NoteCreator from './pageComponents/notesView/noteCreator.jsx';

class App extends React.Component {
    constructor() {
        super();
        bindComponentFunction.call(this, 'viewNote', 'addNote', 'openNoteCreator',
            'closeNoteCreator');

        // MOCKED DATA
        const notes = [
            {
                id: 1,
                text: 'THIS IS SOME TEXT1',
                position: [51.505, -0.09]
            }
        ];

        this.state = {
            notes,
            creatingNote: false
        };
    }

    openNoteCreator() {
        this.setState({
            creatingNote: true
        });
    }

    closeNoteCreator() {
        this.setState({
            creatingNote: false
        });
    }

    addNote(text) {
        const newNote = {
            id: 9,
            text,
            position: [70, -1]
        };

        this.closeNoteCreator();
        this.setState({
            notes: this.state.notes.concat([newNote])
        });
    }

    viewNote(noteId) {
        const foundNote = _.find(this.state.notes, (note) => {
            return note.id === noteId;
        });

        console.log(foundNote.text);
    }

    render() {
        return (
            <div styleName="app-container">
                <div styleName="header-container">
                    <Header />
                </div>
                <div styleName="app-content-container">
                    <div styleName="mapView-container">
                        <button onClick={this.openNoteCreator}> TEST: Open Note Creator </button>
                        <MapView notes={this.state.notes} />
                    </div>
                    <div styleName="notesView-container">
                        {
                            this.state.creatingNote &&
                            <div styleName="note-creator">
                                <div styeName="close-button-container">
                                    <button
                                        styleName="close-button"
                                        onClick={this.closeNoteCreator}
                                    >
                                        x
                                    </button>
                                </div>
                                <div styleName="form-container">
                                    <NoteCreator onCreateFunction={this.addNote} />
                                </div>
                            </div>
                        }

                        <div styleName="notes-list">
                            {
                                this.state.notes.map((note) => {
                                    return (
                                        <NoteListItem
                                            key={note.id}
                                            note={note}
                                            viewNoteFunction={this.viewNote.bind(null, note.id)}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App = CSSModules(App, styles);

ReactDOM.render(<App />, document.getElementById('app'));
