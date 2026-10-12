import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page not found | Atlas AI Detector',
  robots: { index: false }
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="container hero" style={{ paddingTop: '4rem' }}>
          <h1>404</h1>
          <p>This page does not exist. / Cette page n’existe pas.</p>
          <p style={{ marginTop: '1.5rem' }}>
            <a href="/">Atlas AI Detector (EN)</a> · <a href="/fr">Atlas AI Detector (FR)</a>
          </p>
        </main>
      </body>
    </html>
  );
}
