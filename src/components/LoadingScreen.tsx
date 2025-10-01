interface LoadingScreenProps {
  percentage: number
  loaded: number
  total: number
}

export function LoadingScreen({ percentage, loaded, total }: Readonly<LoadingScreenProps>) {
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
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* 進度文字 */}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{percentage}%</span>
            <span>
              {loaded} / {total} 張圖片
            </span>
          </div>
        </div>

        {/* 提示文字 */}
        <p className="text-center text-xs text-muted-foreground/60">
          正在載入所有素材，確保最佳瀏覽體驗
        </p>
      </div>
    </div>
  )
}
