import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Photo from '../components/Photo';
import Home from '../pages/Home';
import Login from '../pages/Login';
import User from '../pages/User';
import ProtectedRoute from './ProtectedRoute';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" element={<Home />} />
    <Route path="/login/*" element={<Login />} />
    <ProtectedRoute path="/conta/*" element={<User />} />
    <Route path="/foto/:id" element={<Photo />} />
  </Switch>
);

export default Routes;
