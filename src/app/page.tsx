'use client'

import { useEffect, useState } from 'react'
import ImageUpload from '../components/ImageUpload'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Face Shape Analyzer</h1>
      <ImageUpload />
    </main>
  )
}
