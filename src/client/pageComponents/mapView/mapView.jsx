import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './mapView.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


class MapView extends React.Component {
    render() {
        const position = [51.505, -0.09];
        return (
            <Map styleName="map" center={position} zoom={13}>
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                />
                {
                    this.props.notes.map((note) => {
                        return (
                            <Marker key={note.id} position={note.position}>
                                <Popup>
                                    <pre>{note.text}</pre>
                                </Popup>
                            </Marker>
                        );
                    })
                }
            </Map>
        );
    }
}

MapView.propTypes = {
    notes: React.PropTypes.array.isRequired
};

export default CSSModules(MapView, styles);
