import { Keypoint } from '@tensorflow-models/face-landmarks-detection'
import { FACE_POINTS } from './faceDetection'

export const calculateFaceShape = (keypoints: Keypoint[]) => {
  const measurements = getFaceMeasurements(keypoints)
  console.log('Face Measurements:', {
    heightToWidthRatio: measurements.heightToWidthRatio.toFixed(2),
    foreheadToJawRatio: measurements.foreheadToJawRatio.toFixed(2),
    cheekToJawRatio: measurements.cheekToJawRatio.toFixed(2),
    jawAngle: measurements.jawAngle.toFixed(2)
  })
  return determineFaceShape(measurements)
}

interface FaceMeasurements {
  heightToWidthRatio: number
  foreheadToJawRatio: number
  cheekToJawRatio: number
  jawAngle: number
}

const getFaceMeasurements = (keypoints: Keypoint[]): FaceMeasurements => {
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

const determineFaceShape = (measurements: FaceMeasurements): string => {
  const { heightToWidthRatio, foreheadToJawRatio, cheekToJawRatio, jawAngle } = measurements

  // Adjusted thresholds based on typical face proportions
  if (heightToWidthRatio > 1.6) {
    return 'Oblong'
  }

  if (foreheadToJawRatio > 1.15) {
    return Math.abs(jawAngle) < 15 ? 'Heart' : 'Diamond'
  }

  if (heightToWidthRatio > 1.3) {
    return cheekToJawRatio > 1.05 ? 'Oval' : 'Round'
  }

  // Square vs Rectangle determination
  if (heightToWidthRatio < 1.2) {
    return Math.abs(jawAngle) < 10 ? 'Square' : 'Rectangle'
  }

  return 'Oval' // Default to oval if no clear match
}

const calculateJawAngle = (jawLeft: Keypoint, jawRight: Keypoint, chin: Keypoint) => {
  // Calculate angle between jaw line and vertical
  const dx = jawRight.x - jawLeft.x
  const dy = jawRight.y - jawLeft.y
  const jawAngle = Math.atan2(dy, dx) * (180 / Math.PI)
  return jawAngle
}