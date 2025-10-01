import { useState, useMemo } from 'react'

interface ImageWithFallbackProps {
  readonly src: string
  readonly alt: string
  readonly className?: string
  readonly fallback?: string
  readonly webp?: boolean
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallback = '/placeholder.jpg',
  webp = true
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // WebP支援檢測 - 使用 useMemo 緩存結果
  const supportsWebP = useMemo(() => {
    if (!webp) return false

    // 簡單的WebP支援檢測
    return typeof window !== 'undefined' &&
      document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp')
  }, [webp])

  // 優化後的圖片 URL（如果需要 WebP 轉換）
  useMemo(() => {
    if (!webp || !supportsWebP) return

    if (src.includes('img.senen.dev')) {
      // 假設圖片伺服器支援WebP轉換
      const optimizedSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      if (optimizedSrc !== src) {
        setImgSrc(optimizedSrc)
      }
    }
  }, [src, webp, supportsWebP])

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
        src={imgSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className || ''}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="eager"
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