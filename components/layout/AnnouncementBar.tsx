"use client";

import { Pause } from "lucide-react";
import { useState } from "react";

const MESSAGE =
  "SUBSCRIBE AND GET 15% OFF YOUR FIRST PURCHASE. USE COUPON: HELLOHIJABFIRST";

export function AnnouncementBar() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative flex h-9 items-center justify-center bg-hf-primary px-10 text-[11px] font-medium tracking-[0.12em] text-white"
      role="region"
      aria-label="Promotional announcement"
    >
      <p className={`text-center uppercase ${paused ? "" : ""}`}>{MESSAGE}</p>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute right-4 flex h-6 w-6 items-center justify-center text-white/90 transition hover:text-white"
        aria-label={paused ? "Resume announcement" : "Pause announcement"}
      >
        <Pause className="h-3 w-3 fill-current" strokeWidth={0} />
      </button>
    </div>
  );
}
