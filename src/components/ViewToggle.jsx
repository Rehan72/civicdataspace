import { LayoutGrid, List } from 'lucide-react';

const options = [
  { label: 'grid', Icon: LayoutGrid },
  { label: 'list', Icon: List },
];

export default function ViewToggle({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-slate-700">
      {options.map((option) => {
        const active = option.label === value;
        return (
          <button
            key={option.label}
            type="button"
            onClick={() => onChange(option.label)}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition ${active ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-white'}`}
          >
            <option.Icon className="h-3.5 w-3.5" />
            {option.label === 'grid' ? 'Grid' : 'List'}
          </button>
        );
      })}
    </div>
  );
}
