import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Github, Twitter, Linkedin, Mail, Instagram, MessageCircle } from 'lucide-react'

function App() {
  // 社交媒體連結配置
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/yourusername',
      color: 'hover:text-gray-300'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/yourusername',
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/yourusername',
      color: 'hover:text-pink-400'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: '#',
      color: 'hover:text-purple-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:your.email@example.com',
      color: 'hover:text-green-400'
    }
  ]

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* 背景圖片層 - 固定不捲動 */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(https://img.senen.dev/background_nekopara4_Chocola_Vanilla.jpg)',
        }}
      >
        {/* 背景遮罩 */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
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
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App