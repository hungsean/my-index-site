import { useSpring, motion, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface LoadingScreenProps {
  percentage: number
}

export function LoadingScreen({ percentage }: Readonly<LoadingScreenProps>) {
  const smoothPercentage = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const width = useTransform(smoothPercentage, (v) => `${v}%`)

  useEffect(() => {
    smoothPercentage.set(percentage)
  }, [percentage, smoothPercentage])

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-8 space-y-6">
        {/* Logo 或標題區域 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            千円
          </h1>
          <p className="text-sm text-muted-foreground">
            載入中，請稍候...
          </p>
        </div>

        {/* 載入動畫 - 旋轉圓圈 */}
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>

        {/* 進度條 */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/70"
              style={{ width }}
            />
          </div>
        </div>

        {/* 提示文字 */}
        <p className="text-center text-xs text-muted-foreground/60">
          再等一下，圖片快載好了…
        </p>
      </div>
    </div>
  )
}
