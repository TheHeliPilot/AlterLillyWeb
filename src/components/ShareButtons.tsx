"use client";

import { Icon } from "@/components/ui/Icons";
import { SITE_CONFIG } from "@/lib/constants";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const url = `${SITE_CONFIG.url}/devblog/${slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-border/30 rounded-lg text-text-muted hover:text-text-cream hover:bg-border/50 transition-colors"
        aria-label="Share on Twitter"
      >
        <Icon name="twitter" size={20} />
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 bg-border/30 rounded-lg text-text-muted hover:text-text-cream hover:bg-border/50 transition-colors"
        aria-label="Copy link"
      >
        <Icon name="externalLink" size={20} />
      </button>
    </div>
  );
}

export default ShareButtons;
