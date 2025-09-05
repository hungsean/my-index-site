import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SiteConfig } from '@/types/config'

interface AboutProps {
  config: SiteConfig
}

// 擴展配置類型以包含 about 資訊（暫時用預設值）
interface ExtendedConfig extends SiteConfig {
  about?: {
    story?: string
    skills?: string[]
  }
}

export function About({ config }: AboutProps) {
  const extendedConfig = config as ExtendedConfig
  
  // 預設內容，如果配置檔案沒有則使用這些
  const defaultStory = `我是一名充滿熱情的全端開發者，專注於創建優雅且實用的網路應用程式。
擁有豐富的前端和後端開發經驗，喜歡探索新技術並將其應用到實際專案中。

除了程式開發之外，我也熱愛遊戲、設計和創意工作。
相信技術應該服務於人，創造更好的使用者體驗。

目前專注於 React 生態系統和雲端技術，
持續學習新的工具和框架來提升開發效率。`

  const defaultSkills = [
    "React", "TypeScript", "Node.js", "Python", "Next.js", 
    "Tailwind CSS", "MongoDB", "PostgreSQL", "AWS", "Docker"
  ]

  const story = extendedConfig.about?.story || defaultStory
  const skills = extendedConfig.about?.skills || defaultSkills

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4">關於我</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            熱愛技術創新和問題解決的開發者
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
          <Card>
            <CardHeader>
              <CardTitle>我的故事</CardTitle>
              <CardDescription>從學生到專業開發者的旅程</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {story.split('\n\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>技能專長</CardTitle>
              <CardDescription>我擅長的技術和工具</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}