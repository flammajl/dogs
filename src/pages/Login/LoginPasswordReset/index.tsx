import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErrors';

const LoginPasswordReset: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const params = new URLSearchParams(window.location.search);

  const key = params.get('key');
  const login = params.get('login');

  const handleSubmit = useCallback(
    async ({ password }) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(
          { password },
          {
            abortEarly: false,
          },
        );

        const response = await api.post('/api/password/reset', {
          login,
          key,
          password,
        });
        if (response.status === 200) setReset(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
      } finally {
        setLoading(false);
      }
    },
    [key, login],
  );

  return (
    <section className="animeLeft">
      <h1 className="title">Resete a sua senha</h1>
      {reset ? (
        <p>Senha alterada, você já pode fazer login normalmente.</p>
      ) : (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input label="Nova Senha" type="password" name="password" />
          {loading ? (
            <Button disabled>Resetando...</Button>
          ) : (
            <Button type="submit">Resetar</Button>
          )}
        </Form>
      )}
    </section>
  );
};

export default LoginPasswordReset;
