const ANIMALS = [
  'rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake',
  'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'
];

const ANIMAL_INFO = {
  rat:     { name: 'Rat',     symbol: '子', trait: 'Resourceful & quick-witted' },
  ox:      { name: 'Ox',      symbol: '丑', trait: 'Diligent & dependable' },
  tiger:   { name: 'Tiger',   symbol: '寅', trait: 'Brave & confident' },
  rabbit:  { name: 'Rabbit',  symbol: '卯', trait: 'Gentle & compassionate' },
  dragon:  { name: 'Dragon',  symbol: '辰', trait: 'Ambitious & charismatic' },
  snake:   { name: 'Snake',   symbol: '巳', trait: 'Wise & intuitive' },
  horse:   { name: 'Horse',   symbol: '午', trait: 'Energetic & free-spirited' },
  goat:    { name: 'Goat',    symbol: '未', trait: 'Creative & empathetic' },
  monkey:  { name: 'Monkey',  symbol: '申', trait: 'Clever & versatile' },
  rooster: { name: 'Rooster', symbol: '酉', trait: 'Observant & courageous' },
  dog:     { name: 'Dog',     symbol: '戌', trait: 'Loyal & honest' },
  pig:     { name: 'Pig',     symbol: '亥', trait: 'Generous & warm-hearted' },
};

export function getZodiacAnimal(birthYear) {
  const index = ((birthYear - 4) % 12 + 12) % 12;
  const animal = ANIMALS[index];
  return { animal, index, ...ANIMAL_INFO[animal] };
}

export { ANIMALS, ANIMAL_INFO };
