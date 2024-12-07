import { Keypoint } from '@tensorflow-models/face-landmarks-detection'
import { FACE_POINTS } from './faceDetection'

export const calculateFaceShape = (keypoints: Keypoint[]) => {
  const measurements = getFaceMeasurements(keypoints)
  
  // Add detailed logging
  console.log('Face Measurements:', {
    heightToWidthRatio: measurements.heightToWidthRatio.toFixed(2),
    foreheadToJawRatio: measurements.foreheadToJawRatio.toFixed(2),
    cheekToJawRatio: measurements.cheekToJawRatio.toFixed(2),
    jawAngle: measurements.jawAngle.toFixed(2),
    cheekbonePosition: measurements.cheekbonePosition.toFixed(2),
    chinShape: measurements.chinShape.toFixed(2)
  })

  const shape = determineFaceShape(measurements)
  console.log('Determined Shape:', shape)
  return shape
}

interface FaceMeasurements {
  heightToWidthRatio: number
  foreheadToJawRatio: number
  cheekToJawRatio: number
  jawAngle: number
  cheekbonePosition: number
  chinShape: number
  foreheadHeight: number
  midFaceRatio: number
  jawlineDefinition: number
}

const getFaceMeasurements = (keypoints: Keypoint[]): FaceMeasurements => {
  const basicMeasurements = getBasicMeasurements(keypoints)
  const cheekbonePosition = calculateCheekbonePosition(keypoints)
  const chinShape = calculateChinShape(keypoints)
  const { foreheadHeight, midFaceRatio } = calculateFaceThirds(keypoints)
  const jawlineDefinition = calculateJawlineDefinition(keypoints)

  return {
    ...basicMeasurements,
    cheekbonePosition,
    chinShape,
    foreheadHeight,
    midFaceRatio,
    jawlineDefinition
  }
}

const getBasicMeasurements = (keypoints: Keypoint[]) => {
  const jawLeft = keypoints[FACE_POINTS.jawUpperLeft]
  const jawRight = keypoints[FACE_POINTS.jawUpperRight]
  const chin = keypoints[FACE_POINTS.chin]
  const forehead = keypoints[FACE_POINTS.foreheadTop]
  const cheekLeft = keypoints[FACE_POINTS.cheekboneLeft]
  const cheekRight = keypoints[FACE_POINTS.cheekboneRight]

  // Log raw coordinates for debugging
  console.log('Raw Keypoints:', {
    jawLeft: { x: jawLeft.x.toFixed(2), y: jawLeft.y.toFixed(2) },
    jawRight: { x: jawRight.x.toFixed(2), y: jawRight.y.toFixed(2) },
    chin: { x: chin.x.toFixed(2), y: chin.y.toFixed(2) },
    forehead: { x: forehead.x.toFixed(2), y: forehead.y.toFixed(2) },
    cheekLeft: { x: cheekLeft.x.toFixed(2), y: cheekLeft.y.toFixed(2) },
    cheekRight: { x: cheekRight.x.toFixed(2), y: cheekRight.y.toFixed(2) }
  })

  const faceWidth = Math.abs(jawRight.x - jawLeft.x)
  const faceHeight = Math.abs(forehead.y - chin.y)
  const jawWidth = Math.abs(jawRight.x - jawLeft.x)
  const cheekWidth = Math.abs(cheekRight.x - cheekLeft.x)
  const foreheadWidth = Math.abs(
    keypoints[FACE_POINTS.foreheadLeft].x - keypoints[FACE_POINTS.foreheadRight].x
  )

  return {
    heightToWidthRatio: faceHeight / faceWidth,
    foreheadToJawRatio: foreheadWidth / jawWidth,
    cheekToJawRatio: cheekWidth / jawWidth,
    jawAngle: calculateJawAngle(jawLeft, jawRight, chin)
  }
}

const calculateCheekbonePosition = (keypoints: Keypoint[]): number => {
  const faceHeight = Math.abs(
    keypoints[FACE_POINTS.foreheadTop].y - keypoints[FACE_POINTS.chin].y
  )
  const cheekboneY = (
    keypoints[FACE_POINTS.cheekboneLeft].y + keypoints[FACE_POINTS.cheekboneRight].y
  ) / 2
  return (cheekboneY - keypoints[FACE_POINTS.foreheadTop].y) / faceHeight
}

const calculateChinShape = (keypoints: Keypoint[]): number => {
  try {
    const chinWidth = Math.abs(
      keypoints[FACE_POINTS.jawChinLeft]?.x - keypoints[FACE_POINTS.jawChinRight]?.x
    ) || Math.abs(keypoints[FACE_POINTS.chin].x - keypoints[FACE_POINTS.chin].x)
    const jawWidth = Math.abs(
      keypoints[FACE_POINTS.jawUpperLeft].x - keypoints[FACE_POINTS.jawUpperRight].x
    )
    return chinWidth / jawWidth
  } catch (error) {
    console.log('Error calculating chin shape, using default value')
    return 0.8
  }
}

const calculateFaceThirds = (keypoints: Keypoint[]) => {
  const totalHeight = Math.abs(
    keypoints[FACE_POINTS.foreheadTop].y - keypoints[FACE_POINTS.chin].y
  )
  
  // Use eyes instead of eyebrows for more reliable measurement
  const upperThird = Math.abs(
    keypoints[FACE_POINTS.foreheadTop].y - 
    keypoints[FACE_POINTS.leftEye].y
  )
  const middleThird = Math.abs(
    keypoints[FACE_POINTS.leftEye].y - 
    keypoints[FACE_POINTS.noseTip].y
  )
  
  return {
    foreheadHeight: upperThird / totalHeight,
    midFaceRatio: middleThird / totalHeight
  }
}

const calculateJawlineDefinition = (keypoints: Keypoint[]): number => {
  const jawLeft = keypoints[FACE_POINTS.jawUpperLeft]
  const jawRight = keypoints[FACE_POINTS.jawUpperRight]
  const chin = keypoints[FACE_POINTS.chin]
  
  // Calculate angles at jaw corners
  const leftAngle = calculateAngle(jawLeft, chin, {
    x: jawLeft.x,
    y: chin.y
  })
  const rightAngle = calculateAngle(jawRight, chin, {
    x: jawRight.x,
    y: chin.y
  })
  
  // Average of both angles, normalized to 0-1
  return (leftAngle + rightAngle) / 180
}

const calculateAngle = (p1: Keypoint, p2: Keypoint, p3: Keypoint): number => {
  const angle = Math.abs(
    Math.atan2(p3.y - p2.y, p3.x - p2.x) -
    Math.atan2(p1.y - p2.y, p1.x - p2.x)
  ) * (180 / Math.PI)
  return angle
}

const determineFaceShape = (measurements: FaceMeasurements): string => {
  const {
    heightToWidthRatio,
    foreheadToJawRatio,
    cheekToJawRatio,
    jawAngle,
    cheekbonePosition,
    chinShape
  } = measurements

  // Log all measurements for debugging
  console.log('Shape Determination Measurements:', {
    heightToWidthRatio: heightToWidthRatio.toFixed(2),
    foreheadToJawRatio: foreheadToJawRatio.toFixed(2),
    cheekToJawRatio: cheekToJawRatio.toFixed(2),
    jawAngle: jawAngle.toFixed(2),
    cheekbonePosition: cheekbonePosition.toFixed(2),
    chinShape: chinShape.toFixed(2)
  })

  // Diamond Shape: Wide cheekbones with narrow chin
  if ((cheekToJawRatio > 1.05 && chinShape < 0.85 && heightToWidthRatio > 1.2) || 
      (cheekToJawRatio > 1.1 && foreheadToJawRatio < 1.1) ||
      (cheekToJawRatio > 1.08 && chinShape < 0.8)) {
    console.log('Detected as Diamond: prominent cheekbones with narrow chin')
    return 'Diamond'
  }

  // Heart Shape: Much wider forehead and very pointy chin
  if (foreheadToJawRatio > 1.15 && chinShape < 0.75) {
    console.log('Detected as Heart: much wider forehead and very pointy chin')
    return 'Heart'
  }

  // Oval: Balanced proportions (made less restrictive)
  if (heightToWidthRatio > 1.3 && heightToWidthRatio < 1.5 && 
      cheekToJawRatio > 1.0 && chinShape >= 0.8) {
    console.log('Detected as Oval: balanced proportions')
    return 'Oval'
  }

  // Rest of the shapes remain the same...
  if (heightToWidthRatio > 1.6) {
    console.log('Detected as Oblong: very long face')
    return 'Oblong'
  }

  if (heightToWidthRatio < 1.2 && Math.abs(jawAngle) < 10) {
    console.log('Detected as Square: similar width/height, angular jaw')
    return 'Square'
  }

  if (heightToWidthRatio < 1.2 && cheekToJawRatio > 1.1) {
    console.log('Detected as Round: similar width/height, soft jaw')
    return 'Round'
  }

  // Adjusted scoring weights
  const scores = {
    Heart: (foreheadToJawRatio * 1.2) + (1.5 / chinShape), // Reduced weights
    Diamond: (cheekToJawRatio * 2) + (1 / foreheadToJawRatio) + (1 / chinShape),
    Oval: (1 / Math.abs(heightToWidthRatio - 1.4)) + cheekToJawRatio + 0.5, // Added bonus for Oval
    Round: (1 / heightToWidthRatio) + cheekToJawRatio,
    Square: (1 / Math.abs(heightToWidthRatio - 1)) + (1 / Math.abs(jawAngle)),
    Oblong: heightToWidthRatio
  }

  const shape = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)[0][0]

  console.log('Shape scores:', scores)
  console.log('Determined shape:', shape)
  return shape
}

const calculateJawAngle = (jawLeft: Keypoint, jawRight: Keypoint, chin: Keypoint) => {
  // Calculate angle between jaw line and vertical
  const dx = jawRight.x - jawLeft.x
  const dy = jawRight.y - jawLeft.y
  const jawAngle = Math.atan2(dy, dx) * (180 / Math.PI)
  return jawAngle
}