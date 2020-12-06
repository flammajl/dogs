import React from 'react';

interface PhotoCommentsProps {
  id: number;
  comments: {
    comment_content: string;
  };
}

const PhotoComments: React.FC<PhotoCommentsProps> = () => {
  return <div>Photo Comments</div>;
};

export default PhotoComments;
