import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import ErrorBoundary from '@/components/ErrorBoundary'

const SolarSystem = dynamic(() => import('@/components/SolarSystem').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <Loader2 className="w-8 h-8 text-white animate-spin" />
    </div>
  ),
})

export const metadata: Metadata = {
  title: '3D Solar System Explorer',
  description: 'Explore our solar system in an interactive 3D environment',
}

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="relative w-full h-screen">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-black">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        }>
          <SolarSystem />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

