'use client';

import { useState, useEffect } from 'react';

const THEMES = [
  { value: 'default', label: 'Default' },
  { value: 'mission-card', label: 'Mission Card' },
] as const;

type ThemeValue = (typeof THEMES)[number]['value'];

export default function Home() {
  const [theme, setTheme] = useState<ThemeValue>('default');
  const [title, setTitle] = useState('DYNAMIC OGP GENERATOR');
  const [description, setDescription] = useState('Vercel Edge Functions + @vercel/og');
  const [date, setDate] = useState('2026/05/30');

  // Mission-specific parameters
  const [ranking, setRanking] = useState('none');
  const [condition, setCondition] = useState('none');
  const [capacity, setCapacity] = useState('20名');
  const [metric, setMetric] = useState('参加のみ');
  const [game, setGame] = useState('GUILTY GEAR -STRIVE-');
  const [elimination, setElimination] = useState('false');
  const [owner, setOwner] = useState('デブユーザー');

  const [debouncedUrl, setDebouncedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle theme changes and reset parameters to template defaults
  const handleThemeChange = (th: ThemeValue) => {
    setTheme(th);
    setLoading(true);
    if (th === 'mission-card') {
      setTitle('来月の集中練習ミッション');
      setDescription('来月に向けて今から参加登録！');
      setDate('26/05/31 〜 26/06/28');
      setRanking('none');
      setCondition('none');
      setCapacity('20名');
      setMetric('参加のみ');
      setGame('GUILTY GEAR -STRIVE-');
      setElimination('false');
      setOwner('デブユーザー');
    } else {
      setTitle('DYNAMIC OGP GENERATOR');
      setDescription('Vercel Edge Functions + @vercel/og');
      setDate('2026/05/30');
    }
  };

  const getOgpUrl = (
    th: ThemeValue,
    t: string,
    desc: string,
    d: string,
    rn: string,
    co: string,
    pa: string,
    me: string,
    gm: string,
    el: string,
    ow: string
  ) => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    const params = new URLSearchParams({ theme: th, title: t, description: desc, date: d });

    if (th === 'mission-card') {
      params.append('ranking', rn);
      params.append('condition', co);
      params.append('capacity', pa);
      params.append('metric', me);
      params.append('game', gm);
      params.append('elimination', el);
      if (ow) params.append('owner', ow);
    }
    return `${origin}/api/og?${params.toString()}`;
  };

  useEffect(() => {
    const newUrl = getOgpUrl(theme, title, description, date, ranking, condition, capacity, metric, game, elimination, owner);
    const handler = setTimeout(() => {
      if (newUrl !== debouncedUrl) {
        setDebouncedUrl(newUrl);
      } else {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [theme, title, description, date, ranking, condition, capacity, metric, game, elimination, owner, debouncedUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(debouncedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const isMissionCard = theme === 'mission-card';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-300 ${
        isMissionCard
          ? 'bg-[#FFFCF0] text-[#100F0F] selection:bg-[#ecb0ac]'
          : 'bg-[#0a0a0c] text-white selection:bg-red-600 selection:text-white'
      }`}
    >
      {/* Background decorations based on theme */}
      {!isMissionCard && (
        <>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-red-950/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-red-950/10 blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6001205_1px,transparent_1px),linear-gradient(to_bottom,#e6001205_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        </>
      )}

      {isMissionCard && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent 39px, #DAD8CE 39px, #DAD8CE 40px)',
            backgroundSize: '100% 40px',
          }}
        />
      )}

      {/* Top Header */}
      <header
        className={`border-b backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between transition-colors duration-300 ${
          isMissionCard
            ? 'border-[#100F0F] bg-[#FFFCF0]/85'
            : 'border-zinc-800/60 bg-[#0a0a0c]/80'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`h-8 w-2 skew-x-[-12deg] transition-colors duration-300 ${
              isMissionCard ? 'bg-[#e28883]' : 'bg-[#e60012]'
            }`}
          />
          <h1
            className={`font-extrabold text-xl tracking-wider flex items-center gap-2 ${
              isMissionCard ? 'text-[#100F0F]' : 'text-white'
            }`}
          >
            OGIG{' '}
            <span
              className={`font-medium text-xs border px-2 py-0.5 rounded transition-all duration-300 ${
                isMissionCard
                  ? 'border-[#100F0F] text-[#6F6E69] bg-[#E6E4D9]'
                  : 'border-zinc-800 text-zinc-500 bg-zinc-950/40'
              }`}
            >
              Vercel Edge
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-xs transition-colors duration-300 ${isMissionCard ? 'text-[#6F6E69]' : 'text-zinc-500'}`}>
            {isMissionCard ? 'Stronger a Day Design System' : 'Plain Dynamic OGP Service'}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full px-6 py-8 relative z-10">
        {/* Left Side: Controller Form */}
        <section className="flex-1 flex flex-col gap-6 lg:max-w-md">
          <div
            className={`border transition-all duration-300 p-6 ${
              isMissionCard
                ? 'bg-[#F2F0E5] border-4 border-[#100F0F] rounded-none shadow-[4px_4px_0px_#100F0F]'
                : 'bg-zinc-900/40 border-zinc-800/80 rounded-2xl backdrop-blur-xl'
            }`}
          >
            <div className="mb-5">
              <h2
                className={`text-lg font-bold tracking-wide flex items-center gap-2 transition-colors duration-300 ${
                  isMissionCard ? 'text-[#100F0F]' : 'text-zinc-200'
                }`}
              >
                <span
                  className={`h-4 w-1 transition-colors duration-300 ${isMissionCard ? 'bg-[#e28883]' : 'bg-[#e60012]'}`}
                />{' '}
                PARAMETERS
              </h2>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isMissionCard ? 'text-[#6F6E69]' : 'text-zinc-500'}`}>
                OGP画像に入力する内容を調整してください。
              </p>
            </div>

            {/* Theme Selector */}
            <div className="flex flex-col gap-2 mb-4">
              <label
                className={`text-xs font-bold tracking-wider transition-colors duration-300 ${
                  isMissionCard ? 'text-[#100F0F]' : 'text-zinc-400'
                }`}
              >
                THEME
              </label>
              <div className="flex gap-2 flex-wrap">
                {THEMES.map((t) => {
                  const isActive = theme === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => handleThemeChange(t.value)}
                      className={`px-4 py-2 text-xs font-bold border transition-all ${
                        isMissionCard
                          ? isActive
                            ? 'bg-[#ecb0ac] border-2 border-[#100F0F] text-[#100F0F] rounded-none shadow-[2px_2px_0px_#100F0F]'
                            : 'bg-[#E6E4D9] border-2 border-[#100F0F] text-[#6F6E69] rounded-none hover:bg-[#ecb0ac] hover:text-[#100F0F]'
                          : isActive
                          ? 'bg-red-950/40 border-red-600 text-red-300 rounded-lg'
                          : 'bg-zinc-950/40 border-zinc-800 text-zinc-500 rounded-lg hover:border-zinc-650'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input: Title */}
            <div className="flex flex-col gap-2 mb-4">
              <label
                className={`text-xs font-bold tracking-wider transition-colors duration-300 ${
                  isMissionCard ? 'text-[#100F0F]' : 'text-zinc-400'
                }`}
              >
                {isMissionCard ? 'MISSION TITLE' : 'TITLE'}
              </label>
              <textarea
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setLoading(true);
                }}
                rows={2}
                className={`text-sm outline-none transition-all resize-none ${
                  isMissionCard
                    ? 'bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded focus:ring-2 focus:ring-[#e28883] focus:ring-offset-1'
                    : 'bg-zinc-950/60 border border-zinc-800 text-zinc-100 px-3 py-2 rounded-lg focus:border-red-600 focus:ring-1 focus:ring-red-600'
                }`}
                placeholder="タイトルを入力"
              />
            </div>

            {/* Input: Description */}
            <div className="flex flex-col gap-2 mb-4">
              <label
                className={`text-xs font-bold tracking-wider transition-colors duration-300 ${
                  isMissionCard ? 'text-[#100F0F]' : 'text-zinc-400'
                }`}
              >
                {isMissionCard ? 'DESCRIPTION' : 'SUBTITLE'}
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setLoading(true);
                }}
                className={`text-sm outline-none transition-all ${
                  isMissionCard
                    ? 'bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded focus:ring-2 focus:ring-[#e28883] focus:ring-offset-1'
                    : 'bg-zinc-950/60 border border-zinc-800 text-zinc-100 px-3 py-2 rounded-lg focus:border-red-600 focus:ring-1 focus:ring-red-600'
                }`}
                placeholder="説明やサブタイトルを入力"
              />
            </div>

            {/* Input: Date */}
            <div className="flex flex-col gap-2 mb-4">
              <label
                className={`text-xs font-bold tracking-wider transition-colors duration-300 ${
                  isMissionCard ? 'text-[#100F0F]' : 'text-zinc-400'
                }`}
              >
                {isMissionCard ? 'PERIOD' : 'DATE'}
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setLoading(true);
                }}
                className={`text-sm outline-none transition-all ${
                  isMissionCard
                    ? 'bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded focus:ring-2 focus:ring-[#e28883] focus:ring-offset-1'
                    : 'bg-zinc-950/60 border border-zinc-800 text-zinc-100 px-3 py-2 rounded-lg focus:border-red-600 focus:ring-1 focus:ring-red-600'
                }`}
                placeholder="期間や日付を入力 (例: 2026/05/30)"
              />
            </div>

            {/* Mission Specific Parameters Form */}
            {isMissionCard && (
              <div className="flex flex-col gap-4 mb-4">
                {/* Ranking & Condition */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#100F0F] tracking-wider">RANKING</label>
                    <select
                      value={ranking}
                      onChange={(e) => {
                        setRanking(e.target.value);
                        setLoading(true);
                      }}
                      className="bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-[#e28883] cursor-pointer"
                    >
                      <option value="none">無し</option>
                      <option value="per_checkpoint">各CP後 (🏆)</option>
                      <option value="final_only">最終のみ (🏆)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#100F0F] tracking-wider">CONDITION</label>
                    <select
                      value={condition}
                      onChange={(e) => {
                        setCondition(e.target.value);
                        setLoading(true);
                      }}
                      className="bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-[#e28883] cursor-pointer"
                    >
                      <option value="none">制限なし</option>
                      <option value="approval">承認制 (✔)</option>
                      <option value="invite">招待制 (🔑)</option>
                    </select>
                  </div>
                </div>

                {/* Game Title & Elimination rule */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#100F0F] tracking-wider">GAME TITLE</label>
                    <input
                      type="text"
                      value={game}
                      onChange={(e) => {
                        setGame(e.target.value);
                        setLoading(true);
                      }}
                      className="bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-[#e28883]"
                      placeholder="例: GUILTY GEAR -STRIVE-"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#100F0F] tracking-wider">ELIMINATION</label>
                    <select
                      value={elimination}
                      onChange={(e) => {
                        setElimination(e.target.value);
                        setLoading(true);
                      }}
                      className="bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-[#e28883] cursor-pointer"
                    >
                      <option value="false">無し</option>
                      <option value="true">有り (❌)</option>
                    </select>
                  </div>
                </div>

                {/* Capacity & Metric */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#100F0F] tracking-wider">CAPACITY</label>
                    <input
                      type="text"
                      value={capacity}
                      onChange={(e) => {
                        setCapacity(e.target.value);
                        setLoading(true);
                      }}
                      className="bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-[#e28883]"
                      placeholder="例: 20名"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#100F0F] tracking-wider">METRIC</label>
                    <input
                      type="text"
                      value={metric}
                      onChange={(e) => {
                        setMetric(e.target.value);
                        setLoading(true);
                      }}
                      className="bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-[#e28883]"
                      placeholder="例: 対戦本数 累計"
                    />
                  </div>
                </div>

                {/* Owner */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#100F0F] tracking-wider">OWNER</label>
                  <input
                    type="text"
                    value={owner}
                    onChange={(e) => {
                      setOwner(e.target.value);
                      setLoading(true);
                    }}
                    className="bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-[#e28883]"
                    placeholder="例: オーナー名"
                  />
                </div>

              </div>
            )}

            {/* Divider */}
            <div className={`h-px my-4 transition-colors duration-300 ${isMissionCard ? 'bg-[#100F0F]' : 'bg-zinc-800/60'}`} />

            {/* Generated URL Box */}
            <div className="flex flex-col gap-2">
              <label
                className={`text-xs font-bold tracking-wider transition-colors duration-300 ${
                  isMissionCard ? 'text-[#100F0F]' : 'text-zinc-400'
                }`}
              >
                GENERATED OGP URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={debouncedUrl}
                  className={`flex-1 text-xs font-mono outline-none select-all transition-all duration-300 ${
                    isMissionCard
                      ? 'bg-[#FFFFFF] border-2 border-[#100F0F] text-[#100F0F] px-3 py-2 rounded'
                      : 'bg-zinc-950/80 border border-zinc-850 text-zinc-400 px-3 py-2 rounded-lg'
                  }`}
                />
                <button
                  onClick={handleCopy}
                  className={`text-xs font-bold transition-all border shrink-0 px-4 py-2 ${
                    isMissionCard
                      ? copied
                        ? 'bg-green-100 border-2 border-green-600 text-green-700 rounded shadow-[1px_1px_0px_#100F0F]'
                        : 'bg-[#ecb0ac] border-2 border-[#100F0F] text-[#100F0F] rounded hover:bg-[#e28883] hover:shadow hover:shadow-black'
                      : copied
                      ? 'bg-green-950/30 border-green-600 text-green-400 rounded-lg'
                      : 'bg-red-950/20 border-red-800 hover:border-red-600 text-red-400 hover:bg-red-950/40 rounded-lg'
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
          <div
            className={`border transition-all duration-300 p-6 flex flex-col gap-5 flex-1 justify-center ${
              isMissionCard
                ? 'bg-[#F2F0E5] border-4 border-[#100F0F] rounded-none shadow-[4px_4px_0px_#100F0F]'
                : 'bg-zinc-900/40 border-zinc-800/80 rounded-2xl backdrop-blur-xl'
            }`}
          >
            <div className="flex items-center justify-between">
              <h2
                className={`text-lg font-bold tracking-wide flex items-center gap-2 transition-colors duration-300 ${
                  isMissionCard ? 'text-[#100F0F]' : 'text-zinc-200'
                }`}
              >
                <span
                  className={`h-4 w-1 transition-colors duration-300 ${isMissionCard ? 'bg-[#e28883]' : 'bg-[#e60012]'}`}
                />{' '}
                LIVE PREVIEW
              </h2>
              <span className={`text-xs font-mono transition-colors duration-300 ${isMissionCard ? 'text-[#6F6E69]' : 'text-zinc-500'}`}>
                1200 x 630 px
              </span>
            </div>

            {/* Image Container with aspect ratio */}
            <div
              className={`w-full aspect-[1200/630] overflow-hidden relative group transition-all duration-300 ${
                isMissionCard
                  ? 'border-4 border-[#100F0F] bg-[#FFFFFF] rounded-none shadow-[2px_2px_0px_#100F0F]'
                  : 'border border-zinc-800 bg-zinc-950/80 rounded-xl'
              }`}
            >
              {loading && (
                <div
                  className={`absolute inset-0 backdrop-blur-sm flex items-center justify-center z-[15] transition-colors duration-300 ${
                    isMissionCard ? 'bg-[#FFFCF0]/60' : 'bg-zinc-950/60'
                  }`}
                >
                  <div
                    className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${
                      isMissionCard ? 'border-[#e28883]' : 'border-red-600'
                    }`}
                  />
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
                <div
                  className={`w-full h-full flex items-center justify-center text-sm ${
                    isMissionCard ? 'text-[#6F6E69]' : 'text-zinc-400'
                  }`}
                >
                  Generating OGP Image...
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div
              className={`p-4 text-xs flex flex-col gap-2 transition-all duration-300 ${
                isMissionCard
                  ? 'bg-[#FFFFFF] border-2 border-[#100F0F] rounded-none text-[#100F0F]'
                  : 'bg-zinc-950/40 border border-zinc-800/60 rounded-xl text-zinc-400'
              }`}
            >
              <span className={`font-bold transition-colors duration-300 ${isMissionCard ? 'text-[#100F0F]' : 'text-zinc-300'}`}>
                💡 アプリケーション側での実装イメージ:
              </span>
              <pre
                className={`font-mono text-[10px] p-2.5 rounded border overflow-x-auto leading-relaxed transition-all duration-300 ${
                  isMissionCard
                    ? 'bg-[#F2F0E5] border-[#100F0F] text-[#100F0F]'
                    : 'bg-zinc-950/80 border-zinc-900 text-zinc-550'
                }`}
              >
{isMissionCard ? `# 例: Ruby on Rails での OGP URL 組み立て (Mission Card)
url_params = {
  theme: "mission-card",
  title: @mission.title,
  description: @mission.description, # カード内説明文
  game: current_game.title, # ゲーム名
  date: "#{@mission.start_at.strftime('%y/%m/%d')} 〜 #{@mission.end_at.strftime('%y/%m/%d')}",
  ranking: @mission.ranking_display != "none" ? "true" : "false",
  elimination: @mission.elimination_rule.present? ? "true" : "false",
  condition: @mission.invite_only? ? "invite" : (@mission.approval_required? ? "approval" : "none"),
  capacity: @mission.capacity.present? ? "#{@mission.capacity}名" : "制限なし",
  metric: "#{@mission.metric_label} 累計"
}
@og_image = "https://ogig.vercel.app/api/og?#{url_params.to_query}"` : `# 例: Ruby on Rails での OGP URL 組み立て
url_params = {
  title: @article.title,
  subtitle: @article.category,
  date: @article.published_at.strftime('%Y/%m/%d')
}
@og_image = "https://ogig.vercel.app/api/og?#{url_params.to_query}"`}
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-6 text-center text-xs transition-all duration-300 ${
          isMissionCard
            ? 'border-[#100F0F] text-[#6F6E69] bg-[#F2F0E5]'
            : 'border-zinc-900/60 text-zinc-650 bg-zinc-950/40'
        }`}
      >
        <p>
          {isMissionCard
            ? '© 2026 Stronger a Day OGP Service. Built with Flexoki design system.'
            : '© 2026 OGIG. Designed for simple and premium OGP generation.'}
        </p>
      </footer>
    </div>
  );
}
