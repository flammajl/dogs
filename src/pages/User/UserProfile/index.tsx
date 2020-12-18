import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../../../components/Feed';

const UserProfile: React.FC = () => {
  const { user } = useParams();

  return (
    <section className="container mainContainer">
      <h1 className="title">{user}</h1>
      <Feed />
    </section>
  );
};

export default UserProfile;
