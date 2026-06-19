'use client';
import { useState } from 'react';

const avatars = ['🤖', '🦾', '🧠', '👻', '⚡', '🔮', '🌙', '🧿'];

const strategies = {
  Trend: [
    { name: 'Momentum', desc: 'Rides strong directional price moves. Enters when momentum accelerates, exits on slowdown.' },
    { name: 'Breakout', desc: 'Trades price breaks above resistance or below support levels with volume confirmation.' },
    { name: 'Trend Follower', desc: 'Stays with the dominant trend using moving averages, avoids reversals.' },
    { name: 'MA Cross', desc: 'Uses fast/slow moving average crossovers as buy and sell signals.' },
    { name: 'EMA Ribbon', desc: 'Tracks multiple EMAs to identify trend strength and direction changes.' },
    { name: 'MACD Cross', desc: 'Trades crossovers of the MACD line and signal line for momentum entries.' },
    { name: 'Supertrend', desc: 'ATR-based trailing indicator that signals trend reversals.' },
    { name: 'Ichimoku', desc: 'Full cloud system — uses multiple lines for trend, support, and momentum.' },
  ],
  Reversal: [
    { name: 'Mean Reversion', desc: 'Bets prices return to their average after extreme moves. Fades breakouts.' },
    { name: 'RSI Reversal', desc: 'Enters long on oversold RSI readings, short on overbought. Classic oscillator play.' },
    { name: 'Bollinger Bounce', desc: 'Buys lower band touches, sells upper band touches inside ranging markets.' },
    { name: 'Oversold Hunter', desc: 'Scans for deeply oversold conditions across multiple timeframes for bounce plays.' },
    { name: 'VWAP Reversion', desc: 'Fades moves away from VWAP, expecting price to pull back to institutional average.' },
    { name: 'Double Bottom', desc: 'Pattern recognition for classic W-shape reversal formations.' },
  ],
  Scalping: [
    { name: 'Micro Scalper', desc: 'Extremely high frequency. Takes tiny profits many times per minute.' },
    { name: 'Tick Trader', desc: 'Reacts to each price tick. Fastest possible execution, highest trade count.' },
    { name: 'Rapid Fire', desc: 'Fires trades in rapid bursts targeting micro price inefficiencies.' },
    { name: 'Noise Trader', desc: 'Exploits random short-term price noise for small but frequent gains.' },
  ],
  'Hybrid / Exotic': [
    { name: 'Adaptive AI', desc: 'Switches between strategies based on detected market regime.' },
    { name: 'Contrarian', desc: 'Fades the crowd. Goes opposite to prevailing sentiment and retail flow.' },
    { name: 'Whale Follower', desc: 'Tracks large wallet movements and mirrors their trade direction.' },
    { name: 'Liquidation Hunter', desc: 'Targets zones of leveraged position liquidations for momentum entries.' },
    { name: 'Anti-Momentum', desc: 'Systematically fades momentum moves expecting exhaustion and reversal.' },
    { name: 'Random Walker', desc: 'Pure randomness — unpredictable by design. Chaos agent.' },
  ],
};

const riskLevels = ['Ultra Safe', 'Conservative', 'Balanced', 'Moderate', 'Aggressive', 'Degen', 'Turbo Degen'];
const stopLosses = ['1%', '2%', '5%', '10%', '15%', '20%', 'None'];
const takeProfits = ['2%', '5%', '10%', '20%', '50%', '100%', 'None'];
const drawdowns = ['5%', '10%', '20%', '30%', 'No Limit'];
const positionSizes = ['Micro', 'Small', 'Medium', 'Large', 'All-In'];
const speeds = ['Ultra Slow', 'Slow', 'Normal', 'Fast', 'Very Fast', 'Frenzied'];
const frequencies = ['1–3', '4–10', '10–25', '25–50', '50–100', 'Unlimited'];
const leverages = ['1x', '2x', '3x', '5x', '10x', '20x'];
const orderTypes = ['Market Only', 'Limit Only', 'Mixed', 'Smart Order'];
const personalities = ['Cautious', 'Calculated', 'Neutral', 'Aggressive', 'Contrarian', 'Adaptive', 'Emotional', 'Stoic'];
const sentiments = ['Bullish', 'Bearish', 'Neutral', 'Opportunistic'];
const lossReactions = ['Hold Steady', 'Cut Fast', 'Double Down', 'Pause & Recalibrate'];
const winReactions = ['Lock Profit', 'Let It Ride', 'Partially Exit', 'Reinvest'];
const timePref = ['Dawn', 'Morning', 'Afternoon', 'Evening', 'Night Owl', '24/7'];

const assetCategories = {
  'Blue Chip': ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'AVAX', 'LINK'],
  'BNB Ecosystem': ['WBNB', 'CAKE', 'BUSD', 'XVS'],
  'AI Tokens': ['FET', 'AGIX', 'RNDR', 'TAO', 'WLD', 'GRT', 'ARKM'],
  'Meme / Culture': ['DOGE', 'SHIB', 'PEPE', 'FLOKI', 'BONK', 'WIF', 'BRETT'],
  'Layer 2s': ['ARB', 'OP', 'MANTA', 'BLAST', 'ZK', 'STRK'],
  'DeFi': ['UNI', 'AAVE', 'CRV', 'GMX', 'PENDLE', 'LDO'],
};

const randomNames = ['AlphaStrike', 'NightOwl', 'GhostSignal', 'ZenMode', 'IronFist', 'MoonChaser', 'DeltaSniper', 'QuantumFade', 'NullHedge', 'SilkRoad'];

const riskMap = { 'Ultra Safe': 1, 'Conservative': 2, 'Balanced': 4, 'Moderate': 5, 'Aggressive': 7, 'Degen': 9, 'Turbo Degen': 10 };
const aggMap = { 'Ultra Safe': 'Low', 'Conservative': 'Low', 'Balanced': 'Medium', 'Moderate': 'Medium', 'Aggressive': 'High', 'Degen': 'Very High', 'Turbo Degen': 'Extreme' };
const tradesMap = { '1–3': 2, '4–10': 7, '10–25': 17, '25–50': 37, '50–100': 75, 'Unlimited': '∞' };

function OptionBtn({ label, selected, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: selected ? 'hsla(217,91%,60%,.08)' : 'var(--bg-card2)',
      border: `1.5px solid ${selected ? 'var(--blue)' : 'var(--border)'}`,
      color: selected ? 'var(--blue-l)' : 'var(--text2)',
      borderRadius: 8, padding: '8px 10px', fontSize: 12,
      cursor: 'pointer', textAlign: 'center', transition: 'all .15s',
    }}>{label}</div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '.6rem', marginTop: '.75rem' }}>{children}</div>;
}

export default function AgentsPage() {
  const [avatar, setAvatar] = useState('🤖');
  const [name, setName] = useState('');
  const [strategy, setStrategy] = useState('');
  const [stratDesc, setStratDesc] = useState('');
  const [activeTab, setActiveTab] = useState('strategy');
  const [risk, setRisk] = useState('Balanced');
  const [sl, setSl] = useState('5%');
  const [tp, setTp] = useState('10%');
  const [dd, setDd] = useState('10%');
  const [ps, setPs] = useState('Medium');
  const [speed, setSpeed] = useState('Normal');
  const [freq, setFreq] = useState('4–10');
  const [lev, setLev] = useState('5x');
  const [orderType, setOrderType] = useState('Mixed');
  const [personality, setPersonality] = useState('Neutral');
  const [sentiment, setSentiment] = useState('Neutral');
  const [lossReaction, setLossReaction] = useState('Hold Steady');
  const [winReaction, setWinReaction] = useState('Let It Ride');
  const [time, setTime] = useState('24/7');
  const [selectedAssets, setSelectedAssets] = useState(['BTC', 'ETH', 'BNB']);

  function toggleAsset(asset) {
    setSelectedAssets(prev => prev.includes(asset) ? prev.filter(a => a !== asset) : [...prev, asset]);
  }

  function randomize() {
    setAvatar(avatars[Math.floor(Math.random() * avatars.length)]);
    setName(randomNames[Math.floor(Math.random() * randomNames.length)]);
    const allStrats = Object.values(strategies).flat();
    const picked = allStrats[Math.floor(Math.random() * allStrats.length)];
    setStrategy(picked.name);
    setStratDesc(picked.desc);
    setRisk(riskLevels[Math.floor(Math.random() * riskLevels.length)]);
    setLev(leverages[Math.floor(Math.random() * leverages.length)]);
  }

  function deploy() {
    if (!strategy) { alert('Please select a strategy first.'); return; }
    alert(`🚀 ${name || 'Unnamed Agent'} deploying to arena!\n\nStrategy: ${strategy}\nRisk: ${risk}\nLeverage: ${lev}\n\nConnect your wallet to complete on-chain deployment.`);
  }

  const tabs = ['strategy', 'risk', 'execution', 'personality', 'assets'];

  return (
    <div>
      {/* PAGE HEADER */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 1.5rem' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--blue-l)', textTransform: 'uppercase', marginBottom: '.4rem' }}>Agent Builder</div>
        <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '.4rem' }}>Build Your Agent</div>
        <p style={{ fontSize: '.9rem', color: 'var(--text2)' }}>Configure your AI trading agent's identity, strategy, and behavior — then deploy it to the arena.</p>
      </div>

      {/* LAYOUT */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', alignItems: 'start' }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Identity */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>Identity</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: '1rem' }}>
              {avatars.map(a => (
                <div key={a} onClick={() => setAvatar(a)} style={{
                  aspectRatio: 1, borderRadius: 9,
                  border: `1.5px solid ${avatar === a ? 'var(--blue)' : 'var(--border)'}`,
                  background: avatar === a ? 'hsla(217,91%,60%,.1)' : 'var(--bg-card2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, cursor: 'pointer',
                }}>{a}</div>
              ))}
            </div>
            <button style={{ width: '100%', padding: 8, border: '1.5px dashed var(--border)', borderRadius: 9, background: 'transparent', color: 'var(--muted)', fontSize: 11, cursor: 'pointer' }}>+ Upload custom avatar</button>
            <div style={{ marginTop: '.85rem' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>Agent Name</div>
              <input
                className="input-field"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. AlphaStrike"
                maxLength={20}
              />
            </div>
            <button onClick={randomize} style={{
              width: '100%', background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--text2)', padding: 9, borderRadius: 8, fontSize: 12,
              fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 6, marginTop: '.75rem',
            }}>
              ↻ Randomize Agent
            </button>
          </div>

          {/* Live Preview */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>Live Preview</div>
            <div style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.75rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, background: 'hsla(217,91%,60%,.1)', border: '1px solid hsla(217,91%,60%,.2)' }}>{avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{name || 'Unnamed Agent'}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{strategy || 'No strategy selected'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '.75rem' }}>
                {strategy && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: 'hsla(217,91%,60%,.1)', border: '1px solid hsla(217,91%,60%,.2)', color: 'var(--blue-l)' }}>{strategy}</span>}
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: ['Degen','Turbo Degen'].includes(risk) ? 'hsla(0,70%,60%,.1)' : 'hsla(142,70%,50%,.1)', border: '1px solid var(--border)', color: ['Degen','Turbo Degen'].includes(risk) ? 'var(--red)' : 'var(--green)' }}>{risk}</span>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: 'hsla(217,91%,60%,.1)', border: '1px solid var(--border)', color: 'var(--blue-l)' }}>{lev}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                {[
                  { val: tradesMap[freq] || '7', label: 'Trades/hr' },
                  { val: riskMap[risk] || '4', label: 'Risk Score' },
                  { val: aggMap[risk] || 'Medium', label: 'Aggression' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '.5rem .6rem', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{s.val}</div>
                    <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 1 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Tabs */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1rem' }}>
            <div style={{ display: 'flex', gap: 2, background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, padding: 3 }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  flex: 1, padding: 7, borderRadius: 7, fontSize: 12, fontWeight: 600,
                  color: activeTab === t ? 'var(--text)' : 'var(--muted)',
                  cursor: 'pointer', border: activeTab === t ? '1px solid var(--border)' : 'none',
                  background: activeTab === t ? 'var(--bg-card)' : 'transparent',
                  textTransform: 'capitalize',
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem' }}>

            {/* STRATEGY */}
            {activeTab === 'strategy' && (
              <div>
                {Object.entries(strategies).map(([cat, strats]) => (
                  <div key={cat} style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '.6rem' }}>{cat}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                      {strats.map(s => (
                        <div key={s.name} onClick={() => { setStrategy(s.name); setStratDesc(s.desc); }} style={{
                          background: strategy === s.name ? 'hsla(217,91%,60%,.08)' : 'var(--bg-card2)',
                          border: `1.5px solid ${strategy === s.name ? 'var(--blue)' : 'var(--border)'}`,
                          color: strategy === s.name ? 'var(--blue-l)' : 'var(--text2)',
                          borderRadius: 8, padding: '7px 8px', fontSize: 11, fontWeight: 500,
                          cursor: 'pointer', textAlign: 'center', transition: 'all .15s',
                        }}>{s.name}</div>
                      ))}
                    </div>
                  </div>
                ))}
                {stratDesc && (
                  <div style={{ background: 'hsla(217,91%,60%,.06)', border: '1px solid hsla(217,91%,60%,.15)', borderRadius: 8, padding: '.75rem 1rem', fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
                    {stratDesc}
                  </div>
                )}
              </div>
            )}

            {/* RISK */}
            {activeTab === 'risk' && (
              <div>
                <SectionLabel>Risk Level</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {riskLevels.map(r => <OptionBtn key={r} label={r} selected={risk === r} onClick={() => setRisk(r)}/>)}
                </div>
                <SectionLabel>Stop Loss</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {stopLosses.map(r => <OptionBtn key={r} label={r} selected={sl === r} onClick={() => setSl(r)}/>)}
                </div>
                <SectionLabel>Take Profit</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {takeProfits.map(r => <OptionBtn key={r} label={r} selected={tp === r} onClick={() => setTp(r)}/>)}
                </div>
                <SectionLabel>Max Drawdown</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {drawdowns.map(r => <OptionBtn key={r} label={r} selected={dd === r} onClick={() => setDd(r)}/>)}
                </div>
                <SectionLabel>Position Sizing</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                  {positionSizes.map(r => <OptionBtn key={r} label={r} selected={ps === r} onClick={() => setPs(r)}/>)}
                </div>
              </div>
            )}

            {/* EXECUTION */}
            {activeTab === 'execution' && (
              <div>
                <SectionLabel>Speed</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {speeds.map(r => <OptionBtn key={r} label={r} selected={speed === r} onClick={() => setSpeed(r)}/>)}
                </div>
                <SectionLabel>Trade Frequency</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {frequencies.map(r => <OptionBtn key={r} label={r} selected={freq === r} onClick={() => setFreq(r)}/>)}
                </div>
                <SectionLabel>Leverage</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {leverages.map(r => <OptionBtn key={r} label={r} selected={lev === r} onClick={() => setLev(r)}/>)}
                </div>
                <SectionLabel>Order Type</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6 }}>
                  {orderTypes.map(r => <OptionBtn key={r} label={r} selected={orderType === r} onClick={() => setOrderType(r)}/>)}
                </div>
              </div>
            )}

            {/* PERSONALITY */}
            {activeTab === 'personality' && (
              <div>
                <SectionLabel>Personality</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {personalities.map(r => <OptionBtn key={r} label={r} selected={personality === r} onClick={() => setPersonality(r)}/>)}
                </div>
                <SectionLabel>Market Sentiment Bias</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {sentiments.map(r => <OptionBtn key={r} label={r} selected={sentiment === r} onClick={() => setSentiment(r)}/>)}
                </div>
                <SectionLabel>Reaction to Loss</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {lossReactions.map(r => <OptionBtn key={r} label={r} selected={lossReaction === r} onClick={() => setLossReaction(r)}/>)}
                </div>
                <SectionLabel>Reaction to Win</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6, marginBottom: '1rem' }}>
                  {winReactions.map(r => <OptionBtn key={r} label={r} selected={winReaction === r} onClick={() => setWinReaction(r)}/>)}
                </div>
                <SectionLabel>Time of Day Preference</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                  {timePref.map(r => <OptionBtn key={r} label={r} selected={time === r} onClick={() => setTime(r)}/>)}
                </div>
              </div>
            )}

            {/* ASSETS */}
            {activeTab === 'assets' && (
              <div>
                {Object.entries(assetCategories).map(([cat, assets]) => (
                  <div key={cat} style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '.6rem' }}>{cat}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {assets.map(a => (
                        <div key={a} onClick={() => toggleAsset(a)} style={{
                          background: selectedAssets.includes(a) ? 'hsla(217,91%,60%,.08)' : 'var(--bg-card2)',
                          border: `1.5px solid ${selectedAssets.includes(a) ? 'var(--blue)' : 'var(--border)'}`,
                          color: selectedAssets.includes(a) ? 'var(--blue-l)' : 'var(--text2)',
                          borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 600,
                          cursor: 'pointer', transition: 'all .15s',
                        }}>{a}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Deployment Summary */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>Deployment Summary</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '.6rem', marginBottom: '1.25rem' }}>
              {[
                { key: 'Strategy', val: strategy || 'Not selected' },
                { key: 'Risk Level', val: risk },
                { key: 'Leverage', val: lev },
                { key: 'Stop Loss', val: sl },
                { key: 'Take Profit', val: tp },
                { key: 'Speed', val: speed },
                { key: 'Personality', val: personality },
                { key: 'Assets', val: selectedAssets.slice(0, 4).join(', ') + (selectedAssets.length > 4 ? '…' : '') || 'None' },
              ].map(item => (
                <div key={item.key} style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 8, padding: '.6rem .85rem' }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>{item.key}</div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{item.val}</div>
                </div>
              ))}
            </div>
            <button onClick={deploy} style={{
              width: '100%', background: 'var(--blue)', border: 'none', color: 'white',
              padding: 14, borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/></svg>
              Deploy Agent to Arena
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
