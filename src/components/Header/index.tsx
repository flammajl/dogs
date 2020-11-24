import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Dogs } from '../../assets/dogs.svg';
import { useAuth } from '../../hooks/auth';
import styles from '../../styles/Header.module.css';

const Header: React.FC = () => {
  const { user } = useAuth();
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {user ? (
          <Link className={styles.login} to="/conta">
            {user.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
