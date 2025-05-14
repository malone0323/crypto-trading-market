'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from "@/components/ui/slider"

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface MusicPlayerProps {
  videoId: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ videoId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);
  const previousVolumeRef = useRef(50);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      try {
        playerRef.current = new window.YT.Player('youtube-player', {
          height: '0',
          width: '0',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            playlist: videoId,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            autohide: 0
          },
          events: {
            onReady: (event: any) => {
              try {
                event.target.setVolume(volume);
                event.target.playVideo();
              } catch (error) {
                console.warn('Failed to initialize player:', error);
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                try {
                  event.target.playVideo();
                } catch (error) {
                  console.warn('Failed to replay video:', error);
                }
              }
            },
            onError: (event: any) => {
              console.warn('YouTube player error:', event.data);
            }
          }
        });
      } catch (error) {
        console.warn('Failed to create YouTube player:', error);
      }
    };

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.warn('Failed to destroy player:', error);
        }
      }
      const scriptTag = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [videoId]);

  useEffect(() => {
    const updateVolume = () => {
      if (playerRef.current?.setVolume && playerRef.current.getPlayerState) {
        try {
          playerRef.current.setVolume(isMuted ? 0 : volume);
        } catch (error) {
          console.warn('Failed to update volume:', error);
        }
      }
    };

    updateVolume();
  }, [volume, isMuted]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolumeRef.current);
      setIsMuted(false);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    setIsMuted(volumeValue === 0);
    if (volumeValue > 0) {
      previousVolumeRef.current = volumeValue;
    }
  };

  return (
    <div className={`fixed right-0 bottom-20 md:bottom-4 z-50 transition-all duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-[calc(100%-40px)]'}`}>
      <div className="bg-black bg-opacity-70 backdrop-blur-lg p-4 rounded-l-lg flex items-center mb-safe">
        <button onClick={toggleVisibility} className="text-white mr-4">
          {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        {isVisible && (
          <div className="flex items-center space-x-4">
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              className="w-32"
              onValueChange={handleVolumeChange}
            />
            <button onClick={toggleMute} className="text-white">
              {isMuted || volume === 0 ? 'Unmute' : 'Mute'}
            </button>
          </div>
        )}
      </div>
      <div id="youtube-player" />
    </div>
  );
};

export default MusicPlayer;
