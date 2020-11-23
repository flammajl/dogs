import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserHeaderNav from './UserHeaderNav';
import styles from '../../../styles/UserHeader.module.css';

const UserHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case '/conta':
        setTitle('Feed');
        break;
      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;
      case '/conta/postar':
        setTitle('Poste sua foto');
        break;
      default:
        setTitle('Minha Conta');
    }
  }, [location]);
  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
