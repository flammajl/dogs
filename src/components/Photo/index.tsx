import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import PhotoContent from './PhotoContent';
import { PhotoProps } from '../Feed/FeedPhotos';
import Loading from '../Loading';

const Photo: React.FC = () => {
  const [data, setData] = useState<PhotoProps>({} as PhotoProps);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getPhoto = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/photo/${id}`);
        setData(response.data.photo);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    getPhoto();
  }, [id]);

  if (!data) {
    return null;
  }

  if (loading) {
    <Loading />;
  }

  return (
    <section className="container mainContainer">
      {data && <PhotoContent data={data} single />}
    </section>
  );
};

export default Photo;
