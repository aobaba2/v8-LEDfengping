import React, { useState, useEffect } from 'react';
import { SoccerMatch, LeagueStanding } from '../types';
import { INITIAL_MATCHES, LEAGUE_STANDINGS } from '../data';
import { Trophy, Calendar, Award, Zap, Terminal, ShieldAlert, Radio, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SportsZoneProps {
  matches?: SoccerMatch[];
  standings?: LeagueStanding[];
}

export const SportsZone: React.FC<SportsZoneProps> = ({
  matches = INITIAL_MATCHES,
  standings = LEAGUE_STANDINGS,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const AUTO_PLAY_INTERVAL = 6000; // 6 seconds auto-rotation

  // Filter matches
  const liveMatches = matches.filter(m => m.status === 'LIVE');
  const upcomingMatches = matches.filter(m => m.status === 'UPCOMING');
  const finishedMatches = matches.filter(m => m.status === 'FINISHED');

  // Auto-rotate tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab(prev => (prev + 1) % 3);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const TABS = [
    { id: 0, label: '01 LIVE', subtitle: '实时比分', color: 'text-emerald-400 border-emerald-500/20' },
    { id: 1, label: '02 STANDING', subtitle: '世界杯积分榜', color: 'text-cyan-400 border-cyan-500/20' },
    { id: 2, label: '03 FIXTURES', subtitle: '赛程与昨日赛果', color: 'text-amber-400 border-amber-500/20' },
  ];

  return (
    <div id="sports-zone" className="w-[680px] h-[430px] bg-[#020205] flex flex-col border-r border-white/10 relative overflow-hidden select-none">
      
      {/* 1. Cyber HUD Background Effects (Radar Scan & Scanning Laser) */}
      <div className="absolute inset-0 bg-[#020205] bg-gradient-to-br from-[#020205] via-[#090b15] to-[#030308] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Laser Scan line */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none animate-laser z-10" />

      {/* Cyber radar background in the corner */}
      <div className="absolute top-12 right-6 w-32 h-32 opacity-[0.06] pointer-events-none z-0">
        <div className="w-full h-full rounded-full border border-cyan-500 flex items-center justify-center relative">
          <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-cyan-500/60" />
          <div className="absolute w-[50%] h-[50%] rounded-full border border-cyan-500/40" />
          <div className="absolute w-full h-[1px] bg-cyan-500/50" />
          <div className="absolute h-full w-[1px] bg-cyan-500/50" />
          {/* Sweeper */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 origin-bottom-right bg-gradient-to-br from-cyan-500/40 to-transparent rounded-tl-full animate-radar" />
        </div>
      </div>

      {/* 2. Cyberpunk Premium HUD Header */}
      <div className="h-[65px] min-h-[65px] px-6 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-3">
          {/* High-tech Neon Logo Badge with custom styling */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded border border-[#00f5d4]/40 bg-[#00f5d4]/5 shadow-[0_0_15px_rgba(0,245,212,0.15)]">
            <Radio className="w-5 h-5 text-[#00f5d4] animate-pulse" />
            <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-[#00f5d4]" />
            <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00f5d4]" />
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-rose-500" />
            <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-display font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-cyan-400 uppercase">
                2026 美加墨世界杯
              </h2>
              <span className="text-[7px] font-mono bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 px-1 py-0.2 rounded font-black tracking-widest">
                HUD SYS V3
              </span>
            </div>
            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1 mt-0.5">
              <Terminal className="w-2.5 h-2.5 text-[#00f5d4]" />
              CYBER_DATABASE_HUB // STREAMING_ONLINE
            </p>
          </div>
        </div>

        {/* HUD Telemetry Details */}
        <div className="flex items-center gap-4 text-right font-mono text-[9px] text-zinc-400 bg-white/3 border border-white/8 px-3 py-1 rounded-md backdrop-blur-sm">
          <div className="flex flex-col">
            <span className="text-[7px] text-zinc-500 uppercase leading-none">BANDWIDTH</span>
            <span className="text-[#00f5d4] font-bold">1.2 GB/S</span>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[7px] text-zinc-500 uppercase leading-none">STATUS</span>
            <span className="text-rose-500 font-bold flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-rose-500 animate-ping" />
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* 3. Cyberpunk Styled HUD Navigation Tabs */}
      <div className="h-[44px] min-h-[44px] px-4 bg-black/60 border-b border-white/10 flex items-center justify-between z-20 gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-between h-8 px-3 rounded-lg transition-all relative border ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/40 via-zinc-950/80 to-cyan-950/20 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.12)] text-white'
                  : 'bg-white/3 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <span className={`text-[10px] font-mono font-black tracking-widest ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`}>
                {tab.label}
              </span>
              <span className="text-[10px] font-sans font-bold tracking-wider">
                {tab.subtitle}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent shadow-[0_0_8px_#00f5d4]" />
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Active Content View - Smooth fluid slide fade to the right */}
      <div className="flex-1 p-5 relative z-10 flex flex-col justify-center overflow-hidden">
        
        {/* HUD corners layout */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/20 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/20 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/20 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/20 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full flex flex-col justify-center"
          >
            {/* VIEW 0: LIVE SCOREBOARD */}
            {activeTab === 0 && (
              <div className="space-y-4 w-full">
                {liveMatches.length === 0 ? (
                  <div className="text-center py-10 bg-white/2 border border-white/5 rounded-xl p-6">
                    <ShieldAlert className="w-8 h-8 text-rose-500 mx-auto mb-2 animate-pulse" />
                    <p className="text-xs text-zinc-500 font-mono">NO ACTIVE LIVE CYBER_MATCHES</p>
                  </div>
                ) : (
                  liveMatches.map((match) => (
                    <div
                      key={`live-tab-${match.id}`}
                      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-4 relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                    >
                      {/* Top status bar inside card */}
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-600 to-amber-600 text-[9px] font-mono text-white px-3 py-1 rounded-bl-lg font-black tracking-widest flex items-center gap-1.5 shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>LIVE {match.minute}</span>
                      </div>

                      {/* Header in-card Info */}
                      <div className="text-[10px] font-mono font-bold text-[#00f5d4] mb-3.5 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
                        <span className="tracking-widest uppercase text-zinc-300">{match.league}</span>
                      </div>

                      {/* Main Team vs Team Display (Highly readable country names and digital scores) */}
                      <div className="grid grid-cols-11 items-center bg-black/40 rounded-xl border border-white/5 p-3 relative">
                        {/* Home Team (Left 4 cols) */}
                        <div className="col-span-4 flex items-center gap-3 min-w-0">
                          <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] flex-shrink-0">{match.homeLogo}</span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-base font-sans font-black text-white truncate uppercase tracking-wider">{match.homeTeam}</span>
                            <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-bold">HOME // 主队</span>
                          </div>
                        </div>
                        
                        {/* VS Divider & Score Board (Center 3 cols) */}
                        <div className="col-span-3 flex flex-col items-center justify-center">
                          <div className="flex items-center justify-center gap-3 px-4 py-1.5 bg-[#070913] border-2 border-cyan-500/50 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                            <span className="text-3xl font-mono font-black text-rose-500 cyber-glow-rose leading-none filter drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]">
                              {match.homeScore}
                            </span>
                            <span className="text-zinc-500 font-bold text-xs font-mono">vs</span>
                            <span className="text-3xl font-mono font-black text-rose-500 cyber-glow-rose leading-none filter drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]">
                              {match.awayScore}
                            </span>
                          </div>
                        </div>

                        {/* Away Team (Right 4 cols) */}
                        <div className="col-span-4 flex items-center gap-3 justify-end text-right min-w-0">
                          <div className="flex flex-col min-w-0">
                            <span className="text-base font-sans font-black text-white truncate uppercase tracking-wider">{match.awayTeam}</span>
                            <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest font-bold">AWAY // 客队</span>
                          </div>
                          <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] flex-shrink-0">{match.awayLogo}</span>
                        </div>
                      </div>

                      {/* Event logs / timeline */}
                      {match.events && match.events.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap gap-2 text-[10px] text-zinc-400 font-mono">
                          {match.events.map((evt, idx) => (
                            <span
                              key={idx}
                              className="flex items-center gap-1.5 bg-white/3 px-2 py-1 rounded border border-white/5 text-[9px] hover:border-cyan-500/30 transition-colors"
                            >
                              <span className="text-rose-500 font-black">{evt.minute}</span>
                              <span className="text-xs scale-95 leading-none">{evt.type === 'goal' ? '⚽' : '🟨'}</span>
                              <span className="text-zinc-200 font-sans font-bold">{evt.player}</span>
                              <span className="text-[8px] text-zinc-500">({evt.team === 'home' ? '主' : '客'})</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* VIEW 1: STANDINGS */}
            {activeTab === 1 && (
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)] h-full flex flex-col justify-between">
                <div className="text-[10px] font-mono font-black text-[#00f5d4] mb-3 flex items-center justify-between">
                  <span className="tracking-widest uppercase flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    2026 美加墨世界杯积分榜 / STANDINGS DATA
                  </span>
                  <span className="text-zinc-500 text-[8px] font-bold">LIVE SYNC</span>
                </div>

                <div className="overflow-hidden flex-1 flex flex-col justify-center">
                  <table className="w-full text-left border-collapse font-mono text-[11px] leading-relaxed">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-500 text-[9px]">
                        <th className="py-1.5 px-3 font-black uppercase text-center w-12">排名</th>
                        <th className="py-1.5 px-3 font-black uppercase">球队名称 COUNTRY</th>
                        <th className="py-1.5 px-3 text-center font-black uppercase w-16">已赛</th>
                        <th className="py-1.5 px-3 text-center font-black uppercase w-16">净胜</th>
                        <th className="py-1.5 px-4 text-right font-black uppercase text-cyan-400 w-16">积分 PTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {standings.map((team, index) => {
                        const isTop = index < 3;
                        return (
                          <tr key={`stand-tab-${index}`} className="text-zinc-300 hover:bg-white/5 transition-colors">
                            <td className="py-2 px-3 text-center">
                              {team.rank === 1 ? (
                                <span className="inline-block px-1.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-bold text-[8px] shadow-[0_0_8px_rgba(234,179,8,0.2)]">01</span>
                              ) : team.rank === 2 ? (
                                <span className="inline-block px-1.5 py-0.5 rounded bg-zinc-300/10 border border-zinc-300/30 text-zinc-300 font-bold text-[8px]">02</span>
                              ) : team.rank === 3 ? (
                                <span className="inline-block px-1.5 py-0.5 rounded bg-amber-600/10 border border-amber-600/30 text-amber-500 font-bold text-[8px]">03</span>
                              ) : (
                                <span className="text-zinc-500 font-bold">{team.rank}</span>
                              )}
                            </td>
                            <td className="py-2 px-3 font-sans font-black text-white text-xs tracking-wider">
                              <span className="hover:text-cyan-400 transition-colors cursor-default">{team.team}</span>
                            </td>
                            <td className="py-2 px-3 text-center text-zinc-400 font-bold">{team.played}</td>
                            <td className={`py-2 px-3 text-center font-bold ${team.gd.startsWith('+') ? 'text-emerald-400' : team.gd === '0' ? 'text-zinc-500' : 'text-rose-400'}`}>{team.gd}</td>
                            <td className="py-2 px-4 text-right font-black text-cyan-400 text-xs cyber-glow-cyan">{team.points}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW 2: FIXTURES & HISTORICAL */}
            {activeTab === 2 && (
              <div className="space-y-4 h-full flex flex-col justify-between">
                {/* Upcoming Fixtures */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                  <div className="text-[10px] font-mono font-black text-amber-500 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span className="tracking-widest uppercase text-zinc-300">📅 下场赛事预告 / UPCOMING FIXTURES</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {upcomingMatches.map((match) => (
                      <div
                        key={`up-tab-${match.id}`}
                        className="bg-black/40 border border-white/5 rounded-lg p-2.5 relative"
                      >
                        <div className="text-[9px] font-mono font-bold text-amber-400/90 mb-1.5 flex items-center justify-between">
                          <span className="truncate max-w-[60%]">{match.league}</span>
                          <span className="bg-amber-950/20 text-[8px] px-1.5 py-0.5 rounded text-amber-400 border border-amber-500/20 font-bold">
                            {match.matchTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-0.5 font-sans">
                          <span className="text-xs font-black text-white truncate max-w-[42%]">{match.homeTeam}</span>
                          <span className="text-[9px] text-zinc-500 font-mono font-bold border border-white/10 px-1 bg-black rounded">VS</span>
                          <span className="text-xs font-black text-white truncate max-w-[42%] text-right">{match.awayTeam}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recaps */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                  <div className="text-[10px] font-mono font-black text-[#00f5d4] mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#00f5d4]" />
                    <span className="tracking-widest uppercase text-zinc-300">🏆 昨日赛果回顾 / FINISHED RESULTS</span>
                  </div>

                  <div className="space-y-1.5">
                    {finishedMatches.map((match) => (
                      <div
                        key={`fin-tab-${match.id}`}
                        className="bg-black/30 border border-white/5 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-zinc-400"
                      >
                        <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{match.league}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-zinc-200 font-sans">{match.homeTeam}</span>
                          <span className="bg-cyan-950/20 px-2 py-0.5 rounded font-mono font-black text-cyan-400 border border-cyan-500/20 text-xs shadow-[0_0_8px_rgba(6,182,212,0.15)]">
                            {match.homeScore} - {match.awayScore}
                          </span>
                          <span className="font-black text-zinc-200 font-sans">{match.awayTeam}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5. Cyberpunk Bottom Progress bar line */}
      <div className="h-1 bg-black w-full relative z-20 overflow-hidden border-t border-white/5">
        <motion.div
          key={activeTab}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: 'linear' }}
          className="h-full bg-gradient-to-r from-[#00f5d4] to-cyan-500 shadow-[0_0_8px_rgba(0,245,212,0.6)]"
        />
      </div>
    </div>
  );
};
