import React, { useCallback, useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import styles from '../../styles/FeedPhotos.module.css';
import stylesPhotoItem from '../../styles/FeedPhotoItem.module.css';
import FeedModal, { ModalHandles } from './FeedModal';

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
  const [modalPhoto, setModalPhoto] = useState<PhotoProps>({} as PhotoProps);

  const modalRef = useRef<ModalHandles>(null);
  const handleClick = useCallback((photo: PhotoProps) => {
    if (photo) {
      setModalPhoto(photo);
      modalRef.current?.openModal();
    }
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await api.get('/api/photo/?_page=1&_total=6&_user=0');
      setData(response.data);
    };
    fetchPhotos();
  }, []);

  return (
    <>
      {modalPhoto && <FeedModal photo={modalPhoto} ref={modalRef} />}

      <ul className={`${styles.feed} animeLeft`}>
        {data.map(photo => (
          <li
            className={stylesPhotoItem.photo}
            onClick={() => {
              handleClick(photo);
            }}
            role="presentation"
            key={photo.id}
          >
            <img src={photo.src} alt={photo.title} />
            <span className={stylesPhotoItem.acessos}>{photo.acessos}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FeedPhotos;
