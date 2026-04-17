import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BarChart3, Calendar, Cloud, Download, Globe, Users } from 'lucide-react';
import { formatDate, stripHtml, truncateText, getLogoUrl } from '@/lib/utils';

const tagColorMap = {
  biodiversity: 'border-emerald-500 bg-emerald-50 text-emerald-700',
  forests: 'border-amber-500 bg-amber-50 text-amber-700',
  climate: 'border-sky-500 bg-sky-50 text-sky-700',
  pollution: 'border-slate-500 bg-slate-50 text-slate-700',
  water: 'border-blue-500 bg-blue-50 text-blue-700',
  health: 'border-rose-500 bg-rose-50 text-rose-700',
  energy: 'border-orange-500 bg-orange-50 text-orange-700',
  agriculture: 'border-lime-500 bg-lime-50 text-lime-700',
  'climate action': 'border-teal-500 bg-teal-50 text-teal-700',
  'public finance': 'border-indigo-500 bg-indigo-50 text-indigo-700',
  'green budget': 'border-green-500 bg-green-50 text-green-700',
  procurement: 'border-violet-500 bg-violet-50 text-violet-700',
  disaster: 'border-red-500 bg-red-50 text-red-700',
};

const defaultTagColor = 'border-slate-400 bg-slate-50 text-slate-600';

function getTagColor(tag) {
  const key = (tag || '').toLowerCase();
  const match = Object.keys(tagColorMap).find((k) => key.includes(k));
  return match ? tagColorMap[match] : defaultTagColor;
}

const sectorColors = [
  'text-amber-500',
  'text-emerald-500',
  'text-blue-500',
  'text-rose-500',
  'text-violet-500',
  'text-teal-500',
];

const formatColors = {
  csv: 'bg-green-600',
  xls: 'bg-red-600',
  xlsx: 'bg-red-600',
  json: 'bg-amber-600',
  pdf: 'bg-red-500',
  xml: 'bg-purple-600',
  zip: 'bg-yellow-600',
  doc: 'bg-indigo-600',
  docx: 'bg-indigo-600',
};

function getFormatColor(format) {
  if (!format) return 'bg-slate-500';
  const key = format.toLowerCase();
  const match = Object.keys(formatColors).find((k) => key.includes(k));
  return match ? formatColors[match] : 'bg-slate-500';
}

function DatasetListItem({ dataset }) {
  const title = dataset.title || dataset.name || 'Untitled dataset';
  const date = dataset.modified ?? dataset.updated_at ?? dataset.created ?? dataset.released ?? dataset.metadata_created ?? dataset.date;
  const description = stripHtml(dataset.description || dataset.summary || 'No description available.');
  const descriptionText = truncateText(description, 260);
  const geography = Array.isArray(dataset.geographies) ? dataset.geographies[0] : dataset.geography || 'Global';
  const downloads = dataset.download_count ?? 0;
  const publisher = dataset.organization || { name: 'Publisher' };
  const tags = Array.isArray(dataset.tags) ? dataset.tags : [];
  const formats = Array.isArray(dataset.formats) ? dataset.formats : dataset.format ? [dataset.format] : [];
  const hasCharts = Boolean(dataset.has_charts || dataset.charts || dataset.visualizations || dataset.chart_count);
  const sectors = Array.isArray(dataset.sectors) ? dataset.sectors : [];
  const logoUrl = getLogoUrl(publisher);

  const displayDownloads = downloads === 0 ? '0' : `${Number(downloads).toLocaleString()}+`;

  return (
    <article className="rounded-lg border border-slate-200 bg-white px-6 py-5 transition hover:shadow-md">
      {/* Title */}
      <Link
        href="#"
        className="text-base font-bold leading-snug text-primary hover:underline"
        title={title}
        style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
      >
        {title}
      </Link>

      {/* Description */}
      <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
        {descriptionText}
      </p>

      {/* Meta row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5" aria-label={`Last updated: ${formatDate(date)}`}>
          <Calendar className="h-3.5 w-3.5 text-accent" />
          <span className="font-medium text-slate-600">Last Updated :</span>
          <span>{date ? formatDate(date) : 'Unknown'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5" aria-label={`Downloads: ${displayDownloads}`}>
          <Download className="h-3.5 w-3.5 text-accent" />
          <span className="font-medium text-slate-600">Downloads :</span>
          <span>{displayDownloads}</span>
        </span>
        <span className="inline-flex items-center gap-1.5" aria-label={`Geography: ${geography}`}>
          <Globe className="h-3.5 w-3.5 text-accent" />
          <span className="font-medium text-slate-600">Geography :</span>
          <span>{geography}</span>
        </span>
        {hasCharts && (
          <span className="inline-flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-accent" />
            <span className="font-medium text-slate-600">With Charts</span>
          </span>
        )}
      </div>

      {/* Sectors + Publisher row — spread apart */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-2">
          <span className="font-medium text-slate-600">Sectors :</span>
          {sectors.length > 0 ? (
            sectors.slice(0, 3).map((sector, idx) => (
              <Cloud key={sector} className={`h-4 w-4 ${sectorColors[idx % sectorColors.length]}`} aria-hidden="true" />
            ))
          ) : (
            <span className="text-slate-400">—</span>
          )}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="font-medium text-slate-600">Published by :</span>
          {logoUrl ? (
            <div className="relative h-5 w-5">
              <Image
                src={logoUrl}
                alt={publisher.name || publisher.title || 'Publisher logo'}
                fill
                className="rounded object-contain"
                sizes="20px"
              />
            </div>
          ) : (
            <Users className="h-4 w-4 text-slate-500" aria-hidden="true" />
          )}
        </span>
      </div>

      {/* Tags + Formats row — spread apart */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-500">
        {/* Tags */}
        <div className="inline-flex items-center gap-2">
          <span className="font-medium text-slate-600">Tags :</span>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className={`inline-block rounded border px-2.5 py-0.5 text-[11px] font-semibold ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-slate-400">—</span>
            )}
          </div>
        </div>

        {/* Formats */}
        <div className="inline-flex items-center gap-2">
          <span className="font-medium text-slate-600">Formats :</span>
          <div className="flex gap-1.5">
            {formats.length > 0 ? (
              formats.slice(0, 4).map((format) => (
                <span
                  key={format}
                  className={`inline-flex h-6 w-6 items-center justify-center rounded text-[9px] font-bold uppercase text-white ${getFormatColor(format)}`}
                  title={format.toUpperCase()}
                >
                  {format.slice(0, 3).toUpperCase()}
                </span>
              ))
            ) : (
              <span className="text-slate-400">—</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(DatasetListItem);
