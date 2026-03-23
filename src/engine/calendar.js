const HEAVENLY_STEMS = [
  { name: 'Jia',  chinese: '甲', element: 'wood',  yinYang: 'yang', image: 'The young tree breaking through soil — the first impulse of growth, forceful and upward' },
  { name: 'Yi',   chinese: '乙', element: 'wood',  yinYang: 'yin',  image: 'The vine — persistent, adaptive, finding its way around obstacles without confronting them' },
  { name: 'Bing', chinese: '丙', element: 'fire',  yinYang: 'yang', image: 'The noon sun at full height — radiant, expansive, warming everything it touches' },
  { name: 'Ding', chinese: '丁', element: 'fire',  yinYang: 'yin',  image: 'The candle flame — small, intimate, precise; it keeps the darkness back' },
  { name: 'Wu',   chinese: '戊', element: 'earth', yinYang: 'yang', image: 'The mountain — massive, still, reliable; its gravity organizes the landscape' },
  { name: 'Ji',   chinese: '己', element: 'earth', yinYang: 'yin',  image: 'The garden soil — quiet, receptive, the dark medium in which all transformation occurs' },
  { name: 'Geng', chinese: '庚', element: 'metal', yinYang: 'yang', image: 'The blade — decisive, bright, cutting cleanly through what is unnecessary' },
  { name: 'Xin',  chinese: '辛', element: 'metal', yinYang: 'yin',  image: 'The jewel — refined through long pressure, now luminous; its value is in what it has become' },
  { name: 'Ren',  chinese: '壬', element: 'water', yinYang: 'yang', image: 'The ocean — vast, in constant motion, indifferent to the shapes of the shore it reshapes' },
  { name: 'Gui',  chinese: '癸', element: 'water', yinYang: 'yin',  image: 'The winter rain — descending quietly, invisible in its work, nourishing what is dormant' },
];

const EARTHLY_BRANCHES = [
  { name: 'Zi',   chinese: '子', animal: 'rat',     element: 'water', yinYang: 'yang', hours: '23:00–01:00', season: 'Midwinter',     character: 'Deep stillness containing the seed of everything that is coming. Maximum yin, but the yang is already turning within it.' },
  { name: 'Chou', chinese: '丑', animal: 'ox',      element: 'earth', yinYang: 'yin',  hours: '01:00–03:00', season: 'Deep winter',   character: 'The slow, unhurried strength of the working animal. Patient endurance; what is begun now is built to last.' },
  { name: 'Yin',  chinese: '寅', animal: 'tiger',   element: 'wood',  yinYang: 'yang', hours: '03:00–05:00', season: 'Early spring',  character: 'The first stirring before dawn — powerful, alert, moving with precision through the dark.' },
  { name: 'Mao',  chinese: '卯', animal: 'rabbit',  element: 'wood',  yinYang: 'yin',  hours: '05:00–07:00', season: 'Spring',        character: 'The gentle opening at sunrise. New growth that is tender but determined.' },
  { name: 'Chen', chinese: '辰', animal: 'dragon',  element: 'earth', yinYang: 'yang', hours: '07:00–09:00', season: 'Late spring',   character: 'The liminal hour between night\'s mist and day\'s clarity. Transformative potential.' },
  { name: 'Si',   chinese: '巳', animal: 'snake',   element: 'fire',  yinYang: 'yin',  hours: '09:00–11:00', season: 'Early summer',  character: 'Coiled intelligence and patient fire. The Snake knows without rushing; insight arrives whole.' },
  { name: 'Wu',   chinese: '午', animal: 'horse',   element: 'fire',  yinYang: 'yang', hours: '11:00–13:00', season: 'Midsummer',     character: 'Full noon yang — action, momentum, the body and world at their most alive.' },
  { name: 'Wei',  chinese: '未', animal: 'goat',    element: 'earth', yinYang: 'yin',  hours: '13:00–15:00', season: 'Late summer',   character: 'The gentle afternoon after the peak. Nourishing, consolidating, the harvest beginning.' },
  { name: 'Shen', chinese: '申', animal: 'monkey',  element: 'metal', yinYang: 'yang', hours: '15:00–17:00', season: 'Early autumn',  character: 'Quick intelligence, adaptive and precise. The beginning of the inward turn.' },
  { name: 'You',  chinese: '酉', animal: 'rooster', element: 'metal', yinYang: 'yin',  hours: '17:00–19:00', season: 'Autumn',        character: 'The call home at dusk. Harvest, discernment, the gathering of what has been earned.' },
  { name: 'Xu',   chinese: '戌', animal: 'dog',     element: 'earth', yinYang: 'yang', hours: '19:00–21:00', season: 'Late autumn',   character: 'The faithful keeper of the threshold. Vigilant rest; the household secured.' },
  { name: 'Hai',  chinese: '亥', animal: 'pig',     element: 'water', yinYang: 'yin',  hours: '21:00–23:00', season: 'Early winter',  character: 'Return to seed. The quiet sinking that precedes all renewal.' },
];

// Reference epoch: Jan 1, 1900 is Geng-Zi (stem index 6, branch index 0)
const EPOCH = new Date(1900, 0, 1);
const STEM_OFFSET = 6;
const BRANCH_OFFSET = 0;

function daysSinceEpoch(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((d - EPOCH) / 86400000);
}

export function getDayPillar(date) {
  const days = daysSinceEpoch(date);
  const stemIdx = ((days + STEM_OFFSET) % 10 + 10) % 10;
  const branchIdx = ((days + BRANCH_OFFSET) % 12 + 12) % 12;

  const stem = HEAVENLY_STEMS[stemIdx];
  const branch = EARTHLY_BRANCHES[branchIdx];

  return {
    stem: stem.name,
    stemChinese: stem.chinese,
    branch: branch.name,
    branchChinese: branch.chinese,
    element: stem.element,
    yinYang: stem.yinYang,
    animal: branch.animal,
    label: `${stem.name}-${branch.name}`,
    chineseLabel: `${stem.chinese}${branch.chinese}`,
    stemImage: stem.image,
    branchCharacter: branch.character,
    branchSeason: branch.season,
  };
}

export function getYearPillar(year) {
  const stemIdx = ((year - 4) % 10 + 10) % 10;
  const branchIdx = ((year - 4) % 12 + 12) % 12;

  return {
    stem: HEAVENLY_STEMS[stemIdx],
    branch: EARTHLY_BRANCHES[branchIdx],
  };
}

export { HEAVENLY_STEMS, EARTHLY_BRANCHES };
