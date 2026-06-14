import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import kshitijFull from "@/assets/kshitij-full.asset.json";
import kshitijPro from "@/assets/kshitij-pro.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kshitij Kumar — AI/ML Engineer & Builder" },
      { name: "description", content: "Portfolio of Kshitij Kumar — B.Tech CSE (AI & ML) undergraduate building AI, IoT and full-stack solutions. Hindalco experience, SIH 2025 Finalist." },
      { property: "og:title", content: "Kshitij Kumar — AI/ML Engineer & Builder" },
      { property: "og:description", content: "AI, IoT, embedded systems and full-stack web — portfolio, projects and experience." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: kshitijPro.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: kshitijPro.url },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: Portfolio,
});

const skills = {
  Languages: ["Java", "Python", "C++"],
  "AI / ML": ["Scikit-Learn", "TensorFlow", "AI Agents"],
  Backend: ["Java", "Python", "Node"],
  Database: ["Supabase", "MongoDB", "MySQL", "Firestore"],
  Deployment: ["AWS", "Vercel", "Render", "Netlify"],
  Embedded: ["ATmega328P", "ESP32", "PCB Design", "Bootloaders"],
};

type Project = {
  name: string;
  period: string;
  tag: "IoT · AI" | "Full-Stack" | "Web";
  category: "AI" | "Web" | "IoT";
  desc: string;
  stack: string[];
  link?: string;
};

const projects: Project[] = [
  {
    name: "Industrial Fault Detection",
    period: "Oct 2025 — Jan 2026",
    tag: "IoT · AI",
    category: "IoT",
    desc: "Real-time monitoring system for industrial equipment using ESP32 sensors and predictive analytics to flag faults before they cascade.",
    stack: ["ESP32", "Python", "Sensors", "Analytics"],
  },
  {
    name: "SwiftGo",
    period: "Apr — May 2025",
    tag: "Full-Stack",
    category: "Web",
    desc: "Ride-sharing platform matching drivers and passengers on overlapping routes in real time, with bookings, auth and trip lifecycle.",
    stack: ["Full-stack", "Auth", "Realtime DB"],
  },
  {
    name: "Freelance — kvksanstha.in",
    period: "Production",
    tag: "Web",
    category: "Web",
    desc: "Shipped live sites with hosting, databases and real users — kvksanstha.in, kvkpoints.com, lpmgoi.com and more.",
    stack: ["Hosting", "DB", "SEO"],
    link: "https://kvksanstha.in",
  },
];

const experience = [
  {
    role: "CNC (Hypertherm) — Engineer",
    org: "HINDALCO",
    period: "Apr 2026 — Present",
    points: [
      "CNC troubleshooting & maintenance to restore production functionality",
      "SSD data recovery, disk cloning and full Windows restoration",
      "Reverse-engineered HASP licensing, boot processes and protection",
      "Mapped CNC embedded architecture & controller communication",
    ],
  },
  {
    role: "Scooper Control System — Engineer",
    org: "HINDALCO",
    period: "Mar 2025 — Present",
    points: [
      "Re-engineered two-way remote/receiver control from scratch for POT Room",
      "Synchronized new controller with existing scooper machine systems",
      "Hands-on ATmega328P, PCB design, IC programming & bootloaders",
      "Hardware troubleshooting, validation and field deployment",
    ],
  },
];

function Portfolio() {
  useScrollReveal();
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <div className="pointer-events-none fixed inset-0 bg-hero" />
      <div className="pointer-events-none fixed inset-0 grain" />
      <CursorGlow />

      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

/* ---------------- Hooks & utilities ---------------- */

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

function useInView<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function useTypewriter(words: string[], speed = 80, pause = 1400) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDel(true), pause);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((x) => x + 1);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

/* ---------------- Chrome ---------------- */

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-[width] duration-150"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[400px] w-[400px] rounded-full opacity-40 blur-3xl md:block"
      style={{ background: "radial-gradient(circle, oklch(0.78 0.18 75 / 0.18), transparent 60%)" }}
    />
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      ↑
    </button>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const links = [
    { href: "#about", id: "about", label: "About" },
    { href: "#work", id: "work", label: "Work" },
    { href: "#projects", id: "projects", label: "Projects" },
    { href: "#skills", id: "skills", label: "Skills" },
    { href: "#contact", id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`sticky top-0 z-40 mx-auto max-w-7xl px-6 pt-6 transition-all ${scrolled ? "pt-3" : ""}`}>
      <div className="glass flex items-center justify-between rounded-full px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-display font-semibold">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs">K</span>
          <span>Kshitij<span className="text-muted-foreground">.dev</span></span>
        </a>
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative transition hover:text-foreground ${active === l.id ? "text-foreground" : ""}`}
            >
              {l.label}
              {active === l.id && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-primary" />
              )}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 md:inline-block"
          >
            Hire me
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="glass mt-2 flex flex-col gap-1 rounded-3xl p-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
          >
            Hire me
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const role = useTypewriter([
    "AI/ML Engineer",
    "Embedded Systems Builder",
    "Full-Stack Developer",
    "Hindalco Engineer",
  ]);
  return (
    <section id="top" className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-32">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div data-reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Open to internships & full-time roles
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            Building <span className="text-gradient">intelligent</span> systems<br />
            where <span className="italic font-normal text-muted-foreground">silicon</span> meets software.
          </h1>
          <div className="mt-5 font-mono text-sm text-primary md:text-base">
            &gt; {role}
            <span className="ml-0.5 inline-block w-2 animate-pulse bg-primary align-middle">&nbsp;</span>
          </div>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            I'm <span className="text-foreground">Kshitij Kumar</span> — B.Tech CSE (AI & ML) undergrad working at the
            intersection of AI, IoT and industrial automation. Currently re-engineering control systems at Hindalco
            and shipping production web apps on the side.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:translate-y-[-2px]">
              View my work →
            </a>
            <a
              href={kshitijPro.url}
              download
              className="rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-medium transition hover:bg-card"
            >
              ↓ Download CV
            </a>
            <a href="https://github.com/Vkaran0" target="_blank" rel="noreferrer" className="rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-medium transition hover:bg-card">
              GitHub
            </a>
          </div>
          <StatsRow />
        </div>

        <div className="relative" data-reveal>
          <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" />
          <div className="relative animate-float">
            <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[2rem] border border-border" />
            <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-surface to-card p-2">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-primary/10 to-accent/5">
                <img
                  src={kshitijFull.url}
                  alt="Kshitij Kumar"
                  className="mx-auto h-[520px] w-auto object-contain"
                />
                <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">Kshitij Kumar</div>
                      <div className="text-muted-foreground">Varanasi, India · IST</div>
                    </div>
                    <LiveClock />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
  return <div className="font-mono text-primary">{time}</div>;
}

function StatsRow() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const years = useCountUp(2, inView);
  const sys = useCountUp(6, inView);
  const apps = useCountUp(4, inView);
  return (
    <div ref={ref} className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
      <Stat k={`${years}+`} v="Years building" />
      <Stat k={`${sys}`} v="P.O. Scooper systems" />
      <Stat k="SIH'25" v="Finalist" />
      <Stat k={`${apps}+`} v="Live web apps" />
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-foreground">{k}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{v}</div>
    </div>
  );
}

function Marquee() {
  const items = ["Python", "Java", "C++", "TensorFlow", "ESP32", "ATmega328P", "Supabase", "AWS", "MongoDB", "Scikit-Learn", "PCB Design", "Next.js"];
  return (
    <div className="relative border-y border-border bg-card/30 py-5 overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            ✦ {it}
          </span>
        ))}
      </div>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-24" data-reveal>
      <div className="mb-14 flex items-end justify-between gap-8">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-primary">{eyebrow}</div>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="01 / About" title={<>A curious engineer who likes <span className="text-gradient">things that move</span>.</>}>
      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            I split my time between writing clean Python, debugging embedded microcontrollers under fluorescent
            factory lights, and shipping web apps that real businesses depend on. The through-line is
            simple — I like building systems that work in the real world, not just in the IDE.
          </p>
          <p>
            At <span className="text-foreground">Hindalco</span> I've re-engineered industrial control hardware
            from scratch, recovered crashed CNC systems, and gotten my hands dirty with PCB design,
            bootloaders and IC programming. In parallel I build AI-driven products, freelance web platforms
            and competition projects.
          </p>
        </div>
        <div className="space-y-4">
          <InfoRow label="Education" value="B.Tech CSE (AI & ML)" sub="Kashi Institute of Technology · 2024–2028" />
          <InfoRow label="Based in" value="Varanasi, India" sub="Open to remote & relocation" />
          <InfoRow label="Focus" value="AI · IoT · Embedded · Web" />
        </div>
      </div>
    </Section>
  );
}

function InfoRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-4">
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-lg">{value}</div>
      {sub && <div className="text-sm text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Experience() {
  return (
    <Section id="work" eyebrow="02 / Experience" title={<>Where I've <span className="text-gradient">built things</span>.</>}>
      <div className="space-y-6">
        {experience.map((e) => (
          <div key={e.role} className="group grid gap-6 rounded-3xl border border-border bg-card/40 p-8 transition hover:border-primary/40 hover:bg-card/60 md:grid-cols-[1fr_2fr]">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-primary">{e.period}</div>
              <div className="mt-2 font-display text-2xl">{e.role}</div>
              <div className="mt-1 text-muted-foreground">{e.org}</div>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              {e.points.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const cats = ["All", "AI", "Web", "IoT"] as const;
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <Section id="projects" eyebrow="03 / Selected Work" title={<>Projects I'm <span className="text-gradient">proud of</span>.</>}>
      <div className="mb-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              filter === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((p, i) => (
          <article key={p.name} className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/50 p-7 transition hover:-translate-y-1 hover:border-primary/50">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.78 0.18 75 / 0.12), transparent 60%)" }} />
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{p.tag}</span>
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
            </div>
            <h3 className="mt-8 font-display text-2xl">{p.name}</h3>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{p.period}</div>
            <p className="mt-4 flex-1 text-muted-foreground">{p.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{s}</span>
              ))}
            </div>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-primary transition hover:gap-3">
                Visit live ↗
              </a>
            )}
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No projects in this category yet — more coming soon.
        </div>
      )}
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="04 / Toolbox" title={<>Stack I <span className="text-gradient">reach for</span>.</>}>
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} className="rounded-3xl border border-border bg-card/40 p-6 transition hover:border-primary/40">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">{cat}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((s) => (
                <span key={s} className="rounded-lg bg-secondary px-3 py-1.5 text-sm transition hover:bg-primary hover:text-primary-foreground">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  const items = [
    { t: "Smart India Hackathon 2025", s: "Finalist" },
    { t: "Hindalco CNC AMC", s: "Awarded contract" },
    { t: "Scooper Control Systems", s: "6 P.O. delivered" },
    { t: "NPTEL Python", s: "Certified · 2025" },
    { t: "CISCO Cyber-Security", s: "Certified · 2026" },
    { t: "TCS AI-For-All", s: "Certified · 2026" },
  ];
  return (
    <Section id="achievements" eyebrow="05 / Wins & Certs" title={<>A few <span className="text-gradient">milestones</span>.</>}>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.t} className="flex items-center justify-between rounded-2xl border border-border bg-card/40 p-5 transition hover:-translate-y-0.5 hover:border-primary/40">
            <div>
              <div className="font-display text-lg">{i.t}</div>
              <div className="text-sm text-muted-foreground">{i.s}</div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">★</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const links = [
    { label: "Email", value: "kshitijups2@gmail.com", href: "mailto:kshitijups2@gmail.com", copy: "kshitijups2@gmail.com" },
    { label: "Phone", value: "+91 70070 33750", href: "tel:+917007033750", copy: "+917007033750" },
    { label: "GitHub", value: "github.com/Vkaran0", href: "https://github.com/Vkaran0" },
    { label: "LinkedIn", value: "kshitij-kumar", href: "https://www.linkedin.com/in/kshitij-kumar-766852298" },
    { label: "LeetCode", value: "Vkshitij07", href: "https://leetcode.com/u/Vkshitij07" },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    const body = encodeURIComponent(`Hi Kshitij,\n\n${form.message}\n\n— ${form.name} (${form.email})`);
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    window.location.href = `mailto:kshitijups2@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client…");
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24" data-reveal>
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-surface p-8 md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">06 / Let's talk</div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-6xl">
              Got something <span className="text-gradient">interesting</span> to build?
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Drop a message below or reach me directly. I usually reply within a day.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary"
                />
              </div>
              <textarea
                placeholder="Tell me about your project…"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:translate-y-[-2px] disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send message →"}
              </button>
            </form>
          </div>
          <div className="space-y-2">
            {links.map((l) => (
              <div key={l.label} className="group flex items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4 transition hover:border-primary/50 hover:bg-background/70">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{l.label}</div>
                  <a href={l.href} target="_blank" rel="noreferrer" className="text-sm transition hover:text-primary">
                    {l.value}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  {l.copy && (
                    <button
                      onClick={() => copy(l.copy!, l.label)}
                      aria-label={`Copy ${l.label}`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-border text-xs text-muted-foreground transition hover:border-primary hover:text-primary"
                    >
                      ⧉
                    </button>
                  )}
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary transition group-hover:translate-x-1"
                  >
                    ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-10 pt-2">
      <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Kshitij Kumar. Crafted with care.</div>
        <div className="font-mono text-xs uppercase tracking-widest">Varanasi → Worldwide</div>
      </div>
    </footer>
  );
}
