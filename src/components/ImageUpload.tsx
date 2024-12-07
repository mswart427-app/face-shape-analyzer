'use client';

import { useState, useRef, useEffect } from 'react';
import { detectFaceLandmarks } from '../lib/faceDetection';
import { calculateFaceShape, getMeasurementsFromLandmarks, drawFaceMeasurements } from '../lib/faceShapeMeasurements';
import { faceShapeDefinitions } from '../lib/faceShapeDefinitions';

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [faceShape, setFaceShape] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
        setFaceShape(null);
        
        // Clear canvas when new image is uploaded
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image && imageRef.current) {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
    }
  }, [image]);

  const analyzeImage = async () => {
    if (!imageRef.current || !canvasRef.current) return;

    setIsAnalyzing(true);
    setAnalysis('Analyzing your face shape...');

    try {
      const predictions = await detectFaceLandmarks(imageRef.current);
      
      if (predictions) {
        const measurements = getMeasurementsFromLandmarks(predictions);
        const detectedShape = calculateFaceShape(measurements);
        const shapeInfo = faceShapeDefinitions[detectedShape];

        // Draw measurements on canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawFaceMeasurements(ctx, measurements);
        }

        setFaceShape(detectedShape);
        setAnalysis(`
          Face Shape: ${shapeInfo.name}
          
          Characteristics:
          ${shapeInfo.characteristics}
          
          Best Hairstyles:
          ${shapeInfo.bestStyles.join('\n')}
          
          Styles to Avoid:
          ${shapeInfo.avoidStyles.join('\n')}
          
          Measurements:
          Face Length Ratio: ${(measurements.faceLength / measurements.cheekboneWidth).toFixed(2)}
          Jaw to Forehead Ratio: ${(measurements.jawWidth / measurements.foreheadWidth).toFixed(2)}
          Cheekbone to Jaw Ratio: ${(measurements.cheekboneWidth / measurements.jawWidth).toFixed(2)}
        `);
      } else {
        setAnalysis('No face detected. Please try another photo.');
      }
    } catch (error) {
      setAnalysis('Error analyzing image. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload Face Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
          disabled={isAnalyzing}
        />
      </div>
      {image && (
        <div className="mt-4 space-y-4">
          <div className="relative">
            <img 
              ref={imageRef}
              src={image} 
              alt="Uploaded face" 
              className="max-w-full h-auto rounded"
              crossOrigin="anonymous"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <button
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className={`w-full font-bold py-2 px-4 rounded ${
              isAnalyzing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Face Shape'}
          </button>
          {analysis && (
            <div className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-line">
              <p className="text-gray-800">{analysis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}