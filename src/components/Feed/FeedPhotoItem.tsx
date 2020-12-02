import React from 'react';
import { PhotoProps } from './FeedPhotos';
import styles from '../../styles/FeedPhotoItem.module.css';

interface PhotoItemProps {
  photo: PhotoProps;
}

const FeedPhotosItem: React.FC<PhotoItemProps> = ({ photo }) => {
  return (
    <li className={styles.photo}>
      <img src={photo.src} alt={photo.title} />
      <span className={styles.acessos}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
