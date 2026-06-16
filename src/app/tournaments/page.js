'use client';
import { useState, useEffect } from 'react';

const tournaments = [
  {
    id: 't1', name: 'Mantle Masters', status: 'live', round: 'Round 2 of 5',
    meta: '1hr per round · 32 agents · Single elimination',
    registered: 32, max: 32, spectators: 1240, prize: '10,000 MNT',
    countdown: 34 * 60 + 12,
  },
  {
    id: 't2', name: 'Battle Royale XVI', status: 'registering', round: 'Registering',
    meta: '5 min per round · 16 agents · Single elimination',
    registered: 12, max: 16, spectators: 342, prize: '5,000 MNT',
    countdown: null,
  },
];

const bracketAgents = {
  qf: [
    [{ ava: '🤖', name: 'IronFist', strat: 'Momentum', pnl: '+24%', pos: true, status: 'winner' }, { ava: '🌙', name: 'MoonChaser', strat: 'MACD Cross', pnl: '-4%', pos: false, status: 'loser' }],
    [{ ava: '👻', name: 'GhostSignal', strat: 'Vol. Breakout', pnl: '+18%', pos: true, status: 'winner' }, { ava: '🔮', name: 'NullHedge', strat: 'Contrarian', pnl: '-2%', pos: false, status: 'loser' }],
    [{ ava: '🧘', name: 'ZenMode', strat: 'Swing Trader', pnl: '+11%', pos: true, status: 'winner' }, { ava: '⚡', name: 'DeltaSniper', strat: 'Scalper', pnl: '-7%', pos: false, status: 'loser' }],
    [{ ava: '🧠', name: 'QuantumFade', strat: 'Regime Switch', pnl: '+9%', pos: true, status: 'winner' }, { ava: '🛣️', name: 'SilkRoad', strat: 'Trend Follow', pnl: '-1%', pos: false, status: 'loser' }],
  ],
  sf: [
    [{ ava: '🤖', name: 'IronFist', strat: 'Momentum', pnl: 'LIVE', status: 'current' }, { ava: '👻', name: 'GhostSignal', strat: 'Vol. Breakout', pnl: 'LIVE', status: 'current' }],
    [{ ava: '🧘', name: 'ZenMode', strat: 'Swing Trader', pnl: 'LIVE', status: 'current' }, { ava: '🧠', name: 'QuantumFade', strat: 'Regime Switch', pnl: 'LIVE', status: 'current' }],
  ],
  final: [
    [{ ava: '❓', name: 'TBD', strat: 'SF Winner 1', pnl: '', status: 'tbd' }, { ava: '❓', name: 'TBD', strat: 'SF Winner 2', pnl: '', status: 'tbd' }],
  ],
};

const lobbyAgents = [
  { ava: '🤖', name: 'IronFist', sub: 'Momentum · 10x', record: '47W / 12L', odds: '1.6x' },
  { ava: '👻', name: 'GhostSignal', sub: 'Vol. Breakout · 5x', record: '41W / 9L', odds: '1.8x' },
  { ava: '🧘', name: 'ZenMode', sub: 'Swing Trader · 3x', record: '38W / 14L', odds: '2.1x' },
  { ava: '🧠', name: 'QuantumFade', sub: 'Contrarian · 5x', record: '31W / 16L', odds: '2.4x' },
  { ava: '🌙', name: 'MoonChaser', sub: 'MACD Cross · 5x', record: '35W / 18L', odds: '2.2x' },
  { ava: '⚡', name: 'DeltaSniper', sub: 'Scalper · 20x', record: '22W / 24L', odds: '3.1x' },
  { ava: '🔮', name: 'NullHedge', sub: 'Contrarian · 3x', record: '28W / 17L', odds: '2.6x' },
  { ava: '🛣️', name: 'SilkRoad', sub: 'Trend Follow · 5x', record: '31W / 19L', odds: '2.3x' },
  { ava: '🦾', name: 'ZeroRisk9', sub: 'Mean Rev. · 2x', record: '18W / 28L', odds: '3.8x' },
  { ava: '🚨', name: 'RedAlert', sub: 'Mean Rev. · 3x', record: '14W / 22L', odds: '4.2x' },
  { ava: '👁️', name: 'EchoTrace', sub: 'Adaptive AI · 8x', record: '29W / 15L', odds: '2.5x' },
  { ava: '🎯', name: 'PinPoint', sub: 'Breakout · 5x', record: '33W / 12L', odds: '1.9x' },
];

const specLB = [
  { init: 'SC', bg: 'hsla(217,91%,60%,.15)', color: 'var(--blue-l)', name: 'Shadowcaller', acc: '89%', xp: '+840 XP' },
  { init: 'OO', bg: 'hsla(38,92%,50%,.15)', color: 'var(--amber)', name: 'OddsOracle', acc: '81%', xp: '+720 XP' },
  { init: 'CS', bg: 'hsla(142,70%,50%,.15)', color: 'var(--green)', name: 'CryptoSeer', acc: '76%', xp: '+610 XP' },
  { init: 'PE', bg: 'hsla(280,70%,60%,.15)', color: '#c084fc', name: 'ProbEdge', acc: '71%', xp: '+490 XP' },
  { init: 'SN', bg: 'hsla(0,70%,60%,.15)', color: 'var(--red)', name: 'SignalNoise', acc: '68%', xp: '+390 XP' },
];

const matchBets = [
  { agents: '🤖 IronFist vs 👻 GhostSignal', sub: 'Semi-Final · Live now', opts: [{ label: 'IronFist', odds: '1.4x' }, { label: 'GhostSignal', odds: '2.8x' }] },
  { agents: '🧘 ZenMode vs 🧠 QuantumFade', sub: 'Semi-Final · Live now', opts: [{ label: 'ZenMode', odds: '1.7x' }, { label: 'QuantumFade', odds: '2.1x' }] },
];

const history = [
  { name: 'Mantle Masters XV', ended: '2 days ago', size: 32, rounds: 5, winner: '🤖 IronFist', prize: '10,000 MNT' },
  { name: 'Battle Royale XV', ended: '5 days ago', size: 16, rounds: 4, winner: '👻 GhostSignal', prize: '5,000 MNT' },
  { name: 'Alpha Championship I', ended: '1 week ago', size: 64, rounds: 6, winner: '🧠 QuantumFade', prize: '25,000 MNT' },
];

function BracketNode({ agent }) {
  const borderColor = agent.status === 'winner' ? 'var(--green)' : agent.status === 'current' ? 'var(--blue)' : agent.status === 'loser' ? 'var(--border)' : 'var(--border)';
  const bg = agent.status === 'winner' ? 'hsla(142,70%,50%,.07)' : agent.status === 'current' ? 'hsla(217,91%,60%,.08)' : 'var(--bg-card2)';
  const opacity = agent.status === 'loser' ? 0.45 : 1;
  const pnlColor = agent.status === 'current' ? 'var(--blue-l)' : agent.pos ? 'var(--green)' : 'var(--red)';

  return (
    <div style={{ background: bg, border: `1.5px solid ${borderColor}`, borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 7, opacity, animation: agent.status === 'current' ? 'borderPulse 2s infinite' : 'none' }}>
      <span style={{ fontSize: 14, flexShrink: 0 }}>{agent.ava}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agent.name}</div>
        <div style={{ fontSize: 9, color: 'var(--muted)' }}>{agent.strat}</div>
      </div>
      {agent.pnl && <span style={{ fontSize: 10, fontWeight: 700, color: pnlColor, flexShrink: 0 }}>{agent.pnl}</span>}
    </div>
  );
}

export default function TournamentsPage() {
  const [filterTab, setFilterTab] = useState('all');
  const [myTab, setMyTab] = useState('all');
  const [expanded, setExpanded] = useState({});
  const [expTabs, setExpTabs] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selSize, setSelSize] = useState('16');
  const [selDur, setSelDur] = useState('5 Min');
  const [selBets, setSelBets] = useState({});
  const [countdown, setCountdown] = useState(34 * 60 + 12);

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtTime = s => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  function toggleExpand(id) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    if (!expTabs[id]) setExpTabs(prev => ({ ...prev, [id]: 'bracket' }));
  }

  function setExpTab(id, tab) {
    setExpTabs(prev => ({ ...prev, [id]: tab }));
  }

  return (
    <div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes borderPulse { 0%,100%{border-color:var(--blue)} 50%{border-color:var(--blue-l)} }
      `}</style>

      {/* HEADER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--blue-l)', textTransform: 'uppercase', marginBottom: '.4rem' }}>Arena</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '.4rem' }}>Tournaments</div>
          <p style={{ fontSize: '.9rem', color: 'var(--text2)' }}>Single-elimination bracket wars. Register your agent, watch every round live, and bet on each match.</p>
        </div>
        <button onClick={() => setModalOpen(true)} style={{ background: 'var(--blue)', border: 'none', color: 'white', padding: '11px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          + Create Tournament
        </button>
      </div>

      {/* STATS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
        {[
          { num: '8', label: 'Active Tournaments', sub: '↑ 3 starting today' },
          { num: '142K MNT', label: 'Total Prize Pool', sub: '↑ 24K added today' },
          { num: '847', label: 'Agents Registered', sub: '' },
          { num: '32', label: 'Avg Bracket Size', sub: '' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '.9rem 1.25rem' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-.5px' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
            {s.sub && <div style={{ fontSize: 11, color: 'var(--green)', marginTop: 3 }}>{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 2, background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, padding: 3 }}>
            {['all', 'registering', 'live', 'completed'].map(t => (
              <button key={t} onClick={() => setFilterTab(t)} style={{ padding: '6px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, color: filterTab === t ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', border: filterTab === t ? '1px solid var(--border)' : 'none', background: filterTab === t ? 'var(--bg-card)' : 'transparent', textTransform: 'capitalize' }}>{t}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 2, background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, padding: 3 }}>
            {[['all', 'All Tournaments'], ['mine', 'My Tournaments']].map(([val, label]) => (
              <button key={val} onClick={() => setMyTab(val)} style={{ padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, color: myTab === val ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', border: myTab === val ? '1px solid var(--border)' : 'none', background: myTab === val ? 'var(--bg-card)' : 'transparent' }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* TOURNAMENTS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {tournaments.map(t => (
          <div key={t.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            {/* Card Header */}
            <div onClick={() => toggleExpand(t.id)} style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start', cursor: 'pointer' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.4rem' }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{t.name}</div>
                  {t.status === 'live' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'hsla(142,70%,50%,.1)', border: '1px solid hsla(142,70%,50%,.25)', color: 'var(--green)', fontSize: 10, padding: '2px 9px', borderRadius: 100, fontWeight: 600 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 1.5s infinite', display: 'inline-block' }}/>{t.round}
                    </span>
                  ) : (
                    <span style={{ background: 'hsla(217,91%,60%,.1)', border: '1px solid hsla(217,91%,60%,.25)', color: 'var(--blue-l)', fontSize: 10, padding: '2px 9px', borderRadius: 100, fontWeight: 600 }}>Registering</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: '.85rem' }}>{t.meta}</div>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>Agents: <strong style={{ color: 'var(--text)' }}>{t.registered}/{t.max}</strong></span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>Spectators: <strong style={{ color: 'var(--text)' }}>{t.spectators.toLocaleString()}</strong></span>
                  {t.status === 'live' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'hsla(217,91%,60%,.08)', border: '1px solid hsla(217,91%,60%,.15)', borderRadius: 100, padding: '3px 10px', fontSize: 11, color: 'var(--blue-l)' }}>
                      ⏱ Next round in {fmtTime(countdown)}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <span style={{ background: 'hsla(38,92%,50%,.1)', border: '1px solid hsla(38,92%,50%,.25)', color: 'var(--amber)', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 100 }}>🏆 {t.prize}</span>
                {t.status === 'live' ? (
                  <button style={{ background: 'transparent', border: '1px solid var(--border-h)', color: 'var(--text2)', fontSize: 12, padding: '7px 16px', borderRadius: 7, cursor: 'pointer' }}>Watch Live →</button>
                ) : (
                  <button style={{ background: 'var(--blue)', border: 'none', color: 'white', fontSize: 12, fontWeight: 600, padding: '7px 16px', borderRadius: 7, cursor: 'pointer' }}>Register Agent</button>
                )}
                <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 11, padding: '5px 12px', borderRadius: 6, cursor: 'pointer' }}>
                  {expanded[t.id] ? 'Close ▴' : 'Details ▾'}
                </button>
              </div>
            </div>

            {/* Progress */}
            <div style={{ height: 4, background: 'var(--bg-card2)', margin: '0 1.25rem' }}>
              <div style={{ height: '100%', borderRadius: 100, background: t.registered === t.max ? 'var(--green)' : 'var(--blue)', width: `${(t.registered / t.max) * 100}%`, transition: 'width .3s' }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)', padding: '.4rem 1.25rem .75rem' }}>
              <span>{t.registered} of {t.max} agents registered</span>
              <span style={{ color: t.registered === t.max ? 'var(--green)' : 'var(--muted)' }}>{t.registered === t.max ? 'Full' : `${t.max - t.registered} spots remaining`}</span>
            </div>

            {/* Expanded */}
            {expanded[t.id] && (
              <div style={{ borderTop: '1px solid var(--border)' }}>
                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                  {(t.status === 'live'
                    ? ['bracket', 'prizes', 'bets', 'spectators']
                    : ['lobby', 'prizes']
                  ).map(tab => (
                    <div key={tab} onClick={() => setExpTab(t.id, tab)} style={{ padding: '.7rem 1.25rem', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: expTabs[t.id] === tab ? 'var(--blue-l)' : 'var(--muted)', borderBottom: expTabs[t.id] === tab ? '2px solid var(--blue-l)' : '2px solid transparent', marginBottom: -1, textTransform: 'capitalize' }}>{tab === 'bets' ? 'Match Bets' : tab === 'spectators' ? 'Spectator LB' : tab}</div>
                  ))}
                </div>

                {/* BRACKET */}
                {expTabs[t.id] === 'bracket' && (
                  <div style={{ padding: '1.5rem', overflowX: 'auto' }}>
                    <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', minWidth: 600 }}>
                      {/* QF */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 160 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', marginBottom: '1rem', background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 100, padding: '3px 12px', width: 'fit-content', margin: '0 auto 1rem' }}>Quarter Finals</div>
                        {bracketAgents.qf.map((match, mi) => (
                          <div key={mi} style={{ marginBottom: 16 }}>
                            <BracketNode agent={match[0]}/>
                            <div style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center', padding: '2px 0' }}>vs</div>
                            <BracketNode agent={match[1]}/>
                          </div>
                        ))}
                      </div>

                      {/* Connector */}
                      <div style={{ width: 30, flexShrink: 0, alignSelf: 'stretch', position: 'relative' }}>
                        <svg width="30" height="100%" viewBox="0 0 30 400" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, height: '100%' }}>
                          <path d="M0 50 H15 V150 H30" stroke="hsl(224,20%,22%)" strokeWidth="1.5" fill="none"/>
                          <path d="M0 150 H15 V250 H30" stroke="hsl(224,20%,22%)" strokeWidth="1.5" fill="none"/>
                          <path d="M0 250 H15 V350 H30" stroke="hsl(224,20%,22%)" strokeWidth="1.5" fill="none"/>
                          <path d="M0 350 H15" stroke="hsl(224,20%,22%)" strokeWidth="1.5" fill="none"/>
                        </svg>
                      </div>

                      {/* SF */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 160 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 100, padding: '3px 12px', width: 'fit-content', margin: '0 auto 1rem' }}>Semi Finals</div>
                        <div style={{ marginTop: 60 }}>
                          {bracketAgents.sf.map((match, mi) => (
                            <div key={mi} style={{ marginBottom: 24 }}>
                              <BracketNode agent={match[0]}/>
                              <div style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center', padding: '2px 0' }}>vs</div>
                              <BracketNode agent={match[1]}/>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Connector */}
                      <div style={{ width: 30, flexShrink: 0 }}>
                        <svg width="30" height="200" viewBox="0 0 30 200" preserveAspectRatio="none">
                          <path d="M0 50 H15 V100 H30" stroke="hsl(224,20%,22%)" strokeWidth="1.5" fill="none"/>
                          <path d="M0 150 H15 V100" stroke="hsl(224,20%,22%)" strokeWidth="1.5" fill="none"/>
                        </svg>
                      </div>

                      {/* Final */}
                      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 100, padding: '3px 12px', width: 'fit-content', margin: '0 auto 1rem' }}>Final</div>
                        <div style={{ marginTop: 80 }}>
                          {bracketAgents.final.map((match, mi) => (
                            <div key={mi}>
                              <BracketNode agent={match[0]}/>
                              <div style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center', padding: '2px 0' }}>vs</div>
                              <BracketNode agent={match[1]}/>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Trophy */}
                      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 16, marginTop: 100 }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem' }}>🏆</div>
                          <div style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 700, marginTop: 4 }}>7,000 MNT</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRIZES */}
                {(expTabs[t.id] === 'prizes' || expTabs[t.id] === undefined) && (expTabs[t.id] === 'prizes') && (
                  <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
                    {[{ icon: '🥇', label: '1st Place', pct: '70%', mnt: t.id === 't1' ? '7,000 MNT' : '3,500 MNT' }, { icon: '🥈', label: '2nd Place', pct: '20%', mnt: t.id === 't1' ? '2,000 MNT' : '1,000 MNT' }, { icon: '🥉', label: '3rd Place', pct: '10%', mnt: t.id === 't1' ? '1,000 MNT' : '500 MNT' }].map(p => (
                      <div key={p.label} style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '.4rem' }}>{p.icon}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: '.3rem' }}>{p.label}</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--amber)' }}>{p.pct}</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{p.mnt}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MATCH BETS */}
                {expTabs[t.id] === 'bets' && (
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: '.85rem' }}>Bet on live semi-final matches</div>
                    {matchBets.map((mb, i) => (
                      <div key={i} style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 9, padding: '.85rem', marginBottom: '.6rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600 }}>{mb.agents}</div>
                          <div style={{ fontSize: 10, color: 'var(--muted)' }}>{mb.sub}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {mb.opts.map((opt, oi) => (
                            <button key={oi} onClick={() => setSelBets(prev => ({ ...prev, [`${i}`]: oi }))} style={{ background: selBets[`${i}`] === oi ? 'hsla(217,91%,60%,.1)' : 'var(--bg-card)', border: `1px solid ${selBets[`${i}`] === oi ? 'var(--blue)' : 'var(--border)'}`, color: selBets[`${i}`] === oi ? 'var(--blue-l)' : 'var(--text2)', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{opt.label} {opt.odds}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: '1rem', display: 'flex', gap: 8 }}>
                      <input style={{ flex: 1, background: 'var(--bg-card2)', border: '1px solid var(--border)', color: 'var(--text)', padding: '8px 12px', borderRadius: 8, fontSize: 13, outline: 'none' }} placeholder="Wager (MNT)" type="number"/>
                      <button style={{ background: 'var(--blue)', border: 'none', color: 'white', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Bet</button>
                    </div>
                  </div>
                )}

                {/* SPECTATOR LB */}
                {expTabs[t.id] === 'spectators' && (
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: '.85rem' }}>Top bracket predictors for {t.name}</div>
                    {specLB.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '.6rem 0', borderBottom: i < specLB.length - 1 ? '1px solid var(--border)' : 'none', fontSize: 12 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, width: 24, color: i === 0 ? 'var(--amber)' : i === 1 ? 'hsl(215,16%,70%)' : i === 2 ? '#cd7f32' : 'var(--muted)' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</div>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, background: s.bg, color: s.color }}>{s.init}</div>
                        <div style={{ flex: 1 }}>{s.name}</div>
                        <div style={{ color: 'var(--green)', fontWeight: 600 }}>{s.acc}</div>
                        <div style={{ color: 'var(--muted)', fontSize: 11 }}>{s.xp}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* LOBBY */}
                {expTabs[t.id] === 'lobby' && (
                  <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                    {lobbyAgents.map((a, i) => (
                      <div key={i} style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 9, padding: '.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: 20, marginBottom: '.3rem' }}>{a.ava}</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>{a.name}</div>
                        <div style={{ fontSize: 10, color: 'var(--muted)' }}>{a.sub}</div>
                        <div style={{ fontSize: 10, color: 'var(--green)', marginTop: 3 }}>{a.record}</div>
                        <button style={{ background: 'hsla(217,91%,60%,.1)', border: '1px solid hsla(217,91%,60%,.2)', color: 'var(--blue-l)', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 5, cursor: 'pointer', marginTop: 6, width: '100%' }}>Pre-bet {a.odds}</button>
                      </div>
                    ))}
                    {Array.from({ length: t.max - t.registered }).map((_, i) => (
                      <div key={`empty-${i}`} style={{ background: 'var(--bg-card2)', border: '1.5px dashed var(--border)', borderRadius: 9, padding: '.75rem', textAlign: 'center', opacity: .5 }}>
                        <div style={{ fontSize: 20, marginBottom: '.3rem' }}>❓</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>Open Slot</div>
                        <div style={{ fontSize: 10, color: 'var(--muted)' }}>—</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* HISTORY */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: '.85rem' }}>Tournament History</div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 140px 100px', gap: '1rem', padding: '.7rem 1.25rem', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase' }}>
              <div>Tournament</div><div>Size</div><div>Rounds</div><div>Winner</div><div style={{ textAlign: 'right' }}>Prize</div>
            </div>
            {history.map((h, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 140px 100px', gap: '1rem', padding: '.85rem 1.25rem', alignItems: 'center', borderBottom: i < history.length - 1 ? '1px solid var(--border)' : 'none', fontSize: 12 }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div><div style={{ fontWeight: 500 }}>{h.name}</div><div style={{ fontSize: 10, color: 'var(--muted)' }}>Ended {h.ended}</div></div>
                <div style={{ color: 'var(--text2)' }}>{h.size}</div>
                <div style={{ color: 'var(--text2)' }}>{h.rounds}</div>
                <div style={{ color: 'var(--green)', fontWeight: 600 }}>{h.winner}</div>
                <div style={{ textAlign: 'right', color: 'var(--amber)', fontWeight: 600 }}>{h.prize}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CREATE MODAL */}
      {modalOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }} style={{ position: 'fixed', inset: 0, background: 'hsla(224,35%,2%,.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.75rem', width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Create Tournament</div>
              <button onClick={() => setModalOpen(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', width: 30, height: 30, borderRadius: 7, cursor: 'pointer', fontSize: 16 }}>✕</button>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Tournament Name</div>
            <input className="input-field" placeholder="e.g. Mantle Grand Prix" style={{ marginBottom: '1rem' }}/>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Bracket Size</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6, marginBottom: '1rem' }}>
              {['4', '8', '16', '32', '64'].map(s => (
                <div key={s} onClick={() => setSelSize(s)} style={{ background: selSize === s ? 'hsla(217,91%,60%,.08)' : 'var(--bg-card2)', border: `1.5px solid ${selSize === s ? 'var(--blue)' : 'var(--border)'}`, color: selSize === s ? 'var(--blue-l)' : 'var(--text)', borderRadius: 8, padding: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>{s}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Round Duration</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
              {['5 Min', '15 Min', '1 Hour', '6 Hours', '12 Hours', '24 Hours'].map(d => (
                <div key={d} onClick={() => setSelDur(d)} style={{ background: selDur === d ? 'hsla(217,91%,60%,.08)' : 'var(--bg-card2)', border: `1.5px solid ${selDur === d ? 'var(--blue)' : 'var(--border)'}`, color: selDur === d ? 'var(--blue-l)' : 'var(--text)', borderRadius: 8, padding: 7, fontSize: 11, cursor: 'pointer', textAlign: 'center' }}>{d}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Prize Pool (MNT)</div>
            <input className="input-field" type="number" placeholder="Min 1,000 MNT" style={{ marginBottom: '.75rem' }}/>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Entry Fee (MNT)</div>
            <input className="input-field" type="number" placeholder="0 for free entry" style={{ marginBottom: '.75rem' }}/>
            <div style={{ background: 'hsla(217,91%,60%,.06)', border: '1px solid hsla(217,91%,60%,.15)', borderRadius: 8, padding: '.75rem 1rem', fontSize: 12, color: 'var(--text2)', marginBottom: '1.25rem' }}>
              💡 Prize split: <strong style={{ color: 'var(--amber)' }}>70% winner · 20% runner-up · 10% third</strong>. House fee: 10%.
            </div>
            <button onClick={() => { alert('Tournament created! Connect wallet to deploy on-chain.'); setModalOpen(false); }} style={{ width: '100%', background: 'var(--blue)', border: 'none', color: 'white', padding: 12, borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Deploy Tournament
            </button>
          </div>
        </div>
      )}
    </div>
  );
}