import React, { useEffect, useState } from 'react';
import FeedPhotos from './FeedPhotos';

interface FeedProps {
  userId?: number | string;
}

const Feed: React.FC<FeedProps> = ({ userId }) => {
  const [pages, setPages] = useState([1]);
  const [infinite, setInfinite] = useState(true);

  useEffect(() => {
    let wait = false;

    const infiniteScroll = () => {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (!wait && scroll > height * 0.75) {
          setPages(p => [...p, p.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    };

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      {pages.map(page => (
        <FeedPhotos
          key={page}
          page={page}
          user={userId}
          setInfinite={setInfinite}
        />
      ))}
    </div>
  );
};

export default Feed;
