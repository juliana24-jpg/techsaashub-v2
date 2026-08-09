import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  Icon: LucideIcon;
  accent?: "primary" | "secondary" | "accent";
}

const accentClasses = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

export function StatCard({ label, value, Icon, accent = "primary" }: StatCardProps) {
  return (
    <div className="glass relative p-6">
      <div className="glass-edge" aria-hidden="true" />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${accentClasses[accent]}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
