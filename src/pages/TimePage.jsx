import { useState, useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { getDayPillar } from '../engine/calendar';
import { getElementInfo } from '../engine/elements';
import { getLifePhase } from '../engine/lifePhase';
import { getRelationship } from '../engine/cycles';
import { ORGAN_CLOCK } from '../engine/organClock';
import { loadFriends } from '../utils/localStorage';
import { calculateAge } from '../utils/dateUtils';
import GlassCard from '../components/common/GlassCard';
import styles from './TimePage.module.css';

export default function TimePage() {
  const { getDerivedData } = useUser();
  const data = getDerivedData();
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });

  const friends = useMemo(() => loadFriends(), []);

  const computed = useMemo(() => {
    if (!data) return null;
    const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    const pillar = getDayPillar(date);
    const pillarEl = getElementInfo(pillar.element);
    const userEl = getElementInfo(data.element);
    const rel = getRelationship(data.element, pillar.element);
    const ageAtDate = calculateAge(data.birthDate.year, data.birthDate.month, data.birthDate.day);
    const yearDiff = selectedDate.year - today.getFullYear();
    const ageAtSelected = ageAtDate + yearDiff;
    const phaseAtDate = getLifePhase(Math.max(0, ageAtSelected), data.gender);
    const isToday = selectedDate.year === today.getFullYear() &&
      selectedDate.month === today.getMonth() + 1 &&
      selectedDate.day === today.getDate();
    const currentHour = today.getHours();

    return { date, pillar, pillarEl, userEl, rel, ageAtSelected, phaseAtDate, isToday, currentHour, yearDiff };
  }, [data, selectedDate]);

  if (!data || !computed) return null;

  const resetToday = () => {
    setSelectedDate({ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() });
  };

  const phaseEl = getElementInfo(computed.phaseAtDate.element);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Time Travel</h1>
        <p className={styles.subtitle}>Journey through the elemental landscape of any moment</p>
      </header>

      <SpiralIllustration />

      <div className={styles.content}>
        {/* Date picker */}
        <GlassCard>
          <div className={styles.pickerHeader}>
            <span className={styles.cardLabel}>Choose a date</span>
            {!computed.isToday && (
              <button className={styles.todayBtn} onClick={resetToday}>Today</button>
            )}
          </div>
          <div className={styles.dateInputs}>
            <div className={styles.field}>
              <label>Year</label>
              <select value={selectedDate.year} onChange={(e) => setSelectedDate({ ...selectedDate, year: +e.target.value })}>
                {Array.from({ length: 111 }, (_, i) => 2030 - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Month</label>
              <select value={selectedDate.month} onChange={(e) => setSelectedDate({ ...selectedDate, month: +e.target.value })}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString('en', { month: 'short' })}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Day</label>
              <select value={selectedDate.day} onChange={(e) => setSelectedDate({ ...selectedDate, day: +e.target.value })}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Day Reading */}
        <GlassCard glowColor={`${computed.pillarEl.hex}15`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Day Pillar</span>
            <span className={styles.cardAccent} style={{ color: computed.pillarEl.hex }}>
              {computed.pillarEl.name} ({computed.pillar.yinYang})
            </span>
          </div>
          <div className={styles.pillarDisplay}>
            <span className={styles.pillarChinese} style={{ color: computed.pillarEl.hex }}>
              {computed.pillar.chineseLabel}
            </span>
            <span className={styles.pillarName}>{computed.pillar.label}</span>
          </div>
          <p className={styles.pillarImage}>{computed.pillar.stemImage}</p>
          <p className={styles.pillarCharacter}>{computed.pillar.branchCharacter}</p>
          <div className={styles.relSection}>
            <span className={styles.relName}>{computed.rel.name}</span>
            <p className={styles.relDesc}>{computed.rel.description}</p>
          </div>
        </GlassCard>

        {/* Life Phase at date */}
        <GlassCard glowColor={`${phaseEl.hex}15`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>
              {computed.isToday ? 'Your current phase' :
                computed.yearDiff < 0 ? `${Math.abs(computed.yearDiff)} years ago` :
                  `In ${computed.yearDiff} years`}
            </span>
            <span className={styles.cardAccent} style={{ color: phaseEl.hex }}>
              Age {Math.max(0, computed.ageAtSelected)}
            </span>
          </div>
          <div className={styles.phaseDisplay}>
            <span className={styles.phaseNum} style={{ color: phaseEl.hex }}>{computed.phaseAtDate.phase}</span>
            <div>
              <h3 className={styles.phaseTitle}>{computed.phaseAtDate.title}</h3>
              <span className={styles.phaseMeta}>
                {phaseEl.chinese} {phaseEl.name} · {computed.phaseAtDate.season}
              </span>
            </div>
          </div>
          <p className={styles.phaseQuote}>{computed.phaseAtDate.subtitle}</p>
          <p className={styles.bodyText}>{computed.phaseAtDate.description}</p>
        </GlassCard>

        {/* Organ Clock for the day */}
        <GlassCard>
          <span className={styles.cardLabel}>The Day's Rhythm</span>
          <p className={styles.sectionSubtitle}>12 organ periods across 24 hours</p>
          <div className={styles.organList}>
            {ORGAN_CLOCK.map((organ, i) => {
              const orgEl = getElementInfo(organ.element);
              const isNow = computed.isToday &&
                ((organ.startHour < organ.endHour && computed.currentHour >= organ.startHour && computed.currentHour < organ.endHour) ||
                  (organ.startHour > organ.endHour && (computed.currentHour >= organ.startHour || computed.currentHour < organ.endHour)));
              return (
                <div key={i} className={`${styles.organItem} ${isNow ? styles.organActive : ''}`}>
                  <span className={styles.organDot} style={{ background: orgEl.hex }} />
                  <span className={styles.organTime}>{organ.time}</span>
                  <span className={styles.organName} style={isNow ? { color: orgEl.hex } : {}}>{organ.organ}</span>
                  <span className={styles.organQuality}>{organ.quality}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <DailyCycleIllustration />

      {/* Deeper layer cards */}
      <div className={styles.deeperCards}>
        <GlassCard>
          <span className={styles.deepLabel}>Gan Zhi · Calendar Layer</span>
          <h3 className={styles.deepTitle}>Temporal Signatures</h3>
          <p className={styles.bodyText}>
            The Gan Zhi system gives each day a unique energetic signature — a Heavenly Stem (surface quality) paired with an Earthly Branch (deeper timing). Ten stems and twelve branches combine into a 60-unit cycle that has been running continuously for over three thousand years.
          </p>
          <p className={styles.bodyText}>
            Every day you live has a character. Some days carry the nature of metal — clear, decisive, precise. Others carry water — deep, patient, requiring stillness. Knowing the day's quality is like knowing the tide before you swim.
          </p>
        </GlassCard>

        <GlassCard>
          <span className={styles.deepLabel}>Life Phases · Transition Layer</span>
          <h3 className={styles.deepTitle}>Phase Transitions</h3>
          <p className={styles.bodyText}>
            The moments between phases are thresholds — not abrupt boundaries but gradual turnings, like the shift from autumn to winter. When Wood becomes Fire, curiosity transforms into passion. When Metal becomes Water, the ability to let go deepens into wisdom.
          </p>
          <p className={styles.bodyText}>
            Use the date picker to find your next transition. See what element awaits, and what season your life is entering. The body often knows before the mind — symptoms at a threshold are not failures but signals of transformation.
          </p>
        </GlassCard>

        <GlassCard>
          <span className={styles.deepLabel}>Relations · Time Layer</span>
          <h3 className={styles.deepTitle}>Relational Time</h3>
          <p className={styles.bodyText}>
            Your relationships are not static — they move through time just as you do. A partner who nourishes you today may have been tempering you ten years ago. A child in their Wood phase brings a different quality to your Metal phase than they will when they enter Fire.
          </p>
          {friends.length > 0 && (
            <div className={styles.friendPhases}>
              <span className={styles.friendPhasesTitle}>Your people on this date</span>
              {friends.map((friend) => {
                const fAge = calculateAge(friend.birthYear, 6, 15) + computed.yearDiff;
                const fPhase = getLifePhase(Math.max(0, fAge), friend.gender);
                const fEl = getElementInfo(fPhase.element);
                return (
                  <div key={friend.id} className={styles.friendPhaseRow}>
                    <span className={styles.friendPhaseName}>{friend.name}</span>
                    <span className={styles.friendPhaseInfo} style={{ color: fEl.hex }}>
                      Phase {fPhase.phase} · {fPhase.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

function SpiralIllustration() {
  const colors = ['#4a9e6e', '#4a9e6e', '#c75a3a', '#c9a84c', '#c9a84c', '#a8b8c8', '#a8b8c8', '#3a6fa0', '#4a9e6e'];
  return (
    <svg viewBox="0 0 220 180" className={styles.heroIllustration}>
      <style>{`
        @keyframes spiralPulse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -800; }
        }
        @keyframes phaseDotPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* Spiral path */}
      {[0, 1, 2, 3, 4].map((ring) => {
        const r = 15 + ring * 16;
        return (
          <circle key={ring} cx="110" cy="95" r={r}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
            strokeDasharray={ring % 2 === 0 ? 'none' : '2 3'}
          />
        );
      })}

      {/* Flowing energy along spiral */}
      <circle cx="110" cy="95" r="55" fill="none"
        stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"
        strokeDasharray="4 20"
        style={{ animation: 'spiralPulse 30s linear infinite' }}
      />

      {/* 9 phase dots along the spiral */}
      {colors.map((color, i) => {
        const ring = 15 + (i / 8) * 64;
        const angle = (-90 + i * 40) * (Math.PI / 180);
        const x = 110 + ring * Math.cos(angle);
        const y = 95 + ring * Math.sin(angle);
        return (
          <circle key={i} cx={x} cy={y} r="3" fill={color} opacity="0.35"
            style={{ animation: `phaseDotPulse ${5 + i * 0.5}s ease-in-out ${i * 0.6}s infinite` }}
          />
        );
      })}

      {/* Center */}
      <circle cx="110" cy="95" r="4" fill="rgba(255,255,255,0.15)" />
      <circle cx="110" cy="95" r="1.5" fill="rgba(255,255,255,0.35)" />

      {/* Past/Future axis */}
      <line x1="110" y1="170" x2="110" y2="15" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="1 4" />
      <text x="110" y="10" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="var(--font-display)" fontStyle="italic">future</text>
      <text x="110" y="178" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="var(--font-display)" fontStyle="italic">past</text>
    </svg>
  );
}

function DailyCycleIllustration() {
  const orgColors = ORGAN_CLOCK.map(o => getElementInfo(o.element).hex);
  return (
    <svg viewBox="0 0 200 200" className={styles.cycleIllustration}>
      <style>{`
        @keyframes segFade {
          0%, 6% { opacity: 0.1; }
          8%, 14% { opacity: 0.4; }
          16%, 100% { opacity: 0.1; }
        }
      `}</style>

      {orgColors.map((color, i) => {
        const startA = (-90 + i * 30) * (Math.PI / 180);
        const endA = (-90 + (i + 1) * 30) * (Math.PI / 180);
        const r = 70, ir = 40;
        const ox1 = 100 + r * Math.cos(startA), oy1 = 100 + r * Math.sin(startA);
        const ox2 = 100 + r * Math.cos(endA), oy2 = 100 + r * Math.sin(endA);
        const ix1 = 100 + ir * Math.cos(endA), iy1 = 100 + ir * Math.sin(endA);
        const ix2 = 100 + ir * Math.cos(startA), iy2 = 100 + ir * Math.sin(startA);
        return (
          <path key={i}
            d={`M ${ox1} ${oy1} A ${r} ${r} 0 0 1 ${ox2} ${oy2} L ${ix1} ${iy1} A ${ir} ${ir} 0 0 0 ${ix2} ${iy2} Z`}
            fill={color} stroke="rgba(8,12,20,0.8)" strokeWidth="1"
            style={{ animation: `segFade ${12 * 2.5}s ease-in-out ${i * 2.5}s infinite` }}
          />
        );
      })}

      <circle cx="100" cy="100" r={39} fill="var(--bg)" />
      <circle cx="100" cy="100" r="3" fill="rgba(255,255,255,0.15)" />
    </svg>
  );
}
