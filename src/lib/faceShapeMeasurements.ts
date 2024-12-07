import { FaceShape } from './faceShapeDefinitions';

interface Point {
  x: number;
  y: number;
}

interface FaceMeasurements {
  foreheadWidth: number;
  cheekboneWidth: number;
  jawWidth: number;
  faceLength: number;
  points: {
    forehead: [Point, Point];
    cheekbones: [Point, Point];
    jaw: [Point, Point];
    chin: Point;
    foreheadTop: Point;
  };
}

export function getMeasurementsFromLandmarks(landmarks: any): FaceMeasurements {
  // Extract key points from landmarks
  const points = landmarks.keypoints;
  
  // Define key facial points
  const foreheadLeft = points[104];
  const foreheadRight = points[334];
  const foreheadTop = points[10];
  const cheekboneLeft = points[234];
  const cheekboneRight = points[454];
  const jawLeft = points[132];
  const jawRight = points[361];
  const chin = points[152];

  // Calculate measurements
  const foreheadWidth = getDistance(foreheadLeft, foreheadRight);
  const cheekboneWidth = getDistance(cheekboneLeft, cheekboneRight);
  const jawWidth = getDistance(jawLeft, jawRight);
  const faceLength = getDistance(foreheadTop, chin);

  return {
    foreheadWidth,
    cheekboneWidth,
    jawWidth,
    faceLength,
    points: {
      forehead: [foreheadLeft, foreheadRight],
      cheekbones: [cheekboneLeft, cheekboneRight],
      jaw: [jawLeft, jawRight],
      chin,
      foreheadTop
    }
  };
}

function getDistance(point1: Point, point2: Point): number {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
}

export function drawFaceMeasurements(
  ctx: CanvasRenderingContext2D,
  measurements: FaceMeasurements
) {
  const { points } = measurements;

  // Set drawing styles
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#00ff00';

  // Draw lines for measurements
  drawLine(ctx, points.forehead[0], points.forehead[1], 'Forehead Width');
  drawLine(ctx, points.cheekbones[0], points.cheekbones[1], 'Cheekbone Width');
  drawLine(ctx, points.jaw[0], points.jaw[1], 'Jaw Width');
  drawLine(ctx, points.foreheadTop, points.chin, 'Face Length');

  // Draw points
  drawPoint(ctx, points.foreheadTop);
  drawPoint(ctx, points.chin);
  points.forehead.forEach(p => drawPoint(ctx, p));
  points.cheekbones.forEach(p => drawPoint(ctx, p));
  points.jaw.forEach(p => drawPoint(ctx, p));
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  label: string
) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  // Draw label
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  ctx.fillText(label, midX, midY - 5);
}

function drawPoint(ctx: CanvasRenderingContext2D, point: Point) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
  ctx.fill();
}

export function calculateFaceShape(measurements: FaceMeasurements): FaceShape {
  const {
    foreheadWidth,
    cheekboneWidth,
    jawWidth,
    faceLength,
  } = measurements;

  // Calculate ratios
  const widthToLength = cheekboneWidth / faceLength;
  const jawToForehead = jawWidth / foreheadWidth;
  const cheekToJaw = cheekboneWidth / jawWidth;

  // Determine face shape based on ratios
  if (widthToLength >= 0.75 && widthToLength <= 0.85 && cheekToJaw >= 0.95 && cheekToJaw <= 1.05) {
    return 'oval';
  } else if (widthToLength > 0.85 && cheekToJaw >= 0.95 