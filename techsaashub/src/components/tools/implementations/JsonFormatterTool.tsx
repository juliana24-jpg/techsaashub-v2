"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/CopyButton";
import { DownloadButton } from "@/components/tools/DownloadButton";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function format(indent: number) {
    if (!input.trim()) {
      setError("Paste some JSON first.");
      setOutput("");
      return;
    }
    try {
      const parsed: unknown = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON.");
      setOutput("");
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="json-input" className="mb-1.5 block text-sm font-medium text-foreground">
          Paste JSON
        </label>
        <Textarea
          id="json-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={8}
          placeholder='{"example": true, "nested": {"value": 1}}'
          className="font-mono text-xs"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => format(2)}>
          Beautify
        </Button>
        <Button type="button" variant="outline" onClick={() => format(0)}>
          Minify
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-medium text-success">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Valid JSON
            </span>
            <div className="flex gap-2">
              <CopyButton value={output} />
              <DownloadButton content={output} filename="formatted.json" mimeType="application/json" />
            </div>
          </div>
          <Textarea readOnly value={output} rows={10} className="font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
