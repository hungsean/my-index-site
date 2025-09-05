import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BsEnvelope, BsDiscord, BsCupHot } from 'react-icons/bs'
import type { SiteConfig } from '@/types/config'

interface ContactProps {
  config: SiteConfig
}

export function Contact({ config }: ContactProps) {
  // 從 socialLinks 中找到 email 和 discord
  const emailLink = config.socialLinks.find(link => 
    link.icon.toLowerCase() === 'email' || link.icon.toLowerCase() === 'mail'
  )
  const discordLink = config.socialLinks.find(link => 
    link.icon.toLowerCase() === 'discord'
  )

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4">聯絡我</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            歡迎與我交流技術、合作機會或單純聊聊
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* 電子郵件 */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BsEnvelope className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>電子郵件</CardTitle>
              <CardDescription>快速聯絡的最佳方式</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a href={emailLink ? `mailto:${emailLink.url}` : 'mailto:your.email@example.com'}>
                  發送郵件
                </a>
              </Button>
            </CardContent>
          </Card>
          
          {/* Discord */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BsDiscord className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>即時訊息</CardTitle>
              <CardDescription>透過 Discord 聊天</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  if (discordLink && discordLink.type === 'copy') {
                    navigator.clipboard.writeText(discordLink.url)
                  }
                }}
              >
                {discordLink ? `複製 Discord: ${discordLink.url}` : '開始對話'}
              </Button>
            </CardContent>
          </Card>
          
          {/* 面對面交流 */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BsCupHot className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>面對面交流</CardTitle>
              <CardDescription>台北地區歡迎約咖啡聊天</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a href={emailLink ? `mailto:${emailLink.url}?subject=咖啡聊天邀請` : 'mailto:your.email@example.com?subject=咖啡聊天邀請'}>
                  約個咖啡
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            感謝您花時間了解我！期待與您的交流。
          </p>
          <Button 
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            回到頂部
          </Button>
        </div>
      </div>
    </section>
  )
}