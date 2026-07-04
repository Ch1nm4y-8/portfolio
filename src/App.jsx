import { useMemo, useState } from "react";
import "./App.css";
import { CONTACT, EXPERIENCE, LINKS, PROFILE, PROJECTS, SKILLS } from "./constants/constants";
import { ASCII_ART } from "./constants/ascii_art";
import { ASCII_ART_2 } from "./constants/ascii_art2";
import { ASCII_HEADPHONE } from "./constants/ascii_headphone";
import { ASCII_PENGUIN } from "./constants/ascii_penguin";
import { ASCII_ZORO } from "./constants/ascii_zoro";
import { ASCII_HAZARD, ASCII_PACMAN } from "./constants/ascii_hazard";
import { useAsciiGlitch } from "./hooks/useAsciiGlitch";
import TerminalDock from "./TerminalDock";
import { useAsciiCycle } from "./hooks/useAsciiCycle";
import Intro from "./Intro";

const NAV = ["home", "about", "skills", "projects", "experience", "contact"];

export default function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [booted, setBooted] = useState(false);

  const ASCII_ARTS = useMemo(() => [ASCII_HEADPHONE, ASCII_ART_2, ASCII_ZORO, ASCII_ART, ASCII_PACMAN, ASCII_HAZARD, ASCII_PENGUIN], []);

  const { ascii, glitching } = useAsciiCycle(ASCII_ARTS, 15000);
  const displayAscii = useAsciiGlitch(ascii, {
    minInterval: 2500,
    maxInterval: 5000,
    duration: 80,
    minBandHeight: 2,
    maxBandHeight: 5,
    maxShift: 5,
  });
  // const ascii = useAsciiGlitch(ASCII_HEADPHONE);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };


  if (!booted) {
    return <Intro onContinue={() => setBooted(true)} />;
  }

  return (
    <div className="pf-shell">
      <aside className={`pf-sidebar${menuOpen ? " open" : ""}`}>
        <div className="pf-brand-row">
          <div className="pf-brand">
            <span className="pf-dot" />
            {PROFILE.handle}@portfolio:~$
          </div>

          <button
            className={`pf-hamburger${menuOpen ? " active" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={menuOpen ? "open" : ""}>
          {NAV.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(id);
                setMenuOpen(false);
              }}
            >
              <span>&gt;_</span> {id.toUpperCase()}
              <span className="car">_</span>
            </a>
          ))}

          <div className="pf-sidebar-bottom pf-sidebar-bottom-mobile">
            <a className="pf-icon-btn" href={LINKS.github} target="_blank" title="GitHub">⌥</a>
            <a className="pf-icon-btn" href={LINKS.linkedin} target="_blank" title="LinkedIn">in</a>
            <a className="pf-icon-btn" href={LINKS.mail} target="_blank" title="Email">@</a>
          </div>
        </nav>

        <div className="pf-sidebar-bottom pf-sidebar-bottom-desktop">
          <a className="pf-icon-btn" href={LINKS.github} target="_blank" title="GitHub">⌥</a>
          <a className="pf-icon-btn" href={LINKS.linkedin} target="_blank" title="LinkedIn">in</a>
          <a className="pf-icon-btn" href={LINKS.mail} target="_blank" title="Email">@</a>
        </div>
      </aside>

      <main>
        <div className="pf-topbar">
          <div className="pf-terminal-hint">
            <span className="pf-hint-key">ctrl</span>
            <span className="pf-hint-plus">+</span>
            <span className="pf-hint-key">~</span>
          </div>

          <div>
            SYSTEM STATUS:{" "}
            <span className="pf-pulse">
              <i /> ONLINE
            </span>
          </div>
        </div>

        <TerminalDock />

        {/* HERO */}
        <section className="pf-hero" id="home">
          <pre className={`pf-ascii${glitching ? " glitch" : ""}`}>
            {displayAscii}
          </pre>

          <div className="pf-hero-text">
            <div className="pf-tag">whoami</div>
            <h1>{PROFILE.handle}</h1>
            <div className="pf-role">{PROFILE.role}</div>
            <div className="pf-hero-divider" />
            <button className="pf-explore-btn" onClick={() => scrollTo("about")}>
              explore()
            </button>
          </div>

        </section>

        {/* ABOUT */}
        <section id="about">
          <SectionHeading cmd="cat about.txt" title="ABOUT" />
          <div className="pf-about-grid">
            <div>
              {PROFILE.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="pf-info-card">
              {Object.entries(PROFILE.meta).map(([k, v]) => (
                <div className="pf-info-row" key={k}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <SectionHeading cmd="ls skills" title="SKILLS" />
          <div className="pf-skills-cols">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div className="pf-skill-group" key={category}>
                <div className="pf-skill-group-head">
                  <span className="pf-skill-caret">›</span> {category}
                </div>
                <div className="pf-skill-tags">
                  {items.map((s) => (
                    <span className="pf-skill-tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <SectionHeading cmd="ls projects" title="PROJECTS" />
          {PROJECTS.map((p) => (
            <div className="pf-proj-row" key={p.id}>
              <div className="pf-proj-num">{p.id}</div>
              <div>
                <div className="pf-proj-name">{p.name}</div>
                <div className="pf-proj-desc">{p.desc}</div>
              </div>
              {/* <a className="pf-proj-view" href={p.link} target="_blank" rel="noreferrer">
                view →
              </a> */}
            </div>
          ))}
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <SectionHeading cmd="cat experience.log" title="EXPERIENCE" />
          <div className="pf-timeline">
            {EXPERIENCE.map((e, i) => (
              <div className="pf-tl-item" key={i}>
                <div className="pf-tl-head">
                  <span className="pf-tl-date">{e.date}</span>
                  <span className="pf-tl-role">{e.role}</span>
                  <span className="pf-tl-org">{e.org}</span>
                </div>
                <div className="pf-tl-detail">{e.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ borderBottom: "none" }}>
          <SectionHeading cmd="cat contact.txt" title="CONTACT" />
          <div className="pf-contact-grid">
            {CONTACT.map((c) => (
              <a className="pf-contact-card" href={c.href} key={c.label}>
                <span className="ic">{c.icon}</span>
                <div>
                  <div className="label">{c.label}</div>
                  <div className="sub">{c.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer>
          <span>© {new Date().getFullYear()} {PROFILE.handle} — All rights reserved.</span>
        </footer>
      </main>
    </div >
  );
}

function SectionHeading({ cmd, title }) {
  return (
    <>
      <div className="pf-section-tag">{cmd}</div>
      <h2 className="pf-title">{title}</h2>
      <div className="pf-rule" />
    </>
  );
}
