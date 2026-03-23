const SHENG_ORDER = ['wood', 'fire', 'earth', 'metal', 'water'];

const KE_ORDER = ['wood', 'earth', 'water', 'fire', 'metal'];

const RELATIONSHIP_DESCRIPTIONS = {
  same: {
    name: 'Resonance',
    description: 'You share the same element. This creates deep understanding and natural harmony, but may also amplify imbalances.',
    quality: 'Mirror',
  },
  sheng_give: {
    name: 'Nourishing',
    description: 'Your element feeds and supports theirs. You are a natural source of strength for them — like wood feeding fire.',
    quality: 'Generative',
  },
  sheng_receive: {
    name: 'Nourished',
    description: 'Their element feeds yours. They naturally strengthen and support your energy — a receiving relationship.',
    quality: 'Receptive',
  },
  ke_control: {
    name: 'Tempering',
    description: 'Your element tempers and shapes theirs. In balance, this brings healthy structure. In excess, it can feel controlling.',
    quality: 'Structuring',
  },
  ke_controlled: {
    name: 'Tempered',
    description: 'Their element tempers yours. In balance, this brings needed discipline. When excessive, it may feel limiting.',
    quality: 'Receiving structure',
  },
};

export function getRelationship(element1, element2) {
  if (element1 === element2) {
    return { type: 'same', ...RELATIONSHIP_DESCRIPTIONS.same };
  }

  const idx1 = SHENG_ORDER.indexOf(element1);
  const idx2 = SHENG_ORDER.indexOf(element2);

  // Check Sheng (generating) cycle
  if ((idx1 + 1) % 5 === idx2) {
    return { type: 'sheng_give', ...RELATIONSHIP_DESCRIPTIONS.sheng_give };
  }
  if ((idx2 + 1) % 5 === idx1) {
    return { type: 'sheng_receive', ...RELATIONSHIP_DESCRIPTIONS.sheng_receive };
  }

  // Check Ke (controlling) cycle
  const keIdx1 = KE_ORDER.indexOf(element1);
  const keIdx2 = KE_ORDER.indexOf(element2);
  if ((keIdx1 + 1) % 5 === keIdx2) {
    return { type: 'ke_control', ...RELATIONSHIP_DESCRIPTIONS.ke_control };
  }
  if ((keIdx2 + 1) % 5 === keIdx1) {
    return { type: 'ke_controlled', ...RELATIONSHIP_DESCRIPTIONS.ke_controlled };
  }

  return { type: 'same', ...RELATIONSHIP_DESCRIPTIONS.same };
}

export function getShengParent(element) {
  const idx = SHENG_ORDER.indexOf(element);
  return SHENG_ORDER[(idx - 1 + 5) % 5];
}

export function getShengChild(element) {
  const idx = SHENG_ORDER.indexOf(element);
  return SHENG_ORDER[(idx + 1) % 5];
}

export { SHENG_ORDER, RELATIONSHIP_DESCRIPTIONS };
