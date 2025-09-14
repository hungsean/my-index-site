import { useState, useRef, useEffect, useCallback } from 'react'

interface ImageWithFallbackProps {
  readonly src: string
  readonly alt: string
  readonly className?: string
  readonly fallback?: string
  readonly lazy?: boolean
  readonly webp?: boolean
  readonly priority?: boolean
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallback = '/placeholder.jpg',
  lazy = true,
  webp = true,
  priority = false
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(priority ? src : '')
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(!lazy || priority)
  const imgRef = useRef<HTMLImageElement>(null)

  // WebP支援檢測
  const getOptimizedSrc = useCallback((originalSrc: string) => {
    if (!webp) return originalSrc

    // 簡單的WebP支援檢測（可以用更複雜的邏輯）
    const supportsWebP = typeof window !== 'undefined' &&
      document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp')

    if (supportsWebP && originalSrc.includes('img.senen.dev')) {
      // 假設圖片伺服器支援WebP轉換
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    }

    return originalSrc
  }, [webp])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    const currentRef = imgRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [lazy, priority])

  // 載入圖片當可見時
  useEffect(() => {
    if (isInView && !imgSrc) {
      setImgSrc(getOptimizedSrc(src))
    }
  }, [isInView, imgSrc, src, getOptimizedSrc])

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallback)
      setHasError(true)
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative">
      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className || ''}`}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />

      {isLoading && imgSrc && (
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className || ''}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          </div>
        </div>
      )}
    </div>
  )
}