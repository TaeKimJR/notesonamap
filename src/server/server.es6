import express from 'express';
import path from 'path';

const APP_PORT = process.env.PORT || 8000;

const server = express();

server.use(express.static(path.resolve(__dirname, '../../public')));

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});
server.listen(APP_PORT, () => {
    // TODO: may not be localhost
    console.log(`======= App Server running on http://localhost:${APP_PORT}`); // eslint-disable-line no-console
});