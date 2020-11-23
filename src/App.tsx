import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './routes';
import './styles/App.css';
import { AuthProvider } from './hooks/auth';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <Routes />
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
