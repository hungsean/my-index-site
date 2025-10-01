import { useState, useMemo } from 'react'

interface ImageWithFallbackProps {
  readonly src: string
  readonly alt: string
  readonly className?: string
  readonly fallback?: string
  readonly webp?: boolean
}

/**
 * 將圖片 URL 轉換為 WebP 格式（針對 img.senen.dev）
 */
function getOptimizedImageUrl(src: string, webp: boolean): string {
  if (!webp || !src.includes('img.senen.dev')) {
    return src
  }

  return src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallback = '/placeholder.jpg',
  webp = true
}: ImageWithFallbackProps) {
  // 直接使用優化後的 URL 作為初始值
  const optimizedSrc = useMemo(() => getOptimizedImageUrl(src, webp), [src, webp])
  const [imgSrc, setImgSrc] = useState(optimizedSrc)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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