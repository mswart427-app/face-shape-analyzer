'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { FaceShapeCard } from '@/components/FaceShapeCard'
import { UploadSection } from '@/components/UploadSection'

const faceShapes = [
  {
    shape: 'Oval',
    description: 'Considered the ideal face shape with balanced proportions.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0753/9556/3833/files/oval-face-shape.jpg?v=1734054935',
    characteristics: [
      'Length is about 1.5 times the width',
      'Softly rounded jawline',
      'No particularly prominent features'
    ]
  },
  {
    shape: 'Round',
    description: 'Characterized by soft angles and equal length and width.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0753/9556/3833/files/round-face-shape.jpg?v=1734054935',
    characteristics: [
      'Face length and width are similar',
      'Rounded jawline and chin',
      'Full cheeks'
    ]
  },
  {
    shape: 'Square',
    description: 'Strong jawline with angular features.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0753/9556/3833/files/square-face-shape.jpg?v=1734054934',
    characteristics: [
      'Strong, angular jawline',
      'Straight sides',
      'Minimal curves'
    ]
  },
  {
    shape: 'Heart',
    description: 'Wider forehead tapering to a pointed chin.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0753/9556/3833/files/heart-face-shape.jpg?v=1734054935',
    characteristics: [
      'Wider forehead',
      'High cheekbones',
      'Narrow, pointed chin'
    ]
  }
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Signal that the app is ready to be embedded
    const signalReady = () => {
      setIsLoaded(true)
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'APP_READY' }, '*')
      }
    }

    try {
      signalReady()
    } catch (error) {
      console.error('Initialization error:', error)
      setIsLoaded(true)
    }
  }, [])

  if (!isLoaded) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">MyHairMail-Powered Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Face Shape
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your unique face shape holds the key to hairstyles that bring out your best features. Ready to unlock your signature look?
          </p>
        </header>

        <UploadSection />

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Face Shape Profiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faceShapes.map((shape) => (
              <FaceShapeCard key={shape.shape} {...shape} />
            ))}
          </div>
        </div>

        <footer className="mt-24 text-center text-gray-600">
          <p className="max-w-2xl mx-auto">
            Our intelligent analysis maps your distinct facial features, delivering a personalized collection of hairstyles and beauty insights designed for you.
          </p>
        </footer>
      </div>
    </div>
  )
}
