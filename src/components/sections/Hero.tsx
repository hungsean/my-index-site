import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import type { SiteConfig, SocialLink } from '@/types/config'
import { validateUrl, validateDiscordUsername } from '@/lib/url-validation'
import { 
  BsGithub, 
  BsTwitterX, 
  BsLinkedin, 
  BsInstagram, 
  BsDiscord, 
  BsEnvelope, 
  BsGlobe,
  BsFacebook,
  BsTelegram,
  BsWhatsapp,
  BsThreads
} from "react-icons/bs";

interface HeroProps {
  config: SiteConfig
}

export function Hero({ config }: Readonly<HeroProps>) {
  // 處理不同類型的點擊事件
  const handleSocialClick = async (social: SocialLink) => {
    switch (social.type) {
      case 'link': {
        // 使用安全的 URL 開啟
        const validation = validateUrl(social.url)
        if (!validation.isValid || !validation.isSafe) {
          toast.error('不安全的連結', {
            description: validation.error,
          });
          return;
        }
        // 連結會由 <a> 標籤處理，但我們已經驗證過了
        break;
      }
      case 'copy':
        try {
          // 對於 Discord，特別驗證用戶名格式
          if (social.icon.toLowerCase() === 'discord') {
            if (!validateDiscordUsername(social.url)) {
              toast.error('Discord 用戶名格式錯誤', {
                description: '請確認用戶名格式正確',
              });
              return;
            }
          }

          await navigator.clipboard.writeText(social.url);
          toast.success(`已複製 ${social.name}`, {
            description: social.url,
          });
        } catch (err) {
          console.error('複製失敗:', err);
          toast.error('複製失敗', {
            description: '請手動複製',
          });
        }
        break;
      case 'text':
        toast.info(social.name, {
          description: social.url,
        });
        break;
    }
  };

  // 圖標映射 - 將設定檔中的 icon 名稱映射到實際的 Bootstrap Icons
  const iconMap = {
    // 社群平台
    'github': BsGithub,
    'twitter': BsTwitterX, // Twitter 現在使用 X 圖標
    'x': BsTwitterX,
    'linkedin': BsLinkedin,
    'instagram': BsInstagram,
    'facebook': BsFacebook,
    'threads': BsThreads,
    'discord': BsDiscord,
    'telegram': BsTelegram,
    'whatsapp': BsWhatsapp,
    
    // 聯絡方式
    'email': BsEnvelope,
    'mail': BsEnvelope,
    
    // 通用
    'website': BsGlobe,
    'blog': BsGlobe,
    'portfolio': BsGlobe,
    'globe': BsGlobe,
    
    // 兼容性：保持原有的大寫格式
    'Github': BsGithub,
    'Twitter': BsTwitterX,
    'Linkedin': BsLinkedin,
    'Mail': BsEnvelope,
    'Instagram': BsInstagram,
    'MessageCircle': BsDiscord, // 將 MessageCircle 映射到 Discord 圖標
    'Globe': BsGlobe
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {/* 頭像區域 */}
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
            {config.socialLinks.map((social) => {
              const IconComponent = iconMap[social.icon.toLowerCase() as keyof typeof iconMap] || iconMap[social.icon as keyof typeof iconMap] || BsGlobe
              
              if (social.type === 'link') {
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform backdrop-blur-sm text-xs sm:text-sm"
                    asChild
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                      aria-label={`前往 ${social.name} (在新分頁開啟)`}
                      onClick={(e) => {
                        const validation = validateUrl(social.url)
                        if (!validation.isValid || !validation.isSafe) {
                          e.preventDefault()
                          handleSocialClick(social)
                        }
                      }}
                    >
                      <IconComponent
                        className={`h-5 w-5 flex-shrink-0 ${social.color || ''}`}
                        aria-hidden="true"
                      />
                      <span className="font-medium">{social.name}</span>
                    </a>
                  </Button>
                )
              } else {
                const actionText = social.type === 'copy' ? '複製' : '顯示'
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform backdrop-blur-sm text-xs sm:text-sm"
                    onClick={() => handleSocialClick(social)}
                    aria-label={`${actionText} ${social.name} 資訊`}
                  >
                    <IconComponent
                      className={`h-5 w-5 flex-shrink-0 mr-2 ${social.color || ''}`}
                      aria-hidden="true"
                    />
                    <span className="font-medium">{social.name}</span>
                  </Button>
                )
              }
            })}
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