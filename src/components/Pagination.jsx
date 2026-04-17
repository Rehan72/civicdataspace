export default function Pagination({ page, pageCount, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-6 py-4 md:flex-row md:items-center md:justify-end">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span>Rows per page</span>
        <select
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
          className="rounded border border-slate-200 bg-white px-2 py-1 text-sm outline-none transition focus:border-primary"
        >
          {[5, 10, 15, 25].map((value) => (
            <option key={value} value={value}>{String(value).padStart(2, '0')}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="font-medium">Page {String(page).padStart(2, '0')} of {String(pageCount).padStart(2, '0')}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            className="rounded px-2 py-1 text-sm text-slate-500 transition disabled:cursor-not-allowed disabled:opacity-30 hover:bg-slate-100 hover:text-slate-900"
          >«</button>
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded px-2 py-1 text-sm text-slate-500 transition disabled:cursor-not-allowed disabled:opacity-30 hover:bg-slate-100 hover:text-slate-900"
          >‹</button>
          <button
            type="button"
            onClick={() => onPageChange(Math.min(pageCount, page + 1))}
            disabled={page === pageCount}
            className="rounded px-2 py-1 text-sm text-slate-500 transition disabled:cursor-not-allowed disabled:opacity-30 hover:bg-slate-100 hover:text-slate-900"
          >›</button>
          <button
            type="button"
            onClick={() => onPageChange(pageCount)}
            disabled={page === pageCount}
            className="rounded px-2 py-1 text-sm text-slate-500 transition disabled:cursor-not-allowed disabled:opacity-30 hover:bg-slate-100 hover:text-slate-900"
          >»</button>
        </div>
      </div>
    </div>
  );
}
