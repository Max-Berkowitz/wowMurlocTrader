import app from './app/index';

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('listening on port: ', PORT));
