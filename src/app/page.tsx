'use client'

import { useEffect, useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

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

  return (
    <main className="min-h-screen py-8">
      {isLoaded ? (
        <ImageUpload />
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </main>
  )
}
