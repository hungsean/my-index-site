import { useSpring, motion, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsCheckCircleFill, BsExclamationTriangleFill } from 'react-icons/bs'
import type { ConfigError } from '@/lib/config-loader'

interface LoadingScreenProps {
  percentage: number
  onLoadComplete?: () => void
  configErrors?: ConfigError[]
  isDev?: boolean
}

export function LoadingScreen({ percentage, onLoadComplete, configErrors = [], isDev = false }: Readonly<LoadingScreenProps>) {
  const [startTime] = useState(Date.now())
  const [showSuccess, setShowSuccess] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  const hasErrors = configErrors.some(e => e.severity === 'error')
  const hasWarnings = configErrors.some(e => e.severity === 'warning')

  const smoothPercentage = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const width = useTransform(smoothPercentage, (v) => `${v}%`)

  useEffect(() => {
    smoothPercentage.set(percentage)
  }, [percentage, smoothPercentage])

  // 1 秒後才顯示載入畫面
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (percentage >= 100) {
      // 如果有錯誤，停在 loading 畫面不跳轉
      if (hasErrors) {
        return
      }

      const loadTime = Date.now() - startTime

      // < 1s: 直接進入（不顯示載入畫面）
      if (loadTime < 1000) {
        onLoadComplete?.()
        return
      }

      // 1-2s: 顯示載入畫面但直接離開
      if (loadTime < 3000) {
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => onLoadComplete?.(), 800)
        }, 300)
        return
      }

      // > 2s: 顯示成功動畫
      setShowSuccess(true)
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => onLoadComplete?.(), 800)
      }, 1200)
    }
  }, [percentage, startTime, onLoadComplete, hasErrors])


  // 1 秒內或有錯誤時不顯示載入畫面
  if (!shouldRender && !hasErrors) {
    return null
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 1.1 : 1
      }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <motion.div
        className="w-full max-w-md px-8 space-y-6"
        animate={{
          y: isExiting ? -20 : 0,
          opacity: isExiting ? 0 : 1
        }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo 或標題區域 */}
        <div className="text-center space-y-2">
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            animate={showSuccess ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            千円
          </motion.h1>
          <AnimatePresence mode="wait">
            {!showSuccess ? (
              <motion.p
                key="loading"
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                載入中,請稍候...
              </motion.p>
            ) : (
              <motion.p
                key="success"
                className="text-sm text-primary font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                載入完成!
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 載入動畫 - 旋轉圓圈 / 成功圖示 */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!showSuccess ? (
              <motion.div
                key="spinner"
                className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"
                exit={{ opacity: 0, scale: 0.8 }}
              />
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <BsCheckCircleFill className="w-12 h-12 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 進度條 */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/70"
              style={{ width }}
              animate={showSuccess ? {
                background: [
                  'linear-gradient(to right, var(--primary), var(--primary))',
                  'linear-gradient(to right, #10b981, #059669)'
                ]
              } : {}}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* 提示文字 */}
        <AnimatePresence mode="wait">
          {!showSuccess && (
            <motion.p
              key="hint"
              className="text-center text-xs text-muted-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              再等一下,圖片快載好了…
            </motion.p>
          )}
        </AnimatePresence>

        {/* 顯示 config 錯誤/警告（dev 模式或有 error 時） */}
        {configErrors.length > 0 && (isDev || hasErrors) && (
          <motion.div
            className="mt-6 space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {hasErrors && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <BsExclamationTriangleFill className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium text-destructive">Config 載入錯誤</p>
                    <div className="text-xs text-destructive/80 space-y-0.5">
                      {configErrors
                        .filter(e => e.severity === 'error')
                        .slice(0, 3)
                        .map((error) => (
                          <p key={error.field}>• {error.field}: {error.message}</p>
                        ))}
                      {configErrors.filter(e => e.severity === 'error').length > 3 && (
                        <p className="text-destructive/60">
                          ...還有 {configErrors.filter(e => e.severity === 'error').length - 3} 個錯誤
                        </p>
                      )}
                    </div>
                    {percentage >= 100 && (
                      <p className="text-xs text-destructive/60 mt-2 pt-2 border-t border-destructive/20">
                        請修正錯誤後重新整理頁面
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {hasWarnings && !hasErrors && isDev && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <BsExclamationTriangleFill className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      {configErrors.filter(e => e.severity === 'warning').length} 個警告，請檢查 console
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
