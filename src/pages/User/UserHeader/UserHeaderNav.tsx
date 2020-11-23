import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { ReactComponent as MinhasFotos } from '../../../assets/feed.svg';
import { ReactComponent as Estatísticas } from '../../../assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../../assets/adicionar.svg';
import { ReactComponent as Sair } from '../../../assets/sair.svg';
import styles from '../../../styles/UserHeaderNav.module.css';

const UserHeaderNav: React.FC = () => {
  const [mobile, setMobile] = useState(null);
  const { SignOut } = useAuth();

  return (
    <nav className={styles.nav}>
      <NavLink to="" end activeClassName={styles.active}>
        <MinhasFotos />
        {mobile && 'Minhas Fotos'}
      </NavLink>
      <NavLink to="estatisticas" activeClassName={styles.active}>
        <Estatísticas />
        {mobile && 'Estatísticas'}
      </NavLink>
      <NavLink to="postar" activeClassName={styles.active}>
        <AdicionarFoto />
        {mobile && 'Adicionar Foto'}
      </NavLink>
      <button onClick={SignOut} type="button">
        {mobile && 'Sair'}
        <Sair />
      </button>
    </nav>
  );
};

export default UserHeaderNav;
