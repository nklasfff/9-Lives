const PHASE_ELEMENTS = [
  'wood', 'wood', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'wood'
];

const PHASE_SEASONS = [
  'Spring', 'Spring', 'Summer', 'Late Summer', 'Late Summer',
  'Autumn', 'Autumn', 'Winter', 'Second Spring'
];

const PHASE_DESCRIPTIONS = [
  {
    title: 'The Beginning',
    subtitle: 'The seed breaks ground',
    description: 'Growth, sprouting, the body lands in the world. Kidney energy blossoms for the first time — teeth emerge, hair thickens, and the senses sharpen. This is the foundation upon which everything else is built.',
    keywords: 'Foundation, growth, trust, first roots',
  },
  {
    title: 'Exploration',
    subtitle: 'Curiosity finds its direction',
    description: 'The first steps outward. Curiosity drives everything — friendships form, identity begins to take shape, and the emotional landscape expands. The body completes its foundational growth as Kidney energy blossoms fully.',
    keywords: 'Curiosity, direction, first independence',
  },
  {
    title: 'Transformation',
    subtitle: 'The fire is lit',
    description: 'Identity, passion, and Shen awakens. Energy is fully unfolded — wisdom teeth break through as the last sign of completion. Sexuality, ambition, and the desire to connect fully with life emerge. This is the phase of intensity and stepping into the world.',
    keywords: 'Identity, passion, Shen awakening',
  },
  {
    title: 'Blossoming',
    subtitle: 'Landing in the world',
    description: 'Stability, nourishment, and finding your place. The body is at its strongest — muscles and bones at their peak. Career, family, home — the structures of adult life take form. Nourishing others becomes as important as nourishing yourself.',
    keywords: 'Stability, nourishment, building',
  },
  {
    title: 'Responsibility',
    subtitle: 'Everything presses at once',
    description: 'Career, body, love — all demand attention simultaneously. Experience deepens into competence and quiet authority. What was built is now sustained. The body begins its first subtle turning — a shift from expansion toward consolidation.',
    keywords: 'Pressure, competence, first turning',
  },
  {
    title: 'Ripening',
    subtitle: 'Depth over breadth',
    description: 'Discernment sharpens. The face changes, hair begins to thin slightly — the first visible signs that energy is seeking new paths. What matters becomes clearer; what does not falls away. This is a phase of choosing depth over breadth.',
    keywords: 'Discernment, clarity, maturation',
  },
  {
    title: 'Harvest',
    subtitle: 'Seeing what truly matters',
    description: 'Refinement and essence. First grey hairs appear as energy finds its new direction. A profound release of what is no longer needed begins. For women, this phase often carries the threshold toward menopause — a gateway, not an ending.',
    keywords: 'Refinement, essence, letting go',
  },
  {
    title: 'Stillness',
    subtitle: 'The well reaches bedrock',
    description: 'Deepening and new homeostasis. Menstruation ceases — and a new kind of strength grows from within. Wisdom accumulates like water finding its level. The bones remember what the mind forgets. This is the phase of inwardness, reflection, and accessing ancestral depth.',
    keywords: 'Wisdom, deepening, new strength',
  },
  {
    title: 'Second Spring',
    subtitle: 'The seed remembers itself',
    description: 'Rebirth. Free voice, creativity, and luminous presence. Life comes full circle — but on a higher spiral. A new Wood-force awakens, rooted not in biology but in consciousness. Many women experience becoming clearer and more present than ever before.',
    keywords: 'Rebirth, freedom, luminous presence',
  },
];

export function getLifePhase(age, gender) {
  const cycleLength = gender === 'female' ? 7 : 8;
  let phase = Math.floor(age / cycleLength);
  if (phase < 0) phase = 0;
  if (phase > 8) phase = 8;

  return {
    phase: phase + 1,
    phaseIndex: phase,
    element: PHASE_ELEMENTS[phase],
    season: PHASE_SEASONS[phase],
    ageRange: {
      start: phase * cycleLength,
      end: phase === 8 ? null : (phase + 1) * cycleLength - 1,
    },
    ...PHASE_DESCRIPTIONS[phase],
  };
}

export function getAllPhases(gender) {
  const cycleLength = gender === 'female' ? 7 : 8;
  return PHASE_ELEMENTS.map((element, i) => ({
    phase: i + 1,
    phaseIndex: i,
    element,
    season: PHASE_SEASONS[i],
    ageRange: {
      start: i * cycleLength,
      end: i === 8 ? null : (i + 1) * cycleLength - 1,
    },
    ...PHASE_DESCRIPTIONS[i],
  }));
}

export { PHASE_ELEMENTS, PHASE_SEASONS, PHASE_DESCRIPTIONS };
