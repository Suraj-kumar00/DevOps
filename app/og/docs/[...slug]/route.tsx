import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { logoGlyph } from '@/components/brand/logo';
import { getPageImageUrl } from '@/lib/routes';
import { siteConfig } from '@/lib/site';
import { source } from '@/lib/source';

export const revalidate = false;
// Every docs page gets its image at build time; any other path is a 404.
export const dynamicParams = false;

/** Dark-mode brand colors, kept in sync with app/global.css. */
const colors = {
  background: '#0b0d12',
  foreground: '#e8ebf1',
  muted: '#9ba3b4',
  cyan: '#67e8f9',
  blue: '#7aa2ff',
  violet: '#c4a7ff',
};

// Satori, which renders these images, reads TTF, OTF or WOFF (not WOFF2) and no variable fonts,
// so the images use static Mona Sans files kept next to the site's variable fonts.
const fontsDir = join(process.cwd(), 'app/fonts');
const [monaRegular, monaSemiBold] = await Promise.all([
  readFile(join(fontsDir, 'mona-sans-latin-400-normal.woff')),
  readFile(join(fontsDir, 'mona-sans-latin-600-normal.woff')),
]);

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  // The last segment is always `image.png`, see getPageImageUrl().
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '72px 80px',
        fontFamily: 'Mona Sans',
        color: colors.foreground,
        backgroundColor: colors.background,
        backgroundImage: [
          `radial-gradient(circle at 0% 0%, ${colors.cyan}33, transparent 45%)`,
          `radial-gradient(circle at 100% 0%, ${colors.violet}38, transparent 50%)`,
          `radial-gradient(circle at 60% 120%, ${colors.blue}26, transparent 55%)`,
        ].join(', '),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: 16,
            backgroundImage: `linear-gradient(120deg, ${colors.blue}, ${colors.violet})`,
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.background}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g transform="translate(.75 0)">
              <path d={logoGlyph.loop} />
              <circle {...logoGlyph.node} fill={colors.background} stroke="none" />
            </g>
          </svg>
        </div>
        <span style={{ fontSize: 32, fontWeight: 600 }}>{siteConfig.name}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
        <span style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
          {page.data.title}
        </span>
        {page.data.description ? (
          <span
            style={{
              marginTop: 24,
              maxWidth: 960,
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.4,
              color: colors.muted,
            }}
          >
            {page.data.description}
          </span>
        ) : null}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 8,
          backgroundImage: `linear-gradient(90deg, ${colors.cyan}, ${colors.blue}, ${colors.violet})`,
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Mona Sans', data: monaRegular, weight: 400, style: 'normal' },
        { name: 'Mona Sans', data: monaSemiBold, weight: 600, style: 'normal' },
      ],
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImageUrl(page).segments,
  }));
}
