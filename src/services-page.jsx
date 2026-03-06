import React from 'react';
import { createRoot } from 'react-dom/client';
import BlurText from './components/BlurText.jsx';
import SplitText from './components/SplitText.jsx';
import { initializePageI18n } from './pageShared.jsx';
import { translate } from './i18n.jsx';

const rootCache = new WeakMap();

const renderHeroContent = (lang) => {
    const titleContainer = document.getElementById('services-title-root');
    if (titleContainer) {
        const root = rootCache.get(titleContainer) || createRoot(titleContainer);
        rootCache.set(titleContainer, root);
        root.render(
            <BlurText
                text={translate('services', lang, 'title')}
                className="section-big-title"
                delay={150}
                animateBy="words"
                direction="top"
            />
        );
    }

    const leadContainer = document.getElementById('services-lead-root');
    if (leadContainer) {
        const root = rootCache.get(leadContainer) || createRoot(leadContainer);
        rootCache.set(leadContainer, root);
        root.render(
            <SplitText
                text={translate('services', lang, 'lead')}
                className="page-lead"
                delay={0}
                animateBy="text"
                direction="bottom"
                tag="p"
            />
        );
    }
};

initializePageI18n('services', (lang) => {
    renderHeroContent(lang);
});

setTimeout(() => {
    const items = Array.from(document.querySelectorAll('.page-services-list .service-item'));
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const index = items.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('is-line-visible');
            }, Math.max(index, 0) * 120);

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

    items.forEach((item) => observer.observe(item));
}, 100);
