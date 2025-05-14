'use client'

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

interface ChartData {
  time: string;
  value: number;
}

const MinimalTokenChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { type: ColorType.Solid, color: '#000000' },
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: { visible: false },
          horzLines: { visible: false },
        },
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
        },
      });

      const lineSeries = chart.addLineSeries({
        color: '#FFD700',
        lineWidth: 2,
      });

      // Fetch data from an API (replace with actual API endpoint)
      fetch('https://api.example.com/token-price-history')
        .then(response => response.json())
        .then((data: ChartData[]) => {
          lineSeries.setData(data);
        });

      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, []);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};

export default MinimalTokenChart;
