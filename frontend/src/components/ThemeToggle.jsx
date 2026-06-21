import { useUi } from '../context/UiContext.jsx';

// Animated sun ⇄ moon toggle. The knob slides, the sun's rays retract and a
// moon crescent + stars fade in for dark mode.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useUi();
  const dark = theme === 'dark';

  return (
    <button
      className={`theme-toggle ${dark ? 'is-dark' : ''}`}
      onClick={toggleTheme}
      aria-label={dark ? 'الوضع النهاري' : 'الوضع الليلي'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <span className="tt-track">
        <span className="tt-stars">
          <i></i><i></i><i></i>
        </span>
        <span className="tt-knob">
          <span className="tt-sun">
            <span className="tt-rays"></span>
          </span>
          <span className="tt-moon"></span>
        </span>
      </span>
    </button>
  );
}
