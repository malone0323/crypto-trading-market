import React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { theme } from '@/lib/theme';

interface PerformanceChartProps {
  data: any[];
  dataKeys: string[];
  xAxisDataKey: string;
  yAxisLabel: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, dataKeys, xAxisDataKey, yAxisLabel }) => {
  const colors = [theme.colors.primary, theme.colors.secondary, theme.colors.tertiary, theme.colors.quaternary];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis 
          dataKey={xAxisDataKey} 
          stroke="#fff"
          tick={{ fill: '#fff', fontSize: 12 }}
        />
        <YAxis 
          stroke="#fff"
          tick={{ fill: '#fff', fontSize: 12 }}
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#fff' }}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#333', border: 'none' }}
          labelStyle={{ color: '#fff' }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend 
          wrapperStyle={{ color: '#fff' }}
        />
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index % colors.length]}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
