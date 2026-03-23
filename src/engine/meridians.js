const EXTRAORDINARY_MERIDIANS = [
  {
    name: 'Chong Mai',
    chinese: '衝脈',
    englishName: 'The Penetrating Vessel',
    essence: 'The primordial blueprint — carrying both the gifts and the unfinished business of every generation that preceded you.',
    domain: ['ancestral inheritance', 'cellular memory', 'self-acceptance', 'blueprint', 'core identity'],
    description: 'The Chong Mai is the first vessel to form at conception. Classical texts call it the Sea of Blood and the Sea of the Twelve Meridians — it is the source from which all other channels arise. At the psychospiritual level, it holds what has been passed down through the bloodline: not just genetic predispositions, but emotional patterns, relational wounds, gifts that were never fully lived, and the particular shape of your constitutional strength and vulnerability.',
    balanced: 'A settled sense of who you are beneath what you do. Comfort in your own body. The ability to receive love without deflection. A felt connection to those who came before you — neither burdened nor abandoned by the past.',
    blocked: 'A chronic discomfort in your own skin. Difficulty with self-acceptance that no amount of personal development seems to resolve. Patterns that repeat across relationships despite conscious effort. A sense of carrying something that doesn\'t feel entirely your own.',
    lifeQuestion: 'What have you inherited that is truly yours to carry — and what have you been carrying on behalf of someone else?',
  },
  {
    name: 'Ren Mai',
    chinese: '任脈',
    englishName: 'The Conception Vessel',
    essence: 'The vessel of bonding and nourishment — governing your capacity to receive care, feel safe, and sustain the long work of becoming.',
    domain: ['bonding', 'nourishment', 'safety', 'yin resources', 'the maternal field'],
    description: 'The Ren Mai runs along the midline of the front body, gathering the Qi of all the yin meridians. It is associated with the original bonding experience — the felt sense of being held, fed, and safe that is either established or disrupted in earliest life. As an adult, the Ren governs your relationship to nourishment in the broadest sense: whether you can receive what is offered, whether you can rest without guilt, whether you can sustain a long-term project without depletion.',
    balanced: 'The ability to rest and be replenished. A natural orientation toward care — both giving and receiving it. Projects and relationships sustained over time without burning out. A body that feels like a home.',
    blocked: 'Chronic depletion that does not resolve with rest. Difficulty receiving — care, compliments, support — without deflecting or minimizing. The sense of having to earn the right to exist. Patterns of exhausted self-sacrifice.',
    lifeQuestion: 'What would change if you believed, not as a concept but in your body, that you are allowed to receive?',
  },
  {
    name: 'Du Mai',
    chinese: '督脈',
    englishName: 'The Governing Vessel',
    essence: 'The vessel of yang authority — governing your capacity to stand upright, act independently, and meet life as a sovereign individual.',
    domain: ['independence', 'uprightness', 'yang authority', 'survival', 'self-determination'],
    description: 'The Du Mai runs along the midline of the back, ascending the spine and over the crown of the head. It is the governor of all yang energy in the body — the channel of the erect spine, the raised head, the capacity to stand and act in the world without collapsing, shrinking, or hiding. At its deepest level it is about the right to be here — the right to take up space, to have a perspective, to make choices, to risk being wrong.',
    balanced: 'An easy, undefended uprightness — both physical and psychological. The capacity to hold your own perspective without rigidity. Risk-taking that is grounded rather than reckless. The ability to act from your own authority without needing external permission.',
    blocked: 'Chronic back tension as a physical holding of what cannot be expressed. Difficulty with independence: either clinging to authority or compulsively defying it. Survival anxiety. The inability to act decisively when it matters most.',
    lifeQuestion: 'Where in your life are you waiting for permission that only you can give yourself?',
  },
  {
    name: 'Dai Mai',
    chinese: '帶脈',
    englishName: 'The Belt Vessel',
    essence: 'The vessel of integration and containment — gathering what has not yet been processed and holding it until the time comes to transform it.',
    domain: ['shadow', 'containment', 'integration', 'unprocessed experience', 'emotional residue'],
    description: 'The Dai Mai is the only horizontal vessel in the body — it encircles the waist like a belt, binding all the vertical meridians as they pass through it. It is the body\'s holding tank for what could not be processed at the time of its occurrence — the grief that had to wait, the anger that was too dangerous to express, the experiences that overwhelmed the system. It is not pathology — it is intelligence. The body holds what the psyche cannot yet hold alone.',
    balanced: 'A quality of flowing integration — experiences move through and become wisdom rather than accumulation. The waist and hips feel mobile and free. Decisions that were once impossible become clear. The past feels like history rather than an active weight.',
    blocked: 'A persistent heaviness or stiffness in the lower body. Difficulty making decisions, especially when they require significant change. A sense of being held in a pattern despite genuine desire to move forward. Feeling inexplicably weighed down.',
    lifeQuestion: 'What are you holding at the level of your body that your mind has not yet found words for?',
  },
  {
    name: 'Yin Wei Mai',
    chinese: '陰維脈',
    englishName: 'The Yin Linking Vessel',
    essence: 'The vessel of inner coherence — linking your relationship to your own past and future into a living sense of meaning.',
    domain: ['meaning', 'inner life', 'life narrative', 'purpose', 'self-relationship'],
    description: 'The Yin Wei Mai connects and links the yin meridians, governing the interior dimension of experience — the relationship you have with yourself across time. It is concerned with meaning: whether your life makes sense to you, whether you can find coherence between who you were, who you are now, and who you are becoming. Classical sources describe it as governing "the heart in pain" — the particular ache of a life not yet fully inhabited.',
    balanced: 'A felt sense that your life has a thread, even when circumstances are difficult. The ability to be moved by your own story without being destabilized by it. Clarity about what matters and the capacity to orient toward it. Self-compassion that is not self-indulgence.',
    blocked: 'A chronic sense of meaninglessness or disconnection from your own life. The feeling of watching yourself from outside. Depression that arrives not as sadness but as a grey flatness. Inability to draw on past experience as a resource.',
    lifeQuestion: 'What is the meaning you have been giving your life — and is it true?',
  },
  {
    name: 'Yang Wei Mai',
    chinese: '陽維脈',
    englishName: 'The Yang Linking Vessel',
    essence: 'The vessel of outer evolution — linking your engagement with the world across time and governing the release of patterns that no longer serve your becoming.',
    domain: ['pattern release', 'outer engagement', 'transition', 'aging', 'adaptive evolution'],
    description: 'Where the Yin Wei governs your interior relationship with time, the Yang Wei governs the exterior — how you engage with the world as you move through life\'s phases. Its particular function is the release of outdated patterns: the roles you have outgrown, the defenses that were once necessary but are now walls, the habits that belong to an earlier version of yourself. It governs the capacity to evolve — not by destroying what came before, but by allowing it to change.',
    balanced: 'Ease with the transitions inherent in aging — not denial, but a genuine capacity to let each phase be what it is. The ability to update your self-concept as life changes. A relationship to habit that is awake: using patterns consciously rather than being used by them.',
    blocked: 'Rigidity in identity — holding on to who you were as protection against who you are becoming. Difficulty with the transitions between life phases. A quality of still fighting a battle that ended years ago. Defenses that have become automatic, invisible, and exhausting.',
    lifeQuestion: 'What version of yourself are you still defending that has already been ready to change?',
  },
  {
    name: 'Yin Qiao Mai',
    chinese: '陰蹻脈',
    englishName: 'The Yin Heel Vessel',
    essence: 'The vessel of inner standing — governing your capacity to trust yourself, to receive the world through quiet, and to inhabit your life from the inside.',
    domain: ['self-trust', 'receptivity', 'inner orientation', 'quiet', 'worthiness'],
    description: 'The Yin Qiao Mai originates at the inner heel and ascends through the inner body, governing the yin aspect of movement and stance — not how you step forward into the world, but how you stand within yourself. At a psychospiritual level it relates to the ground of self-trust: whether you believe you are worthy of being here, whether you can receive what life offers, whether you have access to your own inner knowing.',
    balanced: 'A quiet, undefended sense of your own worth — not contingent on achievement or approval. The ability to receive: care, beauty, rest, love. An inner compass that you trust. Eyes that see clearly both inward and outward.',
    blocked: 'A persistent undercurrent of feeling unworthy, insufficient, or fundamentally flawed. The need for constant external validation. Depression expressed as withdrawal or collapse. Difficulty with stillness — the feeling that resting is not safe.',
    lifeQuestion: 'What would you allow yourself to receive if you truly believed you deserved it?',
  },
  {
    name: 'Yang Qiao Mai',
    chinese: '陽蹻脈',
    englishName: 'The Yang Heel Vessel',
    essence: 'The vessel of outer standing — governing your capacity to assert yourself, move into the world with authority, and express who you genuinely are.',
    domain: ['self-assertion', 'outer movement', 'visibility', 'engagement', 'yang expression'],
    description: 'Where the Yin Qiao governs how you stand within yourself, the Yang Qiao governs how you stand in the world — the yang dimension of posture, movement, and expression. It is the vessel of visibility: of taking up space, of stepping forward, of allowing the world to see you as you actually are rather than as you believe you should be.',
    balanced: 'The ability to step forward and be visible without either aggression or apology. A yang energy that can engage the world and then genuinely rest. Confidence that does not require an audience.',
    blocked: 'Chronic overwhelm — the feeling of being at the mercy of external demands. Insomnia rooted in an inability to shift from engagement to rest. Driven, effortful activity that cannot modulate. Alternatively: excessive withdrawal, the performance of smallness.',
    lifeQuestion: 'Where in your life are you making yourself smaller than you actually are — and what would it cost to stop?',
  },
];

export function getMeridian(index) {
  return EXTRAORDINARY_MERIDIANS[index];
}

export function getAllMeridians() {
  return EXTRAORDINARY_MERIDIANS;
}

export { EXTRAORDINARY_MERIDIANS };
