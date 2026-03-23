import { useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { getElementInfo } from '../engine/elements';
import { getDayPillar } from '../engine/calendar';
import { getRelationship } from '../engine/cycles';
import { getDailySpirits } from '../engine/wuShen';
import { getCurrentOrgan } from '../engine/organClock';
import { getGreeting, formatDate } from '../utils/dateUtils';
import LifeArcVisualization from '../components/hero/LifeArcVisualization';
import GlassCard from '../components/common/GlassCard';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { getDerivedData } = useUser();
  const data = getDerivedData();

  const today = useMemo(() => {
    const now = new Date();
    const dayPillar = getDayPillar(now);
    const dayElementInfo = getElementInfo(dayPillar.element);
    const relationship = data ? getRelationship(data.element, dayPillar.element) : null;
    const spirits = data ? getDailySpirits(dayPillar.element, data.element) : [];
    const currentOrgan = getCurrentOrgan();
    return { now, dayPillar, dayElementInfo, relationship, spirits, currentOrgan, formatted: formatDate(now) };
  }, [data]);

  if (!data) return null;

  const elementInfo = getElementInfo(data.element);
  const phaseElementInfo = getElementInfo(data.phase.element);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.greeting}>{getGreeting()}</p>
        <h1 className={styles.elementName} style={{ color: elementInfo.hex }}>
          {elementInfo.chinese} {elementInfo.name}
        </h1>
      </header>

      <section className={styles.arcSection}>
        <LifeArcVisualization
          currentPhase={data.phase.phase}
          userElement={data.element}
        />
      </section>

      <section className={styles.cards}>
        <GlassCard glowColor={`${phaseElementInfo.hex}20`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Life Phase {data.phase.phase}</span>
            <span className={styles.cardAccent} style={{ color: phaseElementInfo.hex }}>
              {data.phase.season}
            </span>
          </div>
          <h3 className={styles.cardTitle}>{data.phase.title}</h3>
          <p className={styles.cardQuote}>{data.phase.subtitle}</p>
          <p className={styles.cardBody}>{data.phase.description}</p>
        </GlassCard>

        <GlassCard glowColor={`${today.dayElementInfo.hex}20`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Today</span>
            <span className={styles.cardAccent} style={{ color: today.dayElementInfo.hex }}>
              {today.dayElementInfo.name} {today.dayPillar.yinYang === 'yin' ? '(Yin)' : '(Yang)'}
            </span>
          </div>
          <p className={styles.dateText}>{today.formatted}</p>
          <p className={styles.pillarText}>
            {today.dayPillar.chineseLabel} {today.dayPillar.label}
          </p>
          <p className={styles.cardQuote}>{today.dayPillar.stemImage}</p>
          {today.relationship && (
            <div className={styles.relationship}>
              <span className={styles.relType}>{today.relationship.name}</span>
              <p className={styles.relDesc}>{today.relationship.description}</p>
            </div>
          )}
        </GlassCard>

        {today.currentOrgan && (() => {
          const organElementInfo = getElementInfo(today.currentOrgan.element);
          return (
            <GlassCard glowColor={`${organElementInfo.hex}15`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>Organ Clock — {today.currentOrgan.time}</span>
                <span className={styles.cardAccent} style={{ color: organElementInfo.hex }}>
                  {today.currentOrgan.organ}
                </span>
              </div>
              <p className={styles.cardQuote}>{today.currentOrgan.quality}</p>
              <p className={styles.cardBody}>{today.currentOrgan.guidance}</p>
            </GlassCard>
          );
        })()}

        <div className={styles.spiritsSection}>
          <h2 className={styles.sectionTitle}>The Five Spirits</h2>
          <p className={styles.sectionSubtitle}>Today's reflections for your inner landscape</p>

          {today.spirits.map((spirit) => {
            const spiritElementInfo = getElementInfo(spirit.element);
            return (
              <GlassCard
                key={spirit.key}
                className={spirit.isActive ? styles.spiritActive : ''}
                glowColor={spirit.isActive ? `${spiritElementInfo.hex}25` : undefined}
              >
                <div className={styles.spiritHeader}>
                  <div>
                    <span className={styles.spiritName} style={{ color: spiritElementInfo.hex }}>
                      {spirit.name}
                    </span>
                    <span className={styles.spiritTitle}>{spirit.title}</span>
                  </div>
                  {spirit.isActive && (
                    <span className={styles.activeBadge} style={{ background: `${spiritElementInfo.hex}30`, color: spiritElementInfo.hex }}>
                      Active today
                    </span>
                  )}
                </div>
                <p className={styles.spiritReflection}>{spirit.todayReflection}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
