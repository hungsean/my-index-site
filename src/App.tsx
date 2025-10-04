import { Toaster } from '@/components/ui/sonner'
import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import type { SiteConfig } from '@/types/config'
import { loadConfig, logConfigErrors, type ConfigError } from '@/lib/config-loader'
import { BsMoonStars, BsSun } from "react-icons/bs"
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Games } from './components/sections/Games'
import { Contact } from './components/sections/Contact'
import { Button } from '@/components/ui/button'
import { StructuredData } from './components/StructuredData'
import ErrorBoundary from './components/ErrorBoundary'
import { useImagePreloader } from '@/hooks/useImagePreloader'
import { LoadingScreen } from '@/components/LoadingScreen'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="fixed top-4 right-4 z-20 backdrop-blur-md bg-card/70 border-border/20"
      aria-label={`切換到${theme === 'light' ? '深色' : '淺色'}主題`}
      title={`目前: ${theme === 'light' ? '淺色' : '深色'}主題，點擊切換`}
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
  const [showMainContent, setShowMainContent] = useState(false)

  // 圖片預載入
  const { progress, isLoading: isPreloading } = useImagePreloader(config)

  // 載入配置文件
  useEffect(() => {
    const loadAppConfig = async () => {
      try {
        setLoading(true)
        const result = await loadConfig()
        setConfig(result.config)
        setErrors(result.errors)

        // 在開發模式下記錄錯誤和警告
        logConfigErrors(result.errors)
      } catch (err) {
        console.error('配置載入失敗:', err)
        setErrors([{
          field: 'system',
          message: err instanceof Error ? err.message : '未知錯誤',
          severity: 'error'
        }])
      } finally {
        setLoading(false)
      }
    }

    loadAppConfig()
  }, [])

  // 如果正在載入配置或預載圖片，顯示載入畫面
  if (loading || isPreloading || !showMainContent) {
    return (
      <HelmetProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {loading ? (
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-muted-foreground">載入設定檔...</p>
              </div>
            </div>
          ) : (
            <LoadingScreen
              percentage={progress.percentage}
              onLoadComplete={() => setShowMainContent(true)}
              configErrors={errors}
              isDev={import.meta.env.DEV}
            />
          )}
        </ThemeProvider>
      </HelmetProvider>
    )
  }

  // 確保配置存在（config-loader 已經提供預設值）
  if (!config) {
    return (
      <HelmetProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center space-y-4">
              <p className="text-destructive">配置載入失敗</p>
            </div>
          </div>
        </ThemeProvider>
      </HelmetProvider>
    )
  }

  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <motion.div
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* SEO結構化資料 */}
          <StructuredData config={config} />

          {/* 主題切換按鈕 */}
          <ThemeToggle />

          {/* 主要內容區域 - 使用 Error Boundary 保護每個 section */}
          <ErrorBoundary name="Hero Section">
            <Hero config={config} />
          </ErrorBoundary>

          <ErrorBoundary name="About Section">
            <About config={config} />
          </ErrorBoundary>

          <ErrorBoundary name="Projects Section">
            <Projects config={config} />
          </ErrorBoundary>

          <ErrorBoundary name="Games Section">
            <Games config={config} />
          </ErrorBoundary>

          <ErrorBoundary name="Contact Section">
            <Contact config={config} />
          </ErrorBoundary>

          {/* Toast 通知 */}
          <Toaster />
        </motion.div>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App