const MONTHLY_PHASES = [
  {
    name: 'Winter',
    period: 'Menstruation',
    moonPhase: 'New Moon',
    description: 'The body withdraws and releases. Rest is not a luxury but a biological need. Energy turns inward — honor this stillness.',
    element: 'water',
    guidance: 'Rest, warmth, gentle nourishment. Avoid overexertion.',
  },
  {
    name: 'Spring',
    period: 'Follicular phase',
    moonPhase: 'Waxing Moon',
    description: 'Energy returns like the first green shoots. Clarity rises, creativity stirs. The body rebuilds what was released.',
    element: 'wood',
    guidance: 'Begin new projects, move your body, eat fresh and light.',
  },
  {
    name: 'Summer',
    period: 'Ovulation',
    moonPhase: 'Full Moon',
    description: 'The body reaches its peak. Connection, warmth, and radiance flow naturally. Shen is strongest — you feel most present and alive.',
    element: 'fire',
    guidance: 'Connect with others, express yourself, be visible.',
  },
  {
    name: 'Late Summer',
    period: 'Early luteal phase',
    moonPhase: 'Waning Moon (early)',
    description: 'A brief pause as the body gathers and digests. The shift from outward to inward begins — subtly at first.',
    element: 'earth',
    guidance: 'Nourish yourself, organize, attend to what needs care.',
  },
  {
    name: 'Autumn',
    period: 'Late luteal phase',
    moonPhase: 'Waning Moon (late)',
    description: 'The body prepares to let go. Emotions may intensify — this is not dysfunction but the body\'s way of clearing what is ready to be released.',
    element: 'metal',
    guidance: 'Simplify, slow down, let go of what no longer serves.',
  },
];

export function getMonthlyCycleNote() {
  return 'For post-menopausal or non-menstruating women: follow the moon cycle instead. New moon corresponds to winter/menstruation, waxing moon to spring, full moon to summer, and waning moon to autumn.';
}

export { MONTHLY_PHASES };
