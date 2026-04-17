'use client';

import { useState } from 'react';
import { ChevronDown, Minus } from 'lucide-react';

export default function FilterGroup({ label, options, selectedValues, onChange }) {
  const [open, setOpen] = useState(true);
  const normalizedOptions = Array.isArray(options)
    ? options
    : Object.entries(options || {}).map(([key, value]) => {
        if (value && typeof value === 'object') {
          return {
            value: value.value ?? key,
            label: value.label ?? key,
            count: value.count ?? '',
          };
        }

        return { value: key, label: key, count: value };
      });

  const optionCount = normalizedOptions.length;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-800">
        <span>{label} <span className="text-slate-400">({optionCount})</span></span>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-slate-500 transition">
          {open ? <Minus className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </span>
      </button>
      {open && (
        <div className="mt-3 space-y-1.5">
          {normalizedOptions.map((option) => {
            const checked = Array.isArray(selectedValues) && selectedValues.includes(option.value);
            return (
              <label key={option.value} className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange(option.value)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span className="flex-1 text-slate-600">{option.label}</span>
                <span className="text-xs text-slate-400">{option.count}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
