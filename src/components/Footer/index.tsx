import React from 'react';
import { ReactComponent as Dogs } from '../../assets/dogs-footer.svg';
import styles from '../../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Dogs />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
