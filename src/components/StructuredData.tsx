import { Helmet } from 'react-helmet-async'
import type { SiteConfig } from '@/types/config'

// 安全地序列化 JSON-LD 數據
function safeJsonStringify(data: unknown): string {
  try {
    // JSON.stringify 本身是安全的，但我們進行額外的驗證
    const jsonString = JSON.stringify(data)
    // 確保輸出是有效的 JSON
    JSON.parse(jsonString)
    return jsonString
  } catch (error) {
    console.error('Failed to serialize JSON-LD data:', error)
    // 返回空對象作為後備
    return JSON.stringify({})
  }
}

interface StructuredDataProps {
  readonly config: SiteConfig
}

export function StructuredData({ config }: StructuredDataProps) {
  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": config.profile.name,
    "description": config.about?.story || "個人網站",
    "image": config.profile.avatar.src,
    "url": "https://senen.dev",
    "jobTitle": "Developer & Gamer",
    "knowsAbout": config.about?.skills || [],
    "sameAs": config.socialLinks
      .filter(link => link.type === 'link')
      .map(link => link.url),
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "資訊系"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Developer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Taiwan"
      }
    }
  }

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "千円的個人網站",
    "alternateName": "千円 | Developer & Gamer",
    "url": "https://senen.dev",
    "description": "千円的個人網站 - 遊戲玩家 | 程式開發者 | 女僕咖啡廳 | 地下偶像。分享程式、遊戲和生活。",
    "inLanguage": "zh-TW",
    "author": {
      "@type": "Person",
      "name": config.profile.name,
      "url": "https://senen.dev"
    },
    "publisher": {
      "@type": "Person",
      "name": config.profile.name,
      "image": config.profile.avatar.src
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://senen.dev/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  // ProfilePage Schema
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": config.profile.name,
      "description": config.about?.story || "個人網站",
      "image": config.profile.avatar.src,
      "url": "https://senen.dev",
      "sameAs": config.socialLinks
        .filter(link => link.type === 'link')
        .map(link => link.url)
    },
    "dateCreated": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "url": "https://senen.dev",
    "inLanguage": "zh-TW"
  }

  // CreativeWork Schema for Projects
  const projectSchemas = config.projects?.map((project) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.description,
    "author": {
      "@type": "Person",
      "name": config.profile.name,
      "url": "https://senen.dev"
    },
    "programmingLanguage": project.tags?.map(tag => tag.text) || [],
    "url": project.links?.find(link => link.text === "查看")?.href,
    "codeRepository": project.links?.find(link => link.text === "程式碼")?.href,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any"
  })) || []

  // VideoGame Schema for Games
  const gameSchemas = config.games?.map(game => ({
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.description,
    "image": game.image_url,
    "genre": game.tags?.map(tag => tag.text) || [],
    "url": game.links?.find(link => link.href)?.href,
    "gamePlatform": game.tags
      ?.filter(tag => tag.text.includes('/') || ['Mobile', 'PC', 'PS5'].includes(tag.text))
      .map(tag => tag.text) || [],
    "playMode": "SinglePlayer"
  })) || []

  // Combine all schemas
  const structuredData = [
    personSchema,
    websiteSchema,
    profilePageSchema,
    ...projectSchemas,
    ...gameSchemas
  ]

  return (
    <Helmet>
      {structuredData.map((schema, index) => (
        <script
          key={`${schema["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonStringify(schema)
          }}
        />
      ))}
    </Helmet>
  )
}