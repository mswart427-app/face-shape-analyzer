import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

let model: faceLandmarksDetection.FaceLandmarksDetector | null = null;

export async function initializeDetector() {
  console.log('Initializing face detector...'); // Debug log
  if (!model) {
    try {
      await tf.ready();
      console.log('TensorFlow.js is ready'); // Debug log
      model = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'tfjs',
        }
      );
      console.log('Face detector model loaded'); // Debug log
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