import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

interface PageHeaderProps {
  /** Current page name, shown as the last breadcrumb. */
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}

/** Consistent inner-page introduction with breadcrumbs. */
export function PageHeader({ crumb, eyebrow, title, intro, children, align = "left" }: PageHeaderProps) {
  const centered = align === "center";
  return (
    <header className="grain relative overflow-hidden bg-gradient-to-b from-blush via-cream to-cream pb-12 pt-28 sm:pb-16 sm:pt-36">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-mustard/10 blur-[90px]" aria-hidden />
      <div className={`container-page relative ${centered ? "text-center" : ""}`}>
        <nav aria-label="Breadcrumb">
          <ol className={`flex items-center gap-1.5 text-sm text-muted ${centered ? "justify-center" : ""}`}>
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-ink">
              {crumb}
            </li>
          </ol>
        </nav>
        <p className={`eyebrow anim-rise mt-8 ${centered ? "justify-center" : ""}`}>{eyebrow}</p>
        <h1 className="heading-xl anim-rise mt-4 max-w-3xl text-[2.6rem] text-ink sm:text-6xl" style={{ "--d": "60ms", marginInline: centered ? "auto" : undefined } as CSSProperties}>
          {title}
        </h1>
        {intro ? (
          <p className={`anim-rise mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl ${centered ? "mx-auto" : ""}`} style={{ "--d": "120ms" } as CSSProperties}>
            {intro}
          </p>
        ) : null}
        {children ? (
          <div className="anim-rise mt-8" style={{ "--d": "180ms" } as CSSProperties}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
