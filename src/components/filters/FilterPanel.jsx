'use client';

import { X } from 'lucide-react';
import FilterGroup from './FilterGroup';

const groups = [
  { label: 'Sectors', field: 'sectors' },
  { label: 'Data Type (Formats)', field: 'formats' },
  { label: 'Tags', field: 'tags' },
  { label: 'Geographies', field: 'geographies' },
];

export default function FilterPanel({ open, onClose, aggregations, selectedFilters, onGroupChange, onReset }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-full max-w-xs transform bg-white p-4 shadow-xl transition duration-300 lg:sticky lg:top-0 lg:translate-x-0 lg:shadow-none ${open ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:block`}>
      <div className="flex items-center justify-between pb-4 lg:hidden">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Filters</h2>
          <p className="text-xs text-slate-500">Refine your dataset search.</p>
        </div>
        <button onClick={onClose} className="inline-flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-slate-600 transition hover:bg-slate-200">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="hidden items-center justify-between gap-3 rounded-full border border-slate-200 bg-slate-50 p-2 pl-5 lg:flex">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">FILTERS</h2>
        <button onClick={onReset} className="rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-primary-light">RESET</button>
      </div>

      <div className="mt-4 space-y-3">
        {groups.map((group) => (
          <FilterGroup
            key={group.field}
            label={group.label}
            field={group.field}
            options={aggregations[group.field] || []}
            selectedValues={selectedFilters[group.field] || []}
            onChange={(value) => onGroupChange(group.field, value)}
          />
        ))}
      </div>

      <div className="mt-4 hidden rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 lg:block">
        <p className="font-semibold text-slate-700">Tip</p>
        <p className="mt-1">Apply multiple filters to narrow results and use search to find a specific dataset name.</p>
      </div>
    </aside>
  );
}
