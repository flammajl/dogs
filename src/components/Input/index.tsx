import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import styles from '../../styles/Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ label, name, type, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.wrapper}>
        <input
          ref={inputRef}
          defaultValue={defaultValue}
          id={name}
          className={styles.input}
          type={type}
          {...rest}
        />
        {error && (
          <div className="tooltip-error">
            <span>{error}</span>
            <FiAlertCircle className={styles.svg} color="#c53030" size={20} />
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
