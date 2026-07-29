import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  ArrowRight,
  ArrowUp,
  Moon,
  Sun,
  Code2,
  Database,
  Brain,
  Bot,
  Cloud,
  GitBranch,
  Sparkles,
  Cpu,
  Zap,
  BookOpen,
  Award,
  Briefcase,
  GraduationCap,
  Rocket,
  ExternalLink,
  CheckCircle2,
  FileCode,
  Server,
  Workflow,
  Layers,
} from "lucide-react";
import avatar from "@/assets/purva-avatar.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

/* ---------- Hooks ---------- */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme");
    const prefers =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const nd = !d;
      document.documentElement.classList.toggle("dark", nd);
      localStorage.setItem("theme", nd ? "dark" : "light");
      return nd;
    });
  };
  return { dark, toggle };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animation = "rise .8s ease-out both";
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

function useTyping(words: string[], speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = cur.slice(0, text.length + 1);
          setText(next);
          if (next === cur) setTimeout(() => setDel(true), pause);
        } else {
          const next = cur.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? 40 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function useCounter(target: number, active: boolean, duration = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return v;
}

/* ---------- Types ---------- */
interface Project {
  title: string;
  tag: string;
  desc: string;
  tech: string[];
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  github?: string;
  demo?: string;
}

/* ---------- Data ---------- */
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    title: "Programming",
    icon: Code2,
    items: [
      { name: "Java", level: 90 },
      { name: "Python", level: 88 },
      { name: "C / C++", level: 78 },
      { name: "JavaScript", level: 75 },
      { name: "HTML / CSS", level: 85 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    items: [
      { name: "Oracle SQL", level: 85 },
      { name: "MySQL", level: 82 },
    ],
  },
  {
    title: "Machine Learning",
    icon: Brain,
    items: [
      { name: "Scikit-learn", level: 80 },
      { name: "Pandas", level: 82 },
      { name: "NumPy", level: 80 },
    ],
  },
  {
    title: "Automation & AI",
    icon: Bot,
    items: [
      { name: "n8n Workflows", level: 88 },
      { name: "AI Agents", level: 82 },
      { name: "API Integration", level: 80 },
    ],
  },
];

const CONCEPTS = [
  "OOP",
  "Data Structures",
  "Algorithms",
  "DBMS",
  "Operating Systems",
  "Problem Solving",
  "Git",
  "GitHub",
  "VS Code",
  "Eclipse",
  "Jupyter",
  "Streamlit",
  "Postman",
];

const PROJECTS = [
  {
    title: "Bank Management System",
    tag: "Desktop • Java",
    desc: "Complete Java Swing banking application with JDBC and Oracle/MySQL — secure auth, accounts, transactions and mini statements.",
    tech: ["Java", "Swing", "JDBC", "Oracle", "MySQL"],
    features: ["Login", "Accounts", "Deposit / Withdraw", "Mini Statement"],
    icon: Server,
  },
  {
    title: "House Price Prediction",
    tag: "Machine Learning",
    desc: "Regression-based ML application that predicts house prices from property features with an interactive Streamlit dashboard.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit"],
    features: ["Prediction", "Dashboard", "Data Processing", "Interactive UI"],
    icon: Brain,
  },
  {
    title: "AI Weather Chatbot",
    tag: "Automation • n8n",
    desc: "Conversational AI chatbot built with n8n that answers naturally, integrates weather APIs and orchestrates real-time responses.",
    tech: ["n8n", "AI APIs", "Weather API", "JavaScript", "REST"],
    features: ["AI Chat", "Forecast", "API Integration", "Real-Time"],
    icon: Bot,
  },
  {
    title: "Customer Feedback Automation",
    tag: "Automation • Java",
    desc: "End-to-end n8n workflow with secure login and feedback form — categorizes responses, stores data and generates insights.",
    tech: ["n8n", "Java", "JDBC", "Oracle", "MySQL", "REST"],
    features: ["Secure Login", "Workflow", "Analysis", "Reports"],
    icon: Workflow,
  },
  {
    title: "AI ChatGPT Clone Integrated with n8n",
    tag: "AI • React",
    desc: "Developed an AI-powered ChatGPT clone connected with n8n workflows using webhooks. The chatbot processes user queries through automated workflows and AI integrations.",
    tech: ["React", "TypeScript", "n8n", "Webhooks", "AI APIs"],
    features: ["Conversational AI", "API Integration", "Workflow Automation", "Real-Time Responses"],
    icon: Bot,
    github: "https://github.com/sutarpurva1618-a11y",
  },
  {
    title: "AI Automation Suite using n8n",
    tag: "Automation • n8n",
    desc: "Created automation workflows using n8n for file manipulation, data processing, and task automation. The workflows can handle and modify files through automated pipelines.",
    tech: ["n8n", "Automation Workflows", "Webhooks", "APIs"],
    features: ["File Automation", "Data Processing", "Task Automation", "No-Code/Low-Code"],
    icon: Workflow,
    github: "https://github.com/sutarpurva1618-a11y",
  },
  {
    title: "Personalized AI Poem Generator",
    tag: "AI • React",
    desc: "Built a creative AI application where users enter details such as their name and profession, and the system generates personalized poems based on the provided information.",
    tech: ["React", "JavaScript", "AI", "Prompt Engineering"],
    features: ["Personalized Output", "Creative AI", "User Input Forms", "Prompt Engineering"],
    icon: BookOpen,
    github: "https://github.com/sutarpurva1618-a11y",
  },
  {
    title: "Email Reply Automation using n8n",
    tag: "Automation • AI",
    desc: "Developed an automated email response workflow that processes incoming emails and generates appropriate replies using AI-powered automation.",
    tech: ["n8n", "AI", "Email APIs", "Automation"],
    features: ["Email Processing", "AI Replies", "Workflow Automation", "API Integration"],
    icon: Mail,
    github: "https://github.com/sutarpurva1618-a11y",
  },
];

const SERVICES = [
  { icon: Code2, title: "Java Development", desc: "Robust desktop and backend solutions in Java." },
  { icon: FileCode, title: "Python Programming", desc: "Scripts, tools and data-driven applications." },
  { icon: Workflow, title: "Automation with n8n", desc: "Workflow automation, AI agents and integrations." },
  { icon: Brain, title: "Machine Learning", desc: "Predictive models and analytical dashboards." },
  { icon: Bot, title: "AI Chatbots", desc: "Conversational assistants powered by AI APIs." },
  { icon: Database, title: "Database Design", desc: "Relational schemas with Oracle & MySQL." },
  { icon: Layers, title: "API Integration", desc: "Connecting services via clean REST integrations." },
  { icon: Sparkles, title: "Software Development", desc: "Clean, maintainable, real-world software." },
];

const ACHIEVEMENTS = [
  { n: 4, label: "Projects Built", icon: Rocket },
  { n: 12, label: "Technologies", icon: Cpu },
  { n: 3, label: "Certifications", icon: Award },
  { n: 100, label: "% Curiosity", icon: Sparkles },
];

const CERTS = [
  { title: "Oracle Certified", sub: "Database Fundamentals", icon: Database },
  { title: "Artificial Intelligence", sub: "Foundations & Applications", icon: Brain },
  { title: "Machine Learning", sub: "Regression, Classification, Analytics", icon: Cpu },
];

const FLOATING = [
  { label: "Java", top: "10%", left: "6%", d: "0s" },
  { label: "Python", top: "22%", left: "82%", d: "1s" },
  { label: "AI", top: "68%", left: "8%", d: "2s" },
  { label: "ML", top: "78%", left: "78%", d: "1.5s" },
  { label: "n8n", top: "42%", left: "88%", d: ".7s" },
  { label: "SQL", top: "55%", left: "3%", d: "2.4s" },
  { label: "API", top: "8%", left: "48%", d: "1.2s" },
  { label: "Git", top: "88%", left: "40%", d: ".4s" },
];

/* ---------- Component ---------- */
function Portfolio() {
  const { dark, toggle } = useTheme();
  useReveal();
  const typed = useTyping([
    "Java Developer",
    "Python Programmer",
    "Machine Learning Enthusiast",
    "Automation Developer",
    "AI Enthusiast",
  ]);

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Counters trigger */
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsIn, setStatsIn] = useState(false);
  useEffect(() => {
    if (!statsRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStatsIn(true),
      { threshold: 0.4 },
    );
    io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);

  /* Cursor glow */
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Projects filter */
  const filters = ["All", "Java", "Python", "Automation", "AI", "React"];
  const [filter, setFilter] = useState("All");
  const visibleProjects = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter(
            (p) =>
              p.tech.some((t) => t.toLowerCase().includes(filter.toLowerCase())) ||
              p.tag.toLowerCase().includes(filter.toLowerCase()) ||
              (filter.toLowerCase() === "ai" && p.title.toLowerCase().includes("ai")),
          ),
    [filter],
  );


  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Cursor glow */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 h-[300px] w-[300px] rounded-full opacity-40 blur-3xl transition-transform duration-200 ease-out"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.26 300 / 0.35), transparent 60%)",
        }}
      />

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl glass px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl btn-gradient font-display text-sm font-bold">
              SP
            </span>
            <span className="hidden font-display text-sm font-semibold sm:block">
              Purva Nitin Sutar
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/50 transition-colors hover:bg-accent"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              className="hidden rounded-lg btn-gradient px-4 py-2 text-sm font-medium sm:inline-flex"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-32 pb-24 sm:pt-40">
        {/* Animated background */}
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -top-32 -left-20 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl animate-blob"
            style={{ background: "var(--gradient-brand)" }}
          />
          <div
            className="absolute -bottom-40 right-0 h-[480px] w-[480px] rounded-full opacity-30 blur-3xl animate-blob"
            style={{
              background:
                "radial-gradient(circle, oklch(0.75 0.15 210), transparent 70%)",
              animationDelay: "3s",
            }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Floating icons */}
          {FLOATING.map((f) => (
            <span
              key={f.label}
              className="absolute hidden rounded-xl glass px-3 py-1.5 font-mono text-xs text-muted-foreground animate-float md:inline-block"
              style={{ top: f.top, left: f.left, animationDelay: f.d }}
            >
              {f.label}
            </span>
          ))}
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
          <div data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Available for Internships
            </span>
            <p className="mt-6 font-mono text-sm text-muted-foreground">
              Hi, I'm
            </p>
            <h1 className="mt-2 font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
              Purva Nitin <span className="gradient-text">Sutar</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Computer Engineering Student ·{" "}
              <span className="font-mono font-medium text-foreground">
                {typed}
                <span className="ml-0.5 inline-block w-[2px] bg-foreground align-middle" style={{ height: "1em", animation: "caret 1s steps(1) infinite" }} />
              </span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              I build intelligent software using Java, Python, Machine Learning,
              SQL, AI and Automation. Currently seeking internship
              opportunities where I can contribute, learn and grow as a
              Software Engineer.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl btn-gradient px-5 py-3 text-sm font-semibold"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3 text-muted-foreground">
              <a
                href="https://github.com/sutarpurva1618-a11y"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card transition-colors hover:text-foreground hover:bg-accent"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/purva-sutar-a64993412"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card transition-colors hover:text-foreground hover:bg-accent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:sutarpurva1618@gmail.com"
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card transition-colors hover:text-foreground hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center lg:justify-end" data-reveal>
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-full opacity-60 blur-2xl"
                style={{ background: "var(--gradient-brand)" }}
                aria-hidden
              />
              <div className="relative h-64 w-64 overflow-hidden rounded-full ring-glow sm:h-80 sm:w-80">
                <img
                  src={avatar}
                  alt="Purva Nitin Sutar"
                  width={768}
                  height={768}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-1.5 font-mono text-xs">
                &lt;/&gt; B.E. Computer Engineering
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="Passionate builder, curious learner">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl glass p-6" data-reveal>
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt="Purva Nitin Sutar portrait"
                width={96}
                height={96}
                loading="lazy"
                className="h-20 w-20 rounded-full object-cover ring-glow"
              />
              <div>
                <p className="font-display text-lg font-semibold">Purva Nitin Sutar</p>
                <p className="text-sm text-muted-foreground">Pune, Maharashtra · India</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                ["Degree", "B.E. Computer Engineering"],
                ["College", "ISBM College of Engineering"],
                ["University", "SPPU"],
                ["Year", "Second Year"],
                ["Focus", "Java · Python · ML · Automation"],
              ].map(([k, v]) => (
                <li
                  key={k}
                  className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0"
                >
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5 text-muted-foreground" data-reveal>
            <p className="text-base leading-relaxed">
              I'm currently pursuing my Bachelor of Engineering in Computer
              Engineering at ISBM College of Engineering, Pune. I love
              exploring Software Development, Artificial Intelligence, Machine
              Learning, Automation and Full Stack Technologies.
            </p>
            <p className="text-base leading-relaxed">
              I enjoy building real-world applications that solve practical
              problems — from intelligent automation workflows and desktop
              apps to AI chatbots and ML solutions. I'm a quick learner,
              problem solver and team player looking for internship
              opportunities to gain industry experience.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3">
              {[
                { icon: GraduationCap, label: "B.E. CSE" },
                { icon: Zap, label: "Fast Learner" },
                { icon: Brain, label: "AI & ML" },
                { icon: Bot, label: "n8n Automation" },
                { icon: GitBranch, label: "Git & GitHub" },
                { icon: Cloud, label: "APIs & Cloud" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground"
                >
                  <Icon className="h-4 w-4 text-primary" /> {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* EDUCATION timeline */}
      <Section id="education" eyebrow="Education" title="Academic journey">
        <div className="relative mx-auto max-w-3xl pl-6 sm:pl-8">
          <div
            className="absolute left-2 top-2 bottom-2 w-px sm:left-3"
            style={{ background: "var(--gradient-brand)" }}
          />
          {[
            {
              title: "B.E. Computer Engineering",
              org: "ISBM College of Engineering · SPPU",
              time: "Second Year · Pune, MH",
              desc: "Core CS: OOP, DSA, DBMS, OS. Building projects across Java, Python, ML and Automation.",
            },
            {
              title: "Higher Secondary Education",
              org: "Maharashtra Board",
              time: "Science Stream",
              desc: "Foundation in Mathematics, Physics and early programming exposure.",
            },
          ].map((e, i) => (
            <div key={i} className="relative mb-8 last:mb-0" data-reveal>
              <span className="absolute -left-[3px] top-1 h-3 w-3 rounded-full btn-gradient sm:-left-1" />
              <div className="rounded-2xl glass p-5">
                <p className="text-xs font-mono text-muted-foreground">{e.time}</p>
                <p className="mt-1 font-display text-lg font-semibold">{e.title}</p>
                <p className="text-sm text-primary">{e.org}</p>
                <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="Skills" title="Technical toolkit">
        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="rounded-2xl glass p-6" data-reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl btn-gradient">
                  <g.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              </div>
              <div className="space-y-4">
                {g.items.map((s) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2" data-reveal>
          {CONCEPTS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certs" eyebrow="Certifications" title="Verified learning">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-transform hover:-translate-y-1"
              data-reveal
            >
              <div
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
                style={{ background: "var(--gradient-brand)" }}
                aria-hidden
              />
              <span className="grid h-12 w-12 place-items-center rounded-xl btn-gradient">
                <c.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-lg font-semibold">{c.title}</p>
              <p className="text-sm text-muted-foreground">{c.sub}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-primary">
                <CheckCircle2 className="h-4 w-4" /> Verified certificate
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="Projects" title="Selected work">
        <div className="mb-6 flex flex-wrap gap-2" data-reveal>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? "btn-gradient"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {visibleProjects.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_oklch(0.55_0.26_300/0.4)]"
              data-reveal
            >
              <div
                className="absolute inset-x-0 -top-1 h-1 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "var(--gradient-brand)" }}
                aria-hidden
              />
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl btn-gradient">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-md bg-accent px-2 py-0.5 text-[11px] text-accent-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {(p.github || p.demo) && (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg btn-gradient px-3 py-1.5 text-xs font-medium"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
          {/* Coming soon */}
          <article
            className="rounded-2xl border-2 border-dashed border-border p-6 text-center"
            data-reveal
          >
            <Sparkles className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-3 font-display text-lg font-semibold">More coming soon</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Upcoming AI agents & full-stack projects.
            </p>
          </article>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" eyebrow="Services" title="What I can build for you">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl glass p-5 transition-transform hover:-translate-y-1"
              data-reveal
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl btn-gradient">
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display font-semibold">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" ref={statsRef}>
        <div
          className="rounded-3xl p-8 sm:p-12"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="grid grid-cols-2 gap-6 text-white sm:grid-cols-4">
            {ACHIEVEMENTS.map((a) => (
              <Stat key={a.label} n={a.n} label={a.label} Icon={a.icon} active={statsIn} />
            ))}
          </div>
        </div>
      </section>

      {/* GITHUB */}
      <Section id="github" eyebrow="GitHub" title="Code, commits & contributions">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl glass p-6" data-reveal>
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-xl btn-gradient">
                <Github className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold">@sutarpurva1618-a11y</p>
                <p className="text-sm text-muted-foreground">Java · Python · Automation</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Explore my pinned repositories, latest commits and open source
              exploration. New projects land here often.
            </p>
            <a
              href="https://github.com/sutarpurva1618-a11y"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl btn-gradient px-4 py-2 text-sm font-semibold"
            >
              Visit GitHub <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-2xl glass p-4" data-reveal>
            <img
              src="https://ghchart.rshah.org/2563EB/sutarpurva1618-a11y"
              alt="GitHub contribution graph"
              loading="lazy"
              className="w-full rounded-lg"
            />
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              {[
                ["Repos", "10+"],
                ["Commits", "150+"],
                ["Stars", "5+"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-card p-3">
                  <p className="font-display text-xl font-bold gradient-text">{v}</p>
                  <p className="text-xs text-muted-foreground">{k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Contact" title="Let's build something great">
        <div className="mx-auto grid max-w-3xl gap-6">
          {[
            { icon: Mail, label: "Email", value: "sutarpurva1618@gmail.com", href: "mailto:sutarpurva1618@gmail.com" },
            { icon: MapPin, label: "Location", value: "Pune, Maharashtra, India" },
            { icon: Linkedin, label: "LinkedIn", value: "purva-sutar", href: "https://www.linkedin.com/in/purva-sutar-a64993412" },
            { icon: Github, label: "GitHub", value: "sutarpurva1618-a11y", href: "https://github.com/sutarpurva1618-a11y" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl glass p-4 transition-transform hover:-translate-y-0.5"
              data-reveal
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl btn-gradient">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="font-medium">{c.value}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 Sutar Purva · Made with <span className="text-red-500">♥</span> using modern web tech.</p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/sutarpurva1618-a11y" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
            <a href="https://www.linkedin.com/in/purva-sutar-a64993412" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
            <a href="mailto:sutarpurva1618@gmail.com" aria-label="Email" className="hover:text-foreground"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full btn-gradient"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

/* ---------- Subcomponents ---------- */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex items-end justify-between gap-4" data-reveal>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent sm:block" />
      </div>
      {children}
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setW(level);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [level]);
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-[width] duration-[1400ms] ease-out"
          style={{ width: `${w}%`, background: "var(--gradient-brand)" }}
        />
      </div>
    </div>
  );
}

function Stat({
  n,
  label,
  Icon,
  active,
}: {
  n: number;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}) {
  const v = useCounter(n, active);
  return (
    <div className="text-center">
      <Icon className="mx-auto h-6 w-6 opacity-90" />
      <p className="mt-3 font-display text-4xl font-extrabold">{v}+</p>
      <p className="text-sm opacity-90">{label}</p>
    </div>
  );
}

// avoid unused import warning for icons used indirectly
export const _iconRefs = [BookOpen, Briefcase];
