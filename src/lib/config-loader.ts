import type { SiteConfig, Profile, SocialLink, About, ContentItem } from '@/types/config'
import type { Tag, Link } from '@/components/ContentCard'

export interface ConfigError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface ConfigLoadResult {
  config: SiteConfig
  errors: ConfigError[]
  isValid: boolean
}


/**
 * 驗證個人資料配置
 */
function validateProfile(profile: any): { profile: Profile; errors: ConfigError[] } {
  const errors: ConfigError[] = []
  
  if (!profile || typeof profile !== 'object') {
    return {
      profile: getDefaultProfile(),
      errors: [{ field: 'profile', message: '個人資料配置缺失或格式錯誤', severity: 'error' }]
    }
  }

  const validatedProfile: Profile = {
    name: typeof profile.name === 'string' ? profile.name : '千円',
    interests: typeof profile.interests === 'string' ? profile.interests : '遊戲 | 程式 | 僕咖 | 地偶',
    avatar: {
      src: profile.avatar?.src || 'https://img.senen.dev/IMG_20240704_135615_512x512.jpg',
      alt: profile.avatar?.alt || '個人頭像',
      fallback: profile.avatar?.fallback || '你'
    },
    background: {
      src: profile.background?.src || 'https://img.senen.dev/background_nekopara4_Chocola_Vanilla.jpg'
    }
  }

  if (!profile.name) {
    errors.push({ field: 'profile.name', message: '姓名缺失，使用預設值', severity: 'warning' })
  }
  if (!profile.interests) {
    errors.push({ field: 'profile.interests', message: '興趣描述缺失，使用預設值', severity: 'warning' })
  }
  if (!profile.avatar?.src) {
    errors.push({ field: 'profile.avatar.src', message: '頭像圖片缺失，使用預設值', severity: 'warning' })
  }

  return { profile: validatedProfile, errors }
}

/**
 * 驗證社交連結配置
 */
function validateSocialLinks(socialLinks: any): { socialLinks: SocialLink[]; errors: ConfigError[] } {
  const errors: ConfigError[] = []
  
  if (!Array.isArray(socialLinks)) {
    return {
      socialLinks: [],
      errors: [{ field: 'socialLinks', message: '社交連結必須是陣列格式', severity: 'error' }]
    }
  }

  const validatedLinks: SocialLink[] = []
  
  socialLinks.forEach((link, index) => {
    if (!link || typeof link !== 'object') {
      errors.push({ 
        field: `socialLinks[${index}]`, 
        message: '無效的社交連結格式', 
        severity: 'error' 
      })
      return
    }

    const validatedLink: SocialLink = {
      name: link.name || `連結 ${index + 1}`,
      icon: link.icon || 'globe',
      url: link.url || '#',
      color: link.color || 'hover:text-gray-500',
      type: ['link', 'copy', 'text'].includes(link.type) ? link.type : 'link'
    }

    if (!link.name) {
      errors.push({ 
        field: `socialLinks[${index}].name`, 
        message: '社交連結名稱缺失，使用預設值', 
        severity: 'warning' 
      })
    }
    if (!link.url) {
      errors.push({ 
        field: `socialLinks[${index}].url`, 
        message: '社交連結 URL 缺失，使用預設值', 
        severity: 'warning' 
      })
    }

    validatedLinks.push(validatedLink)
  })

  return { socialLinks: validatedLinks, errors }
}

/**
 * 驗證關於我配置
 */
function validateAbout(about: any): { about?: About; errors: ConfigError[] } {
  const errors: ConfigError[] = []
  
  if (!about || typeof about !== 'object') {
    return { about: undefined, errors: [] }
  }

  const validatedAbout: About = {
    story: typeof about.story === 'string' ? about.story : '我就是我，怎了？',
    skills: Array.isArray(about.skills) ? about.skills.filter((skill: any) => typeof skill === 'string') : []
  }

  if (!about.story) {
    errors.push({ field: 'about.story', message: '個人故事缺失，使用預設值', severity: 'warning' })
  }
  if (!Array.isArray(about.skills)) {
    errors.push({ field: 'about.skills', message: '技能列表格式錯誤，已過濾無效項目', severity: 'warning' })
  }

  return { about: validatedAbout, errors }
}

/**
 * 驗證標籤陣列
 */
function validateTags(tags: any, fieldName: string): { tags: Tag[]; errors: ConfigError[] } {
  const errors: ConfigError[] = []
  
  if (!tags) {
    return { tags: [], errors: [] }
  }
  
  if (!Array.isArray(tags)) {
    return {
      tags: [],
      errors: [{ field: fieldName, message: 'tags 必須是陣列格式', severity: 'error' }]
    }
  }

  const validatedTags: Tag[] = []
  
  tags.forEach((tag, index) => {
    if (!tag || typeof tag !== 'object') {
      errors.push({
        field: `${fieldName}[${index}]`,
        message: '無效的標籤格式',
        severity: 'error'
      })
      return
    }

    if (!tag.text || typeof tag.text !== 'string') {
      errors.push({
        field: `${fieldName}[${index}].text`,
        message: '標籤必須包含有效的 text 欄位',
        severity: 'error'
      })
      return
    }

    const validatedTag: Tag = {
      content: tag.text, // 注意：ContentCard 使用 content，不是 text
      variant: ['default', 'secondary', 'outline', 'destructive'].includes(tag.variant) 
        ? tag.variant : 'outline',
      style: ['normal', 'small'].includes(tag.style) ? tag.style : 'small'
    }

    validatedTags.push(validatedTag)
  })

  return { tags: validatedTags, errors }
}

/**
 * 驗證連結陣列
 */
function validateLinks(links: any, fieldName: string): { links: Link[]; errors: ConfigError[] } {
  const errors: ConfigError[] = []
  
  if (!links) {
    return { links: [], errors: [] }
  }
  
  if (!Array.isArray(links)) {
    return {
      links: [],
      errors: [{ field: fieldName, message: 'links 必須是陣列格式', severity: 'error' }]
    }
  }

  const validatedLinks: Link[] = []
  
  links.forEach((link, index) => {
    if (!link || typeof link !== 'object') {
      errors.push({
        field: `${fieldName}[${index}]`,
        message: '無效的連結格式',
        severity: 'error'
      })
      return
    }

    if (!link.text || typeof link.text !== 'string') {
      errors.push({
        field: `${fieldName}[${index}].text`,
        message: '連結必須包含有效的 text 欄位',
        severity: 'error'
      })
      return
    }

    if (!link.href || typeof link.href !== 'string') {
      errors.push({
        field: `${fieldName}[${index}].href`,
        message: '連結必須包含有效的 href 欄位',
        severity: 'error'
      })
      return
    }

    const validatedLink: Link = {
      content: link.text, // 注意：ContentCard 使用 content，不是 text
      href: link.href,
      variant: ['default', 'outline', 'secondary', 'ghost', 'link'].includes(link.variant)
        ? link.variant : 'outline',
      size: ['default', 'sm', 'lg'].includes(link.size) ? link.size : 'sm'
    }

    validatedLinks.push(validatedLink)
  })

  return { links: validatedLinks, errors }
}

/**
 * 驗證統一的內容項目 (用於 projects 和 games)
 */
function validateContentItems(items: any, type: 'projects' | 'games'): { items?: ContentItem[]; errors: ConfigError[] } {
  const errors: ConfigError[] = []
  
  if (!items) {
    return { items: undefined, errors: [] }
  }
  
  if (!Array.isArray(items)) {
    return {
      items: undefined,
      errors: [{ field: type, message: `${type === 'projects' ? '專案' : '遊戲'}列表必須是陣列格式`, severity: 'error' }]
    }
  }

  const validatedItems: ContentItem[] = []
  
  items.forEach((item, index) => {
    if (!item || typeof item !== 'object') {
      errors.push({ 
        field: `${type}[${index}]`, 
        message: `無效的${type === 'projects' ? '專案' : '遊戲'}格式`, 
        severity: 'error' 
      })
      return
    }

    if (!item.title || !item.description) {
      errors.push({
        field: `${type}[${index}]`,
        message: `${type === 'projects' ? '專案' : '遊戲'}缺少必要欄位 (title, description)`,
        severity: 'error'
      })
      return
    }

    // 驗證 tags
    const { errors: tagErrors } = validateTags(item.tags, `${type}[${index}].tags`)
    errors.push(...tagErrors)

    // 驗證 links
    const { errors: linkErrors } = validateLinks(item.links, `${type}[${index}].links`)
    errors.push(...linkErrors)

    // 直接按照 ContentItem 類型定義構建，配合類型系統
    const validatedItem: ContentItem = {
      title: item.title,
      description: item.description,
      ...(item.image_url && { image_url: item.image_url }),
      tags: item.tags ? item.tags.map((tag: any) => ({
        text: tag.text,
        variant: tag.variant,
        style: tag.style
      })) : undefined,
      links: item.links ? item.links.map((link: any) => ({
        text: link.text,
        href: link.href,
        variant: link.variant,
        size: link.size
      })) : undefined
    }

    validatedItems.push(validatedItem)
  })

  return { items: validatedItems, errors }
}

/**
 * 獲取預設個人資料
 */
function getDefaultProfile(): Profile {
  return {
    name: "千円",
    interests: "遊戲 | 程式 | 僕咖 | 地偶",
    avatar: {
      src: "https://img.senen.dev/IMG_20240704_135615_512x512.jpg",
      alt: "個人頭像",
      fallback: "你"
    },
    background: {
      src: "https://img.senen.dev/background_nekopara4_Chocola_Vanilla.jpg"
    }
  }
}

/**
 * 載入和驗證配置
 */
export async function loadConfig(): Promise<ConfigLoadResult> {
  const errors: ConfigError[] = []
  let rawData: any

  try {
    const response = await fetch('/config.json')
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    rawData = await response.json()
  } catch (error) {
    return {
      config: {
        profile: getDefaultProfile(),
        socialLinks: []
      },
      errors: [{
        field: 'config.json',
        message: `無法載入配置檔案: ${error instanceof Error ? error.message : '未知錯誤'}`,
        severity: 'error'
      }],
      isValid: false
    }
  }

  // 驗證各個部分
  const { profile, errors: profileErrors } = validateProfile(rawData.profile)
  const { socialLinks, errors: socialErrors } = validateSocialLinks(rawData.socialLinks)
  const { about, errors: aboutErrors } = validateAbout(rawData.about)
  const { items: projects, errors: projectErrors } = validateContentItems(rawData.projects, 'projects')
  const { items: games, errors: gameErrors } = validateContentItems(rawData.games, 'games')

  // 合併所有錯誤
  errors.push(...profileErrors, ...socialErrors, ...aboutErrors, ...projectErrors, ...gameErrors)

  // 建構最終配置
  const config: SiteConfig = {
    profile,
    socialLinks,
    ...(about && { about }),
    ...(projects && { projects }),
    ...(games && { games })
  }

  // 判斷是否有嚴重錯誤
  const hasErrors = errors.some(error => error.severity === 'error')

  return {
    config,
    errors,
    isValid: !hasErrors
  }
}

/**
 * 在開發模式下記錄配置錯誤和警告
 */
export function logConfigErrors(errors: ConfigError[]) {
  if (import.meta.env.DEV && errors.length > 0) {
    console.group('🔧 配置載入報告')
    
    const errorCount = errors.filter(e => e.severity === 'error').length
    const warningCount = errors.filter(e => e.severity === 'warning').length
    
    if (errorCount > 0) {
      console.error(`❌ ${errorCount} 個錯誤`)
      errors.filter(e => e.severity === 'error').forEach(error => {
        console.error(`  • ${error.field}: ${error.message}`)
      })
    }
    
    if (warningCount > 0) {
      console.warn(`⚠️ ${warningCount} 個警告`)
      errors.filter(e => e.severity === 'warning').forEach(error => {
        console.warn(`  • ${error.field}: ${error.message}`)
      })
    }
    
    console.groupEnd()
  }
}