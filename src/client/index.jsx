import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import _ from 'lodash';
import styles from './index.css';
import { bindComponentFunction } from './behavioral/util.es6';
import Header from './pageComponents/header/header.jsx';
import DrawControl from './pageComponents/mapView/drawControl.jsx';
import NoteListItem from './pageComponents/notesView/noteListItem.jsx';
import NoteCreator from './pageComponents/notesView/noteCreator.jsx';

class App extends React.Component {
    constructor() {
        super();
        bindComponentFunction.call(this, 'viewNote', 'addNote', 'openNoteCreator',
            'closeNoteCreator');

        this.state = {
            notes: [],
            temporaryNote: null,
            creatingNote: false
        };

        this.setMapRef = (ref) => {
            this.map = ref;
        };
    }

    componentDidMount() {
        fetch('/api/notes').then(res => res.json())
            .then((res) => {
                this.setState({
                    notes: res
                });
            });
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

        fetch('/api/notes/add', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(updatedNote)
        }).then(res => res.json())
            .then((res) => {
                this.closeNoteCreator();
                this.setState({
                    notes: this.state.notes.concat([res])
                });
            });
    }

    viewNote(noteId) {
        const foundNote = _.find(this.state.notes, (note) => {
            return note.id === noteId;
        });

        const map = this.map.getLeafletElement();
        const cM = map.project(foundNote.position);
        map.setView(map.unproject(cM), 8, { animate: true });
    }

    render() {
        const shownMarkers = this.state.creatingNote ?
            this.state.notes.concat([this.state.temporaryNote]) :
            this.state.notes;

        return (
            <div styleName="app-container">
                <div styleName="header-container">
                    <Header />
                </div>
                <div styleName="app-content-container">
                    <div styleName="mapView-container">
                        <Map
                            styleName="map"
                            ref={this.setMapRef}
                            center={[0, 0]}
                            zoom={2}
                            minZoom={2}
                            maxBounds={[[-100, 200], [100, -200]]}
                        >
                            <TileLayer
                                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                            />
                            <DrawControl
                                polygon={false}
                                rectangle={false}
                                polyline={false}
                                circle={false}
                                position="topright"
                                onCreateFunction={this.openNoteCreator}
                            />
                            {
                                shownMarkers.map((note) => {
                                    return (
                                        <Marker key={note.id} position={note.position}>
                                            {
                                                note.id !== -1 &&
                                                <Popup>
                                                    <pre>{note.text}</pre>
                                                </Popup>
                                            }
                                        </Marker>
                                    );
                                })
                            }
                        </Map>
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
