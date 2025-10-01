import { useSpring, motion, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'

interface LoadingScreenProps {
  percentage: number
  onLoadComplete?: () => void
}

export function LoadingScreen({ percentage, onLoadComplete }: Readonly<LoadingScreenProps>) {
  const [startTime] = useState(Date.now())
  const [showSuccess, setShowSuccess] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const smoothPercentage = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const width = useTransform(smoothPercentage, (v) => `${v}%`)

  useEffect(() => {
    smoothPercentage.set(percentage)
  }, [percentage, smoothPercentage])

  useEffect(() => {
    if (percentage >= 100) {
      const loadTime = Date.now() - startTime

      // 如果載入時間超過 3 秒,顯示成功動畫
      if (loadTime > 2000) {
        setShowSuccess(true)
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => onLoadComplete?.(), 800)
        }, 1200)
      } else {
        // 否則直接過場
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => onLoadComplete?.(), 800)
        }, 300)
      }
    }
  }, [percentage, startTime, onLoadComplete])


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
      </motion.div>
    </motion.div>
  )
}
