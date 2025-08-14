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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-8 pb-6 px-6">
          {/* 頭像區域 */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage 
                src="/placeholder-avatar.jpg" 
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
                你的名字
              </h1>
              
              {/* 興趣標籤 */}
              <p className="text-lg text-muted-foreground font-medium">
                遊戲 | 程式 | 僕咖 | 地偶
              </p>
            </div>
            
            {/* 社交媒體按鈕組 */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className={`transition-colors duration-200 ${social.color}`}
                    asChild
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App