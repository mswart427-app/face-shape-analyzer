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

  const analyzeFaceShape = async () => {
    if (!model || !imageRef.current || !canvasRef.current) return

    setAnalyzing(true)
    try {
      const predictions = await model.estimateFaces(imageRef.current, {
        flipHorizontal: false,
        staticImageMode: true
      })

      if (predictions.length > 0) {
        const keypoints = predictions[0].keypoints
        
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

        // Calculate face shape
        const shape = calculateFaceShape(keypoints) as FaceShape
        setFaceShape(shape)
      } else {
        setFaceShape(null)
        alert('No face detected - Please ensure face is clearly visible')
      }
    } catch (error) {
      console.error('Error analyzing face:', error)
      alert('Error analyzing face - Please try a different photo')
    }
    setAnalyzing(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setFaceShape(null)
        
        // Create new image to get dimensions
        const img = new Image()
        img.onload = () => {
          if (canvasRef.current) {
            // Set canvas size to match display size
            const maxWidth = 500 // or whatever max width you want
            const scaleFactor = maxWidth / img.width
            canvasRef.current.width = maxWidth
            canvasRef.current.height = img.height * scaleFactor
            
            // Draw initial image on canvas
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

          {faceShape && (
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