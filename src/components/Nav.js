'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Nav() {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('sw-theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('sw-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  const links = [
    { href: '/duels', label: 'Duels' },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/agents', label: 'Agents' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      backdropFilter: 'blur(16px)',
      background: 'hsla(224,35%,4%,0.92)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem', height: '58px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
        <div style={{
          width: 30, height: 30, background: 'var(--blue)',
          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/>
          </svg>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.3px' }}>
          Signal<span style={{ color: 'var(--blue-l)' }}>War</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }} className="nav-desktop">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} style={{
              color: pathname === l.href ? 'var(--text)' : 'var(--text2)',
              textDecoration: 'none', fontSize: 14,
              fontWeight: pathname === l.href ? 600 : 400,
            }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Theme toggle */}
        <button onClick={toggleTheme} style={{
          background: 'transparent', border: 'none',
          color: 'var(--text2)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', padding: 4,
        }}>
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </button>

        {/* RainbowKit Connect Button */}
        <ConnectButton
          chainStatus="icon"
          showBalance={false}
          accountStatus="address"
        />

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text2)', width: 32, height: 32,
            borderRadius: 7, cursor: 'pointer', display: 'none',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 58, left: 0, right: 0,
          background: 'var(--bg-card)', borderBottom: '1px solid var(--border)',
          padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: 12,
          zIndex: 99,
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: pathname === l.href ? 'var(--text)' : 'var(--text2)',
              textDecoration: 'none', fontSize: 14, fontWeight: 500,
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}