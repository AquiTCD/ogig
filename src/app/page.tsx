'use client';

import { useState, useEffect } from 'react';

const THEMES = [
  { value: 'default', label: 'Default' },
  { value: 'stronger-a-day', label: 'Stronger a Day' },
] as const;

type ThemeValue = (typeof THEMES)[number]['value'];

export default function Home() {
  const [theme, setTheme] = useState<ThemeValue>('default');
  const [title, setTitle] = useState('DYNAMIC OGP GENERATOR');
  const [subtitle, setSubtitle] = useState('Vercel Edge Functions + @vercel/og');
  const [date, setDate] = useState('2026/05/30');
  const [debouncedUrl, setDebouncedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const getOgpUrl = (th: ThemeValue, t: string, sub: string, d: string) => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    const params = new URLSearchParams({ theme: th, title: t, subtitle: sub, date: d });
    return `${origin}/api/og?${params.toString()}`;
  };

  useEffect(() => {
    const newUrl = getOgpUrl(theme, title, subtitle, date);
    const handler = setTimeout(() => {
      if (newUrl !== debouncedUrl) {
        setDebouncedUrl(newUrl);
      } else {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [theme, title, subtitle, date, debouncedUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(debouncedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans relative overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-red-950/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-red-950/10 blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6001205_1px,transparent_1px),linear-gradient(to_bottom,#e6001205_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Top Header */}
      <header className="border-b border-zinc-800/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-2 bg-[#e60012] skew-x-[-12deg]" />
          <h1 className="font-extrabold text-xl tracking-wider text-white flex items-center gap-2">
            OGIG <span className="text-zinc-500 font-medium text-xs border border-zinc-800 px-2 py-0.5 rounded">Vercel Edge</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500">Plain Dynamic OGP Service</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full px-6 py-8 relative z-10">
        {/* Left Side: Controller Form */}
        <section className="flex-1 flex flex-col gap-6 lg:max-w-md">
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold tracking-wide text-zinc-200 flex items-center gap-2">
                <span className="h-4 w-1 bg-[#e60012]" /> PARAMETERS
              </h2>
              <p className="text-xs text-zinc-500 mt-1">OGP画像に入力する内容を調整してください。</p>
            </div>

            {/* Theme Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 tracking-wider">THEME</label>
              <div className="flex gap-2 flex-wrap">
                {THEMES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => { setTheme(t.value); setLoading(true); }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      theme === t.value
                        ? 'bg-red-950/40 border-red-600 text-red-300'
                        : 'bg-zinc-950/40 border-zinc-800 text-zinc-500 hover:border-zinc-600'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input: Title */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 tracking-wider">TITLE</label>
              <textarea
                value={title}
                onChange={(e) => { setTitle(e.target.value); setLoading(true); }}
                rows={3}
                className="bg-zinc-950/60 border border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-3 py-2 text-sm outline-none transition-all resize-none text-zinc-100"
                placeholder="メインタイトルを入力"
              />
            </div>

            {/* Input: Subtitle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 tracking-wider">SUBTITLE</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => { setSubtitle(e.target.value); setLoading(true); }}
                className="bg-zinc-950/60 border border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-3 py-2 text-sm outline-none transition-all text-zinc-100"
                placeholder="サブタイトルや説明を入力"
              />
            </div>

            {/* Input: Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 tracking-wider">DATE</label>
              <input
                type="text"
                value={date}
                onChange={(e) => { setDate(e.target.value); setLoading(true); }}
                className="bg-zinc-950/60 border border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-3 py-2 text-sm outline-none transition-all text-zinc-100"
                placeholder="日付を入力 (例: 2026/05/30)"
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-800/60 my-2" />

            {/* Generated URL Box */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 tracking-wider">GENERATED OGP URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={debouncedUrl}
                  className="flex-1 bg-zinc-950/80 border border-zinc-850 rounded-lg px-3 py-2 text-xs font-mono text-zinc-400 outline-none select-all"
                />
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border shrink-0 ${
                    copied
                      ? 'bg-green-950/30 border-green-600 text-green-400'
                      : 'bg-red-950/20 border-red-800 hover:border-red-600 text-red-400 hover:bg-red-950/40'
                  }`}
                >
                  {copied ? 'COPIED!' : 'COPY'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Preview Display */}
        <section className="flex-1 flex flex-col gap-6">
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-5 flex-1 justify-center">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-wide text-zinc-200 flex items-center gap-2">
                <span className="h-4 w-1 bg-[#e60012]" /> LIVE PREVIEW
              </h2>
              <span className="text-xs text-zinc-500 font-mono">1200 x 630 px</span>
            </div>

            {/* Image Container with aspect ratio */}
            <div className="w-full aspect-[1200/630] rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden relative group">
              {loading && (
                <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center z-[15]">
                  <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {debouncedUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={debouncedUrl}
                  alt="OGP Preview"
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onLoad={() => setLoading(false)}
                  onError={() => setLoading(false)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">
                  Generating OGP Image...
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="bg-zinc-950/40 border border-zinc-850/60 rounded-xl p-4 text-xs text-zinc-400 flex flex-col gap-2">
              <span className="font-bold text-zinc-300">💡 アプリケーション側での実装イメージ:</span>
              <pre className="font-mono text-[10px] bg-zinc-950/80 p-2.5 rounded border border-zinc-900 text-zinc-500 overflow-x-auto leading-relaxed">
{`# 例: Ruby on Rails での OGP URL 組み立て
url_params = {
  theme: "stronger-a-day",
  title: @mission.title,
  subtitle: current_game.title,
  date: "#{@mission.start_at.strftime('%Y/%m/%d')} 〜 #{@mission.end_at.strftime('%Y/%m/%d')}"
}
@og_image = "https://ogig.vercel.app/api/og?#{url_params.to_query}"`}
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900/60 bg-zinc-950/40 py-6 text-center text-xs text-zinc-600">
        <p>© 2026 OGIG. Designed for simple and premium OGP generation.</p>
      </footer>
    </div>
  );
}
