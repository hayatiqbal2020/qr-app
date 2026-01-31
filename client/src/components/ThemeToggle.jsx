import { useTheme } from '../context/ThemeContext'
import '../App.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" data-dark={isDark} />
      </span>
      <span className="theme-toggle-icons">
        <span className="theme-icon theme-icon-sun" aria-hidden>☀</span>
        <span className="theme-icon theme-icon-moon" aria-hidden>🌙</span>
      </span>
    </button>
  )
}

export default ThemeToggle
