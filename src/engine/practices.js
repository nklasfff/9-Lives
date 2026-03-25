// TCM-based practices: organ clock movements + dietary guidance, element diet + exercise

const ORGAN_PRACTICES = {
  'Lungs': {
    movement: 'Sit quietly and take 5–7 slow, deep breaths — inhale for 4 counts, exhale for 8. Let the chest fully expand.',
    dietary: 'Warm pear or honey water soothes the Lungs. White foods — daikon, rice congee — gently nourish Metal.',
    intention: 'Release what no longer serves you with each exhale.',
  },
  'Large Intestine': {
    movement: 'A slow walk in morning air with gentle torso twists helps the body complete its natural release.',
    dietary: 'Warm water first thing — before coffee. Fibre-rich foods like pears, flaxseed, or congee support elimination.',
    intention: 'Let go easily. The body knows what to keep.',
  },
  'Stomach': {
    movement: 'Seated abdominal massage in slow clockwise circles wakes the digestive fire. Then eat — slowly.',
    dietary: 'Warm, cooked foods only — porridge, soup, steamed vegetables. Cold and raw are hard for the Stomach right now.',
    intention: 'Receive nourishment with presence. Chew well.',
  },
  'Spleen': {
    movement: 'Sit still and think clearly — this is the Spleen\'s peak. Gentle walking after meals prevents Dampness.',
    dietary: 'Avoid sugar, cold drinks, and raw salads. Warm grains, roasted root vegetables, and miso support Earth.',
    intention: 'Gather your thoughts. Clarity is available.',
  },
  'Heart': {
    movement: 'Slow tai chi or qigong — or simply sit with someone you love. The Heart responds to presence, not effort.',
    dietary: 'Bitter foods in small amounts nourish the Heart: dark greens, a piece of dark chocolate, green tea.',
    intention: 'Let your inner light be seen. Connection heals.',
  },
  'Small Intestine': {
    movement: 'A gentle walk after lunch — 10–15 minutes — helps the body sort and absorb. Avoid heavy activity.',
    dietary: 'Light, easy-to-digest foods. Avoid greasy, heavy meals that burden the sorting process.',
    intention: 'Discern what is truly nourishing. Not everything needs to be absorbed.',
  },
  'Bladder': {
    movement: 'Stretches for the back of the legs and spine — forward folds, gentle hip circles — open the Bladder channel.',
    dietary: 'Drink warm water or herbal tea. Cooling foods like cucumber or watermelon in season support flow.',
    intention: 'Release with ease. Flow without holding.',
  },
  'Kidneys': {
    movement: 'Restorative yin yoga or stillness. Seated forward folds and gentle lower back stretches nourish the Kidneys.',
    dietary: 'Light, early dinner. Black foods restore Kidney essence: black beans, black sesame, walnuts, seaweed.',
    intention: 'Rest is not weakness. The Kidneys restore your deepest reserves.',
  },
  'Pericardium': {
    movement: 'Gentle stretching of the chest and arms, a warm bath, or slow breathing opens the heart\'s protective layer.',
    dietary: 'Warming, nourishing foods — a cup of broth, ginger tea, or a small sweet potato. Avoid stimulants.',
    intention: 'Soften the armour around the heart. Let warmth in.',
  },
  'Triple Heater': {
    movement: 'Wind down completely. No screens, no stimulation. Light stretching or slow breathing is enough.',
    dietary: 'Herbal tea for sleep — chamomile, valerian, or passionflower. No sugar or caffeine.',
    intention: 'Prepare the body for deep repair. Sleep is medicine.',
  },
  'Gallbladder': {
    movement: 'You should be asleep. If not, lie down in darkness. Still the mind — the Gallbladder processes courage quietly.',
    dietary: 'Nothing heavy. If awake, warm water only. The Gallbladder does its work without food.',
    intention: 'Trust your decisions. Rest in what was chosen.',
  },
  'Liver': {
    movement: 'Deep sleep is the practice. If awake, gentle conscious breathing — long, slow exhales release Liver tension.',
    dietary: 'Nothing. The Liver is cleansing. Water if needed, nothing else.',
    intention: 'Let the vision come. The Liver plans tomorrow while you rest.',
  },
};

const ELEMENT_PRACTICES = {
  water: {
    season: 'Winter',
    dietTitle: 'Nourish the Kidneys',
    dietBody: 'Salty, mineral-rich foods restore Water essence: seaweed, miso soup, black beans, walnuts, and bone broth. Warm, cooked foods over raw and cold. Avoid over-salting — too much salt strains the Kidneys.',
    dietFoods: ['Seaweed · kelp', 'Miso · black beans', 'Walnuts · chestnuts', 'Bone broth', 'Dark leafy greens'],
    dietAvoid: 'Excessive cold foods and drinks. Sugar and refined grains deplete Kidney essence over time.',
    exerciseTitle: 'Restore through stillness',
    exerciseBody: 'Water people benefit from slow, flowing practices that conserve rather than exhaust. Yin yoga, tai chi, and swimming honour the Water nature — depth over intensity. Avoid overtraining.',
    exercises: ['Yin yoga · restorative poses', 'Tai chi · slow flow', 'Swimming · gentle laps', 'Qigong · kidney nourishing set', 'Walking meditation'],
    timing: 'Practice in the late afternoon — the 17:00–19:00 Kidney window is ideal. Morning gentle movement supports the Water element\'s night restoration.',
  },
  wood: {
    season: 'Spring',
    dietTitle: 'Support the Liver',
    dietBody: 'Sour foods stimulate Liver qi and aid detoxification: lemon, apple cider vinegar, leafy greens, beets. Eat lightly in spring — the Liver appreciates space to work. Sprouts and fresh herbs are especially nourishing.',
    dietFoods: ['Leafy greens · dandelion', 'Beets · carrots', 'Lemon · apple cider vinegar', 'Sprouts · microgreens', 'Liver-supporting herbs'],
    dietAvoid: 'Alcohol stresses the Liver directly. Heavy, fatty foods restrict the smooth flow of Wood qi.',
    exerciseTitle: 'Move with vision',
    exerciseBody: 'Wood needs movement — but with direction, not chaos. Hiking, stretching, and flowing qigong allow the body to express its natural upward energy. Stagnant Wood energy shows as frustration; movement transforms it.',
    exercises: ['Hiking · brisk walks in nature', 'Full-body stretching', 'Pilates · yoga flow', 'Qigong · wood element set', 'Dance or free movement'],
    timing: 'The 23:00–03:00 Liver window is for sleep — the best gift for Wood. Morning stretching when the body is stiff honours the tendon-governing nature of this element.',
  },
  fire: {
    season: 'Summer',
    dietTitle: 'Nourish the Heart',
    dietBody: 'Bitter flavours support the Heart: dark leafy greens, bitter melon, dandelion tea, dark chocolate in moderation. Red foods carry Fire energy: tomatoes, strawberries, red peppers. Keep meals light in summer heat.',
    dietFoods: ['Dark leafy greens · chard', 'Red berries · tomatoes', 'Dark chocolate · cocoa', 'Lentils · red beans', 'Hawthorn berry tea'],
    dietAvoid: 'Excess sugar disturbs Shen (the Heart spirit) — anxiety and scattered thinking follow. Alcohol in excess weakens the Heart over time.',
    exerciseTitle: 'Move with joy',
    exerciseBody: 'Fire thrives on joyful, social movement. Dance, team activities, and expressive exercise all honour the Fire nature. Moderate cardio strengthens the Heart. Rest between exertion — Fire burns brightly but needs recovery.',
    exercises: ['Dance · any style', 'Walking or running with a friend', 'Cycling · light cardio', 'Yoga with heart-openers', 'Tai chi · fire set'],
    timing: 'The Heart is strongest at 11:00–13:00 — gentle morning movement prepares the Heart for its peak. Avoid intense exercise in peak summer heat (Heart time).',
  },
  earth: {
    season: 'Late Summer',
    dietTitle: 'Strengthen the Spleen',
    dietBody: 'Naturally sweet, warm, and easily digestible foods support Earth: root vegetables, grains, legumes, and cooked fruits. The Spleen is weakened by raw, cold, and sugary foods. Eat at regular times — Earth thrives on rhythm.',
    dietFoods: ['Sweet potato · yam', 'Brown rice · millet · oats', 'Pumpkin · squash · carrot', 'Chickpeas · lentils', 'Warming spices: ginger, cinnamon'],
    dietAvoid: 'Dairy in excess creates Dampness. Cold drinks, raw salads, and refined sugar overwhelm the Spleen\'s transforming function.',
    exerciseTitle: 'Ground with rhythm',
    exerciseBody: 'Earth people benefit most from grounding, rhythmic movement. Walking daily — especially on natural ground — is deeply stabilising. Gentle strength work builds the Earth element\'s natural capacity for nourishment and support.',
    exercises: ['Walking · daily and consistent', 'Tai chi · standing postures', 'Gentle strength training', 'Qigong · earth element set', 'Gardening · hands in earth'],
    timing: 'Post-meal walking (15–20 minutes) is the Earth element\'s ideal practice — it supports digestion and prevents the Dampness that comes from sitting after eating.',
  },
  metal: {
    season: 'Autumn',
    dietTitle: 'Open the Lungs',
    dietBody: 'Pungent foods move Metal qi: garlic, ginger, onion, and warming spices. White foods nourish the Lungs: pears, daikon, white rice, lotus root. In autumn, pears with honey are a classic Lung tonic.',
    dietFoods: ['Pear · apple · daikon', 'Garlic · onion · ginger', 'White sesame · lotus root', 'Almonds · white beans', 'Warming spices: clove, cardamom'],
    dietAvoid: 'Dairy can create mucus that burdens the Lungs. Avoid cold and raw foods in autumn — Metal needs warmth to function.',
    exerciseTitle: 'Breathe deeply',
    exerciseBody: 'Metal is most deeply nourished by breath. Qigong breathing, pranayama, and walking in fresh air all strengthen the Lungs and Large Intestine. Precision and structure in movement (pilates, tai chi) suit the Metal nature.',
    exercises: ['Qigong · lung expansion breathing', 'Brisk walking in fresh air', 'Pilates · structured movement', 'Pranayama · breath practices', 'Swimming · rhythmic breathing'],
    timing: 'The Lung window is 03:00–05:00 (deep breathing during sleep). For waking practice, early morning movement before 07:00 honours the Metal element\'s peak lung and intestine time.',
  },
};

export function getPracticeForOrgan(organName) {
  return ORGAN_PRACTICES[organName] || null;
}

export function getElementPractice(element) {
  return ELEMENT_PRACTICES[element] || null;
}

export { ORGAN_PRACTICES, ELEMENT_PRACTICES };
