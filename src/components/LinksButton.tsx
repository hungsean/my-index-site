import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { validateUrl, validateDiscordUsername } from '@/lib/url-validation'
import type { ReactNode } from 'react'
import {
  BsGithub,
  BsTwitterX,
  BsLinkedin,
  BsInstagram,
  BsDiscord,
  BsEnvelope,
  BsGlobe,
  BsFacebook,
  BsTelegram,
  BsWhatsapp,
  BsThreads
} from 'react-icons/bs'

// 圖標映射 - 將設定檔中的 icon 名稱映射到實際的 Bootstrap Icons
const iconMap = {
  // 社群平台
  'github': BsGithub,
  'twitter': BsTwitterX,
  'x': BsTwitterX,
  'linkedin': BsLinkedin,
  'instagram': BsInstagram,
  'facebook': BsFacebook,
  'threads': BsThreads,
  'discord': BsDiscord,
  'telegram': BsTelegram,
  'whatsapp': BsWhatsapp,

  // 聯絡方式
  'email': BsEnvelope,
  'mail': BsEnvelope,

  // 通用
  'website': BsGlobe,
  'blog': BsGlobe,
  'portfolio': BsGlobe,
  'globe': BsGlobe,

  // 兼容性：保持原有的大寫格式
  'Github': BsGithub,
  'Twitter': BsTwitterX,
  'Linkedin': BsLinkedin,
  'Mail': BsEnvelope,
  'Instagram': BsInstagram,
  'MessageCircle': BsDiscord,
  'Globe': BsGlobe
}

export interface LinksButtonProps {
  /** 按鈕顯示的名稱 */
  name: string
  /** 連結 URL 或要複製/顯示的文字 */
  url: string
  /** 按鈕類型：link=外部連結, copy=複製到剪貼簿, text=顯示訊息 */
  type: 'link' | 'copy' | 'text'
  /** 圖標名稱（字串）或自訂圖標元件 */
  icon?: string | ReactNode
  /** 圖標顏色類別（Tailwind CSS） */
  color?: string
  /** Button 變體樣式 */
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  /** Button 大小 */
  size?: 'default' | 'sm' | 'lg' | 'icon'
  /** 自訂 className */
  className?: string
  /** 是否禁用 */
  disabled?: boolean
}

export function LinksButton({
  name,
  url,
  type,
  icon,
  color,
  variant = 'outline',
  size = 'sm',
  className = '',
  disabled = false
}: Readonly<LinksButtonProps>) {
  // 處理不同類型的點擊事件
  const handleClick = async () => {
    switch (type) {
      case 'copy':
        try {
          // 對於 Discord，特別驗證用戶名格式
          if (typeof icon === 'string' && icon.toLowerCase() === 'discord') {
            if (!validateDiscordUsername(url)) {
              toast.error('Discord 用戶名格式錯誤', {
                description: '請確認用戶名格式正確',
              })
              return
            }
          }

          await navigator.clipboard.writeText(url)
          toast.success(`已複製 ${name}`, {
            description: url,
          })
        } catch (err) {
          console.error('複製失敗:', err)
          toast.error('複製失敗', {
            description: '請手動複製',
          })
        }
        break
      case 'text':
        toast.info(name, {
          description: url,
        })
        break
    }
  }

  // 處理 link 類型的驗證
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const validation = validateUrl(url)
    if (!validation.isValid || !validation.isSafe) {
      e.preventDefault()
      toast.error('不安全的連結', {
        description: validation.error,
      })
    }
  }

  // 解析圖標
  const IconComponent = typeof icon === 'string'
    ? iconMap[icon.toLowerCase() as keyof typeof iconMap] || iconMap[icon as keyof typeof iconMap] || BsGlobe
    : null

  const iconElement = typeof icon === 'string' && IconComponent ? (
    <IconComponent
      className={`h-5 w-5 flex-shrink-0 ${color || ''}`}
      aria-hidden="true"
    />
  ) : icon ? (
    <span className={`w-4 h-4 flex-shrink-0 ${color || ''}`} aria-hidden="true">
      {icon}
    </span>
  ) : null

  // link 類型使用 a 標籤
  if (type === 'link') {
    return (
      <Button
        variant={variant}
        size={size}
        className={`${className} hover:scale-105 transition-transform`}
        asChild
        disabled={disabled}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          aria-label={`前往 ${name} (在新分頁開啟)`}
          onClick={handleLinkClick}
          tabIndex={disabled ? -1 : undefined}
        >
          {iconElement}
          <span className="font-medium">{name}</span>
        </a>
      </Button>
    )
  }

  // copy 和 text 類型使用 button
  const actionText = type === 'copy' ? '複製' : '顯示'
  return (
    <Button
      variant={variant}
      size={size}
      className={`${className} hover:scale-105 transition-transform`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`${actionText} ${name} 資訊`}
    >
      {iconElement && <span className="mr-2">{iconElement}</span>}
      <span className="font-medium">{name}</span>
    </Button>
  )
}
