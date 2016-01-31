export function bindComponentFunction(...methods) {
    if (this) {
        methods.forEach((method) => {
            this[method] = this[method].bind(this);
        });
    } else {
        throw new Error('Define context when using bindComponentFunction (call || apply)');
    }
}

export function isUndefined(toBeChecked) {
    return (typeof toBeChecked === 'undefined');
}
