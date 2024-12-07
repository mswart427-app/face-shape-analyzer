'use client'

import { useEffect, useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Signal that the app is ready to be embedded
    const signalReady = () => {
      setIsLoaded(true)
      // Send message to parent window
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'APP_READY' }, '*')
      }
    }

    // Initialize app
    try {
      signalReady()
    } catch (error) {
      console.error('Initialization error:', error)
      // Still mark as loaded even if there's an error
      setIsLoaded(true)
    }
  }, [])

  return (
    <main className="min-h-screen py-8">
      <h1 className="text-4xl font-bold text-center mb-8 font-primary">Face Shape Analyzer</h1>
      {isLoaded ? (
        <ImageUpload />
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </main>
  )
}
