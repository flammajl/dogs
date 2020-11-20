import React, { ButtonHTMLAttributes } from 'react';
import styles from '../../styles/Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button type="button" className={styles.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
