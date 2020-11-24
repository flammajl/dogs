import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErros from '../../../utils/getValidationErrors';
import styles from '../../../styles/UserPhotoPost.module.css';
import api from '../../../services/api';

interface PostPhotoData {
  nome: string;
  peso: string;
  idade: string;
}

interface ImgData {
  preview: string;
  raw: File;
}

const UserPhotoPost: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [img, setImg] = useState({} as ImgData);
  const navigate = useNavigate();

  useEffect(() => {
    if (responseData) navigate('/conta');
  }, [responseData, navigate]);

  const handleSubmit = useCallback(
    async (data: PostPhotoData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          peso: Yup.number()
            .required('Peso obrigatório')
            .positive('Valor tem que ser maior que 0')
            .typeError('Campo é obrigatório e tem o formato numérico'),
          idade: Yup.number()
            .required('Idade obrigatória')
            .positive('Valor tem que ser maior que 0')
            .typeError('Campo é obrigatório e tem o formato numérico'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = new FormData();

        formData.append('img', img.raw);
        formData.append('nome', data.nome);
        formData.append('peso', data.peso);
        formData.append('idade', data.idade);

        const token = localStorage.getItem('@Dogs:token');

        const response = await api.post('/api/photo', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResponseData(response.data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
      } finally {
        setLoading(false);
      }
    },
    [img.raw],
  );

  const handleImgChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.files) {
        setImg({
          preview: URL.createObjectURL(target.files[0]),
          raw: target.files[0],
        });
      }
    },
    [],
  );

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" />
        <Input label="Peso" type="text" name="peso" />
        <Input label="Idade" type="text" name="idade" />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />

        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button type="submit">Enviar</Button>
        )}
      </Form>

      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          />
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
