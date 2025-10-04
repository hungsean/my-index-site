import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LinksButton } from '@/components/LinksButton'
import type { SiteConfig } from '@/types/config'

interface HeroProps {
  config: SiteConfig
}

export function Hero({ config }: Readonly<HeroProps>) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {/* 頭像區域 */}
            {/* TODO: 優化圖片載入速度 - 頭像為首屏關鍵元素，應設定為 priority 預載 */}
            <div className="mb-6 flex justify-center">
              <Avatar className="w-24 h-24 sm:w-28 md:w-32 sm:h-28 md:h-32 ring-4 ring-primary/20">
                <AvatarImage
                  src={config.profile.avatar.src}
                  alt={config.profile.avatar.alt}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                  {config.profile.avatar.fallback}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* 名稱和介紹 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-bold">
              你好，我是 {config.profile.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-medium">
              {config.profile.interests}
            </p>
          </div>

          {/* 社交媒體按鈕組 - 橫向排列 */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8">
            {config.socialLinks.map((social) => (
              <LinksButton
                key={social.name}
                name={social.name}
                url={social.url}
                type={social.type}
                icon={social.icon}
                color={social.color}
                variant="outline"
                size="sm"
                className="backdrop-blur-sm text-xs sm:text-sm"
              />
            ))}
          </div>

          {/* 了解更多按鈕 */}
          <Button
            size="lg"
            className="animate-bounce focus:animate-none"
            onClick={() => {
              const aboutSection = document.getElementById("about")
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" })
                // 在滾動完成後將焦點移到該區域
                setTimeout(() => {
                  aboutSection.setAttribute('tabindex', '-1')
                  aboutSection.focus()
                }, 800)
              }
            }}
            aria-label="向下滾動到關於我的區域"
          >
            了解更多關於我
          </Button>
      </div>
    </section>
  )
}
