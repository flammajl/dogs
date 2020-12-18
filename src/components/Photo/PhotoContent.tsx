import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import styles from '../../styles/PhotoContent.module.css';
import Image from '../../utils/Image';
import { ModalPhotoProps } from '../Feed/FeedModal';
import { PhotoProps } from '../Feed/FeedPhotos';
import Loading from '../Loading';
import PhotoComments from './PhotoComments';
import PhotoDelete from './PhotoDelete';

interface PhotoContentProps {
  data: PhotoProps;
  single?: boolean;
}

const PhotoContent: React.FC<PhotoContentProps> = ({ data, single }) => {
  const [loading, setLoading] = useState(false);
  const [modalPhoto, setModalPhoto] = useState<ModalPhotoProps>(
    {} as ModalPhotoProps,
  );

  const { user } = useAuth();

  useEffect(() => {
    const getPhoto = async () => {
      try {
        setLoading(true);
        if (data.id) {
          const response = await api.get(`/api/photo/${data.id}`);
          setModalPhoto(response.data);
        }
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    getPhoto();
  }, [data]);

  const { photo, comments } = modalPhoto;

  if (!modalPhoto) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        {photo && <Image src={photo.src} alt={photo.title} />}
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {photo &&
              (user && user.nome === photo.author ? (
                <PhotoDelete id={photo.id} />
              ) : (
                <Link to={`/perfil/${photo.author}`}>{`@${photo.author}`}</Link>
              ))}
            {photo && (
              <span className={styles.visualizacoes}>{photo.acessos}</span>
            )}
          </p>
          <h1 className="title">
            {photo && <Link to={`/foto/${photo.id}`}>{photo.title}</Link>}
          </h1>
          <ul className={styles.attributes}>
            {photo && (
              <>
                <li>{`${photo.peso} kg`}</li>
                <li>{`${photo.idade} anos`}</li>
              </>
            )}
          </ul>
        </div>
      </div>
      {photo && (
        <PhotoComments id={photo.id} comments={comments} single={single} />
      )}
    </div>
  );
};

export default PhotoContent;
