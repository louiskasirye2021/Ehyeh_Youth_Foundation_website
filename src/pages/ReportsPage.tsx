import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download, Eye, FileText, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { AbstractShapes } from '../components/AbstractShapes';
import { ReportPreview } from '../components/ReportPreview';
import { formatStoryDate } from '../components/RichText';
import { sortStoriesNewestFirst, useSiteContent } from '../content/store';
import type { Report } from '../content/defaults';
import { downloadUrl, fileTypeLabel, formatFileSize } from '../utils/documentUpload';

const ALL = 'All';
type Sort = 'newest' | 'oldest' | 'az';

const yearOf = (r: Report) => (/^\d{4}/.test(r.date) ? r.date.slice(0, 4) : '');
const isWord = (type: string) => type === 'doc' || type === 'docx';

/** Report id from a link like #/reports/<id>. */
function reportIdFromHash() {
  const match = window.location.hash.match(/^#\/reports\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide ${
        type === 'pdf' ? 'bg-red-50 text-red-700' : isWord(type) ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'
      }`}
    >
      {fileTypeLabel(type)}
    </span>
  );
}

/** The report's cover image, or a styled document cover when there isn't one. */
function Cover({ report, large = false }: { report: Report; large?: boolean }) {
  if (report.cover) {
    return <img src={report.cover} alt="" loading="lazy" className="w-full h-full object-cover" />;
  }
  return (
    <div className="w-full h-full bg-[#141414] relative overflow-hidden flex items-center justify-center">
      <div aria-hidden="true" className="absolute -right-10 -top-10 w-40 h-40 rounded-full border-[18px] border-[#C39223]/25" />
      <div aria-hidden="true" className="absolute -left-6 bottom-6 w-24 h-24 rotate-12 border-2 border-[#C39223]/30 rounded-xl" />
      <div className={`relative bg-white shadow-xl rounded-sm ${large ? 'w-44 h-56 p-5' : 'w-28 h-36 p-3'} flex flex-col`}>
        <span className="h-1.5 w-8 bg-[#C39223] rounded-full" />
        <p className={`mt-3 text-black leading-tight line-clamp-4 ${large ? 'text-base' : 'text-[11px]'}`}>{report.title}</p>
        <span className="mt-auto flex items-center justify-between">
          <span className={`text-gray-400 ${large ? 'text-xs' : 'text-[9px]'}`}>{yearOf(report)}</span>
          {report.file && <TypeBadge type={report.file.type} />}
        </span>
      </div>
    </div>
  );
}

function Actions({ report, onPreview }: { report: Report; onPreview: () => void }) {
  if (!report.file) return null;
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPreview}
        className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-[#C39223] transition-colors"
      >
        <Eye size={16} />
        Preview
      </button>
      <a
        href={downloadUrl(report.file)}
        aria-label={`Download ${report.title}`}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-800 border border-gray-300 hover:border-[#C39223] hover:text-[#8a6614] transition-colors"
      >
        <Download size={16} />
        Download
      </a>
    </div>
  );
}

function Meta({ report }: { report: Report }) {
  const bits = [formatStoryDate(report.date), report.file?.size ? formatFileSize(report.file.size) : ''].filter(Boolean);
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
      {report.file && <TypeBadge type={report.file.type} />}
      {bits.map((bit) => (
        <span key={bit}>{bit}</span>
      ))}
    </p>
  );
}

export function ReportsPage() {
  const { reports, reportsSection } = useSiteContent().content;
  const published = useMemo(() => sortStoriesNewestFirst(reports.filter((r) => r.file && r.title)), [reports]);

  const categories = useMemo(
    () => Array.from(new Set(published.map((r) => r.category.trim()).filter(Boolean))).sort(),
    [published]
  );
  const years = useMemo(() => Array.from(new Set(published.map(yearOf).filter(Boolean))).sort().reverse(), [published]);
  const hasWord = published.some((r) => isWord(r.file!.type));
  const hasPdf = published.some((r) => r.file!.type === 'pdf');

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [sort, setSort] = useState<Sort>('newest');
  const [openId, setOpenId] = useState<string | null>(reportIdFromHash);

  useEffect(() => {
    const onHash = () => setOpenId(reportIdFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const filtering = query.trim() !== '' || category !== ALL || year !== ALL || type !== ALL;
  const clearAll = () => {
    setQuery('');
    setCategory(ALL);
    setYear(ALL);
    setType(ALL);
  };

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    let list = published.filter((r) => {
      if (category !== ALL && r.category.trim() !== category) return false;
      if (year !== ALL && yearOf(r) !== year) return false;
      if (type === 'pdf' && r.file!.type !== 'pdf') return false;
      if (type === 'word' && !isWord(r.file!.type)) return false;
      if (words.length) {
        const haystack = `${r.title} ${r.summary} ${r.category} ${r.date} ${r.file!.name}`.toLowerCase();
        if (!words.every((w) => haystack.includes(w))) return false;
      }
      return true;
    });
    if (sort === 'oldest') list = list.slice().reverse();
    if (sort === 'az') list = list.slice().sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [published, query, category, year, type, sort]);

  // Featured: the one marked as featured, or else the newest. Only shown when not searching.
  const featured = !filtering ? published.find((r) => r.featured) ?? published[0] : undefined;
  const grid = featured ? results.filter((r) => r.id !== featured.id) : results;
  const openReport = published.find((r) => r.id === openId) ?? null;

  const open = (id: string) => {
    window.location.hash = `/reports/${encodeURIComponent(id)}`;
  };
  const close = () => {
    window.location.hash = '/reports';
  };

  const selectClass =
    'h-10 rounded-full border border-gray-300 bg-white pl-3 sm:pl-4 pr-7 sm:pr-8 text-sm text-gray-800 focus:border-[#C39223] focus:ring-2 focus:ring-[#C39223]/20 focus:outline-none';

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />

      {/* Header with search */}
      <header className="bg-black text-white pt-36 pb-20 relative overflow-hidden">
        <AbstractShapes />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(195,146,35,0.18),transparent_55%)]" />
        <div className="mx-auto px-4 lg:px-10 max-w-6xl relative z-10">
          <a href="#/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#C39223] mb-8">
            <ArrowLeft size={16} />
            Back to home
          </a>
          {reportsSection.label && (
            <p className="text-[#C39223] uppercase tracking-widest text-sm mb-3">{reportsSection.label}</p>
          )}
          <h1 className="text-4xl md:text-6xl">{reportsSection.title}</h1>
          {reportsSection.intro && <p className="text-gray-300 mt-4 max-w-2xl text-lg">{reportsSection.intro}</p>}

          {published.length > 0 && (
            <div className="mt-10 max-w-2xl">
              <label htmlFor="report-search" className="sr-only">
                Search reports
              </label>
              <div className="relative">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input
                  id="report-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, topic or year"
                  className="w-full h-14 rounded-full bg-white text-gray-900 placeholder:text-gray-400 pl-14 pr-12 text-base shadow-xl focus:outline-none focus:ring-4 focus:ring-[#C39223]/40 [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-3">
                {published.length} {published.length === 1 ? 'report' : 'reports'} available to read and download.
              </p>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto px-4 lg:px-10 max-w-6xl pb-24">
        {published.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-[#C39223]/15 text-[#8a6614] flex items-center justify-center mx-auto mb-5">
              <FileText size={30} />
            </div>
            <h2 className="text-2xl text-black">Reports are on their way</h2>
            <p className="text-gray-600 mt-2 max-w-md mx-auto">
              Our first reports will be published here soon. In the meantime, contact us if you'd like a copy of a specific report.
            </p>
            <a
              href="#/"
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300)}
              className="inline-flex mt-6 bg-black text-white px-6 py-3 rounded-full hover:bg-[#C39223] transition-colors"
            >
              Contact us
            </a>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="md:sticky md:top-20 z-30 -mx-4 px-4 lg:-mx-10 lg:px-10 py-4 bg-[#FAF8F4]/95 backdrop-blur border-b border-black/5">
              <div className="flex flex-wrap items-center gap-3">
                {categories.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto max-w-full" style={{ scrollbarWidth: 'none' }} role="group" aria-label="Filter by category">
                    {[ALL, ...categories].map((name) => (
                      <button
                        key={name}
                        onClick={() => setCategory(name)}
                        aria-pressed={category === name}
                        className={`flex-shrink-0 px-4 h-10 rounded-full text-sm border transition-colors ${
                          category === name
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#C39223] hover:text-[#8a6614]'
                        }`}
                      >
                        {name === ALL ? 'All categories' : name}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                  <SlidersHorizontal size={18} className="text-gray-400 hidden sm:block" aria-hidden="true" />
                  {years.length > 1 && (
                    <select aria-label="Filter by year" value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
                      <option value={ALL}>All years</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  )}
                  {hasPdf && hasWord && (
                    <select aria-label="Filter by file type" value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
                      <option value={ALL}>All file types</option>
                      <option value="pdf">PDF</option>
                      <option value="word">Word</option>
                    </select>
                  )}
                  <select aria-label="Sort reports" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={selectClass}>
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="az">Title A–Z</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 text-sm text-gray-600" role="status">
                <span>
                  {filtering
                    ? `${results.length} of ${published.length} ${published.length === 1 ? 'report' : 'reports'}`
                    : `${published.length} ${published.length === 1 ? 'report' : 'reports'}`}
                </span>
                {filtering && (
                  <button onClick={clearAll} className="text-[#8a6614] underline underline-offset-2 hover:no-underline">
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Featured */}
            {featured && (
              <article className="mt-10 bg-white rounded-3xl overflow-hidden shadow-[0_24px_60px_-28px_rgba(0,0,0,0.3)] border border-black/5 grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <div className="aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                  <Cover report={featured} large />
                </div>
                <div className="p-7 md:p-10 flex flex-col">
                  <p className="flex items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 bg-[#C39223]/15 text-[#8a6614] px-3 py-1 rounded-full">
                      <Star size={14} className="fill-current" />
                      {featured.featured ? 'Featured' : 'Latest'}
                    </span>
                    {featured.category && <span className="text-gray-500">{featured.category}</span>}
                  </p>
                  <h2 className="text-2xl md:text-3xl text-black mt-4 leading-snug">{featured.title}</h2>
                  {featured.summary && <p className="text-gray-600 mt-3 leading-relaxed">{featured.summary}</p>}
                  <div className="mt-5">
                    <Meta report={featured} />
                  </div>
                  <div className="mt-auto pt-8">
                    <Actions report={featured} onPreview={() => open(featured.id)} />
                  </div>
                </div>
              </article>
            )}

            {/* Results */}
            {results.length === 0 ? (
              <div className="text-center py-20">
                <Search size={32} className="mx-auto text-gray-300 mb-4" aria-hidden="true" />
                <h2 className="text-xl text-black">No reports match your search</h2>
                <p className="text-gray-600 mt-2">Try different words, or clear the filters.</p>
                <button onClick={clearAll} className="mt-5 bg-black text-white px-6 py-2.5 rounded-full hover:bg-[#C39223] transition-colors">
                  Clear filters
                </button>
              </div>
            ) : (
              grid.length > 0 && (
                <>
                  {featured && <h2 className="text-xl text-black mt-14 mb-5">All reports</h2>}
                  <ul className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${featured ? '' : 'mt-10'}`}>
                    {grid.map((report) => (
                      <li key={report.id}>
                        <article className="h-full bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                          <button
                            type="button"
                            onClick={() => open(report.id)}
                            className="block aspect-[16/10] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C39223] focus-visible:ring-inset"
                            aria-label={`Preview ${report.title}`}
                          >
                            <Cover report={report} />
                          </button>
                          <div className="p-5 flex-1 flex flex-col">
                            {report.category && <p className="text-xs text-[#8a6614] mb-1.5">{report.category}</p>}
                            <h3 className="text-lg text-black leading-snug line-clamp-2">{report.title}</h3>
                            {report.summary && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{report.summary}</p>}
                            <div className="mt-4">
                              <Meta report={report} />
                            </div>
                            <div className="mt-auto pt-5">
                              <Actions report={report} onPreview={() => open(report.id)} />
                            </div>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </>
              )
            )}
          </>
        )}
      </main>

      <Footer />
      <ReportPreview report={openReport} onClose={close} />
    </div>
  );
}
