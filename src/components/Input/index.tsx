import React, { InputHTMLAttributes } from 'react';
import styles from '../../styles/Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ label, name, type }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input id={name} className={styles.input} type={type} />
    </div>
  );
};

export default Input;
