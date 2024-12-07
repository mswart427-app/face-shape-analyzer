export const faceShapeDefinitions = {
    oval: {
      name: 'Oval',
      characteristics: 'Balanced proportions; slightly narrower chin than forehead',
      bestStyles: [
        'Long waves',
        'Short pixie cuts',
        'Blunt bobs with face-framing pieces',
        'Updos and slicked-back looks'
      ],
      avoidStyles: [
        'Heavy bangs',
        'One-length styles that elongate the face'
      ]
    },
    round: {
      name: 'Round',
      characteristics: 'Full cheeks; similar width and length',
      bestStyles: [
        'Long bobs',
        'Straight hair to create length',
        'Side-swept bangs and layers',
        'Textured crops or pompadours'
      ],
      avoidStyles: [
        'Short bob cuts that emphasize roundness'
      ]
    },
    heart: {
      name: 'Heart',
      characteristics: 'Wider forehead and cheekbones; narrower chin',
      bestStyles: [
        'Chin-length bobs or lob cuts',
        'Deep side parts with loose waves',
        'High ponytails or top knots'
      ],
      avoidStyles: [
        'Short bangs',
        'Middle parts that draw attention to the forehead'
      ]
    },
    square: {
      name: 'Square',
      characteristics: 'Strong jawline; forehead, cheekbones, and jawline are similar in width',
      bestStyles: [
        'Soft layers',
        'Side-swept bangs',
        'Long styles with layers below the chin',
        'Wavy shags or textured cuts'
      ],
      avoidStyles: [
        'Blunt cuts',
        'Heavy bangs that emphasize squareness'
      ]
    },
    oblong: {
      name: 'Oblong/Rectangle',
      characteristics: 'Longer than it is wide; angular features',
      bestStyles: [
        'Soft curls or waves that add width',
        'Bangs to shorten the appearance of length',
        'Shoulder-length cuts with layers'
      ],
      avoidStyles: [
        'Long, straight styles that elongate the face further'
      ]
    },
    diamond: {
      name: 'Diamond',
      characteristics: 'Narrow forehead and jawline with wider cheekbones',
      bestStyles: [
        'Side-swept bangs',
        'Chin-length or longer styles',
        'Wispy, layered cuts',
        'Styles that add width at the forehead'
      ],
      avoidStyles: [
        'Slicked-back styles',
        'Volume at the cheekbones'
      ]
    }
  };
  
  export type FaceShape = keyof typeof faceShapeDefinitions;