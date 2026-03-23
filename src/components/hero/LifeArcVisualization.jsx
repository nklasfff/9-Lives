import { getElementInfo } from '../../engine/elements';
import { PHASE_ELEMENTS } from '../../engine/lifePhase';
import styles from './LifeArcVisualization.module.css';

const SEASON_LABELS = [
  { text: 'Spring', x: 100, phases: [0, 1] },
  { text: 'Summer', x: 250, phases: [2] },
  { text: 'Late Summer', x: 380, phases: [3, 4] },
  { text: 'Autumn', x: 530, phases: [5, 6] },
  { text: 'Winter', x: 660, phases: [7] },
  { text: 'Second Spring', x: 770, phases: [8] },
];

export default function LifeArcVisualization({ currentPhase = 1, userElement, onPhaseClick }) {
  const activeIndex = currentPhase - 1;

  const circles = Array.from({ length: 9 }, (_, i) => {
    const x = 60 + i * 85;
    const y = 160 - Math.sin((Math.PI * i) / 8) * 110;
    const phaseElement = PHASE_ELEMENTS[i];
    const elementInfo = getElementInfo(phaseElement);
    const isActive = i === activeIndex;

    return { x, y, i, phaseElement, elementInfo, isActive };
  });

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 830 260" className={styles.svg}>
        <defs>
          {circles.map(({ i, elementInfo, isActive }) => (
            isActive && (
              <filter key={`glow-${i}`} id={`glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor={elementInfo.hex} floodOpacity="0.5" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )
          ))}
        </defs>

        {/* Connecting arc path */}
        <path
          d={`M ${circles[0].x} ${circles[0].y} ${circles.map(c => `L ${c.x} ${c.y}`).join(' ')}`}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Phase circles */}
        {circles.map(({ x, y, i, elementInfo, isActive }) => (
          <g
            key={i}
            onClick={() => onPhaseClick?.(i + 1)}
            style={{ cursor: onPhaseClick ? 'pointer' : 'default' }}
            className={`${styles.phaseGroup} ${isActive ? styles.active : ''}`}
          >
            <circle
              cx={x}
              cy={y}
              r={isActive ? 30 : 24}
              fill={isActive ? `${elementInfo.hex}22` : 'rgba(255,255,255,0.07)'}
              stroke={isActive ? elementInfo.hex : 'rgba(255,255,255,0.25)'}
              strokeWidth={isActive ? 1.5 : 1}
              filter={isActive ? `url(#glow-${i})` : undefined}
              className={styles.circle}
            />
            <text
              x={x}
              y={y - 6}
              textAnchor="middle"
              className={`${styles.phaseNumber} ${isActive ? styles.activeText : ''}`}
              fill={isActive ? elementInfo.hex : 'rgba(255,255,255,0.5)'}
              fontSize={isActive ? '16' : '13'}
              fontFamily="var(--font-display)"
              fontWeight="300"
            >
              {i + 1}
            </text>
            <text
              x={x}
              y={y + 10}
              textAnchor="middle"
              className={styles.phaseLabel}
              fill={isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)'}
              fontSize="7"
              fontFamily="var(--font-body)"
              letterSpacing="0.08em"
            >
              PHASE
            </text>
          </g>
        ))}

        {/* Season labels */}
        {SEASON_LABELS.map(({ text, x }) => (
          <text
            key={text}
            x={x}
            y={240}
            textAnchor="middle"
            fill="rgba(255,255,255,0.35)"
            fontSize="10"
            fontFamily="var(--font-body)"
            fontStyle="italic"
            letterSpacing="0.05em"
          >
            {text}
          </text>
        ))}
      </svg>
    </div>
  );
}
