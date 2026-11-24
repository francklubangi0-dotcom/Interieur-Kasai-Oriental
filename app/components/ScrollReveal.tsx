'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) return;

    element.classList.add('is-ready');

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        element.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.02, rootMargin: '0px 0px -8% 0px' });

    observer.observe(element);
    const revealFallback = window.setTimeout(() => {
      element.classList.add('is-visible');
      observer.disconnect();
    }, 2_500);

    return () => {
      observer.disconnect();
      window.clearTimeout(revealFallback);
    };
  }, []);

  return <div ref={elementRef} className={className}>{children}</div>;
}
