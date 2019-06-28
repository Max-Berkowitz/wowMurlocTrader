import express, { static as serve } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import routeHTML from './routeHTML';
import template from './template';
import api from './api/index';

const config = process.env.NODE_ENV === 'production' ? process.env : require('../../config/config');

const app = express();

app.disable('x-powered-by');

app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // one hour
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/dist', serve(`${__dirname}/../../client/dist/`));

app.use('/favicon.ico', serve(`${__dirname}/../favicon/favicon.ico`));

app.use('/api', api);

app.get('*', (req, res) => {
  const html = routeHTML(req.url);
  res.send(template(html));
});

export default app;
