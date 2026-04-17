'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import FilterPanel from '@/components/filters/FilterPanel';
import SearchBar from '@/components/SearchBar';
import ViewToggle from '@/components/ViewToggle';
import SortDropdown from '@/components/SortDropdown';
import DatasetCard from '@/components/DatasetCard';
import DatasetListItem from '@/components/DatasetListItem';
import Pagination from '@/components/Pagination';
import SkeletonList from '@/components/SkeletonList';
import { fetchDatasets } from '@/lib/api';
import { useDatasetStore } from '@/store/useDatasetStore';
import { Copy, Check } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 5;
const DEFAULT_SORT = 'recent';
const DEFAULT_ORDER = 'desc';

const buildQueryState = (params) => ({
  query: params.get('query') || '',
  page: Number(params.get('page') || DEFAULT_PAGE),
  size: Number(params.get('size') || DEFAULT_SIZE),
  sort: params.get('sort') || DEFAULT_SORT,
  order: params.get('order') || DEFAULT_ORDER,
  filters: {
    sectors: params.get('sectors')?.split(',').filter(Boolean) || [],
    formats: params.get('formats')?.split(',').filter(Boolean) || [],
    tags: params.get('tags')?.split(',').filter(Boolean) || [],
    geographies: params.get('geographies')?.split(',').filter(Boolean) || [],
  },
});

export default function Page() {
  const store = useDatasetStore(useShallow(state => ({
    query: state.query,
    page: state.page,
    size: state.size,
    sort: state.sort,
    order: state.order,
    filters: state.filters,
    setQuery: state.setQuery,
    setPage: state.setPage,
    setSize: state.setSize,
    setSort: state.setSort,
    toggleFilter: state.toggleFilter,
    resetFilters: state.resetFilters,
    hydrateFromParams: state.hydrateFromParams
  })));
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [aggregations, setAggregations] = useState({ sectors: [], formats: [], tags: [], geographies: [] });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Initialize from URL on mount only once if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.toString()) {
      store.hydrateFromParams(params);
      // Clean URL immediately after hydrating
      window.history.replaceState(null, '', window.location.pathname);
    }
    setIsInitialized(true);
  }, []);

  // Sync state with Browser History for Back button support
  useEffect(() => {
    if (!isInitialized) return;

    // We push to history state but Keep the URL CLEAN (path only)
    window.history.pushState(
      {
        query: store.query,
        page: store.page,
        size: store.size,
        sort: store.sort,
        order: store.order,
        filters: store.filters
      },
      '',
      window.location.pathname
    );
  }, [store.query, store.page, store.size, store.sort, store.order, store.filters, isInitialized]);

  // Handle Back/Forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        useDatasetStore.setState(event.state);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Data fetching logic
  useEffect(() => {
    if (!isInitialized) return;

    const source = new AbortController();

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetchDatasets({
          query: store.query,
          sectors: store.filters.sectors,
          formats: store.filters.formats,
          tags: store.filters.tags,
          geographies: store.filters.geographies,
          page: store.page,
          size: store.size,
          sort: store.sort,
          order: store.order,
        }, { signal: source.signal });

        setResults(response.results);
        setTotal(response.total);
        setAggregations(response.aggregations || { sectors: [], formats: [], tags: [], geographies: [] });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Dataset fetch failed', error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => source.abort();
  }, [store.query, store.page, store.size, store.sort, store.order, store.filters, isInitialized]);

  // Smooth scroll to top on page selection
  useEffect(() => {
    if (isInitialized) {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [store.page, store.filters, isInitialized]);

  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / store.size)), [total, store.size]);

  // Generate shareable link
  const copyShareLink = useCallback(() => {
    const params = new URLSearchParams();
    if (store.query) params.set('query', store.query);
    if (store.page !== DEFAULT_PAGE) params.set('page', String(store.page));
    if (store.size !== DEFAULT_SIZE) params.set('size', String(store.size));
    if (store.sort !== DEFAULT_SORT) params.set('sort', store.sort);
    if (store.order !== DEFAULT_ORDER) params.set('order', store.order);
    if (store.filters.sectors.length) params.set('sectors', store.filters.sectors.join(','));
    if (store.filters.formats.length) params.set('formats', store.filters.formats.join(','));
    if (store.filters.tags.length) params.set('tags', store.filters.tags.join(','));
    if (store.filters.geographies.length) params.set('geographies', store.filters.geographies.join(','));

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [store]);

  return (
    <div className="min-h-screen bg-surface text-slate-900">
      <Header />
      <Breadcrumb />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8" id="main-content">
        <div className="mt-2 grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside>
            <FilterPanel
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              aggregations={aggregations}
              selectedFilters={store.filters}
              onGroupChange={store.toggleFilter}
              onReset={store.resetFilters}
            />
          </aside>

          <section className="space-y-6" aria-labelledby="results-title">
            <h2 id="results-title" className="sr-only">Dataset Search Results</h2>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <SearchBar
                  value={store.query}
                  onChange={store.setQuery}
                />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <ViewToggle value={viewMode} onChange={setViewMode} />
                  <SortDropdown
                    value={{ sort: store.sort, order: store.order }}
                    onChange={({ sort, order }) => store.setSort(sort, order)}
                  />
                  {/* Share Link Button */}
                  {/* <button
                    onClick={copyShareLink}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    title="Copy shareable link with current filters"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-slate-400" />
                        <span>Share</span>
                      </>
                    )}
                  </button> */}
                </div>
              </div>
            </div>

            <div aria-live="polite">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-800">{total.toLocaleString()} datasets</p>
                  <p className="text-xs text-slate-500">Showing search results and filtered datasets.</p>
                </div>
                <button
                  className="inline-flex items-center rounded bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary/40 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-controls="filter-panel"
                >
                  Show filters
                </button>
              </div>

              {loading ? (
                <SkeletonList viewMode={viewMode} count={store.size} />
              ) : results.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 p-12 text-center text-slate-600">
                  No datasets match your search. Try different keywords or filter selections.
                </div>
              ) : viewMode === 'list' ? (
                <div className="space-y-4">
                  {results.map((item) => (
                    <DatasetListItem key={item.id} dataset={item} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((item) => (
                    <DatasetCard key={item.id} dataset={item} />
                  ))}
                </div>
              )}
            </div>

            <nav aria-label="Pagination Navigation">
              <Pagination
                page={store.page}
                pageCount={pageCount}
                rowsPerPage={store.size}
                onPageChange={store.setPage}
                onRowsPerPageChange={store.setSize}
              />
            </nav>
          </section>
        </div>
      </main>
      <Footer />

      {/* Back to Top Button */}
      <button
        onClick={() => {
          if (window.lenis) {
            window.lenis.scrollTo(0, { duration: 1.5 });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary-light hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/40"
        aria-label="Back to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
