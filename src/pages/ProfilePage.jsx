import { useUser } from '../context/UserContext';
import { getElementInfo } from '../engine/elements';
import { getZodiacAnimal } from '../engine/zodiac';
import GlassCard from '../components/common/GlassCard';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { getDerivedData, resetProfile } = useUser();
  const data = getDerivedData();

  if (!data) return null;

  const elementInfo = getElementInfo(data.element);
  const zodiac = getZodiacAnimal(data.birthDate.year);
  const phaseElementInfo = getElementInfo(data.phase.element);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.symbol} style={{ color: elementInfo.hex }}>
          {elementInfo.chinese}
        </div>
        <h1 style={{ color: elementInfo.hex }}>{elementInfo.name}</h1>
        <p className={styles.subtitle}>{elementInfo.quality}</p>
      </header>

      <div className={styles.cards}>
        <GlassCard>
          <h3 className={styles.cardTitle}>Element Correspondences</h3>
          <div className={styles.grid}>
            <Detail label="Season" value={elementInfo.season} />
            <Detail label="Direction" value={elementInfo.direction} />
            <Detail label="Yin Organ" value={elementInfo.organs.yin} />
            <Detail label="Yang Organ" value={elementInfo.organs.yang} />
            <Detail label="Taste" value={elementInfo.taste} />
            <Detail label="Sense" value={`${elementInfo.sense} (${elementInfo.senseOrgan})`} />
            <Detail label="Tissue" value={elementInfo.tissue} />
            <Detail label="Color" value={elementInfo.elementColor} />
            <Detail label="Organ Clock" value={elementInfo.organClockTime} />
            <Detail label="Balanced" value={elementInfo.emotion.balanced} />
            <Detail label="Imbalanced" value={elementInfo.emotion.imbalanced} />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className={styles.cardTitle}>Your Profile</h3>
          <div className={styles.grid}>
            <Detail label="Zodiac Animal" value={`${zodiac.symbol} ${zodiac.name}`} />
            <Detail label="Age" value={data.age} />
            <Detail label="Cycle" value={data.gender === 'female' ? '7-year (Feminine)' : '8-year (Masculine)'} />
            <Detail label="Current Phase" value={`${data.phase.phase} — ${data.phase.title}`} />
            <Detail label="Phase Element" value={phaseElementInfo.name} color={phaseElementInfo.hex} />
            <Detail label="Phase Season" value={data.phase.season} />
          </div>
        </GlassCard>

        <GlassCard>
          <p className={styles.description}>{elementInfo.description}</p>
        </GlassCard>

        <button className={styles.resetBtn} onClick={resetProfile}>
          Reset Profile
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value, color }) {
  return (
    <div className={styles.detail}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue} style={color ? { color } : {}}>{value}</span>
    </div>
  );
}
