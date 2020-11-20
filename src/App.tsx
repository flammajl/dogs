import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './routes';
import './styles/App.css';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes />
    <Footer />
  </BrowserRouter>
);

export default App;
