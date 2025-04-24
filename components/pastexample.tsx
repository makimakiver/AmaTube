/* VideoCard.tsx */
'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface VideoCardProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** https://i.ytimg.com/vi/{id}/hqdefault.jpg */
  thumbnail: string;
  /** e.g. "3:11"  */
  duration?: string;
  title: string;
  channel: string;
  views: string;          // "12 k views"
  published: string;      // "2 weeks ago"
}

/** A single YouTube‑style video tile */
export const VideoCard = React.forwardRef<HTMLAnchorElement, VideoCardProps>(
  (
    {
      href,
      thumbnail,
      duration,
      title,
      channel,
      views,
      published,
      className,
      ...props
    },
    ref,
  ) => (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'flex w-[340px] flex-col gap-2 cursor-pointer',
        className,
      )}
      {...props}
    >
      {/* ───────── Thumbnail ───────── */}
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(min-width: 768px) 340px, 100vw"
        />

        {/* duration badge */}
        {duration && (
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
            {duration}
          </span>
        )}
      </div>

      {/* ───────── Meta ───────── */}
      <div className="flex flex-col">
        <h3 className="line-clamp-2 text-[15px] font-medium leading-tight">
          {title}
        </h3>
        <span className="mt-0.5 text-[13px] text-muted-foreground">
          {channel}
        </span>
        <span className="text-[12px] text-muted-foreground">
          {views} • {published}
        </span>
      </div>
    </a>
  ),
);
VideoCard.displayName = 'VideoCard';
