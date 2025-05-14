'use client'

import { useEffect, useRef } from 'react';

export default function MinimalChart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BIRDEYE:9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": true,
        "save_image": false,
        "backgroundColor": "rgba(0, 0, 0, 1)"
      }`;

    if (container.current) {
      container.current.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'tradingview-widget-container';
      container.current.appendChild(wrapper);
      wrapper.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={container} className="w-full h-[600px]" />
  );
}
