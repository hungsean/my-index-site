import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BsGithub, BsBoxArrowUpRight } from 'react-icons/bs'
import { ImageWithFallback } from '../ImageWithFallback'
import type { SiteConfig } from '@/types/config'

interface ProjectsProps {
  config: SiteConfig
}

// 擴展配置類型以包含 projects 資訊
interface ExtendedConfig extends SiteConfig {
  projects?: Array<{
    title: string
    description: string
    image: string
    technologies: string[]
    githubUrl?: string
    liveUrl?: string
  }>
}

export function Projects({ config }: ProjectsProps) {
  const extendedConfig = config as ExtendedConfig
  
  // 預設專案，如果配置檔案沒有則使用這些
  const defaultProjects = [
    {
      title: "電商網站平台",
      description: "完整的電商解決方案，包含購物車、支付系統和管理後台",
      image: "ecommerce platform",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "任務管理應用",
      description: "團隊協作的任務管理工具，支援即時更新和通知功能",
      image: "task management app",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "天氣預報應用",
      description: "美觀的天氣預報應用，提供詳細的氣象資訊和預測",
      image: "weather app",
      technologies: ["React", "Tailwind CSS", "Weather API"],
      githubUrl: "#",
      liveUrl: "#"
    }
  ]

  const projects = extendedConfig.projects || defaultProjects

  // 如果沒有專案要顯示，就不渲染這個節區
  if (!projects.length) return null

  return (
    <section id="projects" className="py-20 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">我的專案</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            一些我參與開發和負責的專案作品
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={`https://images.unsplash.com/800x600/?${project.image.replace(' ', '+')}`}
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
      </div>
    </section>
  )
}