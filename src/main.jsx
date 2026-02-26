import React from 'react';
import { createRoot } from 'react-dom/client';
import DarkVeil from './components/DarkVeil.jsx';
import BlurText from './components/BlurText.jsx';
import CurvedLoop from './components/CurvedLoop.jsx';
import StaggeredMenu from './components/StaggeredMenu.jsx';
import SplitText from './components/SplitText.jsx';
import CountUp from './components/CountUp.jsx';

// Render StaggeredMenu
const menuContainer = document.getElementById('staggered-menu-root');
if (menuContainer) {
    const root = createRoot(menuContainer);
    root.render(
        <StaggeredMenu
            position="right"
            isFixed={true}
            colors={['#1a1a2e', '#16213e']}
            accentColor="#a78bfa"
            menuButtonColor="#ffffff"
            openMenuButtonColor="#000000"
            items={[
                { label: 'Home', link: '#hero' },
                { label: 'Services', link: '#blur-root' },
                { label: 'About', link: '#about' },
                { label: 'Projects', link: '#projects' },
                { label: 'Contact', link: '#footer' },
            ]}
            socialItems={[
                { label: 'GitHub', link: 'https://github.com/WIKKIwk' },
                { label: 'Telegram', link: 'https://t.me' },
                { label: 'LinkedIn', link: 'https://linkedin.com' },
            ]}
        />
    );
}

// Try rendering DarkVeil onto an element
const veilContainer = document.getElementById('veil-root');
if (veilContainer) {
    const root = createRoot(veilContainer);
    root.render(
        <DarkVeil
            hueShift={360}
            noiseIntensity={0.05}
            speed={2.2}
            scanlineIntensity={1}
            scanlineFrequency={5}
            warpAmount={2.8}
        />
    );
}

// Render BlurText "What I Build"
const blurContainer = document.getElementById('blur-root');
if (blurContainer) {
    const root = createRoot(blurContainer);
    root.render(
        <BlurText
            text="What I Build"
            className="build-title"
            delay={150}
            animateBy="words"
            direction="top"
        />
    );
}

// Render BlurText for "ABOUT ME"
const aboutTitleContainer = document.getElementById('about-title-root');
if (aboutTitleContainer) {
    const root = createRoot(aboutTitleContainer);
    root.render(
        <BlurText
            text="ABOUT ME"
            className="section-big-title"
            delay={150}
            animateBy="words"
            direction="top"
        />
    );
}

// Render BlurText for "PROJECTS"
const projectsTitleContainer = document.getElementById('projects-title-root');
if (projectsTitleContainer) {
    const root = createRoot(projectsTitleContainer);
    root.render(
        <BlurText
            text="PROJECTS"
            className="section-big-title"
            delay={150}
            animateBy="words"
            direction="top"
        />
    );
}

// Render CurvedLoop marquee
const curvedContainer = document.getElementById('curved-root');
if (curvedContainer) {
    const root = createRoot(curvedContainer);
    root.render(
        <CurvedLoop
            marqueeText="Think ✦ In ✦ Systems ✦ Not ✦ Pages ✦ "
            speed={1.5}
            curveAmount={120}
            direction="left"
        />
    );
}

// Render SplitText for About section
const aboutTextContainer = document.getElementById('about-text-root');
if (aboutTextContainer) {
    const root = createRoot(aboutTextContainer);
    const paragraphs = [
        "I am a systems-focused developer specializing in building real-world, production-grade software. My work goes beyond simple web interfaces — I design and engineer scalable architectures that power business operations from the core.",
        "Over the years, I have worked extensively with ERPNext, building custom modules, manufacturing flows, warehouse automation systems, and complex integrations tailored to real operational needs. I focus on clean architecture, maintainability, and long-term scalability rather than quick, temporary solutions.",
        "I also develop high-performance Linux-based TUI applications designed for speed, reliability, and hardware-level integration. These systems interact with RFID devices, printers, APIs, and backend services, forming tightly integrated, efficient operational platforms.",
        "In addition, I build Telegram automation systems that streamline business workflows, notifications, monitoring, and remote control capabilities. I believe automation should reduce complexity, not add to it.",
        "My approach is rooted in systems thinking — performance first, scalability by design, and automation wherever possible. From backend engineering to deployment and infrastructure, I build solutions that are engineered for impact and built to scale."
    ];
    root.render(
        <>
            {paragraphs.map((text, i) => (
                <SplitText
                    key={i}
                    text={text}
                    className="about-paragraph"
                    delay={15}
                    animateBy="text"
                    direction="bottom"
                    tag="p"
                    offset={i * 200}
                />
            ))}
        </>
    );
}

// Render CountUp animations
const counterTargets = [
    { id: 'stat-num-1', to: 2 },
    { id: 'stat-num-2', to: 20 },
    { id: 'stat-num-3', to: 10 },
    { id: 'service-num-1', to: 1, padZero: true },
    { id: 'service-num-2', to: 2, padZero: true },
    { id: 'service-num-3', to: 3, padZero: true },
    { id: 'service-num-4', to: 4, padZero: true },
    { id: 'project-num-1', to: 1, padZero: true },
    { id: 'project-num-2', to: 2, padZero: true },
    { id: 'project-num-3', to: 3, padZero: true },
];

counterTargets.forEach(({ id, to, padZero }) => {
    const el = document.getElementById(id);
    if (el) {
        const root = createRoot(el);
        root.render(<CountUp from={0} to={to} separator="," direction="up" duration={2} className="count-up-text" padZero={!!padZero} />);
    }
});

console.log('✨ Sokin Portfolio Ishga Tushdi!');

// Scroll-triggered animations for service items
// Use setTimeout to ensure all DOM elements are fully rendered
setTimeout(() => {
    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems.length === 0) return;

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(serviceItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    serviceItems.forEach(item => scrollObserver.observe(item));
}, 100);
