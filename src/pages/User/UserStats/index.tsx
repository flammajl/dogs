import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { UserStatsProps } from './interface';
import UserStatsGraph from './UserStatsGraph';

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
    <div>
      <UserStatsGraph data={data} />
    </div>
  );
};

export default UserStats;
