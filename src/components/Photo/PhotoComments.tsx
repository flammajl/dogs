import React, { FormEvent, useCallback, useRef } from 'react';
import { useAuth } from '../../hooks/auth';
import { ReactComponent as Enviar } from '../../assets/enviar.svg';
import api from '../../services/api';
import styles from '../../styles/PhotoComments.module.css';

interface PhotoCommentsProps {
  id: number;
  comments: {
    comment_ID: string;
    comment_author: string;
    comment_content: string;
  }[];
  single?: boolean;
}

const PhotoComments: React.FC<PhotoCommentsProps> = ({
  id,
  comments,
  single,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { login } = useAuth();

  const token = localStorage.getItem('@Dogs:token');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (textAreaRef.current?.value && token) {
        await api.post(
          `/api/comment/${id}`,
          { comment: textAreaRef.current.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
    },
    [id, token],
  );

  return (
    <>
      <ul className={`${styles.comments} ${single ? styles.single : ''}`}>
        {comments.map(comment => (
          <li key={comment.comment_ID}>
            <b>{`${comment.comment_author}: `}</b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>

      {login && (
        <form
          className={`${styles.form} ${single ? styles.single : ''}`}
          onSubmit={handleSubmit}
        >
          <textarea
            name="comment"
            id="comment"
            placeholder="Comente..."
            ref={textAreaRef}
            className={styles.textarea}
          />
          <button type="submit" className={styles.button}>
            <Enviar />
          </button>
        </form>
      )}
    </>
  );
};

export default PhotoComments;
