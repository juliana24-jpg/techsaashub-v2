"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  content: string;
  filename: string;
  mimeType?: string;
  label?: string;
  className?: string;
}

export function DownloadButton({
  content,
  filename,
  mimeType = "text/plain",
  label = "Download",
  className,
}: DownloadButtonProps) {
  function handleDownload() {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-foreground/[0.08] px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-accent/40 hover:text-foreground",
        className,
      )}
    >
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}
