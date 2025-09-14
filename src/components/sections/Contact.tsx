import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BsEnvelope, BsDiscord, BsInstagram } from 'react-icons/bs'
import { toast } from 'sonner'
import type { SiteConfig } from '@/types/config'

interface ContactProps {
  config: SiteConfig
}

export function Contact({ config }: ContactProps) {
  // 從 socialLinks 中找到 email、discord 和 instagram
  const emailLink = config.socialLinks.find(link =>
    link.icon.toLowerCase() === 'email' || link.icon.toLowerCase() === 'mail'
  )
  const discordLink = config.socialLinks.find(link =>
    link.icon.toLowerCase() === 'discord'
  )
  const instagramLinks = config.socialLinks.filter(link =>
    link.icon.toLowerCase() === 'instagram'
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
          <Card className="text-center hover:shadow-lg transition-shadow flex flex-col justify-center">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <BsEnvelope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
          <Card className="text-center hover:shadow-lg transition-shadow flex flex-col justify-center">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-4">
                <BsDiscord className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle>即時訊息</CardTitle>
              <CardDescription>透過 Discord 聊天</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                  if (discordLink && discordLink.type === 'copy') {
                    try {
                      await navigator.clipboard.writeText(discordLink.url)
                      toast.success('Discord ID 已複製到剪貼板！', {
                        description: `已複製: ${discordLink.url}`
                      })
                    } catch (err) {
                      toast.error('複製失敗', {
                        description: '請手動複製 Discord ID'
                      });
                      console.error(err);
                    }
                  }
                }}
              >
                {discordLink ? `複製 Discord: ${discordLink.url}` : '開始對話'}
              </Button>
            </CardContent>
          </Card>

          {/* Instagram 日常分享 */}
          <Card className="text-center hover:shadow-lg transition-shadow flex flex-col justify-center">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mx-auto mb-4">
                <BsInstagram className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <CardTitle>日常生活</CardTitle>
              <CardDescription>了解我的日常與興趣愛好</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center space-y-2">
              {instagramLinks.length > 0 ? (
                instagramLinks.map((link, index) => (
                  <Button key={index} variant="outline" asChild className="w-full">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  </Button>
                ))
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Instagram 帳號
                </Button>
              )}
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