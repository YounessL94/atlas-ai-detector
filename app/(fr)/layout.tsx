import '../globals.css';
import type { Metadata, Viewport } from 'next';
import SiteShell from '@/components/SiteShell';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  applicationName: SITE_CONFIG.name,
  verification: { google: [SITE_CONFIG.googleSiteVerification, 'k9_wOVN0JLaz_lwDHZTWccmDr9E8qiNQ4dcPmYyoDsY'].filter(Boolean) }
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0f172a' };

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="fr">{children}</SiteShell>;
}
