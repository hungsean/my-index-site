import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import type { SiteConfig, SocialLink } from '@/types/config'
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
  BsMoonStars,
  BsSun,
  BsThreads
} from "react-icons/bs";

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="fixed top-4 right-4 z-20 backdrop-blur-md bg-card/70 border-border/20"
    >
      <BsSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <BsMoonStars className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">切換主題</span>
    </Button>
  )
}

function App() {
  // 狀態管理
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState('')

  // 載入配置文件
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true)
        const response = await fetch('/config.json')
        if (!response.ok) {
          throw new Error('無法載入配置文件')
        }
        const data = await response.json()
        setConfig(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '載入配置失敗')
        console.error('載入配置失敗:', err)
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  // 處理不同類型的點擊事件
  const handleSocialClick = async (social: SocialLink) => {
    switch (social.type) {
      case 'link':
        // 正常連結會由 <a> 標籤處理
        break;
      case 'copy':
        try {
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
        setDialogContent(social.url);
        setDialogOpen(true);
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

  // 預設配置（當載入失敗時使用）
  const defaultConfig: SiteConfig = {
    profile: {
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
    },
    socialLinks: []
  }

  // 如果正在載入，顯示載入動畫
  if (loading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">載入中...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  // 使用配置或預設值
  const currentConfig = config || defaultConfig

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* 主題切換按鈕 */}
      <ThemeToggle />
      {/* 背景圖片層 - 固定不捲動 */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(${currentConfig.profile.background.src})`,
        }}
      >
        {/* 背景遮罩 - 根據主題調整顏色 */}
        <div className="absolute inset-0 bg-white/40 dark:bg-black/30 backdrop-blur-sm" />
      </div>
      
      {/* 內容層 */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <Card className="backdrop-blur-md bg-card/70 border-border/20">
          <CardContent className="pt-8 pb-6 px-6">
            {/* 頭像和基本資訊區域 */}
            <div className="flex flex-col items-center space-y-4 mb-6">
              <Avatar className="w-32 h-32 ring-4 ring-primary/20">
                <AvatarImage 
                  src={currentConfig.profile.avatar.src} 
                  alt={currentConfig.profile.avatar.alt} 
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {currentConfig.profile.avatar.fallback}
                </AvatarFallback>
              </Avatar>
              
              {/* 姓名區域 */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {currentConfig.profile.name}
                </h1>
                
                {/* 興趣標籤 */}
                <p className="text-lg text-muted-foreground font-medium">
                  {currentConfig.profile.interests}
                </p>
              </div>
            </div>
            
            {/* 錯誤提示 */}
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive text-center">
                  {error}
                </p>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  使用預設配置
                </p>
              </div>
            )}
            
            {/* 社交媒體按鈕組 - 垂直排列 */}
            <div className="space-y-3">
              {currentConfig.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon.toLowerCase() as keyof typeof iconMap] || iconMap[social.icon as keyof typeof iconMap] || BsGlobe
                
                if (social.type === 'link') {
                  return (
                    <Button
                      key={social.name}
                      variant="outline"
                      className={`w-full justify-start gap-3 h-12 transition-all duration-200 ${social.color} hover:scale-105 backdrop-blur-sm`}
                      asChild
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <IconComponent className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{social.name}</span>
                      </a>
                    </Button>
                  )
                } else {
                  return (
                    <Button
                      key={social.name}
                      variant="outline"
                      className={`w-full justify-start gap-3 h-12 transition-all duration-200 ${social.color} hover:scale-105 backdrop-blur-sm`}
                      onClick={() => handleSocialClick(social)}
                    >
                      <IconComponent className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{social.name}</span>
                    </Button>
                  )
                }
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog 彈窗 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>我的網站</DialogTitle>
            <DialogDescription>
              {dialogContent}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Toast 通知 */}
      <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App