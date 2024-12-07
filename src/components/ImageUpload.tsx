'use client';

import { useState, useRef, useEffect } from 'react'
import { initializeDetector, drawFaceLandmarks } from '@/lib/faceDetection'
import { calculateFaceShape } from '@/lib/faceShapeMeasurements'
import { FACE_SHAPE_DESCRIPTIONS, FaceShape } from '@/lib/faceShapeDefinitions'
import HairstyleExamples from './HairstyleExamples'

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [faceShape, setFaceShape] = useState<FaceShape | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [model, setModel] = useState<any>(null)

  useEffect(() => {
    const loadModel = async () => {
      const detector = await initializeDetector()
      setModel(detector)
    }
    loadModel()
  }, [])

  const isValidFaceShape = (shape: string): shape is FaceShape => {
    return shape in FACE_SHAPE_DESCRIPTIONS;
  }

  const analyzeFaceShape = async () => {
    if (!model || !imageRef.current || !canvasRef.current) return

    setAnalyzing(true)
    try {
      console.log('Starting face detection...')
      const predictions = await model.estimateFaces(imageRef.current, {
        flipHorizontal: false,
        staticImageMode: true
      })

      console.log('Raw predictions:', predictions)

      if (predictions && predictions.length > 0) {
        console.log('Number of faces detected:', predictions.length)
        const keypoints = predictions[0].keypoints
        console.log('Number of keypoints:', keypoints?.length)
        console.log('First few keypoints:', keypoints?.slice(0, 5))

        if (!keypoints || keypoints.length === 0) {
          console.error('No keypoints found in the detected face')
          setFaceShape(null)
          alert('Unable to detect facial features clearly. Please try a different photo.')
          return
        }

        // Draw landmarks on canvas
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (ctx) {
          // Clear previous drawings
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          
          // Draw the image first
          ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)
          
          // Scale keypoints to match canvas size
          const scaleX = canvas.width / imageRef.current.naturalWidth
          const scaleY = canvas.height / imageRef.current.naturalHeight
          const scaledKeypoints = keypoints.map((point: { x: number; y: number }) => ({
            ...point,
            x: point.x * scaleX,
            y: point.y * scaleY
          }))
          
          // Draw landmarks
          drawFaceLandmarks(ctx, scaledKeypoints)
        }

        // Calculate face shape with type checking
        const shape = calculateFaceShape(keypoints)
        console.log('Calculated Shape:', shape)
        
        if (isValidFaceShape(shape)) {
          console.log('Valid face shape detected:', shape)
          setFaceShape(shape)
        } else {
          console.error('Invalid face shape detected:', shape, 'Valid shapes:', Object.keys(FACE_SHAPE_DESCRIPTIONS))
          setFaceShape(null)
          alert('Unable to determine face shape accurately. Please try a different photo.')
        }
      } else {
        console.error('No predictions returned from model')
        setFaceShape(null)
        alert('No face detected - Please ensure face is clearly visible')
      }
    } catch (error) {
      console.error('Detailed error in face analysis:', error)
      setFaceShape(null)
      alert('Error analyzing face - Please try a different photo')
    }
    setAnalyzing(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name, file.type)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setFaceShape(null)
        
        // Create new image to get dimensions
        const img = new Image()
        img.onload = () => {
          console.log('Image loaded with dimensions:', img.width, 'x', img.height)
          if (canvasRef.current) {
            const maxWidth = 500
            const scaleFactor = maxWidth / img.width
            canvasRef.current.width = maxWidth
            canvasRef.current.height = img.height * scaleFactor
            console.log('Canvas dimensions set to:', canvasRef.current.width, 'x', canvasRef.current.height)
            
            const ctx = canvasRef.current.getContext('2d')
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
            }
          }
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold mb-2">Photo Requirements:</h2>
        <ul className="text-sm text-gray-600">
          <li>• Face should be clearly visible</li>
          <li>• Good lighting</li>
          <li>• Front-facing pose</li>
          <li>• No obstructions (hair, glasses, etc.)</li>
        </ul>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        ref={fileInputRef}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Upload Image
      </button>

      {selectedImage && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="relative w-full max-w-md">
            <img
              ref={imageRef}
              src={selectedImage}
              alt="Selected"
              className="hidden"
            />
            <canvas
              ref={canvasRef}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <button
            onClick={analyzeFaceShape}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            disabled={analyzing}
          >
            {analyzing ? 'Analyzing...' : 'Analyze Face Shape'}
          </button>

          {faceShape && FACE_SHAPE_DESCRIPTIONS[faceShape] && (
            <div className="mt-4 max-w-md w-full">
              <h3 className="text-xl font-bold mb-2">
                Face Shape: {faceShape}
              </h3>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-700 mb-2">
                  {FACE_SHAPE_DESCRIPTIONS[faceShape].description}
                </p>
                <h4 className="font-semibold mt-3 mb-1">Characteristics:</h4>
                <ul className="list-disc pl-5 mb-3">
                  {FACE_SHAPE_DESCRIPTIONS[faceShape].characteristics.map((char, i) => (
                    <li key={i} className="text-gray-600">{char}</li>
                  ))}
                </ul>
                <h4 className="font-semibold mb-1">Recommended Styles:</h4>
                <ul className="list-disc pl-5 mb-3">
                  {FACE_SHAPE_DESCRIPTIONS[faceShape].bestStyles.map((style, i) => (
                    <li key={i} className="text-gray-600">{style}</li>
                  ))}
                </ul>
                <h4 className="font-semibold mb-1">Styles to Avoid:</h4>
                <ul className="list-disc pl-5 mb-3">
                  {FACE_SHAPE_DESCRIPTIONS[faceShape].avoidStyles.map((style, i) => (
                    <li key={i} className="text-gray-600">{style}</li>
                  ))}
                </ul>
                <HairstyleExamples faceShape={faceShape} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}