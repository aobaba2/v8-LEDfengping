import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  url: string;
  badge: string;
  title: string;
  onOpenSettings?: () => void;
  filterString?: string;
  children?: React.ReactNode;
  muted?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  badge,
  title,
  onOpenSettings,
  filterString,
  children,
  muted = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dpRef = useRef<any>(null);
  const hlsRef = useRef<any>(null);

  // 1. Initial player setup hook (runs only on URL change to prevent flicker)
  useEffect(() => {
    if (!containerRef.current) return;

    // Surgical cleanup of any existing DPlayer and Hls instances
    if (dpRef.current) {
      try {
        dpRef.current.destroy();
      } catch (e) {
        console.error('Error destroying DPlayer:', e);
      }
      dpRef.current = null;
    }

    if (hlsRef.current) {
      try {
        hlsRef.current.destroy();
      } catch (e) {
        console.error('Error destroying Hls:', e);
      }
      hlsRef.current = null;
    }

    const DPlayer = (window as any).DPlayer;
    if (!DPlayer) {
      console.warn('DPlayer is not loaded on window.');
      return;
    }

    const isM3u8 = url.toLowerCase().includes('.m3u8');
    
    // Configure isolated player options
    const playerConfig: any = {
      container: containerRef.current,
      autoplay: true,
      muted: true, // Always start muted to bypass browser block
      mutex: false, // Critical: Prevents players from pausing each other!
      hotkey: false, // Prevent keyboard spacebar conflict
      preventContextMenu: true,
      loop: true,
      volume: 0,
      video: {
        url: url,
        type: isM3u8 ? 'customHls' : 'auto',
      },
    };

    // Setup custom Hls decoding for .m3u8 streams with explicit instance isolation
    if (isM3u8) {
      playerConfig.video.customType = {
        customHls: function (video: HTMLVideoElement) {
          const Hls = (window as any).Hls;
          if (Hls && Hls.isSupported()) {
            const hlsInstance = new Hls({
              maxBufferSize: 0,
              maxBufferLength: 10,
              liveSyncDurationCount: 3,
              enableWorker: true,
            });
            hlsRef.current = hlsInstance;
            
            hlsInstance.loadSource(video.src);
            hlsInstance.attachMedia(video);
            
            video.play().catch((err) => {
              console.log('Autoplay blocked:', err);
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = video.src;
          }
        }
      };
    }

    // Create the DPlayer instance
    const dp = new DPlayer(playerConfig);
    dpRef.current = dp;

    // Hard play reinforcement on initialization
    if (dp.video) {
      dp.video.play().catch((err: any) => {
        console.log('Autoplay play exception:', err);
      });
    }

    // Apply the initial muted state
    if (muted) {
      dp.video.muted = true;
      dp.video.volume = 0;
    } else {
      // Delay unmuting slightly to satisfy browser autoplay constraints
      const timer = setTimeout(() => {
        if (dp.video) {
          dp.video.muted = false;
          dp.volume(1.0, true, true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Cleanup hook
    return () => {
      if (dpRef.current) {
        try {
          dpRef.current.destroy();
        } catch (e) {
          // ignore
        }
        dpRef.current = null;
      }
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {
          // ignore
        }
        hlsRef.current = null;
      }
    };
  }, [url]);

  // 2. Reactive muting/unmuting hook (provides seamless live audio control)
  useEffect(() => {
    const dp = dpRef.current;
    if (!dp) return;

    if (muted) {
      if (dp.video) {
        dp.video.muted = true;
        dp.video.volume = 0;
      }
      try {
        dp.volume(0, true, true);
      } catch (e) {}
    } else {
      if (dp.video) {
        dp.video.muted = false;
        dp.video.volume = 1.0;
      }
      try {
        dp.volume(1.0, true, true);
      } catch (e) {}
    }
  }, [muted]);

  return (
    <div className="w-[764px] h-[430px] bg-black relative overflow-hidden flex items-center justify-center select-none group border border-white/5 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
      
      {/* 1. HUD Thin Corner Brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00f5d4]/40 pointer-events-none z-10" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00f5d4]/40 pointer-events-none z-10" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00f5d4]/40 pointer-events-none z-10" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00f5d4]/40 pointer-events-none z-10" />

      {/* 2. Top-Left Floating Badge */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-2 shadow-lg">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
        </span>
        <span className="text-[9px] font-mono font-black text-white tracking-widest uppercase">
          {badge}
        </span>
        <span className="text-[8px] font-mono text-zinc-500 border-l border-zinc-800 pl-2">
          {title}
        </span>
      </div>

      {/* 3. Bottom-Left Telemetry */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-black/75 backdrop-blur-sm border border-white/5 px-2.5 py-1 rounded font-mono text-[7.5px] text-zinc-500 flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          DEC_HW: <span className="text-zinc-300 font-bold">DPLAYER_H5_ISO</span>
        </span>
        <span>RATIO: <span className="text-zinc-300 font-bold">16:9_RAW</span></span>
        <span>JITTER: <span className="text-zinc-300 font-bold">0.05ms</span></span>
      </div>

      {/* 4. DPlayer container element with filter string applied */}
      <div 
        ref={containerRef} 
        className="w-full h-full relative z-0"
        style={{ filter: filterString }}
      />

      {/* Custom CSS rules for Anti-aliasing, anti-flicker, 1080i de-interlacing filter override */}
      <style>{`
        /* DPlayer full height overriding and layout stretch */
        .dplayer, .dplayer-video-wrap, .dplayer-video {
          width: 100% !important;
          height: 100% !important;
        }
        /* Custom requested de-interlacing & fine blur filter for 1080i */
        .dplayer-video {
          filter: blur(0.3px) contrast(1.05) !important;
          transform: translate3d(0, 0, 0) !important;
          object-fit: cover !important;
        }
        /* Clean up DPlayer control bar visuals to fit our theme */
        .dplayer-controller {
          background: linear-gradient(to top, rgba(0,0,0,0.85), transparent) !important;
        }
        .dplayer-bar-wrap .dplayer-bar .dplayer-loaded {
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .dplayer-bar-wrap .dplayer-bar .dplayer-played {
          background: #00f5d4 !important;
        }
        .dplayer-thumb {
          background: #00f5d4 !important;
        }
      `}</style>

      {/* 5. Subtle Grid Scanline filter layer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20 z-10" />

      {/* 6. Embedded children elements */}
      {children}

      {/* 7. Settings Gear Trigger overlay on hover */}
      {onOpenSettings && (
        <button
          onClick={onOpenSettings}
          className="absolute bottom-3 right-3 z-30 p-2 rounded-lg backdrop-blur-md bg-black/65 hover:bg-black text-white border border-white/10 hover:border-[#00f5d4]/50 transition-all duration-300 opacity-5 group-hover:opacity-100 shadow-md"
          title="系统播控设置 / Display Control Settings"
        >
          <svg className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}

    </div>
  );
};
