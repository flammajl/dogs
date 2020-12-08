import React, { useCallback } from 'react';
import api from '../../services/api';
import styles from '../../styles/PhotoDelete.module.css';

interface PhotoDeleteProps {
  id: number;
}

const PhotoDelete: React.FC<PhotoDeleteProps> = ({ id }) => {
  const handleClick = useCallback(async () => {
    await api.delete(`/api/photo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@Dogs:token')}`,
      },
    });
  }, [id]);

  return (
    <div>
      <button onClick={handleClick} type="button" className={styles.delete}>
        Deletar
      </button>
    </div>
  );
};

export default PhotoDelete;
