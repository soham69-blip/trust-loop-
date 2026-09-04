import type { ReactNode } from "react";

export function PageHead({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="border-b border-outline-variant/30 bg-surface-container-lowest px-6 py-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 lg:flex lg:flex-wrap lg:justify-between">
        <div className="min-w-0">
          <span className="font-label-code-sm text-label-code-sm uppercase tracking-widest text-outline font-semibold">
            {eyebrow}
          </span>
          <h1 className="font-headline-sm text-headline-sm mt-1 font-bold tracking-tight text-on-surface">
            {title}
          </h1>
          <p className="mt-1 max-w-3xl text-body-md text-on-surface-variant">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}

export function Panel({
  title,
  subtitle,
  actions,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-outline-variant/30 bg-surface-container-lowest ${className}`}
    >
      {title ? (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-outline-variant/20 px-4 py-3 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <h2 className="truncate font-title-md text-title-md font-semibold text-on-surface">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-0.5 text-body-sm text-on-surface-variant">{subtitle}</p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Btn({
  children,
  onClick,
  variant = "secondary",
  icon,
  disabled,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  icon?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  const styles: Record<string, string> = {
    primary: "bg-primary text-on-primary hover:opacity-90",
    secondary:
      "bg-surface-container-low text-on-surface border border-outline-variant/40 hover:bg-surface-container-high",
    danger: "bg-error text-on-error hover:opacity-90",
    ghost: "text-on-surface-variant hover:bg-surface-container-low",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded px-3 py-1.5 text-label-md font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {icon ? <span className="material-symbols-outlined text-[17px]">{icon}</span> : null}
      {children}
    </button>
  );
}

export type Tone = "positive" | "negative" | "warning" | "neutral" | "info";

const TONES: Record<Tone, string> = {
  positive: "bg-tertiary-container text-on-tertiary-container",
  negative: "bg-error-container text-on-error-container",
  warning: "bg-secondary-container text-on-secondary-container",
  neutral: "bg-surface-container-high text-on-surface-variant",
  info: "bg-primary-container text-on-primary",
};

export function Pill({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 font-label-code-sm text-label-code-sm font-semibold uppercase tracking-wider ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}

export function Stat({
  label,
  value,
  hint,
  icon,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: string;
  tone?: Tone;
}) {
  return (
    <div className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-label-code-sm text-label-code-sm uppercase tracking-widest text-outline font-semibold">
          {label}
        </span>
        {icon ? (
          <span className="material-symbols-outlined shrink-0 text-[18px] text-on-surface-variant">
            {icon}
          </span>
        ) : null}
      </div>
      <div className="mt-2 font-display-sm text-display-sm font-bold tracking-tight text-on-surface">
        {value}
      </div>
      {hint ? (
        <div className="mt-1 flex items-center gap-1.5">
          <Pill tone={tone}>{hint}</Pill>
        </div>
      ) : null}
    </div>
  );
}

export function Bar({ value, tone = "info" }: { value: number; tone?: Tone }) {
  const fills: Record<Tone, string> = {
    positive: "bg-tertiary",
    negative: "bg-error",
    warning: "bg-secondary",
    neutral: "bg-outline",
    info: "bg-primary",
  };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
      <div
        className={`h-full rounded-full ${fills[tone]}`}
        style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }}
      />
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-on-surface-variant font-semibold">
        {label}
      </span>
      {children}
      {hint ? <span className="text-body-sm text-outline">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded border border-outline-variant/50 bg-surface-container-low px-2.5 py-1.5 text-body-md text-on-surface outline-none transition-colors focus:border-primary";

export function EmptyState({ icon, title, detail }: { icon: string; title: string; detail: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-outline-variant/50 px-6 py-10 text-center">
      <span className="material-symbols-outlined text-[28px] text-outline">{icon}</span>
      <p className="font-title-md text-title-md font-semibold text-on-surface">{title}</p>
      <p className="max-w-md text-body-sm text-on-surface-variant">{detail}</p>
    </div>
  );
}
