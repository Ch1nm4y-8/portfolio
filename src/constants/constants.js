export const USER_ID = {
  github: "Ch1nm4y-8",
  linkedin: "chinmay-b-1ab595234",
  mail: "chinmay7203@gmail.com",
};

export const LINKS = {
  mail: `mailto:${USER_ID.mail}`,
  github: `https://github.com/${USER_ID.github}`,
  linkedin: `https://www.linkedin.com/in/${USER_ID.linkedin}/`,
};

const experience = `${Math.floor((Date.now() - new Date("June 1, 2024")) / (1000 * 60 * 60 * 24 * 365.25))}+ Years`;

export const PROFILE = {
  name: "Chinmay B",
  handle: "CHINMAY_B",
  role: "Software Developer",
  bio: [
    "Full-Stack Developer with experience in TypeScript, JavaScript, Node.js, React, and React Native. Skilled in building scalable web and mobile applications, designing RESTful APIs, and implementing real-time systems using WebSockets and WebRTC. Strong understanding of data structures, performance optimization, and Agile development practices.",
  ],
  meta: {
    Name: "Chinmay B",
    Role: "Software Developer",
    Experience: experience,
    Location: "India",
    Email: `${USER_ID.mail}`,
  },
};

export const SKILLS = {
  Languages: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
  "Frameworks & Libraries": ["React Native", "React", "Node.js", "Express", "Redux", "Socket.IO"],
  Data: ["MongoDB", "Redis", "SQL"],
  "Tools & Platforms": ["Git", "Linux"],
};

export const PROJECTS = [
  {
    id: "01",
    name: "Customer Onboarding Mobile App",
    desc: "Onboarding Application for Relationship Managers to quickly onboard customers and streamline bank account creation.",
    link: "#",
  },
  {
    id: "02",
    name: "Social Media Application",
    desc: "A social media application with real-time chat, notifications, and media sharing capabilities.",
    link: "#",
  },
  {
    id: "03",
    name: "RealTime Multiplayer Chess App",
    desc: "A real-time multiplayer chess application with matchmaking and game history features.",
    link: "#",
  },
  {
    id: "04",
    name: "Version Control System",
    desc: "Built a git-inspired version control system in TypeScript implementing core repository operations such as initialization, staging, commits, logging.",
    link: "#",
  },
];

export const EXPERIENCE = [
  {
    date: "2024 — Present",
    role: "Associate Software Developer",
    org: "Right Prompt Technologies Pvt Ltd.",
    detail: "Building mobile onboarding solutions for financial platforms.",
  },
];

export const CONTACT = [
  { label: "Email", sub: `${USER_ID.mail}`, icon: "@", href: `${LINKS.mail}}` },
  { label: "GitHub", sub: `${USER_ID.github}`, icon: "⌥", href: `${LINKS.github}` },
  { label: "LinkedIn", sub: `${USER_ID.linkedin}`, icon: "in", href: `${LINKS.linkedin}` },
  { label: "Resume", sub: "Download.pdf", icon: "↓", href: "#" },
];
