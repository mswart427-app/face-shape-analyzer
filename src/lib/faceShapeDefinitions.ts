// Define the interface first
interface StyleImage {
  imageUrl: string;      // URL to the product image
  productUrl: string;    // URL to purchase the product
  productName: string;   // Name of the product/style
  description: string;   // Brief description
  price?: string;        // Optional price
}

interface FaceShapeDetails {
  description: string;
  recommendations: string;
  characteristics: string[];
  bestStyles: string[];
  avoidStyles: string[];
  styleImages: {
    [key: string]: StyleImage;
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
      softLayers: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/Alive_03_1024x1024_d9aba1e6-138c-45ca-9c71-849818c78498.webp?v=1683418305',
        productUrl: 'https://myhairmail.com/collections/ellen-wille-wigs/products/alive-changes-collection-synthetic-wig',
        productName: 'Alive by Ellen Wille',
        description: 'Soft, all-over layers with subtle flip at ends',
        price: '$344.25'
      },
      texturedLayers: {
        imageUrl: 'https://placehold.co/400x400/png?text=Textured+Layers',
        productUrl: '#',
        productName: 'Textured Layers Style',
        description: 'Medium length with textured layers',
        price: 'Coming Soon'
      },
      sideSweepLayers: {
        imageUrl: 'https://placehold.co/400x400/png?text=Side+Sweep+Layers',
        productUrl: '#',
        productName: 'Side-Swept Layers',
        description: 'Long layers with side-swept styling',
        price: 'Coming Soon'
      }
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
      longWaves: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/rosie_6-33_alt1__61286.jpg?v=1726521809',
        productUrl: 'https://myhairmail.com/collections/jon-renau-wigs/products/rosie-by-jon-renau',
        productName: 'Rosie by Jon Renau',
        description: 'Classic long waves with natural movement',
        price: '$359.00'
      },
      pixieCut: {
        imageUrl: 'https://placehold.co/400x400/png?text=Pixie+Cut',
        productUrl: '/products/pixie-cut',
        productName: 'Pixie Cut',
        description: 'Short pixie cut hairstyle for an oval face shape',
        price: '$20'
      },
      bluntBob: {
        imageUrl: 'https://placehold.co/400x400/png?text=Blunt+Bob',
        productUrl: '/products/blunt-bob',
        productName: 'Blunt Bob',
        description: 'Blunt bob hairstyle for an oval face shape',
        price: '$18'
      }
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
      longBob: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/RW-Take-A-Bow-Model-1-Front-2-scaled-625x782_360x.jpg?v=1714511953',
        productUrl: 'https://myhairmail.com/collections/raquel-welch-wigs/products/take-a-bow-by-raquel-welch',
        productName: 'Take A Bow by Raquel Welch',
        description: 'Sleek, face-lengthening style with subtle layers',
        price: '$379.00'
      },
      sideSweep: {
        imageUrl: 'https://placehold.co/400x400/png?text=Side+Swept+Bangs',
        productUrl: '/products/side-sweep',
        productName: 'Side-Swept Bangs',
        description: 'Side-swept bangs for a round face shape',
        price: '$15'
      },
      texturedCrop: {
        imageUrl: 'https://placehold.co/400x400/png?text=Textured+Crop',
        productUrl: '/products/textured-crop',
        productName: 'Textured Crop',
        description: 'Textured crop hairstyle for a round face shape',
        price: '$18'
      }
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
      sideSweep: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/RW-Love-Always-Raquel-Model-4-Front-1-slide_360x.jpg?v=1731363408',
        productUrl: 'https://myhairmail.com/collections/raquel-welch-wigs/products/love-always-by-raquel-welch',
        productName: 'Love Always by Raquel Welch',
        description: 'Side-swept style with face-framing layers',
        price: '$399.00'
      },
      chinLength: {
        imageUrl: 'https://placehold.co/400x400/png?text=Chin+Length+Cut',
        productUrl: '/products/chin-length-cut',
        productName: 'Chin-Length Cut',
        description: 'Chin-length cut hairstyle for a diamond face shape',
        price: '$18'
      },
      wispyLayers: {
        imageUrl: 'https://placehold.co/400x400/png?text=Wispy+Layers',
        productUrl: '/products/wispy-layers',
        productName: 'Wispy Layers',
        description: 'Wispy layers hairstyle for a diamond face shape',
        price: '$20'
      }
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
      chinBob: {
        imageUrl: 'https://placehold.co/400x400/png?text=Chin+Length+Bob',
        productUrl: '/products/chin-length-bob',
        productName: 'Chin-Length Bob',
        description: 'Chin-length bob hairstyle for a heart face shape',
        price: '$18'
      },
      sideSweep: {
        imageUrl: 'https://placehold.co/400x400/png?text=Side+Swept+Bangs',
        productUrl: '/products/side-swept-bangs',
        productName: 'Side-Swept Bangs',
        description: 'Side-swept bangs for a heart face shape',
        price: '$15'
      },
      layered: {
        imageUrl: 'https://placehold.co/400x400/png?text=Face+Framing+Layers',
        productUrl: '/products/face-framing-layers',
        productName: 'Face-Framing Layers',
        description: 'Face-framing layers hairstyle for a heart face shape',
        price: '$20'
      },
      beachWaves: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/California_Beach_Waves_360x.jpg?v=1723763637',
        productUrl: 'https://myhairmail.com/collections/tressallure-wigs/products/california-beach-waves-by-tressallure-mono-top-look-fabulous-realistic',
        productName: 'California Beach Waves by Tressallure',
        description: 'Textured waves with face-framing pieces',
        price: '$299.00'
      }
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
      sideSweep: {
        imageUrl: 'https://placehold.co/400x400/png?text=Side+Swept+Bangs',
        productUrl: '/products/side-swept-bangs',
        productName: 'Side-Swept Bangs',
        description: 'Side-swept bangs for an oblong face shape',
        price: '$15'
      },
      layered: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/Seville_crushedalmondblonde-R1_360x.jpg?v=1728750264',
        productUrl: 'https://myhairmail.com/collections/belle-tress-wigs/products/seville-by-belle-tress-city-collection',
        productName: 'Seville by Belle Tress',
        description: 'Layered cut with width-adding volume',
        price: '$329.00'
      },
      wavy: {
        imageUrl: 'https://placehold.co/400x400/png?text=Waves+and+Curls',
        productUrl: '/products/waves-and-curls',
        productName: 'Waves and Curls',
        description: 'Waves and curls hairstyle for an oblong face shape',
        price: '$20'
      }
    }
  }
} as const;

export type FaceShape = keyof typeof FACE_SHAPE_DESCRIPTIONS;