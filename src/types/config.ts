// 統一的連結介面 - 支援 social links 和 content card links
export interface UnifiedLink {
  /** 連結顯示名稱 */
  name: string
  /** 連結 URL 或要複製/顯示的文字 */
  url: string
  /** 連結類型：link=外部連結, copy=複製到剪貼簿, text=顯示訊息 */
  type: 'link' | 'copy' | 'text'
  /** 圖標名稱（可選） */
  icon?: string
  /** 圖標顏色類別（可選） */
  color?: string
  /** Button 變體樣式（可選） */
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  /** Button 大小（可選） */
  size?: 'default' | 'sm' | 'lg'
  /** 是否禁用（可選） */
  disabled?: boolean
}

// SocialLink 繼承 UnifiedLink 並強制要求某些欄位
export interface SocialLink extends UnifiedLink {
  icon: string // icon 為必填
  color: string // color 為必填
}

export interface Profile {
  name: string
  interests: string
  avatar: {
    src: string
    alt: string
    fallback: string
  }
  background?: {
    src: string
  }
}

// 舊版 ContentItem Link 格式（向後相容）
export interface LegacyContentLink {
  text: string
  href: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg'
}

// 統一的內容項目介面 (用於 projects 和 games)
export interface ContentItem {
  title: string
  description: string
  image_url?: string
  tags?: Array<{
    text: string
    variant?: 'default' | 'secondary' | 'outline' | 'destructive'
    style?: 'normal' | 'small'
  }>
  // 支援舊版格式和新版統一格式
  links?: Array<LegacyContentLink | UnifiedLink>
}

export interface About {
  story: string
  skills: string[]
}

export interface SiteConfig {
  profile: Profile
  socialLinks: SocialLink[]
  about?: About
  projects?: ContentItem[]
  games?: ContentItem[]
}