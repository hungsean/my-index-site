import { useState, useEffect, useCallback } from 'react'
import type { SiteConfig } from '@/types/config'
import { loadImageWithFallback } from '@/utils/imageManager'

interface PreloadProgress {
  loaded: number
  total: number
  percentage: number
  isComplete: boolean
}

interface UseImagePreloaderReturn {
  progress: PreloadProgress
  isLoading: boolean
  error: string | null
}

// 測試用：開發模式下每張圖片載入後的延遲時間（毫秒）
// 正式環境請設為 0
const DEV_DELAY_MS = import.meta.env.DEV ? 2000 : 0

/**
 * 圖片預載入 Hook
 * 在網站載入時預先載入所有圖片，並提供載入進度追蹤
 */
export function useImagePreloader(config: SiteConfig | null): UseImagePreloaderReturn {
  const [progress, setProgress] = useState<PreloadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0,
    isComplete: false
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 收集所有需要預載的圖片 URL
  const collectImageUrls = useCallback((cfg: SiteConfig): string[] => {
    const urls: string[] = []

    // 收集頭像
    if (cfg.profile?.avatar?.src) {
      urls.push(cfg.profile.avatar.src)
    }

    // 收集背景圖（如果有的話）
    if (cfg.profile?.background?.src) {
      urls.push(cfg.profile.background.src)
    }

    // 收集所有專案圖片（不限於顯示的前幾個）
    if (cfg.projects && Array.isArray(cfg.projects)) {
      cfg.projects.forEach(project => {
        if (project.image_url) {
          urls.push(project.image_url)
        }
      })
    }

    // 收集所有遊戲圖片（不限於顯示的前幾個）
    if (cfg.games && Array.isArray(cfg.games)) {
      cfg.games.forEach(game => {
        if (game.image_url) {
          urls.push(game.image_url)
        }
      })
    }

    // 去重並過濾空值
    return [...new Set(urls)].filter(url => url && url.trim() !== '')
  }, [])

  // 預載單張圖片（支援 fallback chain）
  const preloadImage = useCallback(async (url: string): Promise<void> => {
    try {
      await loadImageWithFallback(url)

      if (DEV_DELAY_MS > 0) {
        await new Promise(r => setTimeout(r, DEV_DELAY_MS))
      }
    } catch (err) {
      console.warn(`Failed to preload image: ${url}`, err)
      if (DEV_DELAY_MS > 0) {
        await new Promise(r => setTimeout(r, DEV_DELAY_MS))
      }
    }
  }, [])

  // 批次預載圖片（限制並發數量）
  const preloadImages = useCallback(async (urls: string[]) => {
    if (urls.length === 0) {
      setProgress({
        loaded: 0,
        total: 0,
        percentage: 100,
        isComplete: true
      })
      setIsLoading(false)
      return
    }

    const total = urls.length
    let loaded = 0

    setProgress({
      loaded: 0,
      total,
      percentage: 0,
      isComplete: false
    })

    // 限制並發載入數量為 6
    const concurrencyLimit = 2
    const chunks: string[][] = []

    for (let i = 0; i < urls.length; i += concurrencyLimit) {
      chunks.push(urls.slice(i, i + concurrencyLimit))
    }

    try {
      for (const chunk of chunks) {
        await Promise.all(
          chunk.map(url =>
            preloadImage(url).then(() => {
              loaded++
              const percentage = Math.round((loaded / total) * 100)
              setProgress({
                loaded,
                total,
                percentage,
                isComplete: loaded === total
              })
            })
          )
        )
      }

      setIsLoading(false)
    } catch (err) {
      console.error('Preload error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setIsLoading(false)
    }
  }, [preloadImage])

  // 當 config 載入完成後開始預載圖片
  useEffect(() => {
    if (!config) {
      setIsLoading(true)
      return
    }

    const urls = collectImageUrls(config)
    preloadImages(urls)
  }, [config, collectImageUrls, preloadImages])

  return {
    progress,
    isLoading,
    error
  }
}
