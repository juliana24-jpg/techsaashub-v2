"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const delta = max - min;
  const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let h = 0;
  if (max === rNorm) h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
  else if (max === gNorm) h = ((bNorm - rNorm) / delta + 2) * 60;
  else h = ((rNorm - gNorm) / delta + 4) * 60;

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function ColorPickerTool() {
  const [color, setColor] = useState("#4f8cff");

  const { rgb, hsl } = useMemo(() => {
    const rgbValue = hexToRgb(color);
    return { rgb: rgbValue, hsl: rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b) };
  }, [color]);

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="h-16 w-16 shrink-0 cursor-pointer rounded-xl border border-foreground/[0.08] bg-transparent"
          aria-label="Pick a color"
        />
        <div
          className="h-16 flex-1 rounded-xl border border-foreground/[0.08]"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      </div>

      <div className="space-y-2">
        {[
          { label: "HEX", value: color.toUpperCase() },
          { label: "RGB", value: rgbString },
          { label: "HSL", value: hslString },
        ].map((format) => (
          <div
            key={format.label}
            className="glass relative flex items-center justify-between gap-3 p-3.5"
          >
            <div className="glass-edge" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <span className="w-10 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {format.label}
              </span>
              <code className="font-mono text-sm text-foreground">{format.value}</code>
            </div>
            <CopyButton value={format.value} iconOnly />
          </div>
        ))}
      </div>
    </div>
  );
}
