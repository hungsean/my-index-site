import { Button } from '@/components/ui/button'
import { ContentCard, type Tag, type Link } from '../ContentCard'
import type { SiteConfig } from '@/types/config'
import { useState, useMemo } from 'react'
import { validateUrl } from '@/lib/url-validation'

interface ProjectsProps {
  config: SiteConfig
}


export function Projects({ config }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false)
  
  // 使用 useMemo 緩存預設專案，避免每次渲染重新創建
  const defaultProjects = useMemo(() => [
    {
      title: "電商網站平台",
      description: "完整的電商解決方案，包含購物車、支付系統和管理後台",
      image_url: "https://images.unsplash.com/800x600/?ecommerce+platform",
      tags: [
        { text: "React", variant: "outline" },
        { text: "Node.js", variant: "outline" },
        { text: "MongoDB", variant: "outline" },
        { text: "Stripe", variant: "outline" }
      ],
      links: [
        { text: "代碼", href: "#", variant: "outline" },
        { text: "查看", href: "#", variant: "default" }
      ]
    },
    {
      title: "任務管理應用",
      description: "團隊協作的任務管理工具，支援即時更新和通知功能",
      image_url: "https://images.unsplash.com/800x600/?task+management+app",
      tags: [
        { text: "Next.js", variant: "outline" },
        { text: "TypeScript", variant: "outline" },
        { text: "PostgreSQL", variant: "outline" },
        { text: "Socket.io", variant: "outline" }
      ],
      links: [
        { text: "代碼", href: "#", variant: "outline" },
        { text: "查看", href: "#", variant: "default" }
      ]
    },
    {
      title: "天氣預報應用",
      description: "美觀的天氣預報應用，提供詳細的氣象資訊和預測",
      image_url: "https://images.unsplash.com/800x600/?weather+app",
      tags: [
        { text: "React", variant: "outline" },
        { text: "Tailwind CSS", variant: "outline" },
        { text: "Weather API", variant: "outline" }
      ],
      links: [
        { text: "代碼", href: "#", variant: "outline" },
        { text: "查看", href: "#", variant: "default" }
      ]
    }
  ], [])

  // 使用 useMemo 優化 projects 數據處理
  const processedProjects = useMemo(() => {
    const projects = config.projects || defaultProjects

    // 驗證每個項目的 URL
    const validatedProjects = projects.map(project => ({
      ...project,
      links: project.links?.map(link => {
        const validation = validateUrl(link.href)
        if (!validation.isValid || !validation.isSafe) {
          console.warn(`Invalid URL in project "${project.title}":`, link.href, validation.error)
          return { ...link, href: '#', disabled: true }
        }
        return link
      }) || []
    }))

    return {
      projects: validatedProjects,
      displayProjects: showAll ? validatedProjects : validatedProjects.slice(0, 3),
      hasMoreProjects: validatedProjects.length > 3
    }
  }, [config.projects, showAll, defaultProjects])

  // 如果沒有專案要顯示，就不渲染這個節區
  if (!processedProjects.projects.length) return null

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4">我的專案</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            一些我參與開發和負責的專案作品
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {processedProjects.displayProjects.map((project, index) => {
            // 直接處理 tags 和 links 轉換，不在 map 中使用 useMemo
            const contentCardTags: Tag[] = project.tags?.map((tag: { text: string; variant?: string; style?: string }) => ({
              content: tag.text,
              variant: (tag.variant as Tag['variant']) || 'outline',
              style: (tag.style as Tag['style']) || 'small'
            })) || []

            const contentCardLinks: Link[] = project.links?.map((link: { text: string; href: string; variant?: string; size?: string; disabled?: boolean }) => ({
              content: link.text,
              href: link.href,
              variant: (link.variant as Link['variant']) || 'outline',
              size: (link.size as Link['size']) || 'sm',
              disabled: link.disabled
            })) || []

            return (
              <ContentCard
                key={`project-${project.title}-${index}`}
                image_url={project.image_url}
                title={project.title}
                description={project.description}
                tags={contentCardTags}
                links={contentCardLinks}
              />
            )
          })}
        </div>
        
        {processedProjects.hasMoreProjects && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="px-8"
              aria-label={showAll ? '收起部分專案項目' : `顯示全部 ${processedProjects.projects.length} 個專案項目`}
            >
              {showAll ? '顯示較少' : '查看更多專案'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}