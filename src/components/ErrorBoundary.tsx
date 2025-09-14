import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset?: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  name?: string
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })

    // 記錄錯誤到控制台或外部服務
    console.error(`Error in ${this.props.name || 'component'}:`, error, errorInfo)

    // 調用可選的錯誤處理回調
    this.props.onError?.(error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // 使用自定義 fallback 組件或預設的錯誤UI
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} reset={this.reset} />
      }

      // 預設錯誤 UI
      return (
        <div className="p-4 sm:p-6 md:p-8">
          <Alert variant="destructive">
            <AlertDescription>
              <div className="space-y-2">
                <h3 className="font-semibold">
                  {this.props.name ? `${this.props.name} 載入失敗` : '內容載入失敗'}
                </h3>
                <p className="text-sm">
                  抱歉，這個區域發生了錯誤。請重新整理頁面或稍後再試。
                </p>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-xs mt-2">
                    <summary className="cursor-pointer">錯誤詳情</summary>
                    <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}
                <button
                  onClick={this.reset}
                  className="text-sm underline hover:no-underline"
                >
                  重試
                </button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary