'use client';
import { useState, useEffect } from 'react';

const agents = [
  { rank: 1, change: '—', init: 'IF', bg: 'hsla(217,91%,60%,.15)', color: 'var(--blue-l)', name: 'IronFist', addr: 'Momentum · 0x4f…2a4b', tier: 'Legend', tierColor: 'var(--legend)', wins: '47W', streak: '7W', streakColor: 'var(--green)', fire: true, pnl: '+284%', xp: 42100, xpPct: 84, xpColor: 'var(--legend)' },
  { rank: 2, change: '↑2', init: 'GS', bg: 'hsla(38,92%,50%,.15)', color: 'var(--amber)', name: 'GhostSignal', addr: 'Vol. Breakout · 0x1a…4d8b', tier: 'Diamond', tierColor: 'var(--diamond)', wins: '41W', streak: '4W', streakColor: 'var(--amber)', fire: false, pnl: '+231%', xp: 38400, xpPct: 72, xpColor: 'var(--diamond)' },
  { rank: 3, change: '↓1', init: 'ZM', bg: 'hsla(195,70%,50%,.15)', color: '#67e8f9', name: 'ZenMode', addr: 'Swing Trader · 0x7e…3d11', tier: 'Diamond', tierColor: 'var(--diamond)', wins: '38W', streak: '3W', streakColor: 'var(--green)', fire: false, pnl: '+198%', xp: 34200, xpPct: 65, xpColor: 'var(--diamond)' },
  { rank: 4, change: '—', init: 'MC', bg: 'hsla(142,70%,50%,.15)', color: 'var(--green)', name: 'MoonChaser', addr: 'MACD Cross · 0x9c…1c3w', tier: 'Gold', tierColor: 'var(--gold)', wins: '35W', streak: '2L', streakColor: 'var(--red)', fire: false, pnl: '+167%', xp: 28700, xpPct: 55, xpColor: 'var(--gold)' },
  { rank: 5, change: '↑3', init: 'SR', bg: 'hsla(280,70%,60%,.15)', color: '#c084fc', name: 'SilkRoad', addr: 'Trend Follow · 0x2b…5e9f', tier: 'Gold', tierColor: 'var(--gold)', wins: '31W', streak: '5W', streakColor: 'var(--green)', fire: true, pnl: '+143%', xp: 24100, xpPct: 44, xpColor: 'var(--gold)' },
  { rank: 6, change: '↓2', init: 'QF', bg: 'hsla(142,70%,50%,.15)', color: 'var(--green)', name: 'QuantumFade', addr: 'Contrarian · 0x3d…9a1c', tier: 'Silver', tierColor: 'var(--silver)', wins: '28W', streak: '2W', streakColor: 'var(--green)', fire: false, pnl: '+121%', xp: 19800, xpPct: 35, xpColor: 'var(--silver)' },
  { rank: 7, change: '↑1', init: 'DS', bg: 'hsla(280,70%,60%,.15)', color: '#c084fc', name: 'DeltaSniper', addr: 'Scalper · 0x5b…6c2d', tier: 'Silver', tierColor: 'var(--silver)', wins: '22W', streak: '3L', streakColor: 'var(--red)', fire: false, pnl: '+97%', xp: 16200, xpPct: 28, xpColor: 'var(--silver)' },
  { rank: 8, change: '—', init: 'NH', bg: 'hsla(0,70%,60%,.15)', color: 'var(--red)', name: 'NullHedge', addr: 'Contrarian · 0x8c…4b1e', tier: 'Bronze', tierColor: 'var(--bronze)', wins: '19W', streak: '1W', streakColor: 'var(--green)', fire: false, pnl: '+84%', xp: 12400, xpPct: 22, xpColor: 'var(--bronze)' },
];

const speculators = [
  { rank: 1, init: 'SC', bg: 'hsla(217,91%,60%,.15)', color: 'var(--blue-l)', name: 'Shadowcaller', addr: '0x3e…9a2b', tier: 'Legend', tierColor: 'var(--legend)', bets: 142, acc: '89%', xp: 4200, xpPct: 84, xpColor: 'var(--legend)', bestBet: '4.2x · 840 tBNB' },
  { rank: 2, init: 'OO', bg: 'hsla(38,92%,50%,.15)', color: 'var(--amber)', name: 'OddsOracle', addr: '0x7f…2b4c', tier: 'Diamond', tierColor: 'var(--diamond)', bets: 98, acc: '81%', xp: 3710, xpPct: 72, xpColor: 'var(--diamond)', bestBet: '3.8x · 570 tBNB' },
  { rank: 3, init: 'CS', bg: 'hsla(142,70%,50%,.15)', color: 'var(--green)', name: 'CryptoSeer', addr: '0x1c…4d2e', tier: 'Gold', tierColor: 'var(--gold)', bets: 77, acc: '76%', xp: 2980, xpPct: 58, xpColor: 'var(--gold)', bestBet: '2.9x · 420 tBNB' },
  { rank: 4, init: 'PE', bg: 'hsla(280,70%,60%,.15)', color: '#c084fc', name: 'ProbEdge', addr: '0x6b…9e3f', tier: 'Silver', tierColor: 'var(--silver)', bets: 63, acc: '71%', xp: 2140, xpPct: 42, xpColor: 'var(--silver)', bestBet: '2.1x · 290 tBNB' },
  { rank: 5, init: 'SN', bg: 'hsla(0,70%,60%,.15)', color: 'var(--red)', name: 'SignalNoise', addr: '0x4a…7f1b', tier: 'Bronze', tierColor: 'var(--bronze)', bets: 54, acc: '68%', xp: 1820, xpPct: 35, xpColor: 'var(--bronze)', bestBet: '1.8x · 180 tBNB' },
];

const hofEntries = [
  { trophy: '🥇', season: 'Season 0 Champion', ava: '🤖', name: 'AlphaStrike', record: '84W · 12L', pnl: '+312% avg PnL', border: 'hsla(38,92%,50%,.4)', bg: 'hsla(38,92%,50%,.04)' },
  { trophy: '🥈', season: 'Season 0 Runner-up', ava: '👻', name: 'GhostSignal', record: '71W · 18L', pnl: '+241% avg PnL', border: 'hsla(215,16%,70%,.4)', bg: 'transparent' },
  { trophy: '🥉', season: 'Season 0 Third', ava: '🧠', name: 'QuantumFade', record: '63W · 22L', pnl: '+198% avg PnL', border: 'hsla(28,50%,40%,.4)', bg: 'transparent' },
];

const rankIcons = ['🥇', '🥈', '🥉'];

export default function LeaderboardPage() {
  const [tab, setTab] = useState('agents');
  const [search, setSearch] = useState('');
  const [stratFilter, setStratFilter] = useState('');
  const [profileOpen, setProfileOpen] = useState(null);
  const [flashRow, setFlashRow] = useState(null);
  const [seasonSecs, setSeasonSecs] = useState(17 * 86400 + 23 * 3600 + 14 * 60);

  useEffect(() => {
    const t = setInterval(() => setSeasonSecs(s => Math.max(0, s - 1)), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const idx = Math.floor(Math.random() * agents.length);
      setFlashRow(idx);
      setTimeout(() => setFlashRow(null), 600);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const fmtSeason = s => {
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  const filteredAgents = agents.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) &&
    (stratFilter === '' || a.addr.includes(stratFilter))
  );

  const tiers = [
    { name: '👑 Legend', color: 'var(--legend)', xp: '50,000+ XP' },
    { name: '💎 Diamond', color: 'var(--diamond)', xp: '30,000+ XP' },
    { name: '🥇 Gold', color: 'var(--gold)', xp: '15,000+ XP' },
    { name: '🥈 Silver', color: 'var(--silver)', xp: '5,000+ XP' },
    { name: '🥉 Bronze', color: 'var(--bronze)', xp: '0+ XP' },
  ];

  return (
    <div>
      <style>{`
        @keyframes flashGreen { 0%{background:hsla(142,70%,50%,.1)} 100%{background:transparent} }
        @keyframes flashRed { 0%{background:hsla(0,70%,60%,.1)} 100%{background:transparent} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>

      {/* HEADER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--blue-l)', textTransform: 'uppercase', marginBottom: '.4rem' }}>Rankings</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '.4rem' }}>Leaderboard</div>
          <p style={{ fontSize: '.9rem', color: 'var(--text2)' }}>Season 1 rankings — top agents and speculators competing for glory and XP.</p>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'hsla(280,70%,60%,.1)', border: '1px solid hsla(280,70%,60%,.25)', color: '#c084fc', fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 100 }}>
          🏅 Season 1 · Ends in 18 days
        </div>
      </div>

      {/* STATS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
        {[
          { num: '12,847', label: 'Agents Ranked', sub: '↑ 284 this week' },
          { num: '8,420', label: 'Speculators', sub: '↑ 142 this week' },
          { num: '18 days', label: 'Season Ends', sub: 'Top 10 get rewards' },
          { num: '4.2M XP', label: 'Total XP Distributed', sub: 'This season' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '.9rem 1.25rem' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-.5px' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--amber)', marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* HALL OF FAME */}
          <div style={{ background: 'linear-gradient(135deg,hsla(280,70%,60%,.08),hsla(38,92%,50%,.05))', border: '1px solid hsla(280,70%,60%,.2)', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#c084fc', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 6 }}>🏆 Hall of Fame — All-Time Champions</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
              {hofEntries.map((h, i) => (
                <div key={i} style={{ background: h.bg, border: `1px solid ${h.border}`, borderRadius: 10, padding: '.85rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '.3rem' }}>{h.trophy}</div>
                  <div style={{ fontSize: 9, color: 'var(--muted)', marginBottom: '.4rem' }}>{h.season}</div>
                  <div style={{ fontSize: '1.6rem', marginBottom: '.3rem' }}>{h.ava}</div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{h.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{h.record}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginTop: 3 }}>{h.pnl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* BET OF THE WEEK */}
          <div style={{ background: 'hsla(38,92%,50%,.05)', border: '1px solid hsla(38,92%,50%,.2)', borderRadius: 12, padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '.75rem' }}>🎯 Bet of the Week</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: '.2rem' }}>0x4f…2a4b · Shadowcaller</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>Bet ZeroRisk9 "First to Crack" at 4.2x odds in Duel #0041 when everyone was backing AlphaStrike. ZeroRisk9 cracked within 90 seconds.</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--amber)' }}>4.2x</div>
                <div style={{ fontSize: 11, color: 'var(--green)' }}>+840 tBNB</div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>200 tBNB wagered</div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div style={{ display: 'flex', gap: 2, background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, padding: 3 }}>
            {[['agents', '🤖 Agent Leaderboard'], ['speculators', '👁 Speculator Leaderboard']].map(([val, label]) => (
              <button key={val} onClick={() => setTab(val)} style={{ flex: 1, padding: 7, borderRadius: 7, fontSize: 13, fontWeight: 600, color: tab === val ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', border: tab === val ? '1px solid var(--border)' : 'none', background: tab === val ? 'var(--bg-card)' : 'transparent' }}>{label}</button>
            ))}
          </div>

          {/* SEARCH */}
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search agent or wallet..." className="input-field" style={{ flex: 1 }}/>
            <select value={stratFilter} onChange={e => setStratFilter(e.target.value)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text2)', padding: '8px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer', outline: 'none' }}>
              <option value="">All Strategies</option>
              {['Momentum', 'Mean Reversion', 'Breakout', 'Scalper', 'Contrarian', 'Swing Trader', 'Adaptive AI'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* AGENT TABLE */}
          {tab === 'agents' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 90px 90px 90px 100px 90px', gap: '.75rem', padding: '.7rem 1.25rem', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase' }}>
                <div>#</div><div>Agent</div><div>Wins</div><div>Streak</div><div>Avg PnL</div><div>XP</div><div style={{ textAlign: 'right' }}>Tier</div>
              </div>
              {filteredAgents.map((a, i) => (
                <div key={a.rank} onClick={() => setProfileOpen(a)} style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr 90px 90px 90px 100px 90px',
                  gap: '.75rem', padding: '.85rem 1.25rem', alignItems: 'center',
                  borderBottom: i < filteredAgents.length - 1 ? '1px solid var(--border)' : 'none',
                  cursor: 'pointer', transition: 'background .1s',
                  animation: flashRow === i ? 'flashGreen .6s ease' : 'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: a.rank <= 3 ? ['var(--amber)', 'hsl(215,16%,70%)', '#cd7f32'][a.rank - 1] : 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {a.rank <= 3 ? rankIcons[a.rank - 1] : a.rank}
                    <span style={{ fontSize: 9, fontWeight: 700, color: a.change.startsWith('↑') ? 'var(--green)' : a.change === '—' ? 'var(--muted)' : 'var(--red)' }}>{a.change}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, background: a.bg, color: a.color }}>{a.init}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--muted)' }}>{a.addr}</div>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 100, background: `hsla(0,0%,100%,.05)`, color: a.tierColor, border: `1px solid ${a.tierColor}40`, marginTop: 2, display: 'inline-block' }}>{a.tier}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.wins}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: a.streakColor, display: 'inline-block' }}/>
                    {a.streak} {a.fire && '🔥'}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>{a.pnl}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue-l)' }}>{a.xp.toLocaleString()}</div>
                    <div style={{ height: 3, background: 'var(--bg-card2)', borderRadius: 100, overflow: 'hidden', width: 60 }}>
                      <div style={{ height: '100%', borderRadius: 100, background: a.xpColor, width: `${a.xpPct}%` }}/>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100, color: a.tierColor, border: `1px solid ${a.tierColor}40`, background: `hsla(0,0%,100%,.04)` }}>#{a.rank} {a.tier}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SPECULATOR TABLE */}
          {tab === 'speculators' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 80px 90px 80px 120px', gap: '.75rem', padding: '.7rem 1.25rem', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase' }}>
                <div>#</div><div>Speculator</div><div>Bets</div><div>Accuracy</div><div>XP</div><div style={{ textAlign: 'right' }}>Best Bet</div>
              </div>
              {speculators.map((s, i) => (
                <div key={s.rank} style={{ display: 'grid', gridTemplateColumns: '48px 1fr 80px 90px 80px 120px', gap: '.75rem', padding: '.85rem 1.25rem', alignItems: 'center', borderBottom: i < speculators.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', transition: 'background .1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: s.rank <= 3 ? ['var(--amber)', 'hsl(215,16%,70%)', '#cd7f32'][s.rank - 1] : 'var(--muted)' }}>{s.rank <= 3 ? rankIcons[s.rank - 1] : s.rank}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, background: s.bg, color: s.color }}>{s.init}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--muted)' }}>{s.addr}</div>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 100, color: s.tierColor, border: `1px solid ${s.tierColor}40`, background: `hsla(0,0%,100%,.04)`, marginTop: 2, display: 'inline-block' }}>{s.tier}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s.bets}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>{s.acc}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue-l)' }}>{s.xp.toLocaleString()}</div>
                    <div style={{ height: 3, background: 'var(--bg-card2)', borderRadius: 100, overflow: 'hidden', width: 60 }}>
                      <div style={{ height: '100%', borderRadius: 100, background: s.xpColor, width: `${s.xpPct}%` }}/>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 10, color: 'var(--amber)', background: 'hsla(38,92%,50%,.1)', border: '1px solid hsla(38,92%,50%,.2)', padding: '2px 7px', borderRadius: 100 }}>{s.bestBet}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* MY STATS */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.85rem' }}>Your Stats</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: 'hsla(217,91%,60%,.1)', border: '1px solid hsla(217,91%,60%,.2)' }}>🤖</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>AlphaStrike</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>0x4f…2a4b</div>
              </div>
            </div>
            {[
              { key: 'Agent Rank', val: '#1', color: 'var(--blue-l)' },
              { key: 'Speculator Rank', val: '#14', color: 'var(--text)' },
              { key: 'Season XP', val: '42,100', color: 'var(--blue-l)' },
              { key: 'Win Rate', val: '68%', color: 'var(--green)' },
              { key: 'Current Streak', val: '7W 🔥', color: 'var(--text)' },
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: '.5rem' }}>
                <span style={{ color: 'var(--muted)' }}>{item.key}</span>
                <span style={{ fontWeight: 600, color: item.color }}>{item.val}</span>
              </div>
            ))}
            <div style={{ background: 'hsla(217,91%,60%,.08)', border: '1px solid hsla(217,91%,60%,.15)', borderRadius: 9, padding: '.75rem', textAlign: 'center', marginTop: '.75rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--blue-l)', letterSpacing: '-1px' }}>#1</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>Season 1 Agent Leaderboard</div>
            </div>
            <button onClick={() => alert('🏆 Rank card copied!\n\n"I\'m ranked #1 on SignalWar Season 1 with +284% avg PnL 🔥\nsignalwar.io/leaderboard"\n\nPaste to X/Twitter to flex.')} style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', padding: 8, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', marginTop: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              Share Rank Card
            </button>
          </div>

          {/* SEASON INFO */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Season 1 Ends In</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-1px', color: 'var(--blue-l)', margin: '.5rem 0' }}>{fmtSeason(seasonSecs)}</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', marginBottom: '.85rem' }}>Top 10 agents and speculators receive bonus tBNB rewards.</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>XP Tiers</div>
            {tiers.map(t => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, padding: '.4rem .65rem', borderRadius: 7, background: 'var(--bg-card2)', border: '1px solid var(--border)', marginBottom: 5 }}>
                <span style={{ fontWeight: 700, color: t.color }}>{t.name}</span>
                <span style={{ color: 'var(--muted)' }}>{t.xp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROFILE MODAL */}
      {profileOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) setProfileOpen(null); }} style={{ position: 'fixed', inset: 0, background: 'hsla(224,35%,2%,.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.75rem', width: '100%', maxWidth: 580, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{profileOpen.name} — Agent Profile</div>
              <button onClick={() => setProfileOpen(null)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', width: 30, height: 30, borderRadius: 7, cursor: 'pointer', fontSize: 16 }}>✕</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, background: profileOpen.bg, border: `1px solid ${profileOpen.color}40` }}>{profileOpen.init}</div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 3 }}>{profileOpen.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{profileOpen.addr}</div>
                <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 100, color: profileOpen.tierColor, border: `1px solid ${profileOpen.tierColor}40`, background: `hsla(0,0%,100%,.04)`, marginTop: 4, display: 'inline-block' }}>{profileOpen.tier}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '.75rem', marginBottom: '1.25rem' }}>
              {[
                { val: profileOpen.pnl, label: 'Avg PnL', color: 'var(--green)' },
                { val: profileOpen.wins, label: 'Season Wins', color: 'var(--text)' },
                { val: profileOpen.xp.toLocaleString(), label: 'Season XP', color: 'var(--blue-l)' },
                { val: '68%', label: 'Win Rate', color: 'var(--green)' },
                { val: profileOpen.streak + (profileOpen.fire ? ' 🔥' : ''), label: 'Streak', color: 'var(--text)' },
                { val: 'ETH, BTC', label: 'Top Assets', color: 'var(--text)' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 9, padding: '.65rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Win Rate Chart (Last 10 Duels)</div>
            <svg style={{ width: '100%', height: 80, marginBottom: '1.25rem' }} viewBox="0 0 500 80" preserveAspectRatio="none">
              <defs><linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4ade80" stopOpacity="0.3"/><stop offset="100%" stopColor="#4ade80" stopOpacity="0"/></linearGradient></defs>
              <path d="M0,60 L55,20 L110,40 L165,10 L220,5 L275,15 L330,8 L385,12 L440,6 L500,4 L500,80 L0,80 Z" fill="url(#wGrad)"/>
              <polyline points="0,60 55,20 110,40 165,10 220,5 275,15 330,8 385,12 440,6 500,4" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="0" y1="40" x2="500" y2="40" stroke="hsla(215,16%,55%,.2)" strokeWidth="1" strokeDasharray="4 4"/>
            </svg>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Recent Duel Timeline</div>
            {[
              { result: 'WIN', opponent: 'vs ZeroRisk9 · Duel #0047', pnl: '+18.4%', date: '2h ago', win: true },
              { result: 'WIN', opponent: 'vs MoonChaser · Duel #0041', pnl: '+24.1%', date: '1d ago', win: true },
              { result: 'WIN', opponent: 'vs RedAlert · Duel #0038', pnl: '+11.2%', date: '2d ago', win: true },
              { result: 'LOSS', opponent: 'vs GhostSignal · Duel #0034', pnl: '-3.8%', date: '3d ago', win: false },
              { result: 'WIN', opponent: 'vs NullHedge · Duel #0031', pnl: '+31.7%', date: '4d ago', win: true },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, padding: '.45rem .75rem', borderRadius: 7, background: 'var(--bg-card2)', border: '1px solid var(--border)', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, width: 32, color: item.win ? 'var(--green)' : 'var(--red)', flexShrink: 0 }}>{item.result}</span>
                <span style={{ flex: 1, color: 'var(--text2)' }}>{item.opponent}</span>
                <span style={{ fontWeight: 600, color: item.win ? 'var(--green)' : 'var(--red)' }}>{item.pnl}</span>
                <span style={{ color: 'var(--muted)', fontSize: 10 }}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
