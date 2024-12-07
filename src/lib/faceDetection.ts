import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { Keypoint } from '@tensorflow-models/face-landmarks-detection'

let model: faceLandmarksDetection.FaceLandmarksDetector | null = null;

export async function initializeDetector() {
  console.log('Initializing face detector...');
  if (!model) {
    try {
      await tf.ready();
      console.log('TensorFlow.js is ready');
      model = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'tfjs',
          refineLandmarks: true,
          maxFaces: 1
        }
      );
      console.log('Face detector model loaded');
    } catch (error) {
      console.error('Error initializing detector:', error);
      throw error;
    }
  }
  return model;
}

export async function detectFaceLandmarks(imageElement: HTMLImageElement) {
  console.log('Starting face detection...'); // Debug log
  try {
    const detector = await initializeDetector();
    console.log('Detector ready, analyzing image...'); // Debug log
    const predictions = await detector.estimateFaces(imageElement);
    console.log('Detection results:', predictions); // Debug log
    return predictions[0]; // Return the first face detected
  } catch (error) {
    console.error('Error detecting face landmarks:', error);
    return null;
  }
}

export const FACE_POINTS = {
  // Forehead points (8 points across)
  foreheadLeft: 21,
  foreheadLeftMid1: 68,
  foreheadLeftMid2: 69,
  foreheadMidLeft: 70,
  foreheadTop: 10,
  foreheadMidRight: 300,
  foreheadRightMid1: 301,
  foreheadRightMid2: 302,
  foreheadRight: 251,

  // Jawline points (12 points)
  jawUpperLeft: 234,
  jawLeft1: 132,
  jawLeft2: 172,
  jawLeft3: 147,
  jawChinLeft: 148,
  chin: 152,
  jawChinRight: 378,
  jawRight3: 377,
  jawRight2: 397,
  jawRight1: 361,
  jawUpperRight: 454,

  // Cheek points
  cheekboneLeft: 123,
  cheekboneMidLeft: 124,
  cheekboneMidRight: 354,
  cheekboneRight: 352,

  // Additional reference points
  leftEye: 33,
  rightEye: 263,
  noseTip: 1,
  leftTemple: 247,
  rightTemple: 467,
}

export const drawFaceLandmarks = (
  ctx: CanvasRenderingContext2D,
  keypoints: Keypoint[],
  color = 'rgba(0, 255, 0, 0.6)'
) => {
  ctx.strokeStyle = color
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.lineWidth = 1

  // Collect all points for mapping
  const points = {
    // Forehead array
    forehead: [
      keypoints[FACE_POINTS.foreheadLeft],
      keypoints[FACE_POINTS.foreheadLeftMid1],
      keypoints[FACE_POINTS.foreheadLeftMid2],
      keypoints[FACE_POINTS.foreheadMidLeft],
      keypoints[FACE_POINTS.foreheadTop],
      keypoints[FACE_POINTS.foreheadMidRight],
      keypoints[FACE_POINTS.foreheadRightMid1],
      keypoints[FACE_POINTS.foreheadRightMid2],
      keypoints[FACE_POINTS.foreheadRight],
    ],
    // Jawline array
    jawline: [
      keypoints[FACE_POINTS.jawUpperLeft],
      keypoints[FACE_POINTS.jawLeft1],
      keypoints[FACE_POINTS.jawLeft2],
      keypoints[FACE_POINTS.jawLeft3],
      keypoints[FACE_POINTS.jawChinLeft],
      keypoints[FACE_POINTS.chin],
      keypoints[FACE_POINTS.jawChinRight],
      keypoints[FACE_POINTS.jawRight3],
      keypoints[FACE_POINTS.jawRight2],
      keypoints[FACE_POINTS.jawRight1],
      keypoints[FACE_POINTS.jawUpperRight],
    ],
    // Cheekbone points
    cheeks: [
      keypoints[FACE_POINTS.cheekboneLeft],
      keypoints[FACE_POINTS.cheekboneMidLeft],
      keypoints[FACE_POINTS.cheekboneMidRight],
      keypoints[FACE_POINTS.cheekboneRight],
    ]
  }

  // Draw connecting lines
  ctx.beginPath()

  // Draw forehead curve
  ctx.moveTo(points.forehead[0].x, points.forehead[0].y)
  points.forehead.forEach(point => {
    ctx.lineTo(point.x, point.y)
  })

  // Draw jawline curve
  ctx.moveTo(points.jawline[0].x, points.jawline[0].y)
  points.jawline.forEach(point => {
    ctx.lineTo(point.x, point.y)
  })

  // Draw cheekbone lines
  ctx.moveTo(points.cheeks[0].x, points.cheeks[0].y)
  points.cheeks.forEach(point => {
    ctx.lineTo(point.x, point.y)
  })

  // Draw vertical measurement line
  ctx.moveTo(points.forehead[4].x, points.forehead[4].y) // Center forehead
  ctx.lineTo(points.jawline[5].x, points.jawline[5].y) // Chin

  ctx.stroke()

  // Draw measurement points
  const allPoints = [...points.forehead, ...points.jawline, ...points.cheeks]
  allPoints.forEach(point => {
    if (point) {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 1.5, 0, 2 * Math.PI) // Even smaller dots
      ctx.fill()
      ctx.stroke()
    }
  })

  // Add measurement guides
  ctx.strokeStyle = 'rgba(0, 255, 0, 0.15)' // More subtle guide lines
  ctx.setLineDash([2, 3]) // Shorter dashes for more precision look
  
  // Draw horizontal guides
  ctx.beginPath()
  // Forehead guide
  ctx.moveTo(points.forehead[0].x - 5, points.forehead[0].y)
  ctx.lineTo(points.forehead[8].x + 5, points.forehead[8].y)
  // Cheekbone guide
  ctx.moveTo(points.cheeks[0].x - 5, points.cheeks[0].y)
  ctx.lineTo(points.cheeks[3].x + 5, points.cheeks[3].y)
  // Jaw guide
  ctx.moveTo(points.jawline[0].x - 5, points.jawline[0].y)
  ctx.lineTo(points.jawline[10].x + 5, points.jawline[10].y)
  ctx.stroke()

  ctx.setLineDash([])
}