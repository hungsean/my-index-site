import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BsGithub, BsBoxArrowUpRight } from 'react-icons/bs'
import { ImageWithFallback } from '../ImageWithFallback'
import type { SiteConfig } from '@/types/config'
import { useState } from 'react'

interface ProjectsProps {
  config: SiteConfig
}


export function Projects({ config }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false)
  
  // 預設專案，如果配置檔案沒有則使用這些
  const defaultProjects = [
    {
      title: "電商網站平台",
      description: "完整的電商解決方案，包含購物車、支付系統和管理後台",
      image_url: "https://images.unsplash.com/800x600/?ecommerce+platform",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "任務管理應用",
      description: "團隊協作的任務管理工具，支援即時更新和通知功能",
      image_url: "https://images.unsplash.com/800x600/?task+management+app",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "天氣預報應用",
      description: "美觀的天氣預報應用，提供詳細的氣象資訊和預測",
      image_url: "https://images.unsplash.com/800x600/?weather+app",
      technologies: ["React", "Tailwind CSS", "Weather API"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "社交媒體儀表板",
      description: "統一管理多個社交媒體平台的分析和發佈工具",
      image_url: "https://images.unsplash.com/800x600/?social+media+dashboard",
      technologies: ["React", "Chart.js", "REST API", "OAuth"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "線上學習平台",
      description: "互動式的線上學習系統，支援影片課程和即時測驗",
      image_url: "https://images.unsplash.com/800x600/?online+learning+platform",
      technologies: ["Vue.js", "Express", "MySQL", "WebRTC"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "投資組合追蹤器",
      description: "即時追蹤股票和加密貨幣投資組合的分析工具",
      image_url: "https://images.unsplash.com/800x600/?investment+portfolio+tracker",
      technologies: ["React", "D3.js", "Firebase", "Financial API"],
      githubUrl: "#",
      liveUrl: "#"
    }
  ]

  const projects = config.projects || defaultProjects
  const displayProjects = showAll ? projects : projects.slice(0, 3)
  const hasMoreProjects = projects.length > 3

  // 如果沒有專案要顯示，就不渲染這個節區
  if (!projects.length) return null

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
          {displayProjects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <BsGithub className="w-4 h-4 mr-1" />
                        代碼
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <BsBoxArrowUpRight className="w-4 h-4 mr-1" />
                        查看
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {hasMoreProjects && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="px-8"
            >
              {showAll ? '顯示較少' : '查看更多專案'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}