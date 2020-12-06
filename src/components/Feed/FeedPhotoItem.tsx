import React, { useCallback, useRef } from 'react';
import { PhotoProps } from './FeedPhotos';
import stylesPhotoItem from '../../styles/FeedPhotoItem.module.css';
import { ModalHandles } from './FeedModal';

interface PhotoItemProps {
  photo: PhotoProps;
}

const FeedPhotosItem: React.FC<PhotoItemProps> = ({ photo }) => {
  const modalRef = useRef<ModalHandles>(null);
  const handleClick = useCallback(() => {
    modalRef.current?.openModal();
  }, []);
  return (
    <>
      <li
        className={stylesPhotoItem.photo}
        onClick={handleClick}
        role="presentation"
      >
        <img src={photo.src} alt={photo.title} />
        <span className={stylesPhotoItem.acessos}>{photo.acessos}</span>
      </li>
    </>
  );
};

export default FeedPhotosItem;
