export interface SocialLink {
  name: string
  icon: string
  url: string
  color: string
  type: 'link' | 'copy' | 'text'
}

export interface Profile {
  name: string
  interests: string
  avatar: {
    src: string
    alt: string
    fallback: string
  }
  background: {
    src: string
  }
}

// 統一的內容項目介面 (用於 projects 和 games)
export interface ContentItem {
  title: string
  description: string
  image_url: string
  tags?: Array<{
    text: string
    variant?: 'default' | 'secondary' | 'outline' | 'destructive'
    style?: 'normal' | 'small'
  }>
  links?: Array<{
    text: string
    href: string
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg'
  }>
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