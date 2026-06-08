"use client";

import { useState, type FormEvent } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div>
      <p className="mb-4 text-[13px] font-semibold leading-snug tracking-wide">
        Sign up for our newsletter - enter your email below
      </p>

      <form onSubmit={handleSubmit} className="flex border border-white">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setSubmitted(false);
            setEmail(e.target.value);
          }}
          placeholder="Enter your email"
          required
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[13px] text-white outline-none placeholder:text-white/45"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center justify-center bg-white px-3 text-black transition-opacity hover:opacity-85"
          aria-label="Subscribe to newsletter"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </form>

      {submitted ? (
        <p className="mt-3 text-[11px] leading-relaxed text-white/80">
          Thank you for subscribing.
        </p>
      ) : (
        <p className="mt-3 text-[10px] leading-relaxed text-white/65">
          By entering your email address, you agree to receive HijabFirst offers,
          promotions, and other commercial messages. You may unsubscribe at any
          time. View our{" "}
          <Link href="/privacy" className="underline hover:opacity-70">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="underline hover:opacity-70">
            Terms
          </Link>
          .
        </p>
      )}
    </div>
  );
}
