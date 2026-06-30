import React, { useState, useEffect } from 'react';
import { VideoPlayer } from './components/VideoPlayer';
import { DataColumnA } from './components/DataColumnA';
import { DataColumnB } from './components/DataColumnB';
import { 
  Tv, 
  Sliders, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Image, 
  Check, 
  X, 
  ChevronRight, 
  Smartphone, 
  Monitor, 
  Info,
  Maximize,
  Cpu
} from 'lucide-react';

export default function App() {
  const DEFAULT_STREAM = 'https://jx.zdplay.cc/m3u8Player/?url=https://v5.zuidazym3u8.com/yyv5/202606/27/fqw1Kfyt0q27/video/index.m3u8';

  // State to determine if we are rendering the wireless smartphone controller or the high-definition display
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path.startsWith('/admin') || hash.includes('admin');
  });

  // Listen to address bar alterations directly
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdmin(path.startsWith('/admin') || hash.includes('admin'));
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Shared state: Video Stream URLs
  const [videoUrl1, setVideoUrl1] = useState<string>(() => {
    return localStorage.getItem('led_signage_video_url1') || DEFAULT_STREAM;
  });
  const [videoUrl2, setVideoUrl2] = useState<string>(() => {
    return localStorage.getItem('led_signage_video_url2') || DEFAULT_STREAM;
  });
  const [videoUrl3, setVideoUrl3] = useState<string>(() => {
    return localStorage.getItem('led_signage_video_url3') || DEFAULT_STREAM;
  });

  // Shared state: Dynamic CSS filter controls
  const [brightness, setBrightness] = useState<number>(() => {
    return Number(localStorage.getItem('led_signage_brightness') || '110');
  });
  const [contrast, setContrast] = useState<number>(() => {
    return Number(localStorage.getItem('led_signage_contrast') || '105');
  });
  const [saturation, setSaturation] = useState<number>(() => {
    return Number(localStorage.getItem('led_signage_saturation') || '120');
  });

  // Shared state: Gap layout mode ('logo' | 'black' | 'custom')
  const [gapMode, setGapMode] = useState<'logo' | 'black' | 'custom'>(() => {
    return (localStorage.getItem('led_signage_gap_mode') as 'logo' | 'black' | 'custom') || 'logo';
  });
  const [customGapUrl, setCustomGapUrl] = useState<string>(() => {
    return localStorage.getItem('led_signage_custom_gap_url') || '';
  });

  // Shared state: Center screen sound control (true = muted, false = unmuted/sounding)
  const [centerMuted, setCenterMuted] = useState<boolean>(() => {
    return localStorage.getItem('led_signage_center_muted') !== 'false'; // Default to true (muted) for bypass
  });

  // Display screen only: auto-fit scaling
  const [scale, setScale] = useState<number>(1);

  // Sync state between tabs/devices wirelessly using 'storage' event listener
  useEffect(() => {
    const syncFromStorage = (e: StorageEvent) => {
      if (!e.key) return;
      
      switch (e.key) {
        case 'led_signage_video_url1':
          if (e.newValue) setVideoUrl1(e.newValue);
          break;
        case 'led_signage_video_url2':
          if (e.newValue) setVideoUrl2(e.newValue);
          break;
        case 'led_signage_video_url3':
          if (e.newValue) setVideoUrl3(e.newValue);
          break;
        case 'led_signage_brightness':
          if (e.newValue) setBrightness(Number(e.newValue));
          break;
        case 'led_signage_contrast':
          if (e.newValue) setContrast(Number(e.newValue));
          break;
        case 'led_signage_saturation':
          if (e.newValue) setSaturation(Number(e.newValue));
          break;
        case 'led_signage_gap_mode':
          if (e.newValue) setGapMode(e.newValue as 'logo' | 'black' | 'custom');
          break;
        case 'led_signage_custom_gap_url':
          if (e.newValue) setCustomGapUrl(e.newValue);
          break;
        case 'led_signage_center_muted':
          setCenterMuted(e.newValue !== 'false');
          break;
      }
    };

    window.addEventListener('storage', syncFromStorage);
    return () => window.removeEventListener('storage', syncFromStorage);
  }, []);

  // Compute CSS filter string dynamically based on hardware calibration state
  const filterString = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

  // Auto-scaling logic for the ultra-wide screen display so it is always perfectly visible
  useEffect(() => {
    if (isAdmin) return;

    const handleResize = () => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      
      // Target dimensions: 2580px wide, 430px tall
      const usableHeight = winHeight - 32;
      const usableWidth = winWidth - 32;

      const scaleX = usableWidth / 2580;
      const scaleY = usableHeight / 430;
      
      // Scaled to fit exactly inside any monitor
      const s = Math.min(scaleX, scaleY);
      setScale(s);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAdmin]);

  // Extract raw stream addresses safely
  const getRawStreamUrl = (rawUrl: string) => {
    if (!rawUrl) return '';
    const trimmed = rawUrl.trim();
    const urlParamIndex = trimmed.indexOf('url=');
    if (urlParamIndex !== -1) {
      let extracted = trimmed.substring(urlParamIndex + 4);
      const ampIndex = extracted.indexOf('&');
      if (ampIndex !== -1) {
        extracted = extracted.substring(0, ampIndex);
      }
      return decodeURIComponent(extracted);
    }
    return trimmed;
  };

  // ==========================================
  // RENDER PATTERN A: SMARTPHONE REMOTE CONTROLLER
  // ==========================================
  if (isAdmin) {
    // Inputs specifically for the controller UI
    const [adminInputUrl1, setAdminInputUrl1] = useState(videoUrl1);
    const [adminInputUrl2, setAdminInputUrl2] = useState(videoUrl2);
    const [adminInputUrl3, setAdminInputUrl3] = useState(videoUrl3);
    const [adminInputCustomGap, setAdminInputCustomGap] = useState(customGapUrl);
    const [justBroadcasted, setJustBroadcasted] = useState(false);

    const handleBroadcastStreams = (e: React.FormEvent) => {
      e.preventDefault();
      
      localStorage.setItem('led_signage_video_url1', adminInputUrl1.trim());
      localStorage.setItem('led_signage_video_url2', adminInputUrl2.trim());
      localStorage.setItem('led_signage_video_url3', adminInputUrl3.trim());

      setVideoUrl1(adminInputUrl1.trim());
      setVideoUrl2(adminInputUrl2.trim());
      setVideoUrl3(adminInputUrl3.trim());

      setJustBroadcasted(true);
      setTimeout(() => setJustBroadcasted(false), 2000);
    };

    const handleTuningChange = (type: 'brightness' | 'contrast' | 'saturation', val: number) => {
      if (type === 'brightness') {
        setBrightness(val);
        localStorage.setItem('led_signage_brightness', String(val));
      } else if (type === 'contrast') {
        setContrast(val);
        localStorage.setItem('led_signage_contrast', String(val));
      } else if (type === 'saturation') {
        setSaturation(val);
        localStorage.setItem('led_signage_saturation', String(val));
      }
    };

    const handleGapModeChange = (mode: 'logo' | 'black' | 'custom', customUrlVal?: string) => {
      setGapMode(mode);
      localStorage.setItem('led_signage_gap_mode', mode);

      if (customUrlVal !== undefined) {
        setCustomGapUrl(customUrlVal);
        localStorage.setItem('led_signage_custom_gap_url', customUrlVal);
      }
    };

    const toggleAudioBroadcaster = () => {
      const nextMuteState = !centerMuted;
      setCenterMuted(nextMuteState);
      localStorage.setItem('led_signage_center_muted', String(nextMuteState));
    };

    const loadDemoProfile = (v1: string, v2: string, v3: string) => {
      setAdminInputUrl1(v1);
      setAdminInputUrl2(v2);
      setAdminInputUrl3(v3);

      localStorage.setItem('led_signage_video_url1', v1);
      localStorage.setItem('led_signage_video_url2', v2);
      localStorage.setItem('led_signage_video_url3', v3);

      setVideoUrl1(v1);
      setVideoUrl2(v2);
      setVideoUrl3(v3);

      setJustBroadcasted(true);
      setTimeout(() => setJustBroadcasted(false), 2000);
    };

    return (
      <div className="min-h-screen bg-[#030306] text-zinc-100 flex flex-col font-sans select-none pb-12">
        {/* Header bar */}
        <header className="h-[60px] bg-[#07070f] border-b border-zinc-800/60 px-5 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-[#00f5d4] animate-bounce" />
            <div>
              <h1 className="text-sm font-mono font-black tracking-wider uppercase text-white leading-none">
                MATRIX COMMAND / 智能大屏无线中控
              </h1>
              <p className="text-[8px] font-mono text-zinc-500 mt-1">
                MOBILE DIGITAL SIGNAGE CONTROLLER
              </p>
            </div>
          </div>
          <a 
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all font-mono"
            title="返回大屏纯净端 / Back to Display"
          >
            <Monitor className="w-3.5 h-3.5" />
            DISPLAY VIEW
          </a>
        </header>

        <main className="flex-1 p-4 max-w-lg mx-auto w-full space-y-6">
          
          {/* Quick Info Alert */}
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-3 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              <strong>使用提示：</strong>请在同一台电脑/局域网设备上，使用另一个浏览器标签页或显示设备打开{' '}
              <a href="/" className="text-[#00f5d4] underline font-bold">前台大屏端</a>。手机端的每次滑动、点击、源推送均会通过本地总线<strong>毫米级实时响应</strong>到大屏，无需刷新页面。
            </p>
          </div>

          {/* 1. Wireless Audio Broadcaster */}
          <section className="bg-zinc-950/80 border border-zinc-900 rounded-2xl p-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-500/5 to-transparent pointer-events-none rounded-tr-2xl" />
            <h3 className="text-xs font-mono font-black uppercase text-zinc-400 tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              01 / 全场声浪无线解禁 / LIVE AUDIO MATRIX
            </h3>

            <button
              onClick={toggleAudioBroadcaster}
              className={`w-full py-5 rounded-xl border font-mono font-black text-xs uppercase tracking-widest transition-all duration-300 flex flex-col items-center justify-center gap-2 relative ${
                !centerMuted 
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white border-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]' 
                  : 'bg-zinc-900/60 text-zinc-500 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {!centerMuted ? (
                <>
                  <Volume2 className="w-8 h-8 text-white animate-ping absolute opacity-10" />
                  <Volume2 className="w-8 h-8 text-white animate-bounce" />
                  <span>🔊 核心赛事声音：已解禁 (SOUND ACTIVE)</span>
                  <span className="text-[8px] font-normal tracking-normal text-pink-200 mt-1">
                    中间大屏正全力播放赛场声浪，左右副屏保持安全静音
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-8 h-8 text-zinc-600" />
                  <span>🔇 全场音量：一键全局静音 (MUTED)</span>
                  <span className="text-[8px] font-normal tracking-normal text-zinc-600 mt-1">
                    点击此按钮无线激活中间主屏的激昂原声
                  </span>
                </>
              )}
            </button>
          </section>

          {/* 2. Color Calibration Panel */}
          <section className="bg-zinc-950/80 border border-zinc-900 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono font-black uppercase text-zinc-400 tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] animate-pulse" />
                02 / 大屏画面调光台 / CALIBRATION MATRIX
              </h3>
              <button
                onClick={() => {
                  handleTuningChange('brightness', 110);
                  handleTuningChange('contrast', 105);
                  handleTuningChange('saturation', 120);
                }}
                className="text-[9px] font-mono text-[#00f5d4] hover:underline uppercase"
              >
                重置比例
              </button>
            </div>

            <div className="space-y-4 bg-black/40 border border-zinc-900 p-4 rounded-xl">
              {/* Brightness */}
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1.5">
                  <span className="text-zinc-400">💡 屏幕亮度 (BRIGHTNESS)</span>
                  <span className="text-[#00f5d4] font-black">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  onChange={e => handleTuningChange('brightness', Number(e.target.value))}
                  className="w-full accent-[#00f5d4] bg-zinc-900 h-2.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Contrast */}
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1.5">
                  <span className="text-zinc-400">🌗 对比度 (CONTRAST)</span>
                  <span className="text-[#00f5d4] font-black">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={contrast}
                  onChange={e => handleTuningChange('contrast', Number(e.target.value))}
                  className="w-full accent-[#00f5d4] bg-zinc-900 h-2.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Saturation */}
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1.5">
                  <span className="text-zinc-400">🎨 色彩饱和度 (SATURATION)</span>
                  <span className="text-[#00f5d4] font-black">{saturation}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={saturation}
                  onChange={e => handleTuningChange('saturation', Number(e.target.value))}
                  className="w-full accent-[#00f5d4] bg-zinc-900 h-2.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </section>

          {/* 3. Middle Gap Poster Manager */}
          <section className="bg-zinc-950/80 border border-zinc-900 rounded-2xl p-4 shadow-xl">
            <h3 className="text-xs font-mono font-black uppercase text-zinc-400 tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              03 / 夹缝图片控制器 / POSTER CONTAINER MANAGER
            </h3>

            {/* Selection row */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-[10px] font-mono">
              <button
                onClick={() => handleGapModeChange('logo')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  gapMode === 'logo'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold'
                    : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                官方 LOGO 模式
              </button>

              <button
                onClick={() => handleGapModeChange('black')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  gapMode === 'black'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold'
                    : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
                纯黑极简模式
              </button>

              <button
                onClick={() => handleGapModeChange('custom')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  gapMode === 'custom'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold'
                    : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                自定义海报模式
              </button>
            </div>

            {/* Custom URL Input block */}
            {gapMode === 'custom' && (
              <div className="bg-black/40 border border-zinc-900 p-3 rounded-xl space-y-2">
                <label className="block text-[8px] font-mono text-zinc-500 uppercase">
                  输入海报 / 商用图 URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={adminInputCustomGap}
                    onChange={e => setAdminInputCustomGap(e.target.value)}
                    placeholder="https://example.com/poster.jpg"
                    className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-white outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => handleGapModeChange('custom', adminInputCustomGap)}
                    className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase"
                  >
                    推送海报
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 4. Stream URLs Routing Scheduling */}
          <section className="bg-zinc-950/80 border border-zinc-900 rounded-2xl p-4 shadow-xl">
            <h3 className="text-xs font-mono font-black uppercase text-zinc-400 tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              04 / 3路大屏信号调度 / STREAM MATRIX DIRECT ROUTE
            </h3>

            <form onSubmit={handleBroadcastStreams} className="space-y-3">
              <div>
                <label className="block text-[8px] font-mono text-zinc-500 uppercase mb-1">
                  视频一信号地址 (DISP_01)
                </label>
                <textarea
                  value={adminInputUrl1}
                  onChange={e => setAdminInputUrl1(e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[9px] font-mono text-zinc-300 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[8px] font-mono text-zinc-500 uppercase mb-1">
                  视频二信号地址 (DISP_02 - C位)
                </label>
                <textarea
                  value={adminInputUrl2}
                  onChange={e => setAdminInputUrl2(e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[9px] font-mono text-zinc-300 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[8px] font-mono text-zinc-500 uppercase mb-1">
                  视频三信号地址 (DISP_03)
                </label>
                <textarea
                  value={adminInputUrl3}
                  onChange={e => setAdminInputUrl3(e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[9px] font-mono text-zinc-300 outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  justBroadcasted
                    ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                }`}
              >
                {justBroadcasted ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    🚀 推送成功！大屏已无缝切流
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '6s' }} />
                    🚀 推送新赛事到大屏 (BROADCAST STREAM NOW)
                  </>
                )}
              </button>
            </form>

            {/* Quick Presets */}
            <div className="mt-4 border-t border-zinc-900 pt-3">
              <span className="block text-[8px] font-mono text-zinc-500 uppercase mb-2">
                测试流一键调度方案 / DEMO PROFILES
              </span>
              <div className="grid grid-cols-2 gap-2 text-[8px] font-mono">
                <button
                  onClick={() => loadDemoProfile(DEFAULT_STREAM, DEFAULT_STREAM, DEFAULT_STREAM)}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-2 rounded text-zinc-400 text-left hover:text-white"
                >
                  世界杯官方同步流 (3屏联播)
                </button>
                <button
                  onClick={() => loadDemoProfile(
                    'https://jx.zdplay.cc/m3u8Player/?url=https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                    DEFAULT_STREAM,
                    'https://jx.zdplay.cc/m3u8Player/?url=https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                  )}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-2 rounded text-zinc-400 text-left hover:text-white"
                >
                  混合多流测试模式 (MP4 + M3U8)
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>
    );
  }

  // ==========================================
  // RENDER PATTERN B: PURE DIGITAL SIGNAGE DISPLAY VIEW
  // ==========================================
  return (
    <div className="min-h-screen bg-[#010103] text-zinc-100 flex flex-col font-sans select-none overflow-hidden relative justify-center items-center">
      
      {/* 1. Subtle watermark indication in background of display for tech aesthetic */}
      <div className="absolute top-4 left-6 text-[8px] font-mono text-zinc-800 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-zinc-800" />
        WIRELESS CLIENT: ACTIVE CONNECTED
      </div>
      <div className="absolute top-4 right-6 text-[8px] font-mono text-zinc-800">
        BROADCAST_SYNC_V4.0_LIVE
      </div>

      {/* 2. Main Canvas Stage with auto scaled viewport */}
      <main className="flex items-center justify-center overflow-hidden">
        
        {/* LED Screen Wrapper */}
        <div 
          className="relative transition-transform duration-300 shadow-[0_30px_80px_rgba(0,0,0,0.98)] border border-zinc-950 rounded-lg overflow-hidden bg-[#000000]"
          style={{
            width: '2580px',
            height: '430px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            flexShrink: 0,
          }}
        >
          {/* Exact Grid Layout: 764px 144px 764px 144px 764px */}
          <div className="w-full h-full grid grid-cols-[764px_144px_764px_144px_764px] items-stretch bg-black">
            
            {/* Zone 1: Video Zone 1 (764px) */}
            <VideoPlayer 
              url={getRawStreamUrl(videoUrl1)} 
              badge="DISP_01" 
              title="赛事信号一" 
              filterString={filterString}
              muted={true}
            />

            {/* Zone 2: Data Column A (144px) with dynamic controls */}
            <DataColumnA mode={gapMode} customUrl={customGapUrl} />

            {/* Zone 3: Video Zone 2 (764px) - Center C-Position with live sound control */}
            <VideoPlayer 
              url={getRawStreamUrl(videoUrl2)} 
              badge="DISP_02" 
              title="核心赛事信号二" 
              filterString={filterString}
              muted={centerMuted}
            />

            {/* Zone 4: Data Column B (144px) with dynamic controls */}
            <DataColumnB mode={gapMode} customUrl={customGapUrl} />

            {/* Zone 5: Video Zone 3 (764px) */}
            <VideoPlayer 
              url={getRawStreamUrl(videoUrl3)} 
              badge="DISP_03" 
              title="赛事信号三" 
              filterString={filterString}
              muted={true}
            />

          </div>
        </div>
      </main>

      {/* Absolute Pure Display - No overlay, no buttons! Just full-fidelity immersive wide display */}
    </div>
  );
}
