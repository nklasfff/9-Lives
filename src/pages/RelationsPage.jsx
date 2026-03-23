import styles from './RelationsPage.module.css';

export default function RelationsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Relations</h1>
        <p className={styles.subtitle}>Elemental dynamics between lives</p>
      </header>

      <div className={styles.empty}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="0.8" opacity="0.4">
          <circle cx="8" cy="12" r="5" />
          <circle cx="16" cy="12" r="5" />
        </svg>
        <p className={styles.emptyText}>Add someone to explore how your elements interact</p>
        <p className={styles.emptyHint}>Coming soon</p>
      </div>
    </div>
  );
}
