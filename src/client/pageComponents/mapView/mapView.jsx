import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './mapView.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import DrawControl from './drawControl.jsx';


class MapView extends React.Component {
    // TODO: default props?
    render() {
        return (
            <Map styleName="map" center={[0, 0]} zoom={2} minZoom={2}>
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
                    onCreateFunction={this.props.onMarkerCreate}
                />
                {
                    this.props.notes.map((note) => {
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
        );
    }
}

MapView.propTypes = {
    bounds: React.PropTypes.array,
    notes: React.PropTypes.array.isRequired,
    onMarkerCreate: React.PropTypes.func.isRequired
};

export default CSSModules(MapView, styles);
