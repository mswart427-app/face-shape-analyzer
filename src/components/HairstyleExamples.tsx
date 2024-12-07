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
    <div className="mt-6">
      <h4 className="text-[20px] font-semibold mb-3 font-primary">
        Styles That Complement Your Shape:
      </h4>
      <p className="text-gray-600 mb-6 font-secondary">
        Based on your features, here are three styles that could work beautifully for you. These suggestions are a starting point for finding your perfect look.
      </p>
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(styles).map(([key, style]) => (
          <Link 
            href={style.productUrl}
            key={key}
            target="_blank"
            className="group relative cursor-pointer"
          >
            <div className="aspect-[1/1.15] rounded-lg overflow-hidden">
              <Image
                src={imageError[key] ? 'https://placehold.co/400x400/png?text=Image+Not+Found' : style.imageUrl}
                alt={style.productName}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                onError={() => handleImageError(key)}
              />
            </div>
            <div className="mt-3">
              <h5 className="font-primary text-base font-semibold">{style.productName}</h5>
              <p className="font-secondary text-sm text-gray-600">{style.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 