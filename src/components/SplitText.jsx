import React, { useEffect, useRef, useState } from 'react';

const SplitText = ({
    text = '',
    className = '',
    delay = 30,
    animateBy = 'words',
    direction = 'bottom',
    tag = 'p',
    offset = 0,
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : animateBy === 'chars' ? text.split('') : [text];
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const yFrom = direction === 'top' ? -20 : 20;
    const Tag = tag;

    return (
        <Tag ref={ref} className={className} style={{ display: animateBy === 'text' ? 'block' : 'flex', flexWrap: 'wrap' }}>
            {elements.map((segment, index) => (
                <span
                    key={index}
                    style={{
                        display: animateBy === 'text' ? 'block' : 'inline-block',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : `translateY(${yFrom}px)`,
                        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${offset + (index * delay)}ms`,
                        willChange: 'transform, opacity',
                    }}
                >
                    {segment}
                    {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                </span>
            ))}
        </Tag>
    );
};

export default SplitText;
