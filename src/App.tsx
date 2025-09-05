import { Toaster } from '@/components/ui/sonner'
import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import type { SiteConfig } from '@/types/config'
import { BsMoonStars, BsSun } from "react-icons/bs"
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Games } from './components/sections/Games'
import { Contact } from './components/sections/Contact'
import { Button } from '@/components/ui/button'

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
      <div className="min-h-screen">
        {/* 主題切換按鈕 */}
        <ThemeToggle />
        
        {/* 錯誤提示 */}
        {error && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive text-center">
              {error}
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              使用預設配置
            </p>
          </div>
        )}
        
        {/* 主要內容區域 */}
        <Hero config={currentConfig} />
        <About config={currentConfig} />
        <Projects config={currentConfig} />
        <Games config={currentConfig} />
        <Contact config={currentConfig} />

        {/* Toast 通知 */}
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App