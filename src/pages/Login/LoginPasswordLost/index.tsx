import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErrors';

const LoginPasswordLost: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const handleSubmit = useCallback(async ({ login }) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        login: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(
        { login },
        {
          abortEarly: false,
        },
      );

      const response = await api.post('/api/password/lost', {
        login,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      if (response.status === 200) setData(response.data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        formRef.current?.setErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className="animeLeft">
      <h1 className="title">Perdeu a senha ?</h1>
      {data ? (
        <p>{data}</p>
      ) : (
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input label="E-mail / Usuário" name="login" type="text" />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button type="submit">Enviar E-mail</Button>
          )}
        </Form>
      )}
    </section>
  );
};

export default LoginPasswordLost;
