import { memo } from 'react';

const SkeletonCard = () => (
  <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-5">
    <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-slate-100" />
    <div className="mb-3 flex gap-3">
      <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
    </div>
    <div className="mb-4 space-y-2">
      <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
    </div>
    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
      <div className="flex gap-2">
        <div className="h-5 w-5 animate-pulse rounded bg-slate-100" />
        <div className="h-5 w-5 animate-pulse rounded bg-slate-100" />
      </div>
      <div className="h-5 w-24 animate-pulse rounded bg-slate-100" />
    </div>
  </div>
);

const SkeletonListItem = () => (
  <div className="rounded-lg border border-slate-200 bg-white px-6 py-5">
    <div className="h-5 w-1/2 animate-pulse rounded bg-slate-100" />
    <div className="mt-3 space-y-2">
      <div className="h-3.5 w-full animate-pulse rounded bg-slate-100" />
      <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-100" />
    </div>
    <div className="mt-4 flex gap-6">
      <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
    </div>
    <div className="mt-4 flex justify-between">
      <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
    </div>
  </div>
);

export default memo(function SkeletonList({ viewMode, count = 5 }) {
  return (
    <div className={viewMode === 'list' ? 'space-y-4' : 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3'}>
      {Array.from({ length: count }).map((_, idx) => (
        viewMode === 'list' ? <SkeletonListItem key={idx} /> : <SkeletonCard key={idx} />
      ))}
    </div>
  );
});
