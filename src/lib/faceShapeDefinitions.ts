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
        productUrl: 'https://myhairmail.com/collections/wavy-wigs/products/alive-changes-collection-synthetic-wig',
        productName: 'Alive by Ellen Wille',
        description: 'Soft, all-over layers with subtle flip at ends',
        price: '$344.25'
      },
      texturedLayers: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/Celeste_FS24_102S12_HD_Main.png?v=1728756848',
        productUrl: 'https://myhairmail.com/collections/jon-renau-wigs/products/celeste-by-jon-renau',
        productName: 'Celeste by Jon Renau',
        description: 'Textured layers for natural movement',
        price: '$359.00'
      },
      sideSweepLayers: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/SELFIEMODEnew.jpg?v=1709248241',
        productUrl: 'https://myhairmail.com/collections/raquel-welch-wigs/products/selfie-mode-by-raquel-welch',
        productName: 'Selfie Mode by Raquel Welch',
        description: 'Side-swept style with soft layers',
        price: '$379.00'
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
      wavyStyle: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/alexis-12fs8-side__41100.jpg?v=1700050965',
        productUrl: 'https://myhairmail.com/collections/wavy-wigs/products/alexis-by-jon-renau',
        productName: 'Alexis by Jon Renau',
        description: 'Wavy style with face-framing layers',
        price: '$349.00'
      },
      bobStyle: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/FrontUndercut_6131001R18_0127-Edit.jpg?v=1690638011',
        productUrl: 'https://myhairmail.com/products/undercut-bob-by-tressallure',
        productName: 'Undercut Bob by Tressallure',
        description: 'Modern bob with undercut styling',
        price: '$299.00'
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
        imageUrl: 'https://myhairmail.com/cdn/shop/files/Holland_A4.jpg?v=1682733012',
        productUrl: 'https://myhairmail.com/products/holland-monofilament-top-by-estetica-designs',
        productName: 'Holland by Estetica Designs',
        description: 'Elegant side-swept style with movement',
        price: '$289.00'
      },
      texturedCrop: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/Delight_01.webp?v=1690847189',
        productUrl: 'https://myhairmail.com/collections/short-wigs/products/delight-by-ellen-wille-changes-collection',
        productName: 'Delight by Ellen Wille',
        description: 'Short textured crop with modern styling',
        price: '$344.25'
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
        imageUrl: 'https://myhairmail.com/cdn/shop/products/EllenWilletemp_1b684c9c-6cc0-48e4-8afb-b8581e620479.png?v=1683252949',
        productUrl: 'https://myhairmail.com/products/girl-mono-hair-power-synthetic-wig',
        productName: 'Girl Mono by Ellen Wille',
        description: 'Chin-length cut with natural movement',
        price: '$344.25'
      },
      wispyLayers: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/RW-Scene-Stealer-Model-Front5.jpg?v=1688346972',
        productUrl: 'https://myhairmail.com/products/scene-stealer-by-raquel-welch',
        productName: 'Scene Stealer by Raquel Welch',
        description: 'Wispy layered cut with volume',
        price: '$379.00'
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
        imageUrl: 'https://myhairmail.com/cdn/shop/files/Ignite-22F16S8-Venice-Blonde-Main__47625.jpg?v=1690035810',
        productUrl: 'https://myhairmail.com/products/ignite-by-jon-renau?_pos=1&_psq=ignite&_ss=e&_v=1.0',
        productName: 'Ignite by Jon Renau',
        description: 'Side-swept style with soft layers',
        price: '$359.00'
      },
      layered: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/2362_Cameron_Creamy-Toffee-scaled.jpg?v=1685291079',
        productUrl: 'https://myhairmail.com/products/cameron-by-rene-of-paris',
        productName: 'Cameron by Rene of Paris',
        description: 'Face-framing layers with movement',
        price: '$279.00'
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
      layered: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/Seville_crushedalmondblonde-R1_360x.jpg?v=1728750264',
        productUrl: 'https://myhairmail.com/collections/belle-tress-wigs/products/seville-by-belle-tress-city-collection',
        productName: 'Seville by Belle Tress',
        description: 'Layered cut with width-adding volume',
        price: '$329.00'
      },
      sideSweep: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/Heidi_S4-28_32RO_Sunrise_Main__50602.webp?v=1690075520',
        productUrl: 'https://myhairmail.com/products/heidi-by-jon-renau',
        productName: 'Heidi by Jon Renau',
        description: 'Side-swept bangs with soft layers',
        price: '$359.00'
      },
      wavy: {
        imageUrl: 'https://myhairmail.com/cdn/shop/files/RW-Editors-Pick-Elite-Model-Front0.jpg?v=1723895258',
        productUrl: 'https://myhairmail.com/products/editors-pick-elite-by-raquel-welch?_pos=3&_psq=editors&_ss=e&_v=1.0',
        productName: 'Editors Pick Elite by Raquel Welch',
        description: 'Wavy style with natural volume',
        price: '$379.00'
      }
    }
  }
} as const;

export type FaceShape = keyof typeof FACE_SHAPE_DESCRIPTIONS;