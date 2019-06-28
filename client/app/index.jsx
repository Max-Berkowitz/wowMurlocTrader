import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routeOptions from './routes'; // eslint-disable-line

const routes = routeOptions.map(({ path, component, exact }) => (
  <Route key={`${Math.random()}ROUTE_`} exact={exact} path={path} component={component} />
));

export default () => <Switch>{routes}</Switch>;
