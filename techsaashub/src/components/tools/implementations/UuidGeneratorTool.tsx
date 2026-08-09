"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/CopyButton";

export function UuidGeneratorTool() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  function generate() {
    const clampedCount = Math.min(Math.max(count, 1), 50);
    setUuids(Array.from({ length: clampedCount }, () => crypto.randomUUID()));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="uuid-count" className="mb-1.5 block text-sm font-medium text-foreground">
            How many? (max 50)
          </label>
          <Input
            id="uuid-count"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="w-28"
          />
        </div>
        <Button type="button" onClick={generate}>
          Generate
        </Button>
        {uuids.length > 1 && <CopyButton value={uuids.join("\n")} label="Copy all" />}
      </div>

      {uuids.length > 0 && (
        <ul className="glass relative divide-y divide-foreground/[0.06] overflow-hidden">
          <div className="glass-edge" aria-hidden="true" />
          {uuids.map((uuid) => (
            <li key={uuid} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <code className="truncate font-mono text-sm text-foreground">{uuid}</code>
              <CopyButton value={uuid} iconOnly />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
