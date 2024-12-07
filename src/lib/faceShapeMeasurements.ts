import { Keypoint } from '@tensorflow-models/face-landmarks-detection'
import { FACE_POINTS } from './faceDetection'

export const calculateFaceShape = (keypoints: Keypoint[]) => {
  const measurements = getFaceMeasurements(keypoints)
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

  const faceWidth = Math.abs(jawRight.x - jawLeft.x)
  const faceHeight = Math.abs(forehead.y - chin.y)
  const jawWidth = Math.abs(jawRight.x - jawLeft.x)
  const cheekWidth = Math.abs(cheekRight.x - cheekLeft.x)
  const foreheadWidth = faceWidth * 0.8 // Approximate forehead width

  return {
    heightToWidthRatio: faceHeight / faceWidth,
    foreheadToJawRatio: foreheadWidth / jawWidth,
    cheekToJawRatio: cheekWidth / jawWidth,
    jawAngle: calculateJawAngle(jawLeft, jawRight, chin)
  }
}

const calculateJawAngle = (jawLeft: Keypoint, jawRight: Keypoint, chin: Keypoint) => {
  const dx = jawRight.x - jawLeft.x
  const dy = jawRight.y - jawLeft.y
  return Math.atan2(dy, dx) * (180 / Math.PI)
}

const determineFaceShape = (measurements: FaceMeasurements): string => {
  const { heightToWidthRatio, foreheadToJawRatio, cheekToJawRatio } = measurements

  if (heightToWidthRatio > 1.75) return 'Oblong'
  if (heightToWidthRatio > 1.5) {
    return foreheadToJawRatio > 1.1 ? 'Heart' : 'Oval'
  }
  if (heightToWidthRatio > 1.25) {
    return cheekToJawRatio > 1.1 ? 'Diamond' : 'Round'
  }
  return cheekToJawRatio < 1.1 ? 'Square' : 'Rectangle'
}