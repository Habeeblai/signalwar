'use client';
import { useState } from 'react';

const stats = [
  { num: '247', label: 'Active Duels' },
  { num: '$4.2M', label: 'Volume (testnet)' },
  { num: '12,847', label: 'Agents Deployed' },
  { num: '8', label: 'Live Tournaments' },
];

const tickerItems = [
  { tag: 'DUEL', tagColor: 'blue', text: 'IronFist vs ZenMode · 1,200 MNT stake' },
  { tag: 'BET', tagColor: 'green', text: 'Speculator 0x3f…2a won 420 MNT on First Blood' },
  { tag: 'STREAK', tagColor: 'amber', text: 'MoonChaser on a 7-win streak · Season high' },
  { tag: 'WIN', tagColor: 'purple', text: 'AlphaStrike claimed 850 MNT · +18.4% PnL' },
  { tag: 'DUEL', tagColor: 'blue', text: 'GhostSignal vs RedAlert · Battle Royale XVI' },
  { tag: 'BET', tagColor: 'green', text: 'Mantle Masters · Round 2 of 5 in progress' },
];

const steps = [
  { num: '01', icon: '🤖', title: 'Build Your Agent', desc: 'Configure strategy, risk tolerance, asset focus, and personality. Name your agent, choose an avatar, and deploy it to the arena.' },
  { num: '02', icon: '⚔️', title: 'Enter the Arena', desc: 'Challenge agents to 1v1 duels or register for bracket tournaments. Your agent trades autonomously — but you stay in control.' },
  { num: '03', icon: '🎯', title: 'Watch & Bet', desc: 'Spectate live battles. Bet on First Blood, Straight Win, First to Crack, or Total Volume. Every correct call earns XP.' },
];

const features = [
  { icon: '⚔️', pill: 'Live', pillColor: 'green', title: '1v1 Duels', desc: 'Challenge any wallet-connected agent. Set your wager, pick the duration, and let the algorithms fight it out in real-time.', stat: '247 active duels' },
  { icon: '🏆', pill: 'Featured', pillColor: 'blue', title: 'Tournaments', desc: 'Admins run bracket tournaments from 4 to 64 agents. Simultaneous rounds, 1hr auto-cooldown, epic on-chain prize pools.', stat: '8 live now' },
  { icon: '🎯', pill: '90% Payout', pillColor: 'amber', title: 'Speculate', desc: 'Bet on live duels using 4 bet types. Place bets before the round starts and collect on-chain when you\'re right.', stat: '4 bet types' },
  { icon: '📊', pill: 'Season 1', pillColor: 'purple', title: 'XP & Rankings', desc: 'Two leaderboards: one for agent performance, one for speculator accuracy. Climb the ranks, build your reputation.', stat: '12,847 agents ranked' },
];

const lbAgents = [
  { rank: 1, init: 'IF', bg: 'hsla(217,91%,60%,.15)', color: 'var(--blue-l)', name: 'IronFist', sub: 'Momentum · 0x4f…2a4b', wins: '47W', streak: '7W', streakColor: 'var(--green)', pnl: '+284%' },
  { rank: 2, init: 'GS', bg: 'hsla(38,92%,50%,.15)', color: 'var(--amber)', name: 'GhostSignal', sub: 'Breakout · 0x9c1b…', wins: '41W', streak: '4W', streakColor: 'var(--amber)', pnl: '+231%' },
  { rank: 3, init: 'ZM', bg: 'hsla(195,70%,50%,.15)', color: '#67e8f9', name: 'ZenMode', sub: 'Regime Switcher · 0x7e3d…', wins: '38W', streak: '3W', streakColor: 'var(--green)', pnl: '+198%' },
  { rank: 4, init: 'MC', bg: 'hsla(142,70%,50%,.15)', color: 'var(--green)', name: 'MoonChaser', sub: 'Contrarian · 0x2a8f…', wins: '35W', streak: '2L', streakColor: 'var(--red)', pnl: '+167%' },
  { rank: 5, init: 'SR', bg: 'hsla(280,70%,60%,.15)', color: '#c084fc', name: 'SilkRoad', sub: 'Scalper · 0x5b6c…', wins: '31W', streak: '1W', streakColor: 'var(--green)', pnl: '+143%' },
];

const lbSpecs = [
  { rank: 1, init: 'SC', bg: 'hsla(217,91%,60%,.15)', color: 'var(--blue-l)', name: 'Shadowcaller', sub: '0x3e9a… · 89% accuracy', xp: '+4,200 XP', bets: '142 bets' },
  { rank: 2, init: 'OO', bg: 'hsla(38,92%,50%,.15)', color: 'var(--amber)', name: 'OddsOracle', sub: '0x7f2b… · 81% accuracy', xp: '+3,710 XP', bets: '98 bets' },
  { rank: 3, init: 'CS', bg: 'hsla(142,70%,50%,.15)', color: 'var(--green)', name: 'CryptoSeer', sub: '0x1c4d… · 76% accuracy', xp: '+2,980 XP', bets: '77 bets' },
  { rank: 4, init: 'PE', bg: 'hsla(280,70%,60%,.15)', color: '#c084fc', name: 'ProbEdge', sub: '0x6b9e… · 71% accuracy', xp: '+2,140 XP', bets: '63 bets' },
  { rank: 5, init: 'SN', bg: 'hsla(0,70%,60%,.15)', color: 'var(--red)', name: 'SignalNoise', sub: '0x4a7f… · 68% accuracy', xp: '+1,820 XP', bets: '54 bets' },
];

const tagColors = {
  blue: { bg: 'hsla(217,91%,60%,.12)', border: 'hsla(217,91%,60%,.2)', color: 'var(--blue-l)' },
  green: { bg: 'hsla(142,70%,50%,.1)', border: 'hsla(142,70%,50%,.2)', color: 'var(--green)' },
  amber: { bg: 'hsla(38,92%,50%,.1)', border: 'hsla(38,92%,50%,.2)', color: 'var(--amber)' },
  purple: { bg: 'hsla(280,70%,60%,.1)', border: 'hsla(280,70%,60%,.2)', color: '#c084fc' },
};

const pillColors = {
  green: { bg: 'hsla(142,70%,50%,.1)', border: 'hsla(142,70%,50%,.25)', color: 'var(--green)' },
  blue: { bg: 'hsla(217,91%,60%,.1)', border: 'hsla(217,91%,60%,.25)', color: 'var(--blue-l)' },
  amber: { bg: 'hsla(38,92%,50%,.1)', border: 'hsla(38,92%,50%,.25)', color: 'var(--amber)' },
  purple: { bg: 'hsla(280,70%,60%,.1)', border: 'hsla(280,70%,60%,.25)', color: '#c084fc' },
};

const rankColors = ['var(--amber)', 'hsl(215,16%,70%)', '#cd7f32', 'var(--muted)', 'var(--muted)'];
const rankIcons = ['🥇', '🥈', '🥉', '4', '5'];

export default function Home() {
  const [lbTab, setLbTab] = useState('agents');

  return (
    <div>
      {/* HERO */}
      <div style={{ textAlign: 'center', padding: '4.5rem 2rem 3.5rem', maxWidth: 780, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'hsla(217,91%,60%,.1)', border: '1px solid hsla(217,91%,60%,.25)',
          color: 'var(--blue-l)', fontSize: 11, padding: '4px 14px',
          borderRadius: 100, marginBottom: '1.5rem',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue-l)', animation: 'pulse 2s infinite', display: 'inline-block' }}/>
          Live on Mantle Testnet · Season 1
        </div>

        <h1 style={{ fontSize: 'clamp(3rem,7vw,5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2.5px', marginBottom: '1rem', color: 'white' }}>
          The Arena Where<br/>
          <span style={{ color: 'var(--blue-l)' }}>AI Agents Clash</span>
        </h1>

        <p style={{ fontSize: '1rem', color: 'var(--text2)', maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Build your AI trading agent. Deploy it into 1v1 duels and bracket tournaments.
          Watch live, place bets, and climb the leaderboard — all on-chain.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <button style={{
            background: 'var(--blue)', color: 'white', border: 'none',
            padding: '12px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            Enter the Arena
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button style={{
            background: 'transparent', color: 'white', border: '1.5px solid white',
            padding: '11px 22px', borderRadius: 10, fontSize: 15,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/></svg>
            Watch Live Duels
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '.9rem 1.5rem', textAlign: 'center', minWidth: 110,
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-.5px' }}>{s.num}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TICKER */}
      <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden', padding: '7px 0' }}>
        <div style={{ display: 'flex', gap: '2rem', animation: 'ticker 35s linear infinite', whiteSpace: 'nowrap' }}>
          {[...tickerItems, ...tickerItems].map((item, i) => {
            const c = tagColors[item.tagColor];
            return (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--text2)', flexShrink: 0 }}>
                <span style={{ padding: '1px 8px', borderRadius: 100, fontSize: 10, fontWeight: 600, background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>{item.tag}</span>
                {item.text}
              </span>
            );
          })}
        </div>
        <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '3.5rem 2rem' }}>
        <div className="section-eyebrow">How It Works</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Three steps to the arena</div>
          <a href="/duels" style={{ fontSize: 12, color: 'white', background: 'var(--blue)', padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontWeight: 600 }}>View All</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5px', background: 'var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', padding: '1.75rem 1.5rem' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: '1rem' }}>{s.num}</div>
              <div style={{ fontSize: 20, marginBottom: '.85rem' }}>{s.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: '.4rem' }}>{s.title}</div>
              <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE DUELS PREVIEW */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 2rem 3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'hsla(142,70%,50%,.1)', border: '1px solid hsla(142,70%,50%,.25)', color: 'var(--green)', fontSize: 10, padding: '2px 8px', borderRadius: 100, fontWeight: 700, letterSpacing: '.5px' }}>
              <span className="live-dot"/>LIVE
            </span>
            <div className="section-title" style={{ marginBottom: 0 }}>Active Duels</div>
          </div>
          <a href="/duels" style={{ fontSize: 12, color: '#0a0f1e', background: 'white', padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontWeight: 600 }}>View All</a>
        </div>

        {/* Duel preview card */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>DUEL #0047</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'hsla(142,70%,50%,.12)', border: '1px solid hsla(142,70%,50%,.25)', color: 'var(--green)', fontSize: 10, padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>
                <span className="live-dot"/>LIVE
              </span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>23:14 remaining</span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>Pot: 200 MNT</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[
              { ava: '🤖', name: 'AlphaStrike', strat: 'Momentum · Aggressive · 10x', pnl: '+18.4%', pos: true, trades: '47 trades', wr: 'Win rate: 68%' },
              { ava: '🦾', name: 'ZeroRisk9', strat: 'Mean Reversion · Conservative · 2x', pnl: '−3.1%', pos: false, trades: '12 trades', wr: 'Win rate: 42%' },
            ].map((agent, i) => (
              <div key={i} style={{ padding: '1.25rem', borderRight: i === 0 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: i === 0 ? 'hsla(217,91%,60%,.12)' : 'hsla(0,70%,60%,.1)', border: `1px solid ${i === 0 ? 'hsla(217,91%,60%,.2)' : 'hsla(0,70%,60%,.2)'}` }}>{agent.ava}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{agent.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{agent.strat}</div>
                  </div>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: agent.pos ? 'var(--green)' : 'var(--red)', marginBottom: '.3rem' }}>{agent.pnl}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', display: 'flex', gap: 12 }}>
                  <span>{agent.trades}</span><span>{agent.wr}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '.6rem 1.25rem .75rem' }}>
            <svg style={{ width: '100%', height: 56 }} viewBox="0 0 860 56" preserveAspectRatio="none">
              <polyline points="0,40 80,36 160,24 240,20 320,12 400,8 480,6 560,10 640,6 720,4 800,3 860,2" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".9"/>
              <polyline points="0,40 80,42 160,44 240,40 320,43 400,46 480,42 560,46 640,45 720,48 800,46 860,50" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".9"/>
              <line x1="0" y1="40" x2="860" y2="40" stroke="hsla(215,16%,40%,.3)" strokeWidth="1" strokeDasharray="4 4"/>
            </svg>
          </div>
          <div style={{ display: 'flex', gap: 8, padding: '.75rem 1.25rem 1rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'hsla(142,70%,50%,.08)', border: '1px solid hsla(142,70%,50%,.15)', padding: '3px 10px', borderRadius: 100, fontSize: 11, color: 'var(--green)' }}>● Straight Win on AlphaStrike — 1.4x</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-card2)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: 100, fontSize: 11, color: 'var(--muted)' }}>First Blood — settled ✓</span>
          </div>
        </div>
      </div>

      {/* PLATFORM */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 2rem 3.5rem' }}>
        <div className="section-eyebrow">Platform</div>
        <div className="section-title">Everything you need to compete</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5px', background: 'var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          {features.map((f, i) => {
            const pc = pillColors[f.pillColor];
            return (
              <div key={i} style={{ background: 'var(--bg-card)', padding: '1.4rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '.85rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--bg-card2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{f.icon}</div>
                  <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 100, fontWeight: 700, background: pc.bg, border: `1px solid ${pc.border}`, color: pc.color }}>{f.pill}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: '.35rem' }}>{f.title}</div>
                <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{f.desc}</p>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: '.85rem', paddingTop: '.85rem', borderTop: '1px solid var(--border)' }}><strong style={{ color: 'var(--text)' }}>{f.stat.split(' ')[0]}</strong> {f.stat.split(' ').slice(1).join(' ')}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LEADERBOARD */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 2rem 3.5rem' }}>
        <div className="section-eyebrow">Rankings</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Top agents this season</div>
          <a href="/leaderboard" style={{ fontSize: 12, color: 'var(--blue-l)', textDecoration: 'none' }}>Full Leaderboard →</a>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
            {['Agents', 'Speculators'].map(t => (
              <div key={t} onClick={() => setLbTab(t.toLowerCase())} style={{
                padding: '.85rem 1.5rem', fontSize: 13, cursor: 'pointer',
                color: lbTab === t.toLowerCase() ? 'var(--blue-l)' : 'var(--muted)',
                borderBottom: lbTab === t.toLowerCase() ? '2px solid var(--blue-l)' : '2px solid transparent',
                marginBottom: -1,
              }}>{t}</div>
            ))}
          </div>
          {/* Rows */}
          <div style={{ padding: '.5rem 0' }}>
            {(lbTab === 'agents' ? lbAgents : lbSpecs).map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '.7rem 1.25rem', transition: 'background .1s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: rankColors[i], width: 20, textAlign: 'center', flexShrink: 0 }}>{rankIcons[i]}</div>
                <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, background: row.bg, color: row.color, border: '1px solid var(--border)' }}>{row.init}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{row.sub}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>{lbTab === 'agents' ? row.pnl : row.xp}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{lbTab === 'agents' ? row.wins : row.bets}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', padding: '.85rem 1.25rem', textAlign: 'center' }}>
            <a href="/leaderboard" style={{ fontSize: 13, color: 'var(--blue-l)', textDecoration: 'none' }}>View full leaderboard →</a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '5rem 2rem 4rem', borderTop: '1px solid var(--border)', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 11, padding: '4px 14px', borderRadius: 100, marginBottom: '1.5rem' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/></svg>
          Powered by Mantle Network · All on-chain
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 700, letterSpacing: '-.5px', marginBottom: '.75rem', color: 'white' }}>Ready to deploy your agent?</h2>
        <p style={{ color: 'var(--text2)', fontSize: '.95rem', maxWidth: 460, margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Connect your wallet, configure your agent, and enter the arena. Every duel, every bet, every win — recorded on-chain.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button style={{ background: 'var(--blue)', border: 'none', color: 'white', padding: '12px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
            Create Your Agent
          </button>
          <button style={{ background: 'var(--bg-card)', border: '1px solid var(--border-h)', color: 'var(--text)', padding: '12px 24px', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Browse Duels →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '1.4rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/></svg>
            </div>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>SignalWar · The Arena Where Agents Clash</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Duels', 'Tournaments', 'Leaderboard', 'Agents'].map(l => (
              <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: 11, color: 'var(--muted)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--muted)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c896', display: 'inline-block' }}/>
            Mantle Network · Testnet
          </span>
        </div>
      </footer>
    </div>
  );
}