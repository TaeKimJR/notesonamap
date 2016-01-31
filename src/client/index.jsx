import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './index.css';
import { bindComponentFunction } from './behavioral/util.es6';
import Header from './pageComponents/header/header.jsx';
import MapView from './pageComponents/mapView/mapView.jsx';
import NoteListItem from './pageComponents/notesView/noteListItem.jsx';


class App extends React.Component {
    constructor() {
        super();
        bindComponentFunction.call(this, 'viewNote', 'addNote', 'openNoteCreator', 'closeNoteCreator');

        // MOCKED DATA
        const notes = [
            {
                id: 1,
                text: 'THIS IS SOME TEXT1'
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
            text
        };

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
                    <button onClick={this.openNoteCreator}> TEST: Open Note Creator </button>
                    <button onClick={this.addNote.bind(null, 'RAWR')}> TEST: Add Note </button>
                    <Header />
                </div>
                <div styleName="app-content-container">
                    <div styleName="mapView-container">
                        <MapView />
                    </div>
                    <div styleName="notesView-container">
                        {
                            this.state.creatingNote &&
                            <div styleName="note-creator">
                                RAWR
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
