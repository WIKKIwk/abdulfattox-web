import React, { useEffect, useRef, useState } from 'react';
import './ScrambledText.css';

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef(null);
  const [chars, setChars] = useState([]);

  useEffect(() => {
    if (!rootRef.current) return;
    const text = typeof children === 'string' ? children : String(children);
    setChars(text.split(''));
  }, [children]);

  useEffect(() => {
    if (!rootRef.current || chars.length === 0) return;

    const el = rootRef.current;
    const charElements = Array.from(el.querySelectorAll('.char'));

    // Custom Scramble Effect Hook
    const timers = new Map();

    const handleMove = (e) => {
      charElements.forEach((c) => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const originalText = c.getAttribute('data-content');
          const maxTime = duration * 1000 * (1 - dist / radius);

          if (!timers.has(c)) {
            let elapsed = 0;
            const scrambleSpeed = 1000 / (60 * speed); // Roughly translating speed

            const scrambleLoop = setInterval(() => {
              elapsed += scrambleSpeed;
              if (elapsed >= maxTime) {
                c.innerHTML = originalText;
                clearInterval(scrambleLoop);
                timers.delete(c);
              } else {
                c.innerHTML = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              }
            }, scrambleSpeed);

            timers.set(c, scrambleLoop);
          }
        }
      });
    };

    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      timers.forEach(timer => clearInterval(timer));
    };
  }, [radius, duration, speed, scrambleChars, chars]);

  return (
    <div ref={rootRef} className={`${className}`} style={style}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="char"
          data-content={char === ' ' ? '&nbsp;' : char}
          dangerouslySetInnerHTML={{ __html: char === ' ' ? '&nbsp;' : char }}
        />
      ))}
    </div>
  );
};

export default ScrambledText;
