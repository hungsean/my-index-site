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

export interface SiteConfig {
  profile: Profile
  socialLinks: SocialLink[]
}