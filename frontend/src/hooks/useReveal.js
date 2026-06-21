import { useEffect } from 'react';

// Adds a "revealed" class to [data-reveal] elements as they scroll into view,
// powering the fade-up animation. A MutationObserver also watches for elements
// added LATER — e.g. the News / Staff / Testimonials sections fetch their own
// data and render their cards after this effect first runs, so without this
// they would never be observed and would stay invisible (opacity: 0).
export function useReveal(deps = []) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('[data-reveal]:not(.revealed)')
        .forEach((el) => el.classList.add('revealed'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const observeAll = (root) => {
      if (!root || root.nodeType !== 1) return;
      if (root.matches && root.matches('[data-reveal]:not(.revealed)')) io.observe(root);
      if (root.querySelectorAll) {
        root.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => io.observe(el));
      }
    };

    observeAll(document.body);

    // Pick up sections rendered after this effect runs (async-loaded data).
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((node) => observeAll(node)));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
