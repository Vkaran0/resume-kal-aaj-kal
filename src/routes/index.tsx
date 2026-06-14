import { createFileRoute } from "@tanstack/react-router";
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

const projects = [
  {
    name: "Industrial Fault Detection",
    period: "Oct 2025 — Jan 2026",
    tag: "IoT · AI",
    desc: "Real-time monitoring system for industrial equipment using ESP32 sensors and predictive analytics to flag faults before they cascade.",
    stack: ["ESP32", "Python", "Sensors", "Analytics"],
  },
  {
    name: "SwiftGo",
    period: "Apr — May 2025",
    tag: "Full-Stack",
    desc: "Ride-sharing platform matching drivers and passengers on overlapping routes in real time, with bookings, auth and trip lifecycle.",
    stack: ["Full-stack", "Auth", "Realtime DB"],
  },
  {
    name: "Freelance — kvksanstha.in",
    period: "Production",
    tag: "Web",
    desc: "Shipped live sites with hosting, databases and real users — kvksanstha.in, kvkpoints.com, lpmgoi.com and more.",
    stack: ["Hosting", "DB", "SEO"],
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
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 bg-hero" />
      <div className="pointer-events-none fixed inset-0 grain" />

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
    </div>
  );
}

function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="relative z-40 mx-auto max-w-7xl px-6 pt-6">
      <div className="glass flex items-center justify-between rounded-full px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-display font-semibold">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs">K</span>
          <span>Kshitij<span className="text-muted-foreground">.dev</span></span>
        </a>
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-foreground">{l.label}</a>
          ))}
        </nav>
        <a href="#contact" className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
          Hire me
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-32">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
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
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            I'm <span className="text-foreground">Kshitij Kumar</span> — B.Tech CSE (AI & ML) undergrad working at the
            intersection of AI, IoT and industrial automation. Currently re-engineering control systems at Hindalco
            and shipping production web apps on the side.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:translate-y-[-2px]">
              View my work →
            </a>
            <a href="https://github.com/Vkaran0" target="_blank" rel="noreferrer" className="rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-medium transition hover:bg-card">
              GitHub
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <Stat k="2+" v="Years building" />
            <Stat k="6" v="P.O. Scooper systems" />
            <Stat k="SIH'25" v="Finalist" />
            <Stat k="4+" v="Live web apps" />
          </div>
        </div>

        <div className="relative">
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
                    <div className="font-mono text-primary">v0.24</div>
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
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-24">
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
          <div key={e.role} className="group grid gap-6 rounded-3xl border border-border bg-card/40 p-8 transition hover:border-primary/40 md:grid-cols-[1fr_2fr]">
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
  return (
    <Section id="projects" eyebrow="03 / Selected Work" title={<>Projects I'm <span className="text-gradient">proud of</span>.</>}>
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <article key={p.name} className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/50 p-7 transition hover:-translate-y-1 hover:border-primary/50">
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
          </article>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="04 / Toolbox" title={<>Stack I <span className="text-gradient">reach for</span>.</>}>
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} className="rounded-3xl border border-border bg-card/40 p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">{cat}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((s) => (
                <span key={s} className="rounded-lg bg-secondary px-3 py-1.5 text-sm">{s}</span>
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
          <div key={i.t} className="flex items-center justify-between rounded-2xl border border-border bg-card/40 p-5">
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
    { label: "Email", value: "kshitijups2@gmail.com", href: "mailto:kshitijups2@gmail.com" },
    { label: "Phone", value: "+91 70070 33750", href: "tel:+917007033750" },
    { label: "GitHub", value: "github.com/Vkaran0", href: "https://github.com/Vkaran0" },
    { label: "LinkedIn", value: "kshitij-kumar", href: "https://www.linkedin.com/in/kshitij-kumar-766852298" },
    { label: "LeetCode", value: "Vkshitij07", href: "https://leetcode.com/u/Vkshitij07" },
  ];
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-surface p-10 md:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">06 / Let's talk</div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-6xl">
              Got something <span className="text-gradient">interesting</span> to build?
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              I'm currently open to internships, full-time roles and freelance work in AI/ML, full-stack
              and embedded systems. The fastest way to reach me is email.
            </p>
            <a href="mailto:kshitijups2@gmail.com" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:translate-y-[-2px]">
              Say hello →
            </a>
          </div>
          <div className="space-y-2">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4 transition hover:border-primary/50 hover:bg-background/70">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{l.label}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span>{l.value}</span>
                  <span className="text-primary transition group-hover:translate-x-1">↗</span>
                </div>
              </a>
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
