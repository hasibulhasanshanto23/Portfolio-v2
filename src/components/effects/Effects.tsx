"use client";

import { useEffect } from "react";

/**
 * Small progressive-enhancement layer: scroll reveals, card spotlight, active nav link,
 * number count-up, copy buttons, scroll progress, cursor glow, hero parallax and magnetic buttons.
 * The page is fully readable without it.
 */
export default function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const root = document.documentElement;
    const cleanups: Array<() => void> = [];

    // 1. Reveal on scroll
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => revealIO.observe(el));
    cleanups.push(() => revealIO.disconnect());

    // 2. Pointer spotlight on glass cards
    document.querySelectorAll<HTMLElement>("[data-spot]").forEach((card) => {
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      card.addEventListener("pointermove", move);
      cleanups.push(() => card.removeEventListener("pointermove", move));
    });

    // 3. Active nav link
    const links = new Map<string, HTMLAnchorElement>();
    document.querySelectorAll<HTMLAnchorElement>("[data-nav] a[href^='#']").forEach((a) => {
      links.set(a.getAttribute("href")!.slice(1), a);
    });
    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((a) => a.removeAttribute("aria-current"));
            links.get(e.target.id)?.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((_, id) => {
      const s = document.getElementById(id);
      if (s) navIO.observe(s);
    });
    cleanups.push(() => navIO.disconnect());

    // 4. Count-up numbers
    if (!reduce) {
      const countIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            countIO.unobserve(e.target);
            const el = e.target as HTMLElement;
            const end = Number(el.dataset.count);
            const suffix = el.dataset.suffix ?? "";
            const t0 = performance.now();
            const tick = (t: number) => {
              const p = Math.min((t - t0) / 1100, 1);
              el.textContent = `${Math.round(end * (1 - Math.pow(1 - p, 3)))}${suffix}`;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        },
        { threshold: 0.6 }
      );
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = `0${el.dataset.suffix ?? ""}`;
        countIO.observe(el);
      });
      cleanups.push(() => countIO.disconnect());
    }

    // 5. Copy buttons
    document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((btn) => {
      const click = async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy ?? "");
          const old = btn.textContent;
          btn.textContent = "Copied";
          setTimeout(() => (btn.textContent = old), 1500);
        } catch {
          /* clipboard blocked: ignore */
        }
      };
      btn.addEventListener("click", click);
      cleanups.push(() => btn.removeEventListener("click", click));
    });

    // 6. Scroll progress + hero parallax (one rAF-throttled handler)
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = root.scrollHeight - root.clientHeight;
      root.style.setProperty("--p", String(max > 0 ? y / max : 0));
      if (!reduce && y < 1400) {
        parallax.forEach((el) => {
          const s = Number(el.dataset.parallax);
          el.style.transform = `translate3d(0, ${(y * s).toFixed(1)}px, 0)`;
        });
        const fade = Math.max(0, 1 - y / 700);
        root.style.setProperty("--hero-fade", String(fade));
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // 7. Soft cursor glow
    if (fine && !reduce) {
      const glow = (ev: PointerEvent) => {
        root.style.setProperty("--cx", `${ev.clientX}px`);
        root.style.setProperty("--cy", `${ev.clientY}px`);
      };
      window.addEventListener("pointermove", glow, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", glow));
    }

    // 8. Magnetic buttons
    if (fine && !reduce) {
      document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          btn.style.setProperty("--tx", `${(x * 0.22).toFixed(1)}px`);
          btn.style.setProperty("--ty", `${(y * 0.3).toFixed(1)}px`);
        };
        const leave = () => {
          btn.style.setProperty("--tx", "0px");
          btn.style.setProperty("--ty", "0px");
        };
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
