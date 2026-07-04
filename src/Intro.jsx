import { useEffect, useState } from "react";
import "./Intro.css";

const BOOT_LINES = [
    "Wake up, Neo...",
    "The Matrix Has You...",
    "Follow the white rabbit.",
    "Knock, knock, Neo.",
];

const TYPE_SPEED = 50;
const LINE_PAUSE = 800;

export default function Intro({ onContinue }) {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [showPrompt, setShowPrompt] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (lineIndex >= BOOT_LINES.length) {
            const t = setTimeout(() => setShowPrompt(true), 600);
            return () => clearTimeout(t);
        }

        const currentLine = BOOT_LINES[lineIndex];

        if (charIndex < currentLine.length) {
            const t = setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED);
            return () => clearTimeout(t);
        } else {
            // line fully typed, pause, then move to the next line
            const t = setTimeout(() => {
                setLineIndex((i) => i + 1);
                setCharIndex(0);
            }, LINE_PAUSE);
            return () => clearTimeout(t);
        }
    }, [lineIndex, charIndex]);

    useEffect(() => {
        if (!showPrompt || exiting) return;

        const handleKeyDown = () => {
            setExiting(true);
            setTimeout(onContinue, 700);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showPrompt, exiting, onContinue]);

    const handleContinue = () => {
        if (!showPrompt || exiting) return;
        setExiting(true);
        setTimeout(onContinue, 700);
    };

    const handleSkip = (e) => {
        e.stopPropagation();
        if (exiting) return;
        setExiting(true);
        setTimeout(onContinue, 700);
    };

    return (
        <div
            className={`matrix-intro${exiting ? " matrix-exit" : ""}`}
            onClick={handleContinue}
            onTouchStart={handleContinue}
        >
            <div className="matrix-overlay">
                <div className="matrix-lines">
                    {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
                        <div key={i} className="matrix-line">
                            <span className="matrix-caret">&gt;</span> {line}
                        </div>
                    ))}

                    {lineIndex < BOOT_LINES.length && (
                        <div className="matrix-line">
                            <span className="matrix-caret">&gt;</span>{" "}
                            {BOOT_LINES[lineIndex].slice(0, charIndex)}
                            <span className="matrix-typing-cursor">|</span>
                        </div>
                    )}
                </div>

                {showPrompt && (
                    <div className="matrix-prompt">press any key to continue_</div>
                )}
            </div>

            <div onClick={handleSkip} className='skip-btn'>[x]</div>
        </div>
    );
}