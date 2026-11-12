"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/config/site";

function isActive(href: string, pathname: string) {
  if (href.includes("#")) return false; // anchor links (Contact) share a page with another item
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onQuote = pathname === "/quote";

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const floating = scrolled || open;

  return (
    <>
      {/* Soft fade under the status bar / top edge so scrolled content never clashes with it */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 transition-opacity duration-500 ${floating ? "opacity-100" : "opacity-0"}`}
        style={{
          height: "calc(var(--safe-top) + 1.5rem)",
          background: "linear-gradient(to bottom, var(--color-cream) 0, var(--color-cream) var(--safe-top), rgb(251 247 244 / 0) 100%)",
        }}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 sm:px-5" style={{ paddingTop: "calc(var(--safe-top) + 0.625rem)" }}>
        {/* Dimmed backdrop behind the open mobile menu */}
        <AnimatePresence>
          {open ? (
            <motion.button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-auto fixed inset-0 -z-10 bg-ink/25 backdrop-blur-[2px] xl:hidden"
            />
          ) : null}
        </AnimatePresence>

        <div
          className={`pointer-events-auto mx-auto max-w-[80rem] rounded-full border transition-[background-color,border-color,box-shadow] duration-500 ${
            floating
              ? "border-line/70 bg-cream/80 shadow-[0_10px_30px_-14px_rgb(31_29_27/0.3)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent"
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-4 pl-4 pr-2 sm:pl-6">
            <Logo />

            <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href, pathname);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors hover:bg-ink/5 hover:text-ink ${
                      active ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-mustard" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink href="/quote" size="sm" variant={onQuote ? "accent" : "primary"} className="!h-11 !px-4 sm:!px-5" aria-current={onQuote ? "page" : undefined}>
                <span className="sm:hidden">Get a quote</span>
                <span className="hidden sm:inline">Get an instant quote</span>
                <ArrowRight className="hidden h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 sm:block" aria-hidden />
              </ButtonLink>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink xl:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto mx-auto mt-2 max-w-[80rem] origin-top overflow-y-auto overscroll-contain rounded-[2rem] border border-line/70 bg-cream/95 shadow-lift backdrop-blur-xl xl:hidden"
              style={{ maxHeight: "calc(100dvh - var(--safe-top) - 6rem)" }}
            >
              <nav aria-label="Mobile" className="flex flex-col px-5 pb-5 pt-2">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href, pathname);
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i + 0.05 }}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="flex items-center justify-between border-b border-line py-3.5 font-display text-2xl text-ink"
                      >
                        <span className="flex items-center gap-3">
                          {link.label}
                          {active ? <span className="h-2 w-2 rounded-full bg-mustard" aria-hidden /> : null}
                        </span>
                        <ArrowRight className="h-5 w-5 text-muted" aria-hidden />
                      </Link>
                    </motion.div>
                  );
                })}
                <ButtonLink href="/quote" size="lg" className="mt-6 w-full" onClick={() => setOpen(false)}>
                  Get an instant quote
                </ButtonLink>
                <a href={SITE.contact.phoneHref} className="mt-2 inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-ink-soft">
                  <Phone className="h-4 w-4" aria-hidden /> {SITE.contact.phone} · {SITE.contact.hours}
                </a>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
