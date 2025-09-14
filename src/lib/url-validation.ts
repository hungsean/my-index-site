// URL 驗證和安全性工具

// 允許的協議白名單
const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'] as const

// 不允許的危險協議
const DANGEROUS_PROTOCOLS = ['javascript:', 'vbscript:', 'data:', 'file:'] as const

/**
 * 驗證 URL 是否安全
 */
export function validateUrl(url: string): {
  isValid: boolean
  isSafe: boolean
  protocol?: string
  error?: string
} {
  if (!url || typeof url !== 'string') {
    return {
      isValid: false,
      isSafe: false,
      error: 'URL 不能為空'
    }
  }

  // 清理 URL（移除前後空白）
  const cleanUrl = url.trim()

  try {
    const urlObj = new URL(cleanUrl)
    const protocol = urlObj.protocol

    // 檢查是否為危險協議
    if ((DANGEROUS_PROTOCOLS as readonly string[]).includes(protocol)) {
      return {
        isValid: false,
        isSafe: false,
        protocol,
        error: `不安全的協議: ${protocol}`
      }
    }

    // 檢查是否為允許的協議
    if (!(ALLOWED_PROTOCOLS as readonly string[]).includes(protocol)) {
      return {
        isValid: false,
        isSafe: false,
        protocol,
        error: `不支援的協議: ${protocol}`
      }
    }

    // 對於 http/https，檢查主機名
    if (protocol === 'http:' || protocol === 'https:') {
      if (!urlObj.hostname || urlObj.hostname === 'localhost' && process.env.NODE_ENV === 'production') {
        return {
          isValid: false,
          isSafe: false,
          protocol,
          error: '無效的主機名'
        }
      }
    }

    return {
      isValid: true,
      isSafe: true,
      protocol
    }

  } catch (error) {
    return {
      isValid: false,
      isSafe: false,
      error: error instanceof Error ? error.message : 'URL 格式錯誤'
    }
  }
}

/**
 * 安全地開啟外部連結
 */
export function openSafeUrl(url: string, target: string = '_blank'): boolean {
  const validation = validateUrl(url)

  if (!validation.isValid || !validation.isSafe) {
    console.warn('嘗試開啟不安全的 URL:', url, validation.error)
    return false
  }

  try {
    const link = document.createElement('a')
    link.href = url
    link.target = target
    link.rel = 'noopener noreferrer'

    // 臨時添加到 DOM 並點擊
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return true
  } catch (error) {
    console.error('開啟 URL 失敗:', error)
    return false
  }
}

/**
 * 驗證電子郵件地址
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * 清理和驗證 Discord 用戶名
 */
export function validateDiscordUsername(username: string): boolean {
  if (!username || typeof username !== 'string') return false

  // Discord 用戶名格式：username#1234 或新格式 @username
  const cleanUsername = username.trim()
  const oldFormatRegex = /^.{1,32}#\d{4}$/
  const newFormatRegex = /^@?[a-zA-Z0-9._-]{2,32}$/

  return oldFormatRegex.test(cleanUsername) || newFormatRegex.test(cleanUsername)
}

/**
 * 建構安全的社交媒體 URL
 */
export function buildSafeUrl(baseUrl: string, path?: string): string {
  try {
    const base = new URL(baseUrl)
    if (path) {
      // 確保路徑不包含危險字元
      const safePath = encodeURIComponent(path.replace(/[<>'"]/g, ''))
      base.pathname = base.pathname.replace(/\/$/, '') + '/' + safePath
    }
    return base.toString()
  } catch {
    return baseUrl
  }
}