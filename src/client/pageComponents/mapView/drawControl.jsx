import React from 'react';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';
import 'leaflet-draw';
import { isUndefined } from '../../behavioral/util.es6';

// https://github.com/Leaflet/Leaflet.draw
export default class DrawControl extends MapControl {
    componentWillMount() {
        this.leafletElement = new L.Control.Draw({
            position: this.props.position,
            draw: {
                polygon: !isUndefined(this.props.polygon) ? this.props.polygon : true,
                rectangle: !isUndefined(this.props.rectangle) ? this.props.rectangle : true,
                polyline: !isUndefined(this.props.polyline) ? this.props.polyline : true,
                circle: !isUndefined(this.props.circle) ? this.props.circle : true,
                marker: !isUndefined(this.props.marker) ? this.props.marker : true
            }
        });

        this.props.map.on('draw:created', (e) => {
            const layer = e.layer;

            if (this.props.onCreateFunction) {
                this.props.onCreateFunction(layer);
            }
        });
    }
}

DrawControl.propTypes = {
    polygon: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.object
    ]),
    rectangle: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.object
    ]),
    polyline: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.object
    ]),
    circle: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.object
    ]),
    marker: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.object
    ]),
    onCreateFunction: React.PropTypes.func
};