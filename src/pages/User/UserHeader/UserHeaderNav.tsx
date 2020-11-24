import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { ReactComponent as MinhasFotos } from '../../../assets/feed.svg';
import { ReactComponent as Estatísticas } from '../../../assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../../assets/adicionar.svg';
import { ReactComponent as Sair } from '../../../assets/sair.svg';
import styles from '../../../styles/UserHeaderNav.module.css';
import useMedia from '../../../hooks/media';

const UserHeaderNav: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { SignOut } = useAuth();

  const mobile = useMedia('(max-width: 50rem)');

  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
        />
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
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
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
