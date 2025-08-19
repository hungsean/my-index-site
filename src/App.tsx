import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Toaster } from '@/components/ui/sonner'
import { Github, Twitter, Linkedin, Mail, Instagram, MessageCircle, Moon, Sun } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="fixed top-4 right-4 z-20 backdrop-blur-md bg-card/70 border-border/20"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">切換主題</span>
    </Button>
  )
}

function App() {
  // Dialog 狀態管理
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState('')

  // 處理不同類型的點擊事件
  const handleSocialClick = async (social: typeof socialLinks[0]) => {
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

  // 社交媒體連結配置
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/yourusername',
      color: 'hover:text-gray-800 dark:hover:text-gray-300',
      type: 'link' as const
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/yourusername',
      color: 'hover:text-blue-400',
      type: 'link' as const
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-blue-600',
      type: 'link' as const
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/yourusername',
      color: 'hover:text-pink-400',
      type: 'link' as const
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'yourUsername#1234',
      color: 'hover:text-purple-400',
      type: 'copy' as const
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:your.email@example.com',
      color: 'hover:text-green-400',
      type: 'link' as const
    },
    {
      name: '我的網站',
      icon: () => <span className="text-lg">🌐</span>,
      url: '就是這個網站！',
      color: 'hover:text-orange-400',
      type: 'text' as const
    }
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* 主題切換按鈕 */}
      <ThemeToggle />
      {/* 背景圖片層 - 固定不捲動 */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(https://img.senen.dev/background_nekopara4_Chocola_Vanilla.jpg)',
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
                  src="https://img.senen.dev/IMG_20240704_135615_512x512.jpg" 
                  alt="個人頭像" 
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  你
                </AvatarFallback>
              </Avatar>
              
              {/* 姓名區域 */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  千円
                </h1>
                
                {/* 興趣標籤 */}
                <p className="text-lg text-muted-foreground font-medium">
                  遊戲 | 程式 | 僕咖 | 地偶
                </p>
              </div>
            </div>
            
            {/* 社交媒體按鈕組 - 垂直排列 */}
            <div className="space-y-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                
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