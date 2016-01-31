import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './noteCreator.css';
import { bindComponentFunction } from '../../behavioral/util.es6';

class NoteCreator extends React.Component {
    constructor() {
        super();
        bindComponentFunction.call(this, 'onSubmit');
    }

    onSubmit(e) {
        e.preventDefault();

        const noteText = this.noteTextEl.value;
        if (noteText) {
            this.props.onCreateFunction(noteText);
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div styleName="inputs-container">
                    <textarea styleName="text-area" ref={(ref) => this.noteTextEl = ref} />
                </div>
                <button type="submit" styleName="note-it-button">Note It!</button>
            </form>
        );
    }
}

NoteCreator.propTypes = {
    onCreateFunction: React.PropTypes.func
};

export default CSSModules(NoteCreator, styles);
