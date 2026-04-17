'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const options = [
  { label: 'Latest Updated', sort: 'recent', order: 'desc' },
  { label: 'Oldest First', sort: 'recent', order: 'asc' },
  { label: 'A → Z', sort: 'title', order: 'asc' },
  { label: 'Z → A', sort: 'title', order: 'desc' },
];

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.sort === value.sort && option.order === value.order) || options[0];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <span>{selected.label}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                onChange({ sort: option.sort, order: option.order });
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <span>{option.label}</span>
              {selected.label === option.label ? <span className="text-primary">✓</span> : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
