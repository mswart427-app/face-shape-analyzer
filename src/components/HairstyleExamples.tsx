'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FACE_SHAPE_DESCRIPTIONS, FaceShape } from '@/lib/faceShapeDefinitions'

interface HairstyleExamplesProps {
  faceShape: FaceShape;
}

export default function HairstyleExamples({ faceShape }: HairstyleExamplesProps) {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const styles = FACE_SHAPE_DESCRIPTIONS[faceShape].styleImages

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Hairstyle Examples:</h4>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(styles).map(([styleName, imageUrl]) => (
          <div
            key={styleName}
            className="relative cursor-pointer group"
            onClick={() => setSelectedStyle(styleName)}
          >
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={`${styleName} hairstyle`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
            <p className="text-sm text-center mt-1 capitalize">
              {styleName.replace(/([A-Z])/g, ' $1').trim()}
            </p>
          </div>
        ))}
      </div>

      {selectedStyle && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium mb-2 capitalize">
            {selectedStyle.replace(/([A-Z])/g, ' $1').trim()}
          </h5>
          <p className="text-sm text-gray-600">
            {/* Add detailed description for each style */}
            This style works well with your {faceShape.toLowerCase()} face shape by 
            {faceShape === 'Round' ? ' creating length and definition.' : 
             faceShape === 'Square' ? ' softening angular features.' : 
             ' enhancing your natural proportions.'}
          </p>
        </div>
      )}
    </div>
  )
} 