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
    <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto px-4">
      <div className="max-w-md w-full">
        <h2 className="font-primary text-[24px] font-semibold mb-6 text-center">
          Let&apos;s Find Your Perfect Style
        </h2>
        <div className="font-secondary">
          <ul className="text-base text-gray-600 space-y-1 pl-[100px]">
            <li>• Face should be clearly visible</li>
            <li>• Good lighting</li>
            <li>• Front-facing pose</li>
            <li>• No obstructions (hair, glasses, etc.)</li>
          </ul>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        ref={fileInputRef}
      />

      <div className="w-full max-w-md mb-4">
        {!selectedImage ? (
          <div className="aspect-[4/3] bg-white rounded-lg shadow-lg flex items-center justify-center relative">
            <div className="text-center p-6">
              <p className="text-gray-500 font-secondary text-lg">
                Upload your photo for personalized style matches
              </p>
            </div>
            <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg m-4" />
          </div>
        ) : (
          <div className="relative">
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
        )}
      </div>

      <div className="flex justify-center w-full">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 bg-[#85714d] text-white rounded-lg hover:bg-[#6b5a3e] transition-colors font-primary text-base"
        >
          Upload Photo
        </button>
      </div>

      {selectedImage && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex justify-center w-full">
            <button
              onClick={analyzeFaceShape}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-primary text-base"
              disabled={analyzing}
            >
              {analyzing ? 'Analyzing...' : 'Analyze Face Shape'}
            </button>
          </div>

          {faceShape && FACE_SHAPE_DESCRIPTIONS[faceShape] && (
            <div className="mt-6 max-w-md w-full">
              <h3 className="text-[24px] font-semibold mb-4 font-primary">
                Personalized Style Report
              </h3>
              <div className="bg-white/90 p-6 rounded-lg shadow-md font-secondary">
                <div className="mb-4">
                  <span className="text-lg font-primary">Face Shape: </span>
                  <span className="text-lg font-semibold">{faceShape}</span>
                </div>
                <p className="text-gray-700 mb-4">
                  {FACE_SHAPE_DESCRIPTIONS[faceShape].description}
                </p>
                <h4 className="text-[20px] font-semibold mb-2 font-primary">Characteristics:</h4>
                <ul className="list-disc pl-5 mb-4 text-gray-600">
                  {FACE_SHAPE_DESCRIPTIONS[faceShape].characteristics.map((char, i) => (
                    <li key={i}>{char}</li>
                  ))}
                </ul>
                <h4 className="text-[20px] font-semibold mb-2 font-primary">Recommended Styles:</h4>
                <ul className="list-disc pl-5 mb-4 text-gray-600">
                  {FACE_SHAPE_DESCRIPTIONS[faceShape].bestStyles.map((style, i) => (
                    <li key={i}>{style}</li>
                  ))}
                </ul>
                <h4 className="text-[20px] font-semibold mb-2 font-primary">Styles to Avoid:</h4>
                <ul className="list-disc pl-5 mb-4 text-gray-600">
                  {FACE_SHAPE_DESCRIPTIONS[faceShape].avoidStyles.map((style, i) => (
                    <li key={i}>{style}</li>
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