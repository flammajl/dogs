import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Feed from '../../components/Feed';
import { useAuth } from '../../hooks/auth';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

const User: React.FC = () => {
  const { user } = useAuth();
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed userId={user.id} />} />
        <Route path="/postar" element={<UserPhotoPost />} />
        <Route path="/estatisticas" element={<UserStats />} />
      </Routes>
    </section>
  );
};

export default User;
