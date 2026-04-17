import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SearchBar({ value, onChange }) {
  const [term, setTerm] = useState(value);

  useEffect(() => {
    setTerm(value);
  }, [value]);

  useEffect(() => {
    if (term === value) return; // Don't trigger if it matches the parent prop (initial sync or re-render)
    
    const timeout = setTimeout(() => {
      onChange(term);
    }, 300);
    return () => clearTimeout(timeout);
  }, [term, value, onChange]);

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Start typing to search for any Dataset"
        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
