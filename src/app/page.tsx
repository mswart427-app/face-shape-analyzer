'use client'

import { useEffect, useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <h1 className="text-4xl font-bold text-center mb-8 font-primary">Face Shape Analyzer</h1>
      <ImageUpload />
    </main>
  )
}
