"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type ScrollFadeInProps = {
  children: ReactNode;
  className?: string;
  /** Delay animasi fade-in (ms) — stagger */
  delay?: number;
  /** Jarak slide dari bawah (px) */
  y?: number;
  /** Durasi animasi (ms) */
  duration?: number;
};

export function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
  y = 28,
  duration = 700,
}: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: [0, 0.12, 0.25], rootMargin: "0px 0px -4% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-fade-in ${visible ? "scroll-fade-in--visible" : ""} ${className}`}
      style={
        {
          "--fade-y": `${y}px`,
          "--fade-delay": `${delay}ms`,
          "--fade-duration": `${duration}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
