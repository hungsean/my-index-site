import { useState, useMemo, useRef } from 'react'
import { getCachedImageUrl, getImageFallbackChain } from '@/utils/imageManager'

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
  fallback = '/placeholder.png',
  webp = true
}: ImageWithFallbackProps) {
  // 獲取 fallback chain
  const fallbackChain = useMemo(
    () => (webp ? getImageFallbackChain(src, fallback) : [src, fallback]),
    [src, fallback, webp]
  )

  // 追蹤當前嘗試的 fallback index
  const fallbackIndexRef = useRef(0)

  // 優先使用 cache 中的 URL，否則使用 fallback chain 的第一個
  const initialSrc = useMemo(() => {
    const cached = getCachedImageUrl(src)
    if (cached) {
      return cached
    }
    return fallbackChain[0]
  }, [src, fallbackChain])

  const [imgSrc, setImgSrc] = useState(initialSrc)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    // 嘗試下一個 fallback
    fallbackIndexRef.current += 1

    if (fallbackIndexRef.current < fallbackChain.length) {
      setImgSrc(fallbackChain[fallbackIndexRef.current])
    } else {
      // 全部失敗，停止載入
      setIsLoading(false)
    }
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