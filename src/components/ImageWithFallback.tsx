import { useState, useRef, useEffect, useCallback, useMemo } from 'react'

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

  // WebP支援檢測 - 使用 useMemo 緩存結果
  const supportsWebP = useMemo(() => {
    if (!webp) return false

    // 簡單的WebP支援檢測（可以用更複雜的邏輯）
    return typeof window !== 'undefined' &&
      document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp')
  }, [webp])

  // 優化後的圖片 URL 獲取
  const getOptimizedSrc = useCallback((originalSrc: string) => {
    if (!webp || !supportsWebP) return originalSrc

    if (originalSrc.includes('img.senen.dev')) {
      // 假設圖片伺服器支援WebP轉換
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    }

    return originalSrc
  }, [webp, supportsWebP])

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

    const currentElement = imgRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      // 使用儲存的 element reference 而非 current ref
      if (currentElement) {
        observer.unobserve(currentElement)
      }
      // 確保完全斷開 observer 連接
      observer.disconnect()
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