import React, { useState, useEffect } from 'react';
import { Settings, Link, Check, RefreshCw, X, Sliders, Cpu } from 'lucide-react';

export const VideoZone: React.FC = () => {
  const DEFAULT_STREAM = 'https://jx.zdplay.cc/m3u8Player/?url=https://v6.zuidazym3u8.com/yyv5/202606/27/fqw1Kfyt0q27/video/index.m3u8';
  
  const PRESET_STREAMS = [
    { name: '🏟️ 世界杯 59.8FPS 极清播控外壳', url: DEFAULT_STREAM },
    { name: '🧪 HUD 科幻战警电影 (外壳)', url: 'https://jx.zdplay.cc/m3u8Player/?url=https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
    { name: '🐰 户外画质色彩校验流 (外壳)', url: 'https://jx.zdplay.cc/m3u8Player/?url=https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  ];

  // Video stream states
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    return localStorage.getItem('led_signage_video_url') || DEFAULT_STREAM;
  });
  const [inputUrl, setInputUrl] = useState<string>(videoUrl);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Picture Adjustment states
  const [isAdjustPanelOpen, setIsAdjustPanelOpen] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(105);
  const [saturation, setSaturation] = useState<number>(110);
  const [deinterlaceStrength, setDeinterlaceStrength] = useState<number>(1.2);
  const [isDeinterlaceEnabled, setIsDeinterlaceEnabled] = useState<boolean>(true);

  // Animated telemetry states
  const [fps, setFps] = useState<number>(59.8);
  const [bitrate, setBitrate] = useState<number>(8520);
  const [jitter, setJitter] = useState<number>(0.12);

  useEffect(() => {
    const timer = setInterval(() => {
      // Add microscopic random fluctuations for authentic real-time simulation
      setFps(Number((59.6 + Math.random() * 0.3).toFixed(1)));
      setBitrate(Math.floor(8400 + Math.random() * 240));
      setJitter(Number((0.10 + Math.random() * 0.05).toFixed(2)));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    setVideoUrl(inputUrl.trim());
    localStorage.setItem('led_signage_video_url', inputUrl.trim());
    setIsModalOpen(false);
  };

  const selectPreset = (url: string) => {
    setInputUrl(url);
  };

  const resetAdjustments = () => {
    setBrightness(100);
    setContrast(105);
    setSaturation(110);
    setDeinterlaceStrength(1.2);
    setIsDeinterlaceEnabled(true);
  };

  // Compile CSS filter string dynamically based on hardware adjustment sliders
  const filterString = [
    isDeinterlaceEnabled ? 'url(#deinterlace-y-blur)' : '',
    `brightness(${brightness}%)`,
    `contrast(${contrast}%)`,
    `saturate(${saturation}%)`
  ].filter(Boolean).join(' ');

  // CSS style for hardware deinterlacing & sub-pixel rendering filter applied directly on the iframe
  const iframeStyle: React.CSSProperties = {
    width: '764px',
    height: '430px',
    border: 'none',
    filter: filterString || 'blur(0.3px) contrast(1.05) saturate(1.1)',
    mixBlendMode: 'normal',
    transform: 'translate3d(0, 0, 0) scale(1.002)',
  };

  return (
    <div id="video-zone" className="w-[1200px] h-[430px] bg-[#020205] relative overflow-hidden flex items-center justify-between select-none group border-r border-white/10">
      
      {/* SVG vertical-only gaussian blur filter to perfectly merge interlace scanlines on rendering */}
      <svg width="0" height="0" className="absolute pointer-events-none" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="deinterlace-y-blur">
            <feGaussianBlur stdDeviation={`0, ${deinterlaceStrength}`} />
          </filter>
        </defs>
      </svg>

      {/* ==================== LEFT HUD SIDEBAR (218px) ==================== */}
      <div className="w-[218px] h-full flex flex-col justify-between p-4 border-r border-white/5 bg-black/40 font-mono text-[9px] text-zinc-500 z-10 relative">
        {/* Top telemetry alignment info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-1">
            <span className="font-bold flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping"></span>
              ALIGN_LOCK
            </span>
            <span className="text-zinc-600">HUD_L</span>
          </div>
          <div className="space-y-1 text-zinc-500">
            <div className="flex justify-between">
              <span>BOUND_X:</span>
              <span className="text-zinc-300 font-bold">218 PX</span>
            </div>
            <div className="flex justify-between">
              <span>BOUND_Y:</span>
              <span className="text-zinc-300 font-bold">430 PX</span>
            </div>
            <div className="flex justify-between">
              <span>RATIO_L:</span>
              <span className="text-cyan-400 font-bold">16:9_ALIGN</span>
            </div>
          </div>
        </div>

        {/* Middle: Micro Visual Waveform graphic */}
        <div className="space-y-2">
          <div className="text-[8px] text-zinc-600 font-black uppercase tracking-wider">Holographic Grid Link</div>
          <div className="h-16 flex items-end gap-[2px] bg-black/30 border border-white/5 rounded p-1.5 overflow-hidden">
            {[20, 45, 60, 30, 85, 40, 50, 70, 95, 35, 55, 65, 80, 25, 45, 60, 75, 90, 40, 50, 85, 30, 20, 60, 95, 70, 40].map((height, i) => (
              <span 
                key={i} 
                className="flex-1 bg-gradient-to-t from-cyan-950 to-cyan-400/80 rounded-sm"
                style={{ 
                  height: `${height}%`,
                  animation: `bounce ${1 + (i % 3) * 0.4}s ease-in-out infinite alternate`
                }} 
              />
            ))}
          </div>
          <div className="flex justify-between text-[7px] text-zinc-600">
            <span>CH_01_A</span>
            <span>FREQ: 48.0 KHZ</span>
          </div>
        </div>

        {/* Bottom system indicators */}
        <div className="space-y-1.5 border-t border-white/5 pt-2">
          <div className="flex justify-between">
            <span>RAM_BUFFER:</span>
            <span className="text-white font-bold">44.2 MB</span>
          </div>
          <div className="flex justify-between">
            <span>STREAM_FPS:</span>
            <span className="text-[#00f5d4] font-bold">{fps} FPS</span>
          </div>
          <div className="flex justify-between">
            <span>NET_JITTER:</span>
            <span className="text-rose-500 font-bold">{jitter} MS</span>
          </div>
        </div>
      </div>

      {/* ==================== CENTER 16:9 VIDEO CONTAINER (764px) ==================== */}
      <div className="w-[764px] h-[430px] flex-shrink-0 relative bg-black flex items-center justify-center z-10">
        
        {/* Four internal HUD L-shaped corner brackets exactly wrapping the 16:9 frame */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00f5d4]/80 pointer-events-none z-20" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00f5d4]/80 pointer-events-none z-20" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00f5d4]/80 pointer-events-none z-20" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00f5d4]/80 pointer-events-none z-20" />

        {/* Perfect Point-to-Point 16:9 iframe Player */}
        <iframe
          src={videoUrl}
          style={iframeStyle}
          className="w-full h-full relative z-0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Signage Broadcaster 16:9 Player"
        />

        {/* Elegant Pill Capsule with breathing red LIVE dot (centered absolute inside the 16:9 container) */}
        <div className="absolute top-5 left-5 z-20 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-[10px] font-sans font-black text-white tracking-widest uppercase flex items-center gap-1.5">
            🏆 赛事精彩直播 / 重温
          </span>
        </div>

        {/* Bottom Floating Stats Indicator within video */}
        <div className="absolute bottom-5 left-5 z-20 pointer-events-none flex flex-col gap-1 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[8px] font-mono text-zinc-400 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#00f5d4] animate-pulse"></span>
            <span className="text-white font-bold text-[7px] tracking-wider">HARDWARE ACCELERATION</span>
          </div>
          <div className="flex gap-3 text-zinc-500 mt-0.5">
            <span>BRT: <span className="text-cyan-400 font-bold">{brightness}%</span></span>
            <span>CNT: <span className="text-cyan-400 font-bold">{contrast}%</span></span>
            <span>SAT: <span className="text-cyan-400 font-bold">{saturation}%</span></span>
          </div>
        </div>

        {/* Controls Overlay Button on Hover - Settings (gear) and Sliders */}
        <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2">
          {/* Sliders picture adjustment trigger */}
          <button
            onClick={() => {
              setIsAdjustPanelOpen(!isAdjustPanelOpen);
              setIsModalOpen(false);
            }}
            className={`p-2.5 rounded-lg backdrop-blur-md transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.4)] border ${
              isAdjustPanelOpen 
                ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                : 'bg-black/50 hover:bg-black/90 text-white border-white/10 hover:border-cyan-500/50'
            }`}
            title="调节画面亮度/对比度/去交错"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Gear settings icon (Low opacity 0.05, highly hidden, becomes visible on hover) */}
          <button
            onClick={() => {
              setInputUrl(videoUrl);
              setIsModalOpen(true);
              setIsAdjustPanelOpen(false);
            }}
            className="p-2.5 rounded-lg backdrop-blur-md bg-black/50 hover:bg-black/90 text-white border border-white/10 hover:border-cyan-500/50 transition-all duration-300 opacity-[0.05] group-hover:opacity-100 shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
            title="设置解析播放器 / Setup Stream Link"
          >
            <Settings className="w-4 h-4 text-cyan-400 animate-spin-slow" style={{ animationDuration: '10s' }} />
          </button>
        </div>

        {/* Real-time Picture Adjust Panel - Black Hacker Glassmorphism style */}
        {isAdjustPanelOpen && (
          <div 
            className="absolute bottom-16 right-5 z-40 w-[260px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-bottom-3 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <h4 className="text-[9px] font-mono font-black text-white tracking-widest uppercase">HARDWARE FILTER PROFILE</h4>
              </div>
              <button 
                onClick={() => setIsAdjustPanelOpen(false)}
                className="text-zinc-500 hover:text-white p-0.5 rounded hover:bg-white/5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-[9px]">
              {/* Brightness */}
              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>BRIGHTNESS</span>
                  <span className="text-cyan-400 font-bold">{brightness}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Contrast */}
              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>CONTRAST</span>
                  <span className="text-cyan-400 font-bold">{contrast}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Saturation */}
              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>SATURATION</span>
                  <span className="text-cyan-400 font-bold">{saturation}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Deinterlace */}
              <div className="pt-2 border-t border-white/5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] text-zinc-400 uppercase tracking-wider">去交错消纹</span>
                  <button
                    type="button"
                    onClick={() => setIsDeinterlaceEnabled(!isDeinterlaceEnabled)}
                    className={`text-[8px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                      isDeinterlaceEnabled 
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                    }`}
                  >
                    {isDeinterlaceEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>

                {isDeinterlaceEnabled && (
                  <div>
                    <div className="flex justify-between text-zinc-500 mb-1">
                      <span>BLUR_Y STRENGTH</span>
                      <span className="text-emerald-400 font-bold">{deinterlaceStrength.toFixed(1)}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.0" 
                      max="3.0" 
                      step="0.1"
                      value={deinterlaceStrength}
                      onChange={(e) => setDeinterlaceStrength(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={resetAdjustments}
                  className="w-full py-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white rounded text-[8px] transition-colors"
                >
                  重置画质参数
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================== RIGHT HUD SIDEBAR (218px) ==================== */}
      <div className="w-[218px] h-full flex flex-col justify-between p-4 border-l border-white/5 bg-black/40 font-mono text-[9px] text-zinc-500 z-10 relative">
        {/* Top geographic nodes info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-1">
            <span className="font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              GEO_NODE_STNS
            </span>
            <span className="text-zinc-600">HUD_R</span>
          </div>
          <div className="space-y-1 text-zinc-500">
            <div className="flex justify-between">
              <span>MEX_DF:</span>
              <span className="text-zinc-400">19.43 N</span>
            </div>
            <div className="flex justify-between">
              <span>CAN_TO:</span>
              <span className="text-zinc-400">43.65 W</span>
            </div>
            <div className="flex justify-between">
              <span>USA_NY:</span>
              <span className="text-zinc-400">40.71 N</span>
            </div>
          </div>
        </div>

        {/* Middle: Micro compass / targeting crosshair graphics */}
        <div className="space-y-2 flex flex-col items-center justify-center py-2">
          <div className="w-16 h-16 rounded-full border border-zinc-800/80 flex items-center justify-center relative bg-black/20">
            <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-zinc-700/30 animate-spin" style={{ animationDuration: '15s' }} />
            <div className="absolute w-[50%] h-[50%] rounded-full border border-zinc-600/30" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-zinc-800/50" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-zinc-800/50" />
            <span className="text-[7px] text-cyan-400 font-bold z-10 scale-90">HUD_C1</span>
          </div>
          <span className="text-[7px] text-zinc-600 uppercase tracking-widest text-center">VECTOR ALIGN LOCK</span>
        </div>

        {/* Bottom decoder telemetry */}
        <div className="space-y-1.5 border-t border-white/5 pt-2">
          <div className="flex justify-between">
            <span>DECODER:</span>
            <span className="text-emerald-400 font-bold">HW_DND</span>
          </div>
          <div className="flex justify-between">
            <span>BITRATE:</span>
            <span className="text-white font-bold">{bitrate} KBPS</span>
          </div>
          <div className="flex justify-between">
            <span>LOSS_RATE:</span>
            <span className="text-[#00f5d4] font-bold">0.00%</span>
          </div>
        </div>
      </div>

      {/* SCANLINE SHADERS Overlay for filmic glass feeling */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20 z-20"></div>

      {/* Glassmorphic Settings Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div 
            className="w-[500px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 duration-200 relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal HUD corners */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-cyan-400/50 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-cyan-400/50 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-cyan-400/50 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-cyan-400/50 pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h4 className="text-xs font-mono font-black text-white tracking-widest uppercase flex items-center gap-2">
                  智能播控中心 / SIGNAGE MASTER CONTROL
                </h4>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] font-mono text-zinc-500 mb-1.5 uppercase tracking-widest">
                  自定义完整播放器地址 / PLAYBACK LINK (IFRAME RESOLVER)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-500">
                    <Link className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={e => setInputUrl(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 rounded-lg px-3 py-2 pl-8 text-[11px] text-white font-mono placeholder-zinc-700 transition-all outline-none"
                    placeholder="请输入新的播放器外壳完整解析链接..."
                  />
                </div>
                <p className="text-[8px] text-zinc-600 font-mono mt-1 uppercase tracking-wider">
                  ⚠️ 注意: 建议链接格式为 https://jx.zdplay.cc/m3u8Player/?url=视频源链接
                </p>
              </div>

              {/* Preset Streams Selection */}
              <div>
                <label className="block text-[9px] font-mono text-zinc-500 mb-1.5 uppercase tracking-widest">
                  快速切换世界杯与测试预设 / CHANNELS
                </label>
                <div className="space-y-1.5">
                  {PRESET_STREAMS.map((preset, index) => {
                    const isSelected = inputUrl.trim() === preset.url;
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => selectPreset(preset.url)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-[10px] border font-mono flex items-center justify-between transition-colors ${
                          isSelected 
                            ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.1)]' 
                            : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                        }`}
                      >
                        <span className="truncate">{preset.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg text-[10px] transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-lg text-[10px] font-black tracking-widest uppercase transition-colors shadow-lg shadow-cyan-950/20 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                  确认切换 / Play Stream
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
