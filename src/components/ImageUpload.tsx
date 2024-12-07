'use client';

import { useState, useRef, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection'

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [faceShape, setFaceShape] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [model, setModel] = useState<FaceLandmarksDetector | null>(null)

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready()
      const model = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'tfjs',
          refineLandmarks: true,
          maxFaces: 1
        }
      )
      setModel(model)
    }
    loadModel()
  }, [])

  const analyzeFaceShape = async () => {
    if (!model || !imageRef.current) return

    setAnalyzing(true)
    try {
      const predictions = await model.estimateFaces(imageRef.current, {
        flipHorizontal: false,
        staticImageMode: true
      })

      if (predictions.length > 0) {
        const keypoints = predictions[0].keypoints
        console.log('Detected keypoints:', keypoints)
        const shape = determineFaceShape(keypoints)
        setFaceShape(shape)
      } else {
        setFaceShape('No face detected')
      }
    } catch (error) {
      console.error('Error analyzing face:', error)
      setFaceShape('Error analyzing face')
    }
    setAnalyzing(false)
  }

  const determineFaceShape = (keypoints: faceLandmarksDetection.Keypoint[]) => {
    console.log('All keypoint names:', keypoints.map(k => k.name))

    const jawLeftPoints = keypoints.filter(k => k.name?.includes('jawLeft'))
    const jawRightPoints = keypoints.filter(k => k.name?.includes('jawRight'))
    const foreheadPoints = keypoints.filter(k => k.name?.includes('forehead'))
    const chinPoints = keypoints.filter(k => k.name?.includes('chin'))

    console.log('Found points:', {
      jawLeft: jawLeftPoints.length,
      jawRight: jawRightPoints.length,
      forehead: foreheadPoints.length,
      chin: chinPoints.length
    })

    const jawLeft = jawLeftPoints[Math.floor(jawLeftPoints.length / 2)]
    const jawRight = jawRightPoints[Math.floor(jawRightPoints.length / 2)]
    const forehead = foreheadPoints[Math.floor(foreheadPoints.length / 2)]
    const chin = chinPoints[Math.floor(chinPoints.length / 2)]

    if (!jawLeft || !jawRight || !forehead || !chin) {
      return 'Unable to determine face shape - Try a clearer photo with full face visible'
    }

    const faceWidth = Math.abs(jawRight.x - jawLeft.x)
    const faceHeight = Math.abs(forehead.y - chin.y)
    const ratio = faceHeight / faceWidth

    const jawWidth = faceWidth
    const foreheadWidth = Math.abs(
      foreheadPoints[0]?.x - foreheadPoints[foreheadPoints.length - 1]?.x
    ) || 0

    if (ratio > 1.75) return 'Oblong (Long)'
    if (ratio > 1.5) {
      return foreheadWidth > jawWidth ? 'Heart' : 'Oval'
    }
    if (ratio > 1.25) {
      return foreheadWidth > jawWidth ? 'Diamond' : 'Round'
    }
    return jawWidth > foreheadWidth ? 'Square' : 'Rectangle'
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setFaceShape(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        ref={fileInputRef}
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Upload Image
      </button>
      {selectedImage && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <img
            ref={imageRef}
            src={selectedImage}
            alt="Selected"
            className="max-w-md rounded-lg shadow-lg"
            onLoad={() => setFaceShape(null)}
          />
          <button
            onClick={analyzeFaceShape}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            disabled={analyzing}
          >
            {analyzing ? 'Analyzing...' : 'Analyze Face Shape'}
          </button>
          {faceShape && (
            <div className="mt-2 text-lg font-semibold">
              Face Shape: {faceShape}
            </div>
          )}
        </div>
      )}
    </div>
  )
}