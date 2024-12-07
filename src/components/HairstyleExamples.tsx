'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FACE_SHAPE_DESCRIPTIONS, FaceShape } from '@/lib/faceShapeDefinitions'

export default function HairstyleExamples({ faceShape }: { faceShape: FaceShape }) {
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({})
  const styles = FACE_SHAPE_DESCRIPTIONS[faceShape].styleImages

  const handleImageError = (key: string) => {
    setImageError(prev => ({
      ...prev,
      [key]: true
    }))
  }

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Recommended Styles:</h4>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(styles).map(([key, style]) => (
          <Link 
            href={style.productUrl}
            key={key}
            target="_blank"
            className="group relative cursor-pointer"
          >
            <div 
              className="aspect-[1/1.15] rounded-lg overflow-hidden"
            >
              <Image
                src={imageError[key] ? 'https://placehold.co/400x400/png?text=Image+Not+Found' : style.imageUrl}
                alt={style.productName}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                onError={() => handleImageError(key)}
              />
            </div>
            <div className="mt-2">
              <h5 className="font-medium text-sm">{style.productName}</h5>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 