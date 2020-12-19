import React, { useEffect, useState } from 'react';
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';
import styles from '../../../styles/UserStatsGraph.module.css';
import { GraphDataProps, UserStatsGraphProps } from './interface';

const UserStatsGraph: React.FC<UserStatsGraphProps> = ({ data }) => {
  const [graph, setGraph] = useState<GraphDataProps[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const graphData = data.map(item => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, total),
    );
    setGraph(graphData);
  }, [data, total]);
  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>{`Acessos: ${total}`}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: { fillOpacity: 0.9, stroke: '#fff', strokeWidth: 2 },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph} />
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraph;
