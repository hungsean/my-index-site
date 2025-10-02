/**
 * 集中的圖片管理工具
 * 統一處理圖片 URL 轉換、預載入、fallback chain
 */

// 記錄成功載入的圖片 URL（用於 cache 一致性）
const loadedImageCache = new Map<string, string>()

/**
 * 將圖片 URL 轉換為 WebP 格式（僅針對 img.senen.dev）
 */
export function getWebPUrl(url: string): string {
  if (!url.includes('img.senen.dev')) {
    return url
  }
  return url.replace(/\.(jpg|jpeg|png)$/i, '.webp')
}

/**
 * 從 WebP URL 還原為原始格式
 * 嘗試推測原始格式：優先 jpg，其次 png
 */
export function getOriginalUrl(url: string): string[] {
  if (!url.includes('img.senen.dev') || !url.endsWith('.webp')) {
    return [url]
  }

  const baseUrl = url.replace(/\.webp$/i, '')
  return [
    `${baseUrl}.jpg`,
    `${baseUrl}.png`,
    `${baseUrl}.jpeg`
  ]
}

/**
 * 獲取圖片的完整 fallback chain
 * @returns [webp, jpg, png, jpeg, placeholder]
 */
export function getImageFallbackChain(
  url: string,
  placeholder: string = '/placeholder.jpg'
): string[] {
  const chain: string[] = []

  // 1. 嘗試 webp（如果是 img.senen.dev）
  const webpUrl = getWebPUrl(url)
  if (webpUrl !== url) {
    chain.push(webpUrl)
  }

  // 2. 嘗試原始格式
  if (webpUrl !== url) {
    chain.push(...getOriginalUrl(webpUrl))
  } else {
    chain.push(url)
  }

  // 3. 最後 fallback 到 placeholder
  if (!chain.includes(placeholder)) {
    chain.push(placeholder)
  }

  return [...new Set(chain)] // 去重
}

/**
 * 嘗試載入單張圖片（支援 fallback）
 * @returns 成功載入的 URL
 */
export async function loadImageWithFallback(
  url: string,
  placeholder: string = '/placeholder.jpg'
): Promise<string> {
  // 檢查 cache
  const cached = loadedImageCache.get(url)
  if (cached) {
    return cached
  }

  const chain = getImageFallbackChain(url, placeholder)

  for (const currentUrl of chain) {
    try {
      const success = await tryLoadImage(currentUrl)
      if (success) {
        // 記錄成功的 URL
        loadedImageCache.set(url, currentUrl)
        return currentUrl
      }
    } catch {
      // 繼續嘗試下一個
      continue
    }
  }

  // 全部失敗，返回 placeholder
  loadedImageCache.set(url, placeholder)
  return placeholder
}

/**
 * 嘗試載入圖片
 */
function tryLoadImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()

    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)

    img.src = url
  })
}

/**
 * 從 cache 獲取已成功載入的 URL
 */
export function getCachedImageUrl(url: string): string | undefined {
  return loadedImageCache.get(url)
}

/**
 * 清除圖片 cache
 */
export function clearImageCache(): void {
  loadedImageCache.clear()
}
