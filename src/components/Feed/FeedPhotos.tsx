import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import api from '../../services/api';
import styles from '../../styles/FeedPhotos.module.css';
import stylesPhotoItem from '../../styles/FeedPhotoItem.module.css';
import FeedModal, { ModalHandles } from './FeedModal';
import Image from '../../utils/Image';
import Loading from '../Loading';

interface FeedPhotosProps {
  user: number | string | undefined;
  page: number;
  setInfinite: Dispatch<SetStateAction<boolean>>;
}

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

const FeedPhotos: React.FC<FeedPhotosProps> = ({ user, page, setInfinite }) => {
  const [data, setData] = useState<PhotoProps[]>([]);
  const [loading, setLoading] = useState(false);
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
      try {
        setLoading(true);
        const response = await api.get(
          `/api/photo/?_page=${page}&_total=6&_user=${user}`,
        );
        setData(response.data);

        if (response && response.status === 200 && response.data.length < 6)
          setInfinite(false);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [user, page, setInfinite]);

  if (loading) {
    return <Loading />;
  }

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
            <Image src={photo.src} alt={photo.title} />
            <span className={stylesPhotoItem.acessos}>{photo.acessos}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FeedPhotos;
