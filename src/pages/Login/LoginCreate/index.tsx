import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErros from '../../../utils/getValidationErrors';
import { useAuth } from '../../../hooks/auth';
import styles from '../../../styles/LoginForm.module.css';
import api from '../../../services/api';

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

const LoginCreate: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { SignIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          username: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/api/user', {
          username: data.username,
          email: data.email,
          password: data.password,
        });

        if (response.status === 200)
          SignIn({ username: data.username, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
        // Adicionar toast de erro
      } finally {
        setLoading(false);
      }
    },
    [SignIn],
  );

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>

      <Form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Email" name="email" type="text" />
        <Input label="Senha" name="password" type="password" />

        {loading ? (
          <Button type="button">Cadastrando...</Button>
        ) : (
          <Button type="submit">Cadastrar</Button>
        )}
      </Form>
    </section>
  );
};

export default LoginCreate;
