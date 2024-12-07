export const FACE_SHAPE_DESCRIPTIONS = {
  'Square': {
    description: 'Angular jaw and equally wide forehead. Face length and width are similar.',
    recommendations: 'Suits soft, layered hairstyles to soften angular features.',
    characteristics: [
      'Strong jawline',
      'Similar width at forehead and jaw',
      'Angular features'
    ],
    bestStyles: [
      'Soft layers',
      'Side-swept bangs',
      'Textured cuts'
    ]
  },
  'Oval': {
    description: 'Balanced proportions with forehead slightly wider than jaw.',
    recommendations: 'Most hairstyles work well with this versatile shape.',
    characteristics: [
      'Balanced proportions',
      'Gently curved jawline',
      'Slightly wider forehead'
    ],
    bestStyles: [
      'Most styles suit this shape',
      'Long layers',
      'Side or middle parts'
    ]
  },
  'Round': {
    description: 'Soft angles with similar face width and length.',
    recommendations: 'Styles that add length and definition to face structure.',
    characteristics: [
      'Soft jawline',
      'Full cheeks',
      'Similar width and length'
    ],
    bestStyles: [
      'Long layers',
      'Side-swept bangs',
      'Volume at crown'
    ]
  },
  'Diamond': {
    description: 'Narrow forehead and jawline with wider cheekbones.',
    recommendations: 'Styles that add width at forehead and jawline.',
    characteristics: [
      'Wide cheekbones',
      'Narrow forehead',
      'Pointed chin'
    ],
    bestStyles: [
      'Side-swept bangs',
      'Chin-length cuts',
      'Wispy layers'
    ]
  },
  'Heart': {
    description: 'Wider forehead tapering to a narrower chin.',
    recommendations: 'Styles that add width at the jaw area.',
    characteristics: [
      'Wide forehead',
      'High cheekbones',
      'Narrow chin'
    ],
    bestStyles: [
      'Chin-length bobs',
      'Side-swept bangs',
      'Face-framing layers'
    ]
  },
  'Oblong': {
    description: 'Face length is notably longer than width.',
    recommendations: 'Styles that add width and reduce length.',
    characteristics: [
      'Long face shape',
      'Narrow sides',
      'Similar width throughout'
    ],
    bestStyles: [
      'Side-swept bangs',
      'Layered cuts',
      'Waves and curls'
    ]
  }
}

export type FaceShape = keyof typeof FACE_SHAPE_DESCRIPTIONS