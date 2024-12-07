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
  const jawLeft = keypoints[FACE_POINTS.jawLeft]
  const jawRight = keypoints[FACE_POINTS.jawRight]
  const chin = keypoints[FACE_POINTS.chin]
  const forehead = keypoints[FACE_POINTS.foreheadTop]
  const cheekLeft = keypoints[FACE_POINTS.cheekLeft]
  const cheekRight = keypoints[FACE_POINTS.cheekRight]

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
    keypoints[FACE_POINTS.cheekLeft].y + keypoints[FACE_POINTS.cheekRight].y
  ) / 2
  return (cheekboneY - keypoints[FACE_POINTS.foreheadTop].y) / faceHeight
}

const calculateChinShape = (keypoints: Keypoint[]): number => {
  // Fallback to using jaw width if chin points aren't available
  try {
    const chinWidth = Math.abs(
      keypoints[FACE_POINTS.chinLeft]?.x - keypoints[FACE_POINTS.chinRight]?.x
    ) || Math.abs(keypoints[FACE_POINTS.chin].x - keypoints[FACE_POINTS.chin].x)
    const jawWidth = Math.abs(
      keypoints[FACE_POINTS.jawLeft].x - keypoints[FACE_POINTS.jawRight].x
    )
    return chinWidth / jawWidth
  } catch (error) {
    console.log('Error calculating chin shape, using default value')
    return 0.8 // Default value
  }
}

const calculateFaceThirds = (keypoints: Keypoint[]) => {
  const totalHeight = Math.abs(
    keypoints[FACE_POINTS.foreheadTop].y - keypoints[FACE_POINTS.chin].y
  )
  
  // Use eyes as fallback for eyebrows
  const upperThird = Math.abs(
    keypoints[FACE_POINTS.foreheadTop].y - 
    (keypoints[FACE_POINTS.eyebrowTop]?.y || keypoints[FACE_POINTS.leftEye].y)
  )
  const middleThird = Math.abs(
    (keypoints[FACE_POINTS.eyebrowTop]?.y || keypoints[FACE_POINTS.leftEye].y) - 
    keypoints[FACE_POINTS.noseTip].y
  )
  
  return {
    foreheadHeight: upperThird / totalHeight,
    midFaceRatio: middleThird / totalHeight
  }
}

const calculateJawlineDefinition = (keypoints: Keypoint[]): number => {
  const jawLeft = keypoints[FACE_POINTS.jawLeft]
  const jawRight = keypoints[FACE_POINTS.jawRight]
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
  const { heightToWidthRatio, foreheadToJawRatio, cheekToJawRatio, jawAngle } = measurements

  // Log the decision process
  console.log('Shape Determination Process:', {
    heightToWidthRatio,
    foreheadToJawRatio,
    cheekToJawRatio,
    jawAngle
  })

  // Adjusted thresholds and added more logging
  if (heightToWidthRatio > 1.6) {
    console.log('Detected as Oblong due to height/width ratio > 1.6')
    return 'Oblong'
  }

  if (foreheadToJawRatio > 1.15) {
    const shape = Math.abs(jawAngle) < 15 ? 'Heart' : 'Diamond'
    console.log(`Detected as ${shape} due to forehead/jaw ratio > 1.15`)
    return shape
  }

  if (heightToWidthRatio > 1.3) {
    const shape = cheekToJawRatio > 1.05 ? 'Oval' : 'Round'
    console.log(`Detected as ${shape} based on height/width and cheek/jaw ratios`)
    return shape
  }

  if (heightToWidthRatio < 1.2) {
    const shape = Math.abs(jawAngle) < 10 ? 'Square' : 'Rectangle'
    console.log(`Detected as ${shape} based on height/width ratio < 1.2`)
    return shape
  }

  console.log('Defaulting to Oval shape')
  return 'Oval'
}

const calculateJawAngle = (jawLeft: Keypoint, jawRight: Keypoint, chin: Keypoint) => {
  // Calculate angle between jaw line and vertical
  const dx = jawRight.x - jawLeft.x
  const dy = jawRight.y - jawLeft.y
  const jawAngle = Math.atan2(dy, dx) * (180 / Math.PI)
  return jawAngle
}