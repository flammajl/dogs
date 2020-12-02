import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import FeedPhotosItem from './FeedPhotoItem';
import styles from '../../styles/FeedPhotos.module.css';

export interface PhotoProps {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  acessos: string;
  idade: string;
  peso: string;
  total_comments: string;
}

const FeedPhotos: React.FC = () => {
  const [data, setData] = useState<PhotoProps[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await api.get('/api/photo/?_page=1&_total=6&_user=0');
      setData(response.data);
    };
    fetchPhotos();
  }, []);

  console.log(data);

  return (
    <ul className={`${styles.feed} animeLeft`}>
      {data.map(photo => (
        <FeedPhotosItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
};

export default FeedPhotos;
