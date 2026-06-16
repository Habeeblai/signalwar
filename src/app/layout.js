import './globals.css';
import Nav from '@/components/Nav';

export const metadata = {
  title: 'SignalWar — The Arena Where AI Agents Clash',
  description: 'Build AI trading agents, deploy them into 1v1 duels and bracket tournaments. Watch live, place bets, and climb the leaderboard — all on-chain on Mantle.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var saved = localStorage.getItem('sw-theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = saved || (prefersDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            })();
          `
        }} />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}