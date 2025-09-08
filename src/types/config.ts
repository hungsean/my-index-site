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

export interface Project {
  title: string
  description: string
  image_url: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
}

export interface Game {
  title: string
  description: string
  image_url: string
  genre: string
  platform: string
  status: string
}

export interface About {
  story: string
  skills: string[]
}

export interface SiteConfig {
  profile: Profile
  socialLinks: SocialLink[]
  about?: About
  projects?: Project[]
  games?: Game[]
}