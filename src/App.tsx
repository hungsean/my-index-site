import { Toaster } from '@/components/ui/sonner'
import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import type { SiteConfig } from '@/types/config'
import { loadConfig, logConfigErrors, type ConfigError } from '@/lib/config-loader'
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
  const [errors, setErrors] = useState<ConfigError[]>([])
  const [isValid, setIsValid] = useState(true)

  // 載入配置文件
  useEffect(() => {
    const loadAppConfig = async () => {
      try {
        setLoading(true)
        const result = await loadConfig()
        setConfig(result.config)
        setErrors(result.errors)
        setIsValid(result.isValid)
        
        // 在開發模式下記錄錯誤和警告
        logConfigErrors(result.errors)
      } catch (err) {
        console.error('配置載入失敗:', err)
        setErrors([{
          field: 'system',
          message: err instanceof Error ? err.message : '未知錯誤',
          severity: 'error'
        }])
        setIsValid(false)
      } finally {
        setLoading(false)
      }
    }

    loadAppConfig()
  }, [])

  // 獲取錯誤訊息顯示
  const getErrorMessage = () => {
    const errorMessages = errors.filter(e => e.severity === 'error')
    if (errorMessages.length === 0) return null
    
    if (errorMessages.length === 1) {
      return errorMessages[0].message
    }
    
    return `發現 ${errorMessages.length} 個配置錯誤`
  }

  const hasWarnings = errors.some(e => e.severity === 'warning')

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

  // 確保配置存在（config-loader 已經提供預設值）
  if (!config) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <p className="text-destructive">配置載入失敗</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen">
        {/* 主題切換按鈕 */}
        <ThemeToggle />
        
        {/* 錯誤和警告提示 */}
        {getErrorMessage() && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-3 bg-destructive/10 border border-destructive/20 rounded-lg max-w-md">
            <p className="text-sm text-destructive text-center">
              {getErrorMessage()}
            </p>
            {!isValid && (
              <p className="text-xs text-muted-foreground text-center mt-1">
                使用預設配置或部分功能可能受影響
              </p>
            )}
          </div>
        )}
        
        {/* 開發模式警告提示 */}
        {hasWarnings && import.meta.env.DEV && (
          <div className="fixed top-32 left-1/2 transform -translate-x-1/2 z-40 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg max-w-md">
            <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center">
              配置有警告，請檢查控制台
            </p>
          </div>
        )}
        
        {/* 主要內容區域 */}
        <Hero config={config} />
        <About config={config} />
        <Projects config={config} />
        <Games config={config} />
        <Contact config={config} />

        {/* Toast 通知 */}
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App