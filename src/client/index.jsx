import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './index.css';
import { bindComponentFunction } from './behavioral/util.es6';
import Header from './pageComponents/header/header.jsx';
import MapView from './pageComponents/mapView/mapView.jsx';
import NotesView from './pageComponents/notesView/notesView.jsx';


class App extends React.Component {
    constructor() {
        super();
        bindComponentFunction.call(this, 'viewNote', 'addNote');

        // MOCKED DATA
        const notes = [
            {
                id: 1,
                text: 'THIS IS SOME TEXT1'
            }
        ];

        this.state = {
            notes
        };
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
    }

    render() {
        return (
            <div styleName="app-container">
                <div styleName="header-container">
                    <button onClick={this.addNote.bind(null, 'RAWR')}> TEST: Add Note </button>
                    <Header />
                </div>
                <div styleName="app-content-container">
                    <div styleName="mapView-container">
                        <MapView />
                    </div>
                    <div styleName="notesView-container">
                        <NotesView notes={this.state.notes} viewNoteFunction={this.viewNote} />
                    </div>
                </div>
            </div>
        );
    }
}

App = CSSModules(App, styles);

ReactDOM.render(<App />, document.getElementById('app'));
