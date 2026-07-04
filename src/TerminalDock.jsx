import { useState, useEffect, useRef, useCallback } from "react";
import "./TerminalDock.css";
import { LINKS, PROFILE, PROJECTS, SKILLS, USER_ID } from "./constants/constants";
import { ASCII_COFFEE } from "./constants/ascii_coffee";

const BOOT_LINES = [
    "BIOS v2.3 ... OK",
    "Loading kernel ... OK",
    "Mounting /portfolio ... OK",
    "Starting session for guest ...",
];

const NEOFETCH_ART = `  
 ▄▄▄▄▄▄▄▄▄▄▄
 █ ▄▄▄▄▄▄▄ █
 █ █     █ █
 █ █▄▄▄▄▄█ █
 █▄▄▄▄▄▄▄▄▄█
  \\_________/`;
// ──────────────────────────────────────────────────────────────

function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function Terminal({ firstChar, onShutdown }) {
    const [lines, setLines] = useState([]);
    const [input, setInput] = useState("");
    const [booted, setBooted] = useState(false);
    const [history, setHistory] = useState([]);
    const [histIdx, setHistIdx] = useState(-1);
    const [showInput, setShowInput] = useState(true);

    const bodyRef = useRef(null);
    const inputRef = useRef(null);
    const idRef = useRef(0);

    const print = useCallback((html) => {
        idRef.current += 1;
        setLines((p) => [...p, { id: idRef.current, html }]);
    }, []);

    // auto-scroll
    useEffect(() => {
        if (bodyRef.current)
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [lines]);


    // boot sequence
    useEffect(() => {
        let i = 0;
        const step = () => {
            if (i < BOOT_LINES.length) {
                print(`<span class="td-dim">${BOOT_LINES[i]}</span>`);
                i++;
                setTimeout(step, 200);
            } else {
                print(
                    `Type <span class="td-a2">help</span> to explore — ` +
                    `<span class="td-a2">shutdown</span> to collapse`
                );
                setBooted(true);
                setTimeout(() => {
                    inputRef.current?.focus();
                    if (firstChar) setInput(firstChar);
                }, 50);
            }
        };
        step();
    }, [firstChar, print]);

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const commands = {
        help: () => {
            print("available commands:");
            [
                ["help", "show this list"],
                ["about", "who I am"],
                ["skills", "tech stack"],
                ["projects", "things I've built"],
                ["contact", "reach me"],
                ["neofetch", "system info card"],
                ["whoami", ""],
                ["clear", "clear the screen"],
                ["shutdown", "close the terminal"],
                ["wake_up", "???"],
                ["ping", "pong"],
                ["hello", "greet"],
                ["github", "my GitHub profile"],
                ["linkedin", "my LinkedIn profile"],
                ["coffee", "brew a cup of coffee"],
                ['sudo', 'root access'],
                ['rm', 'remove files'],
                ['ls', 'list files'],

            ].forEach(([k, v]) =>
                print(`&nbsp;&nbsp;<span class="td-a2">${k}</span>${v ? ` &mdash; ${v}` : ""}`)
            );
        },

        about: async () => {
            print(`Hi, I'm <span class="td-a2">${PROFILE.name}</span> — ${PROFILE.bio[0]}.`);
        },

        ping: () => print(`<span class="td-dim">pong</span>`),
        hello: () => print(`<span class="td-dim">Hello, human</span>`),
        hi: () => print(`<span class="td-dim">Hello, human</span>`),

        matrix: () => print(`<span class="td-dim">There is no spoon!</span>`),
        github: () => print(`<span class="td-dim"><a className="td-btn" href="${LINKS.github}"target="_blank" title="GitHub">${LINKS.github}</a></span>`),
        linkedin: () => print(`<span class="td-dim"><a className="td-btn" href="${LINKS.linkedin}"target="_blank" title="LinkedIn">${LINKS.linkedin}</a></span>`),

        coffee: async () => {
            setShowInput(false)
            print(`<span class="td-dim">Brewing Coffee...</span>`)
            await delay(1000)
            for (const c of ASCII_COFFEE.split("\n")) {
                print(`<span class="td-dim">${c}</span>`)
                await delay(10)
            }
            await delay(100);
            print(`<span class="td-dim">Done</span>`)
            setShowInput(true)
        },

        whoami: () =>
            print(`guest <span class="td-dim">(poking around ${PROFILE.handle}'s machine)</span>`),

        skills: async () => {
            setShowInput(false);
            await delay(100)
            for (const [category, items] of Object.entries(SKILLS)) {
                print(`[~] <span class="td-a2">${category}</span>: <span class="td-bl">${items}</span>`);
                await delay(400);
            }
            setShowInput(true)
        },

        projects: async () => {
            setShowInput(false)
            for (const { id, name, desc } of PROJECTS) {
                print(
                    `<span class="td-dim">[${id}]</span>  ` +
                    `<span class="td-a2">${name}</span> ` +
                    `<span class="td-dim">— ${desc}</span>`
                )
                await delay(500)
            }
            setShowInput(true)
        },

        contact: async () => {
            setShowInput(false)
            print(`[~] email <span class="td-a2"><a className="td-btn" href="${LINKS.mail}"target="_blank" title="Email">${USER_ID.mail}</a></span>`);
            await delay(400);
            print(`[~] linkedin <span class="td-a2"><a className="td-btn" href="${LINKS.linkedin}"target="_blank" title="LinkedIn">${LINKS.linkedin}</a></span>`);
            await delay(400);
            print(`[~] github <span class="td-a2"><a className="td-btn" href="${LINKS.github}"target="_blank" title="GitHub">${LINKS.github}</a></span>`);
            setShowInput(true);
        },

        neofetch: () =>
            print(
                `<div class="td-neo">` +
                `<pre class="td-neo-art">${NEOFETCH_ART}</pre>` +
                `<div class="td-neo-info">` +
                `<div><span class="td-a2">${PROFILE.handle}</span>@<span class="td-a2">portfolio</span></div>` +
                `<div class="td-dim">─────────────</div>` +
                `<div><span class="td-dim">OS:</span> PortfolioOS 1.0</div>` +
                `<div><span class="td-dim">Shell:</span> zsh</div>` +
                `<div><span class="td-dim">Role:</span> ${PROFILE.role}</div>` +
                `<div><span class="td-dim">Experience:</span> ${PROFILE.meta.Experience}</div>` +
                `<div><span class="td-dim">Location:</span> ${PROFILE.meta.Location}</div>` +
                `<div><span class="td-dim">Email:</span> ${PROFILE.meta.Email}</div>` +
                `</div></div>`
            ),

        clear: () => setLines([]),
        cls: () => setLines([]),

        sudo: () =>
            print(`<span class="td-err">Nice try. Incident logged to /dev/null.</span>`),
        rm: () =>
            print(`<span class="td-err">Nice try. Incident logged to /dev/null.</span>`),

        ls: () =>
            print(`about.txt &nbsp; skills.txt &nbsp; projects.txt &nbsp; contact.txt`),

        shutdown: async () => {
            setShowInput(false);
            print(`<span class="td-dim">Stopping services...</span>`);
            await delay(1000);
            print(`<span class="td-dim">Shutting down...</span>`);
            await delay(1000);
            onShutdown();
            setShowInput(true);
        },

        wake_up: async () => {
            setShowInput(false);
            print(`<span class="td-dim">Wake up, Neo...</span>`);
            await delay(800);

            print(`<span class="td-dim">The Matrix has you...</span>`);
            await delay(1200);

            print(`<span class="td-dim">Follow the white rabbit...</span>`);
            await delay(1500);

            print(`<span class="td-dim">Knock, knock, Neo.</span>`);
            setShowInput(true);
        },
    };

    const run = async (raw) => {
        const trimmed = raw.trim();
        const cmd = trimmed.split(/\s+/)[0].toLowerCase();
        print(`<span class="td-ps">guest@portfolio:~$</span> ${esc(raw)}`);
        if (!trimmed) return;

        if (cmd === "cat") {
            const file = trimmed.split(/\s+/)[1];

            if (file === "about.txt") {
                commands.about();
            } else if (file === "skills.txt") {
                commands.skills();
            } else if (file === "projects.txt") {
                commands.projects();
            } else if (file === "contact.txt") {
                commands.contact();
            }
            else {
                print(`<span class="td-err">file not found:</span> ${esc(file)}`);
            }
            return;
        }

        const fn = commands[cmd];

        if (fn) {
            await fn();
        } else {
            print(`<span class="td-err">command not found:</span> ${esc(cmd)}`);
        }

    };

    const onKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!booted) return;
            await run(input);
            if (input.trim()) setHistory((h) => [...h, input]);
            setHistIdx(-1);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHistory((h) => {
                const next = histIdx === -1 ? h.length - 1 : Math.max(0, histIdx - 1);
                setHistIdx(next);
                if (h[next] !== undefined) setInput(h[next]);
                return h;
            });
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setHistory((h) => {
                const next = histIdx + 1;
                if (next >= h.length) { setHistIdx(-1); setInput(""); }
                else { setHistIdx(next); setInput(h[next]); }
                return h;
            });
        }
    };

    return (
        <div
            className="td-body"
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
        >
            {lines.map((l) => (
                <div
                    key={l.id}
                    className="td-line"
                    dangerouslySetInnerHTML={{ __html: l.html }}
                />
            ))}
            {booted && showInput && (
                <div className="td-line td-irow">
                    <span className="td-ps" style={{ opacity: 1 }}>guest@portfolio:~$</span>
                    <input
                        ref={inputRef}
                        className="td-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                        style={{ opacity: 1 }}
                    />
                </div>
            )}
        </div>
    );
}

export default function TerminalDock() {
    const [expanded, setExpanded] = useState(false);
    const [firstChar, setFirstChar] = useState(null);
    const [hintVisible, setHintVisible] = useState(true);

    const expand = useCallback((char = null) => {
        if (expanded) return;
        setFirstChar(char);
        setExpanded(true);
        setHintVisible(false);
    }, [expanded]);

    const collapse = useCallback(() => {
        setExpanded(false);
        setFirstChar(null);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.ctrlKey && (e.key === "`" || e.key === "~")) {
                e.preventDefault();
                expanded ? collapse() : expand();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [expand, collapse, expanded]);

    return (
        <>
            <div className={`td-dock ${expanded ? "td-open" : "td-collapsed"}`}>

                <div className="td-bar" onClick={() => expanded ? collapse() : expand()}>
                    <span className="td-pulse" /><span className="td-bar-title">guest@portfolio:~</span>
                    <span className="td-bar-status">
                        <div className="td-dots">
                            <span className="td-dot" style={{ background: "#ff5f57" }} />
                            <span className="td-dot" style={{ background: "#febc2e" }} />
                            <span className="td-dot" style={{ background: "#28c840" }} />
                        </div>
                    </span>
                    {hintVisible && (
                        <span className="td-bar-hint">ctrl+` to open</span>
                    )}
                </div>

                {expanded && (
                    <Terminal
                        key="terminal"
                        firstChar={firstChar}
                        onShutdown={collapse}
                    />
                )}
            </div>
        </>
    );
}
