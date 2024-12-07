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
  jawLeft: 234,
  jawRight: 454,
  chin: 152,
  foreheadTop: 10,
  cheekLeft: 123,
  cheekRight: 352,
  leftEye: 33,
  rightEye: 263,
  noseTip: 1
}

export const drawFaceLandmarks = (
  ctx: CanvasRenderingContext2D,
  keypoints: Keypoint[],
  color = '#00ff00'
) => {
  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.lineWidth = 2

  // Draw key points
  const points = [
    keypoints[FACE_POINTS.jawLeft],
    keypoints[FACE_POINTS.jawRight],
    keypoints[FACE_POINTS.chin],
    keypoints[FACE_POINTS.foreheadTop],
    keypoints[FACE_POINTS.cheekLeft],
    keypoints[FACE_POINTS.cheekRight]
  ]

  points.forEach(point => {
    if (point) {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI)
      ctx.fill()
    }
  })

  // Draw face shape outline
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  points.forEach(point => {
    if (point) {
      ctx.lineTo(point.x, point.y)
    }
  })
  ctx.closePath()
  ctx.stroke()
}