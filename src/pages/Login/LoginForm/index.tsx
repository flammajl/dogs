import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErros from '../../../utils/getValidationErrors';
import { useAuth } from '../../../hooks/auth';

interface SignInFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { SignIn, loading } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          username: Yup.string().required('Nome obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        SignIn({ username: data.username, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [SignIn],
  );

  return (
    <section>
      <h1>Login</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Senha" name="password" type="password" />

        {loading ? (
          <Button disabled type="button">
            Carregando...
          </Button>
        ) : (
          <Button type="submit">Entrar</Button>
        )}
      </Form>
      <Link to="criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
