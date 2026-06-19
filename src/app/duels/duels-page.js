'use client';
import { useState } from 'react';

const duels = [
  { id: '0047', status: 'live', agentA: { ava: '🤖', name: 'IronFist', strategy: 'Momentum', pnl: '+12.4%', pos: true }, agentB: { ava: '🦾', name: 'NightOwl', strategy: 'RSI Reversal', pnl: '+8.7%', pos: true }, asset: 'ETH / BTC', time: '18:25', pot: '500 tBNB', bets: 12 },
  { id: '0048', status: 'live', agentA: { ava: '🌙', name: 'MoonChaser', strategy: 'MACD Cross', pnl: '+6.2%', pos: true }, agentB: { ava: '🚨', name: 'RedAlert', strategy: 'Mean Reversion', pnl: '−2.1%', pos: false }, asset: 'BTC / SOL', time: '02:47', pot: '1,200 tBNB', bets: 34 },
  { id: '0049', status: 'live', agentA: { ava: '👻', name: 'GhostSignal', strategy: 'Vol. Breakout', pnl: '+18.9%', pos: true }, agentB: { ava: '🧘', name: 'ZenMode', strategy: 'Swing Trader', pnl: '+14.3%', pos: true }, asset: 'SOL / ARB', time: '58:12', pot: '350 tBNB', bets: 7 },
  { id: '0050', status: 'live', agentA: { ava: '⚡', name: 'DeltaSniper', strategy: 'Scalper', pnl: '−4.1%', pos: false }, agentB: { ava: '🧠', name: 'QuantumFade', strategy: 'Contrarian', pnl: '+9.2%', pos: true }, asset: 'PEPE / tBNB', time: '11:33', pot: '800 tBNB', bets: 19 },
];

const openDuels = [
  { id: '0051', agentA: { ava: '⚡', name: 'DeltaSniper', strategy: 'Scalper · 20x' }, asset: 'PEPE / tBNB', duration: '1 Hour', pot: '800 tBNB', expires: '2h', addr: '0x4f…2a4b' },
  { id: '0052', agentA: { ava: '🧠', name: 'QuantumFade', strategy: 'Contrarian · 5x' }, asset: 'BTC / ETH', duration: '15 Min', pot: '2,000 tBNB', expires: '45m', addr: '0x9c…1b2a' },
];

const history = [
  { id: '0041', agents: 'AlphaStrike vs NullHedge', asset: 'ETH/BTC', duration: '1 Hour', result: 'Win', pnl: '+$420' },
  { id: '0039', agents: 'IronFist vs SilkRoad', asset: 'SOL/ARB', duration: '15 Min', result: 'Loss', pnl: '−$180' },
  { id: '0036', agents: 'ZenMode vs MoonChaser', asset: 'BTC/tBNB', duration: '6 Hours', result: 'Win', pnl: '+$1,240' },
  { id: '0033', agents: 'GhostSignal vs RedAlert', asset: 'PEPE/DOGE', duration: '5 Min', result: 'Win', pnl: '+$95' },
];

const betTypes = [
  { name: 'Straight Win', odds: '1.4x' },
  { name: 'First Blood', odds: '1.8x' },
  { name: 'First to Crack', odds: '1.6x' },
  { name: 'Total Volume O/U', odds: '1.9x' },
];

export default function DuelsPage() {
  const [filterTab, setFilterTab] = useState('all');
  const [myTab, setMyTab] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [selectedDuel, setSelectedDuel] = useState('Click Speculate on any duel');
  const [selectedBet, setSelectedBet] = useState(0);
  const [wager, setWager] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selAgent, setSelAgent] = useState(0);
  const [selDur, setSelDur] = useState(0);

  const durations = [
    { name: '5 Min', sub: 'Lightning Duel' },
    { name: '15 Min', sub: 'Quick Fire' },
    { name: '1 Hour', sub: 'Standard Bout' },
    { name: '6 Hours', sub: 'Marathon' },
    { name: '12 Hours', sub: 'Overnight War' },
    { name: '24 Hours', sub: 'Endurance Test' },
  ];

  const payout = wager && parseFloat(wager) > 0
    ? (parseFloat(wager) * parseFloat(betTypes[selectedBet].odds)).toFixed(1) + ' tBNB'
    : '—';

  return (
    <div>
      {/* PAGE HEADER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--blue-l)', textTransform: 'uppercase', marginBottom: '.4rem' }}>Arena</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '.4rem' }}>Duels</div>
          <p style={{ fontSize: '.9rem', color: 'var(--text2)' }}>Challenge any agent to a 1v1 battle or spectate live duels and place bets.</p>
        </div>
        <button onClick={() => setModalOpen(true)} style={{ background: 'var(--blue)', border: 'none', color: 'white', padding: '11px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
          + Create Duel
        </button>
      </div>

      {/* STATS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
        {[
          { num: '247', label: 'Active Duels', sub: '↑ 12 in last hour' },
          { num: '$4.2M', label: 'Total Volume Locked', sub: '↑ $180K today' },
          { num: '38 min', label: 'Avg Duel Duration', sub: '' },
          { num: '1,840', label: 'Bets Placed Today', sub: '↑ 94% accuracy rate' },
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
            {['all', 'live', 'open', 'completed'].map(t => (
              <button key={t} onClick={() => setFilterTab(t)} style={{ padding: '6px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, color: filterTab === t ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', border: filterTab === t ? '1px solid var(--border)' : 'none', background: filterTab === t ? 'var(--bg-card)' : 'transparent', textTransform: 'capitalize' }}>{t}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 2, background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, padding: 3 }}>
            {['all', 'mine'].map(t => (
              <button key={t} onClick={() => setMyTab(t)} style={{ padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, color: myTab === t ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', border: myTab === t ? '1px solid var(--border)' : 'none', background: myTab === t ? 'var(--bg-card)' : 'transparent' }}>{t === 'all' ? 'All Duels' : 'My Duels'}</button>
            ))}
          </div>
        </div>
        <select style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text2)', padding: '7px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer', outline: 'none' }}>
          <option>Sort: Highest Pot</option>
          <option>Sort: Most Bets</option>
          <option>Sort: Ending Soon</option>
          <option>Sort: Newest</option>
        </select>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* LIVE DUELS */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.75rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'hsla(142,70%,50%,.1)', border: '1px solid hsla(142,70%,50%,.25)', color: 'var(--green)', fontSize: 10, padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 1.5s infinite', display: 'inline-block' }}/>LIVE
              </span>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Active Duels</div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>247 duels</span>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              {duels.map((d, i) => (
                <div key={d.id} style={{ borderBottom: i < duels.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div onClick={() => setExpanded(expanded === d.id ? null : d.id)} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 1fr 120px', alignItems: 'center', padding: '.9rem 1.25rem', gap: '1rem', cursor: 'pointer', transition: 'background .1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{d.agentA.name}</div>
                      <div style={{ display: 'inline-flex', background: 'var(--bg-card2)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 10, padding: '1px 8px', borderRadius: 100, marginTop: 2 }}>{d.agentA.strategy}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: d.agentA.pos ? 'var(--green)' : 'var(--red)', marginTop: 4 }}>{d.agentA.pnl}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)' }}>{d.asset}</div>
                      <svg style={{ width: '100%', height: 32 }} viewBox="0 0 200 32" preserveAspectRatio="none">
                        <polyline points="0,24 40,16 80,10 120,6 160,4 200,2" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/>
                        <polyline points="0,24 40,26 80,27 120,26 160,28 200,30" fill="none" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="0" y1="24" x2="200" y2="24" stroke="hsla(215,16%,55%,.3)" strokeWidth="1" strokeDasharray="3 3"/>
                      </svg>
                      <div style={{ fontSize: 10, color: 'var(--muted)' }}>{d.time} left</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{d.agentB.name}</div>
                      <div style={{ display: 'inline-flex', background: 'var(--bg-card2)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 10, padding: '1px 8px', borderRadius: 100, marginTop: 2 }}>{d.agentB.strategy}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: d.agentB.pos ? 'var(--green)' : 'var(--red)', marginTop: 4 }}>{d.agentB.pnl}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>Pot: <strong style={{ color: 'var(--text)' }}>{d.pot}</strong></div>
                      <div style={{ fontSize: 10, color: 'var(--muted)' }}>{d.bets} bets</div>
                      <button onClick={e => { e.stopPropagation(); setSelectedDuel(`${d.agentA.name} vs ${d.agentB.name}`); }} style={{ background: 'var(--blue)', border: 'none', color: 'white', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 7, cursor: 'pointer' }}>Speculate →</button>
                    </div>
                  </div>
                  {/* Expanded */}
                  {expanded === d.id && (
                    <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border)', background: 'var(--bg-card2)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: '.4rem' }}>Live PnL Chart</div>
                          <svg style={{ width: '100%', height: 60 }} viewBox="0 0 400 60" preserveAspectRatio="none">
                            <polyline points="0,45 60,36 120,26 180,18 240,12 300,8 360,5 400,3" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
                            <polyline points="0,45 60,47 120,50 180,48 240,52 300,53 360,54 400,56" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="0" y1="45" x2="400" y2="45" stroke="hsla(215,16%,55%,.3)" strokeWidth="1" strokeDasharray="4 4"/>
                          </svg>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: '.4rem' }}>Trade Feed</div>
                          {[
                            { side: 'BUY', asset: 'ETH', pct: '+1.2%', pos: true },
                            { side: 'SELL', asset: 'BTC', pct: '-0.3%', pos: false },
                            { side: 'BUY', asset: 'SOL', pct: '+2.1%', pos: true },
                          ].map((t, ti) => (
                            <div key={ti} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                              <span><span style={{ color: t.pos ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>{t.side}</span> {t.asset}</span>
                              <span style={{ color: t.pos ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>{t.pct}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* OPEN DUELS */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.75rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'hsla(38,92%,50%,.1)', border: '1px solid hsla(38,92%,50%,.25)', color: 'var(--amber)', fontSize: 10, padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>OPEN</span>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Open Challenges</div>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              {openDuels.map((d, i) => (
                <div key={d.id} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 1fr 120px', alignItems: 'center', padding: '.9rem 1.25rem', gap: '1rem', borderBottom: i < openDuels.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{d.agentA.name}</div>
                    <div style={{ display: 'inline-flex', background: 'var(--bg-card2)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 10, padding: '1px 8px', borderRadius: 100, marginTop: 2 }}>{d.agentA.strategy}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{d.addr}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>{d.asset}</div>
                    <div style={{ fontSize: 18, color: 'var(--muted)', margin: '4px 0' }}>vs</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>{d.duration}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Waiting for</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Any Agent</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>Pot: <strong style={{ color: 'var(--text)' }}>{d.pot}</strong></div>
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>Expires in {d.expires}</div>
                    <button style={{ background: 'hsla(142,70%,50%,.12)', border: '1px solid hsla(142,70%,50%,.25)', color: 'var(--green)', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 7, cursor: 'pointer' }}>Accept Duel ⚔️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HISTORY */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: '.85rem' }}>Duel History</div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 80px', gap: '1rem', padding: '.7rem 1.25rem', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase' }}>
                <div>Duel</div><div>Duration</div><div>Result</div><div style={{ textAlign: 'right' }}>PnL</div>
              </div>
              {history.map((h, i) => (
                <div key={h.id} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 80px', gap: '1rem', padding: '.85rem 1.25rem', alignItems: 'center', borderBottom: i < history.length - 1 ? '1px solid var(--border)' : 'none', fontSize: 12 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{h.agents}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>#{h.id} · {h.asset}</div>
                  </div>
                  <div style={{ color: 'var(--text2)' }}>{h.duration}</div>
                  <div style={{ color: h.result === 'Win' ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>{h.result === 'Win' ? '🏆 Win' : '💀 Loss'}</div>
                  <div style={{ textAlign: 'right', color: h.result === 'Win' ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>{h.pnl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QUICK BET */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem', position: 'sticky', top: 72 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '.85rem' }}>Quick Bet</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: '.4rem' }}>Selected Duel</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: '1rem', paddingBottom: '.75rem', borderBottom: '1px solid var(--border)', color: selectedDuel === 'Click Speculate on any duel' ? 'var(--muted)' : 'var(--text)' }}>{selectedDuel}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: '.5rem', fontWeight: 600 }}>Bet Type</div>
          {betTypes.map((b, i) => (
            <div key={i} onClick={() => setSelectedBet(i)} style={{
              background: selectedBet === i ? 'hsla(217,91%,60%,.08)' : 'var(--bg-card2)',
              border: `1.5px solid ${selectedBet === i ? 'var(--blue)' : 'var(--border)'}`,
              borderRadius: 8, padding: '7px 10px', marginBottom: 5,
              cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 11, fontWeight: 500 }}>{b.name}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue-l)' }}>{b.odds}</span>
            </div>
          ))}
          <input
            type="number"
            placeholder="Wager (tBNB)"
            value={wager}
            onChange={e => setWager(e.target.value)}
            style={{ width: '100%', background: 'var(--bg-card2)', border: '1px solid var(--border)', color: 'var(--text)', padding: '8px 11px', borderRadius: 8, fontSize: 13, outline: 'none', margin: '8px 0 5px' }}
          />
          <div style={{ fontSize: 11, color: 'var(--muted)', padding: '.5rem .75rem', background: 'var(--bg-card2)', borderRadius: 7, border: '1px solid var(--border)', marginBottom: '.75rem' }}>
            Payout: <strong style={{ color: 'var(--green)' }}>{payout}</strong>
          </div>
          <button style={{ width: '100%', background: 'var(--blue)', border: 'none', color: 'white', padding: 9, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Place Bet</button>
        </div>
      </div>

      {/* CREATE MODAL */}
      {modalOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }} style={{ position: 'fixed', inset: 0, background: 'hsla(224,35%,2%,.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.75rem', width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Create a Duel</div>
              <button onClick={() => setModalOpen(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', width: 30, height: 30, borderRadius: 7, cursor: 'pointer', fontSize: 16 }}>✕</button>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Select Your Agent</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: '1rem' }}>
              {[{ ava: '🤖', name: 'AlphaStrike', sub: 'Momentum · 10x' }, { ava: '👻', name: 'GhostSignal', sub: 'Vol. Breakout · 5x' }].map((a, i) => (
                <div key={i} onClick={() => setSelAgent(i)} style={{ background: selAgent === i ? 'hsla(217,91%,60%,.08)' : 'var(--bg-card2)', border: `1.5px solid ${selAgent === i ? 'var(--blue)' : 'var(--border)'}`, borderRadius: 9, padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{a.ava}</span>
                  <div><div style={{ fontSize: 12, fontWeight: 600 }}>{a.name}</div><div style={{ fontSize: 10, color: 'var(--muted)' }}>{a.sub}</div></div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Duration</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
              {durations.map((d, i) => (
                <div key={i} onClick={() => setSelDur(i)} style={{ background: selDur === i ? 'hsla(217,91%,60%,.08)' : 'var(--bg-card2)', border: `1.5px solid ${selDur === i ? 'var(--blue)' : 'var(--border)'}`, borderRadius: 8, padding: 8, cursor: 'pointer', textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: selDur === i ? 'var(--blue-l)' : 'var(--text)' }}>{d.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{d.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Wager Amount (tBNB)</div>
            <input className="input-field" type="number" placeholder="Enter wager amount (min 10 tBNB)" style={{ marginBottom: '.75rem' }}/>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Asset Pair</div>
            <select className="input-field" style={{ marginBottom: '.75rem', cursor: 'pointer' }}>
              <option>BTC / ETH</option><option>ETH / SOL</option><option>SOL / ARB</option><option>tBNB / ETH</option><option>PEPE / DOGE</option>
            </select>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Challenge (optional)</div>
            <input className="input-field" placeholder="Enter wallet address to challenge specific agent" style={{ marginBottom: '1.25rem' }}/>
            <button onClick={() => { alert('Duel created! Connect wallet to deploy on-chain.'); setModalOpen(false); }} style={{ width: '100%', background: 'var(--blue)', border: 'none', color: 'white', padding: 12, borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/></svg>
              Deploy Duel to Arena
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }`}</style>
    </div>
  );
}
