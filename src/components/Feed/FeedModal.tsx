import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { PhotoProps } from './FeedPhotos';
import styles from '../../styles/FeedModal.module.css';
import PhotoContent from '../Photo/PhotoContent';

export interface ModalPhotoProps {
  photo: PhotoProps;
  comments: {
    comment_ID: string;
    comment_author: string;
    comment_content: string;
  }[];
}

interface FeedModalProps {
  photo: PhotoProps;
}

export interface ModalHandles {
  openModal: () => void;
}

const FeedModal: React.ForwardRefRenderFunction<
  ModalHandles,
  FeedModalProps
> = ({ photo }, ref) => {
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  const handleOutsideClick = useCallback(e => {
    if (e.target === e.currentTarget) setVisible(false);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={styles.modal}
      onClick={handleOutsideClick}
      role="presentation"
    >
      <PhotoContent data={photo} />
    </div>
  );
};

export default forwardRef(FeedModal);
