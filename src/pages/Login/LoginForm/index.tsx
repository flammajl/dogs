import React, { FormEvent, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';

const LoginForm: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const response = await api.post('/json/jwt-auth/v1/token', {
      username: nameInputRef.current?.value,
      password: passwordInputRef.current?.value,
    });
    console.log(response.data);
  }, []);

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Senha" name="password" type="password" />

        <Button type="submit">Entrar</Button>
      </form>
      <Link to="criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
