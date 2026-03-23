const ANIMAL_TO_ELEMENT = {
  tiger: 'wood',    rabbit: 'wood',
  snake: 'fire',    horse: 'fire',
  ox: 'earth',      dragon: 'earth',   goat: 'earth',   dog: 'earth',
  monkey: 'metal',  rooster: 'metal',
  rat: 'water',     pig: 'water',
};

const ELEMENT_INFO = {
  water: {
    name: 'Water',
    chinese: '水',
    color: 'var(--element-water)',
    hex: '#3a6fa0',
    season: 'Winter',
    direction: 'North',
    elementColor: 'Black / Deep Blue',
    organs: { yin: 'Kidneys', yang: 'Bladder' },
    emotion: { balanced: 'Trust', imbalanced: 'Fear' },
    taste: 'Salty',
    sense: 'Hearing',
    senseOrgan: 'Ears',
    tissue: 'Bones',
    quality: 'Depth, stillness, potential',
    description: 'Water bears life\'s deepest stillness. It stores Jing — your essential life force inherited at birth. The Kidneys govern bones, hearing, and willpower. When Water is in balance, you feel a calm strength and trust that life carries you.',
    imbalancedDescription: 'Restlessness deep in the lower back and knees, exhaustion that does not go away regardless of sleep, cold that sits all the way into the bones.',
    shpiritConnection: 'Zhi — the spirit of Will and deep knowing',
    lifePhases: [8],
    organClockTime: '15:00–19:00',
  },
  wood: {
    name: 'Wood',
    chinese: '木',
    color: 'var(--element-wood)',
    hex: '#4a9e6e',
    season: 'Spring',
    direction: 'East',
    elementColor: 'Green',
    organs: { yin: 'Liver', yang: 'Gallbladder' },
    emotion: { balanced: 'Creativity', imbalanced: 'Anger' },
    taste: 'Sour',
    sense: 'Sight',
    senseOrgan: 'Eyes',
    tissue: 'Tendons & Ligaments',
    quality: 'Growth, flexibility, vision',
    description: 'Wood is growth and direction. The Liver is the great planner; the Gallbladder makes decisions and acts. When Wood is in balance, you feel creative, courageous, and flexible — able to see the path forward and move toward it.',
    imbalancedDescription: 'Headache at the temples, stiff shoulders, impatience. Anger and creativity are the same energy expressed differently.',
    spiritConnection: 'Hun — the spirit of Vision and dreaming',
    lifePhases: [1, 2, 9],
    organClockTime: '23:00–03:00',
  },
  fire: {
    name: 'Fire',
    chinese: '火',
    color: 'var(--element-fire)',
    hex: '#c75a3a',
    season: 'Summer',
    direction: 'South',
    elementColor: 'Red',
    organs: { yin: 'Heart', yang: 'Small Intestine' },
    additionalOrgans: { pericardium: 'Pericardium', tripleHeater: 'Triple Heater' },
    emotion: { balanced: 'Joy', imbalanced: 'Restlessness' },
    taste: 'Bitter',
    sense: 'Speech',
    senseOrgan: 'Tongue',
    tissue: 'Blood Vessels',
    quality: 'Warmth, connection, illumination',
    description: 'Fire is warmth and connection. The Heart is the dwelling of Shen — consciousness and inner light. The Small Intestine discerns and sorts what is essential from what is not. When Fire is in balance, you feel joyful, present, and able to love without losing yourself.',
    imbalancedDescription: 'Insomnia, racing thoughts, feeling of being "on" too much without finding rest. Over-excitation and anxiety.',
    spiritConnection: 'Shen — the spirit of Consciousness and radiance',
    lifePhases: [3],
    organClockTime: '11:00–15:00',
  },
  earth: {
    name: 'Earth',
    chinese: '土',
    color: 'var(--element-earth)',
    hex: '#c9a84c',
    season: 'Late Summer',
    direction: 'Center',
    elementColor: 'Yellow / Orange',
    organs: { yin: 'Spleen', yang: 'Stomach' },
    emotion: { balanced: 'Care', imbalanced: 'Worry' },
    taste: 'Sweet',
    sense: 'Taste',
    senseOrgan: 'Mouth',
    tissue: 'Muscles',
    quality: 'Nourishment, stability, centering',
    description: 'Earth is stability and nourishment. The Spleen digests food, life experiences, and impressions. The Stomach receives and breaks down. Together they govern muscles, thoughts, and concentration. When Earth is in balance, you feel grounded, caring, and able to give without depleting yourself.',
    imbalancedDescription: 'Thoughts running in circles, upset stomach, feeling pulled in too many directions, lost appetite. Worry that does not resolve.',
    spiritConnection: 'Yi — the spirit of Thought and focused intention',
    lifePhases: [4, 5],
    organClockTime: '07:00–11:00',
  },
  metal: {
    name: 'Metal',
    chinese: '金',
    color: 'var(--element-metal)',
    hex: '#a8b8c8',
    season: 'Autumn',
    direction: 'West',
    elementColor: 'White / Silver',
    organs: { yin: 'Lungs', yang: 'Large Intestine' },
    emotion: { balanced: 'Acceptance', imbalanced: 'Grief' },
    taste: 'Pungent',
    sense: 'Smell',
    senseOrgan: 'Nose',
    tissue: 'Skin',
    quality: 'Refinement, letting go, clarity',
    description: 'Metal is clarity and essence. Both organs deal with the boundary between self and world — the Lungs take in what is needed, the Large Intestine releases what is not. The ability to grieve is also the ability to let go. When Metal is in balance, you feel clear, dignified, and able to discern what truly matters.',
    imbalancedDescription: 'Heaviness in the chest, shallow breathing, holding on to what should be released. Grief that has not found its way through.',
    spiritConnection: 'Po — the spirit of Body and instinct',
    lifePhases: [6, 7],
    organClockTime: '03:00–07:00',
  },
};

const SHENG_CYCLE = ['wood', 'fire', 'earth', 'metal', 'water'];

const SHENG_DESCRIPTIONS = {
  water_wood: 'Like rain makes trees grow',
  wood_fire: 'Like firewood gives fire life',
  fire_earth: 'Like ash becomes fertile soil',
  earth_metal: 'Like the earth contains minerals',
  metal_water: 'Like minerals enrich water',
};

const KE_DESCRIPTIONS = {
  water_fire: 'Water extinguishes Fire',
  fire_metal: 'Fire melts Metal',
  metal_wood: 'Metal cuts Wood',
  wood_earth: 'Wood takes nourishment from Earth',
  earth_water: 'Earth dams up Water',
};

export function getElement(animal) {
  return ANIMAL_TO_ELEMENT[animal] || 'earth';
}

export function getElementInfo(element) {
  return ELEMENT_INFO[element];
}

export { ELEMENT_INFO, SHENG_CYCLE, SHENG_DESCRIPTIONS, KE_DESCRIPTIONS, ANIMAL_TO_ELEMENT };
