import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './routes';
import './styles/App.css';
import { AuthProvider } from './hooks/auth';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main className="AppBody">
          <Routes />
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </div>
);

export default App;
