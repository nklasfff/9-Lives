import { useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { getElementInfo } from '../engine/elements';
import { getDayPillar } from '../engine/calendar';
import { getRelationship } from '../engine/cycles';
import { getDailySpirits } from '../engine/wuShen';
import { getCurrentOrgan, ORGAN_CLOCK } from '../engine/organClock';
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
                <span className={styles.cardLabel}>Organ Clock</span>
                <span className={styles.cardAccent} style={{ color: organElementInfo.hex }}>
                  {today.currentOrgan.organ}
                </span>
              </div>
              <OrganClockVisualization currentOrgan={today.currentOrgan} />
              <p className={styles.cardQuote}>{today.currentOrgan.quality}</p>
              <p className={styles.cardBody}>{today.currentOrgan.guidance}</p>
            </GlassCard>
          );
        })()}

        <div className={styles.spiritsSection}>
          <h2 className={styles.sectionTitle}>The Five Spirits</h2>
          <p className={styles.sectionSubtitle}>Today's reflections for your inner landscape</p>
          <SpiritsIllustration />

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

function SpiritsIllustration() {
  const spirits = [
    { color: '#c75a3a', char: '神' },
    { color: '#4a9e6e', char: '魂' },
    { color: '#a8b8c8', char: '魄' },
    { color: '#c9a84c', char: '意' },
    { color: '#3a6fa0', char: '志' },
  ];
  return (
    <svg viewBox="0 0 260 70" className={styles.spiritsIllustration}>
      <style>{`
        @keyframes spiritPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.55; } }
        .spirit-dot { animation: spiritPulse 5s ease-in-out infinite; }
      `}</style>
      {spirits.map(({ color, char }, i) => {
        const x = 30 + i * 50;
        const y = 32;
        return (
          <g key={i}>
            {i < 4 && (
              <line
                x1={x + 12} y1={y}
                x2={x + 38} y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
                strokeDasharray="2 3"
              />
            )}
            <circle cx={x} cy={y} r="14" fill="none" stroke={color} strokeWidth="0.7" opacity="0.35" />
            <circle cx={x} cy={y} r="5" fill={color} opacity="0.15" className="spirit-dot" style={{ animationDelay: `${i * 0.8}s` }} />
            <text
              x={x} y={y + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill={color}
              fontSize="9"
              fontWeight="300"
              opacity="0.6"
            >
              {char}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function OrganClockVisualization({ currentOrgan }) {
  const cx = 130, cy = 130, r = 110;
  const innerR = 75;

  return (
    <svg viewBox="0 0 260 260" className={styles.organClock}>
      <style>{`
        @keyframes clockPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>

      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

      {/* 12 segments */}
      {ORGAN_CLOCK.map((organ, i) => {
        const startAngle = (-90 + i * 30) * (Math.PI / 180);
        const endAngle = (-90 + (i + 1) * 30) * (Math.PI / 180);
        const midAngle = (-90 + (i + 0.5) * 30) * (Math.PI / 180);
        const isActive = organ.organ === currentOrgan.organ;
        const elInfo = getElementInfo(organ.element);

        // Segment line from center outward
        const lineX = cx + r * Math.cos(startAngle);
        const lineY = cy + r * Math.sin(startAngle);

        // Label position
        const labelR = (r + innerR) / 2;
        const labelX = cx + labelR * Math.cos(midAngle);
        const labelY = cy + labelR * Math.sin(midAngle);

        // Time label position (outer)
        const timeR = r + 12;
        const timeX = cx + timeR * Math.cos(midAngle);
        const timeY = cy + timeR * Math.sin(midAngle);

        // Active arc
        const arcR = r - 2;
        const x1 = cx + arcR * Math.cos(startAngle);
        const y1 = cy + arcR * Math.sin(startAngle);
        const x2 = cx + arcR * Math.cos(endAngle);
        const y2 = cy + arcR * Math.sin(endAngle);

        return (
          <g key={i}>
            {/* Divider line */}
            <line
              x1={cx + innerR * Math.cos(startAngle)}
              y1={cy + innerR * Math.sin(startAngle)}
              x2={lineX} y2={lineY}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
            />

            {/* Active segment highlight */}
            {isActive && (
              <path
                d={`M ${x1} ${y1} A ${arcR} ${arcR} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke={elInfo.hex}
                strokeWidth="3"
                opacity="0.5"
                style={{ animation: 'clockPulse 4s ease-in-out infinite' }}
              />
            )}

            {/* Element color dot */}
            <circle
              cx={cx + (innerR + 12) * Math.cos(midAngle)}
              cy={cy + (innerR + 12) * Math.sin(midAngle)}
              r={isActive ? 3 : 1.5}
              fill={elInfo.hex}
              opacity={isActive ? 0.8 : 0.25}
            />

            {/* Organ name */}
            <text
              x={labelX} y={labelY}
              textAnchor="middle"
              dominantBaseline="central"
              fill={isActive ? elInfo.hex : 'rgba(255,255,255,0.3)'}
              fontSize={isActive ? '7' : '5.5'}
              fontFamily="var(--font-display)"
              fontWeight="300"
              fontStyle="italic"
            >
              {organ.organ.length > 12 ? organ.organ.split(' ')[0] : organ.organ}
            </text>
          </g>
        );
      })}

      {/* Center */}
      <circle cx={cx} cy={cy} r="20" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <text
        x={cx} y={cy - 4}
        textAnchor="middle"
        fill="rgba(255,255,255,0.5)"
        fontSize="7"
        fontFamily="var(--font-body)"
        letterSpacing="0.08em"
      >
        {currentOrgan.time.split('–')[0]}
      </text>
      <text
        x={cx} y={cy + 8}
        textAnchor="middle"
        fill="rgba(255,255,255,0.25)"
        fontSize="5"
        fontFamily="var(--font-body)"
        letterSpacing="0.06em"
      >
        {currentOrgan.time.split('–')[1]}
      </text>
    </svg>
  );
}
