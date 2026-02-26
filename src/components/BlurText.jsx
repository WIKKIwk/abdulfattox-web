import React, { useEffect, useRef, useState } from 'react';

const BlurText = ({
  text = '',
  delay = 90,
  className = '',
  animateBy = 'words',
  direction = 'top',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
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

  const yFrom = direction === 'top' ? -30 : 30;

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            filter: inView ? 'blur(0px)' : 'blur(12px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : `translateY(${yFrom}px)`,
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms`,
            willChange: 'transform, filter, opacity',
          }}
        >
          {segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </p>
  );
};

export default BlurText;
