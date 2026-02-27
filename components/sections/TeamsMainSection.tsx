"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/UI/Reveal";
import { team } from "@/lib/Team-data";

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.663 1.191-1.608 2.905-1.608 2.126 0 3.719 1.395 3.719 4.391v5.499zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.771-1.71 1.958-1.71 1.187 0 1.914.755 1.939 1.71 0 .951-.752 1.71-1.982 1.71zm1.581 11.597H3.635V9.861h3.283v10.591zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
  </svg>
);

export default function TeamSection() {
  const [openSocial, setOpenSocial] = useState<number | null>(null);

  return (
    <section className="py-28 bg-[var(--color-background)] overflow-hidden">
      <style>{`
        @keyframes team-card-in {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .team-card-anim { animation: team-card-in 0.55s cubic-bezier(0.22,1,0.36,1) both; }

        /* Social drawer slides in from bottom */
        .social-drawer {
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s;
          pointer-events: none;
        }
        .team-card:hover .social-drawer,
        .social-drawer.is-open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Image zoom */
        .team-img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .team-card:hover .team-img { transform: scale(1.07); }

        /* Overlay fade */
        .team-overlay {
          opacity: 0;
          transition: opacity 0.4s;
        }
        .team-card:hover .team-overlay { opacity: 1; }

        /* Share button spin */
        .share-btn { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s; }
        .share-btn.active { transform: rotate(90deg); background: var(--color-primary); color: white; }

        /* Social icon bounce */
        .soc-icon {
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), background 0.25s, color 0.25s;
        }
        .soc-icon:hover { transform: translateY(-3px); background: var(--color-primary); color: white; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── HEADER ───────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <Reveal type="fade">
            <p className="text-xs tracking-[0.22em] uppercase text-[var(--color-primary)] font-semibold mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-[var(--color-primary)] inline-block" />
              Our Team
              <span className="w-8 h-px bg-[var(--color-primary)] inline-block" />
            </p>
          </Reveal>
          <Reveal type="slide-up">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-foreground)]">
              Meet the People<br className="hidden md:block" /> Behind Our Work
            </h2>
          </Reveal>
        </div>

        {/* ── GRID ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <Link
              key={member.id}
              href={`/team/${member.id}`}
              className="team-card team-card-anim group relative rounded-2xl overflow-hidden bg-[var(--color-card)] border border-[var(--color-border)] cursor-pointer block"
              style={{ animationDelay: `${i * 0.06}s` }}
              onMouseLeave={() => setOpenSocial(null)}
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden" style={{ height: "300px" }}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="team-img object-cover object-top"
                />

                {/* OVERLAY */}
                <div className="team-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* SOCIAL DRAWER — slides up from bottom of image on hover */}
                <div className={`social-drawer absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8 bg-gradient-to-t from-black/80 to-transparent ${openSocial === i ? "is-open" : ""}`}>
                  <div className="flex items-center justify-center gap-3">
                    {[
                      { icon: <FacebookIcon />, label: "Facebook" },
                      { icon: <TwitterIcon />,  label: "Twitter"  },
                      { icon: <LinkedInIcon />, label: "LinkedIn" },
                    ].map(({ icon, label }, si) => (
                      <button
                        key={label}
                        type="button"
                        title={label}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="soc-icon w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center border border-white/30"
                        style={{ transitionDelay: `${si * 0.05}s` }}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SHARE TOGGLE — top right */}
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenSocial(openSocial === i ? null : i); }}
                  className={`share-btn absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 flex items-center justify-center z-10 ${openSocial === i ? "active" : ""}`}
                  aria-label="Share"
                >
                  <ShareIcon />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition text-base leading-tight block">
                    {member.name}
                  </span>
                  <p className="text-[var(--text-muted)] text-sm mt-0.5">{member.role}</p>
                </div>

                {/* Arrow */}
                <span className="flex-shrink-0 w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground)] group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:text-white transition">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>

              {/* PRIMARY COLOR BOTTOM ACCENT LINE */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}