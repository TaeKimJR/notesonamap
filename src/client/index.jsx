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
                text: 'HELLO WORLD',
                position: [0, 0]
            }
        ];

        this.state = {
            notes,
            temporaryNote: null,
            creatingNote: false
        };
    }

    openNoteCreator(markerLayer) {
        const temporaryNote = {
            id: -1,
            position: markerLayer.getLatLng()
        };
        this.setState({
            temporaryNote,
            creatingNote: true
        });
    }

    closeNoteCreator() {
        this.setState({
            temporaryNote: null,
            creatingNote: false
        });
    }

    addNote(text) {
        const updatedNote = this.state.temporaryNote;
        updatedNote.text = text;
        updatedNote.id = 2;

        // TODO: call to backend to add note

        this.closeNoteCreator();
        this.setState({
            notes: this.state.notes.concat([updatedNote])
        });
    }

    viewNote(noteId) {
        const foundNote = _.find(this.state.notes, (note) => {
            return note.id === noteId;
        });

        this.setState({
            center: foundNote.position
        });
    }

    render() {
        return (
            <div styleName="app-container">
                <div styleName="header-container">
                    <Header />
                </div>
                <div styleName="app-content-container">
                    <div styleName="mapView-container">
                        <MapView
                            bounds={this.state.bounds}
                            notes={
                                this.state.creatingNote ?
                                this.state.notes.concat([this.state.temporaryNote]) :
                                this.state.notes
                            }
                            onMarkerCreate={this.openNoteCreator}
                        />
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
