"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  Home as HomeIcon,
  Facebook,
  Mail,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";

/* One source of truth */
type NavLink = { href: string; label: string; icon?: LucideIcon };

/*
  Treat Home as a section at the top using "/#home".
  Add id="home" to your top/hero section on the home page.
*/
const links: NavLink[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/contact", label: "Contact", icon: Mail },
];

/* Defer hashchange to the next frame to avoid "useInsertionEffect must not schedule updates" */
function scheduleHashChange() {
  if (typeof window === "undefined") return;
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("hashchange"));
    });
  } else {
    setTimeout(() => {
      window.dispatchEvent(new Event("hashchange"));
    }, 0);
  }
}

/* Patch history to emit an event when pushState/replaceState are called.
   This makes Next.js hash navigations notify our useHash store without violating insertion effect constraints. */
let historyPatched = false;
let historyPatchRefs = 0;
let originalPushState: History["pushState"] | null = null;
let originalReplaceState: History["replaceState"] | null = null;

function ensureHistoryPatched() {
  if (typeof window === "undefined") return () => {};

  historyPatchRefs += 1;
  if (!historyPatched) {
    historyPatched = true;
    originalPushState = history.pushState;
    originalReplaceState = history.replaceState;

    history.pushState = function patchedPushState(
      this: History,
      ...args: Parameters<History["pushState"]>
    ): ReturnType<History["pushState"]> {
      const ret = originalPushState!.apply(history, args);
      scheduleHashChange();
      return ret;
    };

    history.replaceState = function patchedReplaceState(
      this: History,
      ...args: Parameters<History["replaceState"]>
    ): ReturnType<History["replaceState"]> {
      const ret = originalReplaceState!.apply(history, args);
      scheduleHashChange();
      return ret;
    };
  }

  return () => {
    historyPatchRefs -= 1;
    if (historyPatchRefs === 0 && historyPatched) {
      if (originalPushState) history.pushState = originalPushState;
      if (originalReplaceState) history.replaceState = originalReplaceState;
      originalPushState = null;
      originalReplaceState = null;
      historyPatched = false;
    }
  };
}

/* SSR-safe media query */
function useMediaQuery(query: string) {
  const getSnapshot = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;

  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia(query);
      const handler = () => callback();

      if ("addEventListener" in mql) {
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
      } else {
        // Legacy Safari
        type LegacyMQL = MediaQueryList & {
          addListener: (
            listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
          ) => void;
          removeListener: (
            listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
          ) => void;
        };
        const legacy = mql as unknown as LegacyMQL;
        legacy.addListener(handler);
        return () => legacy.removeListener(handler);
      }
    },
    getSnapshot,
    () => false // server and first hydration render
  );
}

/* SSR-safe hash store (reacts to push/replaceState via the patch above) */
function useHash() {
  const getSnapshot = () =>
    typeof window !== "undefined" ? window.location.hash : "";

  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const handler = () => callback();

      const unpatch = ensureHistoryPatched();
      window.addEventListener("hashchange", handler);
      window.addEventListener("popstate", handler);

      return () => {
        window.removeEventListener("hashchange", handler);
        window.removeEventListener("popstate", handler);
        unpatch();
      };
    },
    getSnapshot,
    () => ""
  );
}

/* Href parts helper */
function splitBaseAndHash(href: string) {
  if (href.startsWith("#")) return { base: "", hash: href };
  if (href.includes("#")) {
    const [base, h] = href.split("#");
    return { base: base || "/", hash: `#${h}` };
  }
  return { base: href, hash: "" };
}

function samePath(a: string, b: string) {
  const norm = (p: string) => (p || "/").replace(/\/+$/, "") || "/";
  return norm(a) === norm(b);
}

/* Floating “Dynamic Island” header that expands on mobile */
export default function SiteHeader() {
  const pathname = usePathname();
  const hash = useHash();

  // Ref to the island wrapper (used for click-away)
  const islandRef = useRef<HTMLDivElement>(null);

  // Track whether header has mounted to avoid re-playing initial animations.
  // Use state instead of reading a ref during render (avoids lint/compile warnings).
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    // Defer the state flip to the next frame to avoid a sync state update during
    // the effect execution which can trigger a cascading render warning.
    const id =
      typeof requestAnimationFrame === "function"
        ? requestAnimationFrame(() => setHasMounted(true))
        : setTimeout(() => setHasMounted(true), 0);
    return () => {
      if (typeof cancelAnimationFrame === "function")
        cancelAnimationFrame(id as number);
      else clearTimeout(id as number);
    };
  }, []);

  // Hydration-safe: do not read window at initial render
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update(); // align immediately after mount
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isMobileOpen = !isMdUp && mobileOpen;

  // Measure collapsible content height for smooth max-height animation
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const rafId = requestAnimationFrame(() => {
      setContentH(el.scrollHeight);
    });

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => setContentH(el.scrollHeight))
        : null;

    ro?.observe(el);

    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
    };
  }, []);

  // Active logic supporting routes + hashes
  const isActive = (href: string) => {
    const parts = splitBaseAndHash(href);
    if (!parts.hash) return samePath(pathname, parts.base);
    if (parts.base === "") return hash === parts.hash;
    return samePath(pathname, parts.base) && hash === parts.hash;
  };

  // Scroll spy: automatically update hash while scrolling (current route only)
  const inPageAnchors = useMemo(() => {
    return links
      .map((l) => splitBaseAndHash(l.href))
      .filter((p) => p.hash && (p.base === "" || samePath(p.base, pathname)))
      .map((p) => p.hash.slice(1));
  }, [pathname]);

  // Suppress scroll-spy briefly after a manual nav click
  const lastManualNavRef = useRef(0);
  const markManualNav = () => {
    lastManualNavRef.current = performance.now();
  };
  const SPY_SUPPRESS_MS = 600;
  // Track the last hash the user requested via clicking a nav link so we can
  // programmatically scroll to it after Next.js route changes (useful when
  // clicking an anchor like "/#home" from a different section/page).
  const lastRequestedHashRef = useRef<string | null>(null);

  const markManualNavWithHref = (href?: string) => {
    markManualNav();
    if (!href) {
      lastRequestedHashRef.current = null;
      return;
    }
    const parts = splitBaseAndHash(href);
    lastRequestedHashRef.current = parts.hash || null;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!inPageAnchors.length) return;

    const setHashSafe = (id: string) => {
      const next = `#${id}`;
      if (window.location.hash === next) return;
      const base = window.location.pathname + window.location.search;
      history.replaceState(null, "", base + next);
      // Defer notifying the store to the next frame
      scheduleHashChange();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore scroll-spy updates right after a manual nav
        if (performance.now() - lastManualNavRef.current < SPY_SUPPRESS_MS) {
          return;
        }

        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const best = visible[0];
        if (best.target.id) setHashSafe(best.target.id);
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    inPageAnchors.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [inPageAnchors]);

  // After a manual nav that requested an in-page hash, attempt to scroll to
  // the target element. We retry a few times because the target element may
  // not be present immediately after a route change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const requested = lastRequestedHashRef.current;
    if (!requested) return;

    const id = requested.startsWith("#") ? requested.slice(1) : requested;
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        // Use instant scroll so all navigations behave consistently
        // (no smooth scrolling) and the anchor is reached immediately.
        el.scrollIntoView({ behavior: "auto", block: "start" });
        lastRequestedHashRef.current = null;
        return;
      }
      attempts++;
      if (attempts < 6) {
        // Try again after a short delay (element may mount shortly after)
        setTimeout(tryScroll, 100);
      } else {
        // Give up after a few tries
        lastRequestedHashRef.current = null;
      }
    };

    // Only try to auto-scroll for a recent manual nav click to avoid
    // interfering with normal scroll-spy behaviour.
    if (performance.now() - lastManualNavRef.current < 2000) {
      // Defer first attempt to next frame to allow DOM updates
      if (typeof requestAnimationFrame === "function")
        requestAnimationFrame(tryScroll);
      else setTimeout(tryScroll, 0);
    }
  }, [pathname, hash]);

  // Click-away + Escape to close on mobile
  useEffect(() => {
    if (!isMobileOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = islandRef.current;
      if (el && e.target instanceof Node && !el.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 sm:top-4 md:top-6">
      <div className="mx-auto w-full max-w-3xl px-3 sm:px-4 pointer-events-auto">
        {/* Backdrop that closes the menu when tapping outside (mobile only) */}
        {isMobileOpen && (
          <button
            aria-label="Close menu backdrop"
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
            tabIndex={-1}
            style={{ background: "transparent" }} // or 'rgba(0,0,0,0.3)' to dim
          />
        )}

        <div
          ref={islandRef}
          className={[
            "relative z-50 overflow-hidden border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60",
            "transition-[box-shadow,border-radius] duration-300",
            scrolled ? "shadow-lg" : "shadow-sm",
            isMobileOpen ? "rounded-2xl" : "rounded-[18px]",
            "w-full",
          ].join(" ")}>
          {/* Top bar row */}
          <div className="flex h-12 items-center gap-2 px-2 pl-3 pr-2">
            {/* Mobile toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-expanded={isMobileOpen}
                aria-controls="island-mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={18}
                height={18}
                priority={true}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="mx-2 hidden md:flex flex-1 items-center justify-center gap-3">
              {links.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => markManualNavWithHref(href)}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative rounded-lg px-3 py-1.5 text-sm",
                      "transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    ].join(" ")}>
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-muted"
                        // Only run the "initial" animation on the very first mount to
                        // avoid a quick pop-in/flicker when switching between sections.
                        initial={
                          hasMounted ? false : { opacity: 0, scale: 0.97 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        // Remove the exit animation so the shared layout animation via
                        // layoutId can handle smooth transitions without a visible gap.
                        transition={{
                          type: "spring",
                          duration: 0.45,
                          bounce: 0.25,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto" />
          </div>

          {/* Collapsible island content (mobile) */}
          <div
            id="island-mobile-nav"
            className="md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
            style={{
              maxHeight: isMobileOpen ? contentH : 0,
              opacity: isMobileOpen ? 1 : 0,
            }}
            aria-hidden={!isMobileOpen}>
            <div ref={contentRef}>
              <Separator />
              <nav className="px-2 py-2">
                {links.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => {
                        markManualNavWithHref(href);
                        setMobileOpen(false); // close on navigation
                      }}
                      className={[
                        "flex items-center gap-3 rounded-md px-3 py-2 my-2 text-sm transition-colors",
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                      ].join(" ")}>
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <Separator className="my-2" />

              <div className="px-4 pb-3">
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link
                    href="https://www.facebook.com/asintarchs/"
                    target="_blank"
                    rel="noreferrer">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {/* End collapsible */}
        </div>
      </div>
    </header>
  );
}
