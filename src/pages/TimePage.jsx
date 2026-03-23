import styles from './TimePage.module.css';

export default function TimePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Time Travel</h1>
        <p className={styles.subtitle}>Journey through the elemental landscape of any day</p>
      </header>

      <div className={styles.empty}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="0.8" opacity="0.4">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12,6 12,12 16,14" />
          <path d="M3 12 L1 12" strokeDasharray="1 2" />
          <path d="M23 12 L21 12" strokeDasharray="1 2" />
        </svg>
        <p className={styles.emptyText}>Select any date to see its elemental constellation and how it relates to your journey</p>
        <p className={styles.emptyHint}>Coming soon</p>
      </div>
    </div>
  );
}
