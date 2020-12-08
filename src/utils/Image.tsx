import React, { ImgHTMLAttributes, useCallback, useState } from 'react';
import styles from '../styles/Image.module.css';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

const Image: React.FC<ImageProps> = ({ alt, ...rest }) => {
  const [skeleton, setSkeleton] = useState(true);
  const handleLoad = useCallback(e => {
    const { target } = e;
    if (target) {
      setSkeleton(false);
      target.style.opacity = 1;
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton} />}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...rest} />
    </div>
  );
};

export default Image;
