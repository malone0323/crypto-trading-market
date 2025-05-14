'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"

declare global {
  interface Window {
    TradingView: any;
  }
}

const LiveTokenChart: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (container.current && window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "BINANCE:SOLUSDC",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
        });
        setIsLoading(false);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-[600px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      <div id="tradingview_widget" ref={container} className="w-full h-full" />
    </div>
  );
};

export default LiveTokenChart;
