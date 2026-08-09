"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/CopyButton";

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(
  length: number,
  options: Record<keyof typeof CHARSETS, boolean>,
): string {
  const activeSets = (Object.keys(CHARSETS) as Array<keyof typeof CHARSETS>).filter(
    (key) => options[key],
  );
  if (activeSets.length === 0) return "";

  const pool = activeSets.map((key) => CHARSETS[key]).join("");
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(randomValues, (value) => pool[value % pool.length]).join("");
}

const defaultOptions = { lowercase: true, uppercase: true, numbers: true, symbols: true };

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState(defaultOptions);
  const [password, setPassword] = useState(() => generatePassword(16, defaultOptions));

  function regenerate(nextLength = length, nextOptions = options) {
    setPassword(generatePassword(nextLength, nextOptions));
  }

  function toggleOption(key: keyof typeof CHARSETS) {
    const nextOptions = { ...options, [key]: !options[key] };
    setOptions(nextOptions);
    regenerate(length, nextOptions);
  }

  function handleLengthChange(nextLength: number) {
    setLength(nextLength);
    regenerate(nextLength, options);
  }

  return (
    <div className="space-y-5">
      <div className="glass relative flex items-center justify-between gap-3 p-4">
        <div className="glass-edge" aria-hidden="true" />
        <code className="min-w-0 flex-1 truncate font-mono text-lg text-foreground">
          {password || "Select at least one character set"}
        </code>
        <div className="flex shrink-0 gap-2">
          <CopyButton value={password} iconOnly />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => regenerate()}
            aria-label="Regenerate"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div>
        <label htmlFor="password-length" className="mb-1.5 block text-sm font-medium text-foreground">
          Length: {length}
        </label>
        <input
          id="password-length"
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(event) => handleLengthChange(Number(event.target.value))}
          className="w-full accent-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.keys(CHARSETS) as Array<keyof typeof CHARSETS>).map((key) => (
          <label
            key={key}
            className="flex items-center gap-2 rounded-lg border border-foreground/[0.08] px-3 py-2 text-sm capitalize text-foreground"
          >
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => toggleOption(key)}
              className="h-4 w-4 shrink-0 accent-accent"
            />
            {key}
          </label>
        ))}
      </div>

      <Button type="button" onClick={() => regenerate()}>
        Generate new password
      </Button>
    </div>
  );
}
