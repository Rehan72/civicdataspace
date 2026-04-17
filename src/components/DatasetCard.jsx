import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BarChart3, Calendar, Cloud, Download, Globe, Users } from 'lucide-react';
import { formatDate, stripHtml, truncateText, getLogoUrl } from '@/lib/utils';

function DatasetCard({ dataset }) {
  const title = dataset.title || dataset.name || 'Untitled dataset';
  const date = dataset.modified ?? dataset.updated_at ?? dataset.created ?? dataset.released ?? dataset.metadata_created ?? dataset.date;
  const description = stripHtml(dataset.description || dataset.summary || 'No description available.');
  const geography = Array.isArray(dataset.geographies) ? dataset.geographies[0] : dataset.geography || 'Global';
  const downloads = dataset.download_count ?? 0;
  const publisher = dataset.organization || { name: 'Unknown' };
  const hasCharts = Boolean(dataset.has_charts || dataset.charts || dataset.visualizations || dataset.chart_count);
  const logoUrl = getLogoUrl(publisher);

  const displayDownloads = downloads === 0 ? '0' : `${Number(downloads).toLocaleString()}+`;

  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 transition hover:shadow-md">
      {/* Title */}
      <div className="mb-3 min-w-0 overflow-hidden">
        <Link
          href="#"
          className="block break-words text-[15px] font-bold leading-snug text-primary hover:underline"
          title={title}
          style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
        >
          {title}
        </Link>
      </div>

      {/* Meta row: date / downloads / geography */}
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1" aria-label={`Last updated: ${formatDate(date)}`}>
          <Calendar className="h-3.5 w-3.5 text-accent" />
          <span>{date ? formatDate(date) : 'Unknown date'}</span>
        </span>
        <span className="inline-flex items-center gap-1" aria-label={`Downloads: ${displayDownloads}`}>
          <Download className="h-3.5 w-3.5 text-accent" />
          <span>{displayDownloads}</span>
        </span>
        <span className="inline-flex items-center gap-1" aria-label={`Geography: ${geography}`}>
          <Globe className="h-3.5 w-3.5 text-accent" />
          <span className="max-w-[90px] truncate">{geography}</span>
        </span>
      </div>

      {/* Description */}
      <div className="mb-auto min-h-[3.5rem] text-[13px] leading-relaxed text-slate-500">
        <p>{truncateText(description, 140)}</p>
      </div>

      {/* Bottom footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        {/* Left icons: cloud + bar chart */}
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" aria-hidden="true" />
          {hasCharts && (
            <BarChart3 className="h-5 w-5 text-accent" aria-hidden="true" />
          )}
        </div>

        {/* Published by + org logo */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>published by</span>
          {logoUrl ? (
            <div className="relative h-6 w-6">
              <Image
                src={logoUrl}
                alt={publisher.name || publisher.title || 'Publisher logo'}
                fill
                className="rounded object-contain"
                sizes="24px"
              />
            </div>
          ) : (
            <Users className="h-4 w-4 text-slate-500" aria-hidden="true" />
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(DatasetCard);
