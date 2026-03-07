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
    const previewItem = document.getElementById('web-design-item');
    if (!previewItem) return;

    let hoverTimer = null;

    const setPreviewState = (next) => {
        previewItem.classList.toggle('is-open', next);
        previewItem.setAttribute('aria-expanded', next ? 'true' : 'false');
    };

    const togglePreview = () => {
        const next = !previewItem.classList.contains('is-open');
        setPreviewState(next);
    };

    const clearHoverTimer = () => {
        if (!hoverTimer) return;
        window.clearTimeout(hoverTimer);
        hoverTimer = null;
    };

    const queueAutoOpen = () => {
        clearHoverTimer();
        if (previewItem.classList.contains('is-open')) return;

        hoverTimer = window.setTimeout(() => {
            setPreviewState(true);
            hoverTimer = null;
        }, 5000);
    };

    previewItem.addEventListener('click', (event) => {
        if (event.target.closest('.service-preview-card')) return;
        clearHoverTimer();
        togglePreview();
    });

    previewItem.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        clearHoverTimer();
        togglePreview();
    });

    previewItem.addEventListener('pointerenter', queueAutoOpen);
    previewItem.addEventListener('pointerleave', clearHoverTimer);
    previewItem.addEventListener('focusin', queueAutoOpen);
    previewItem.addEventListener('focusout', clearHoverTimer);
}, 80);

setTimeout(() => {
    const items = Array.from(document.querySelectorAll('.page-services-list .service-item'));
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const index = items.indexOf(entry.target);
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                entry.target.classList.add('is-line-visible');
            }, Math.max(index, 0) * 120);

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

    items.forEach((item) => observer.observe(item));
}, 100);
