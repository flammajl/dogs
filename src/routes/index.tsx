import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" element={<Home />} />
    <Route path="/login/*" element={<Login />} />
  </Switch>
);

export default Routes;
