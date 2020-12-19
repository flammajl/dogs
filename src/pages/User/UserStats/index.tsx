import React, { lazy, Suspense, useEffect, useState } from 'react';
import api from '../../../services/api';
import { UserStatsProps } from './interface';

const UserStatsGraph = lazy(() => import('./UserStatsGraph'));

const UserStats: React.FC = () => {
  const [data, setData] = useState<UserStatsProps[]>([]);
  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/api/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@Dogs:token')}`,
        },
      });
      setData(response.data);
    };
    getData();
  }, []);
  return (
    <Suspense fallback={<div />}>
      <UserStatsGraph data={data} />
    </Suspense>
  );
};

export default UserStats;
