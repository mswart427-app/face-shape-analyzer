// Define the interface first
interface FaceShapeDetails {
  description: string;
  recommendations: string;
  characteristics: string[];
  bestStyles: string[];
  avoidStyles: string[];
  styleImages: {
    [key: string]: string;
  };
}

// Single declaration with type assertion
export const FACE_SHAPE_DESCRIPTIONS: Record<string, FaceShapeDetails> = {
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
    ],
    avoidStyles: [
      'Blunt cuts that emphasize jaw width',
      'Heavy straight bangs',
      'Chin-length bobs that align with jawline'
    ],
    styleImages: {
      softLayers: '/images/hairstyles/square/soft-layers.jpg',
      sideSweep: '/images/hairstyles/square/side-sweep.jpg',
      texturedLob: '/images/hairstyles/square/textured-lob.jpg'
    }
  },
  'Oval': {
    description: 'Balanced proportions with forehead slightly wider than jaw.',
    recommendations: 'Most versatile face shape - can wear virtually any hairstyle.',
    characteristics: [
      'Balanced proportions',
      'Slightly narrower chin than forehead',
      'Gently curved jawline',
      'Cheekbones at the widest point'
    ],
    bestStyles: [
      'Long waves or short pixie cuts',
      'Blunt bobs with face-framing pieces',
      'Updos and slicked-back looks',
      'Side or middle parts'
    ],
    avoidStyles: [
      'Heavy bangs that cover the face',
      'One-length styles that elongate the face',
      'Very short layers that add too much height'
    ],
    styleImages: {
      longWaves: '/images/hairstyles/oval/long-waves.jpg',
      pixieCut: '/images/hairstyles/oval/pixie-cut.jpg',
      bluntBob: '/images/hairstyles/oval/blunt-bob.jpg'
    }
  },
  'Round': {
    description: 'Soft angles with similar face width and length.',
    recommendations: 'Choose styles that lengthen the face and create definition.',
    characteristics: [
      'Full cheeks',
      'Rounded jawline',
      'Similar width and length',
      'Soft chin'
    ],
    bestStyles: [
      'Long bobs (lobs)',
      'Straight hair with long layers',
      'Side-swept bangs',
      'Textured crops or pompadours'
    ],
    avoidStyles: [
      'Short bob cuts that hit at cheek level',
      'Chin-length styles that add width',
      'Blunt bangs that create horizontal lines'
    ],
    styleImages: {
      longBob: '/images/hairstyles/round/long-bob.jpg',
      sideSweep: '/images/hairstyles/round/side-sweep.jpg',
      texturedCrop: '/images/hairstyles/round/textured-crop.jpg'
    }
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
    ],
    avoidStyles: [
      'Slicked back styles',
      'Heavy straight bangs',
      'Styles that add volume at cheekbones'
    ],
    styleImages: {
      sideSweep: 'https://placehold.co/400x400/png?text=Side+Swept+Bangs',
      chinLength: 'https://placehold.co/400x400/png?text=Chin+Length+Cut',
      wispyLayers: 'https://placehold.co/400x400/png?text=Wispy+Layers'
    }
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
    ],
    avoidStyles: [
      'Short blunt bangs',
      'Chin-length bobs',
      'Styles that add volume at the crown'
    ],
    styleImages: {
      chinBob: 'https://placehold.co/400x400/png?text=Chin+Length+Bob',
      sideSweep: 'https://placehold.co/400x400/png?text=Side+Swept+Bangs',
      layered: 'https://placehold.co/400x400/png?text=Face+Framing+Layers'
    }
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
    ],
    avoidStyles: [
      'Long straight styles',
      'High updos',
      'Styles that add height at crown'
    ],
    styleImages: {
      sideSweep: 'https://placehold.co/400x400/png?text=Side+Swept+Bangs',
      layered: 'https://placehold.co/400x400/png?text=Layered+Cut',
      wavy: 'https://placehold.co/400x400/png?text=Waves+and+Curls'
    }
  }
} as const;

export type FaceShape = keyof typeof FACE_SHAPE_DESCRIPTIONS;