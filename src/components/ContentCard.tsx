import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LinksButton } from './LinksButton'
import { ImageWithFallback } from './ImageWithFallback'
import type { LegacyContentLink, UnifiedLink } from '@/types/config'

export interface Tag {
  content: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  style?: 'normal' | 'small'
}

export interface ContentCardProps {
  image_url?: string
  title: string
  description: string
  tags?: Tag[]
  links?: Array<LegacyContentLink | UnifiedLink>
  className?: string
}

export function ContentCard({
  image_url,
  title,
  description,
  tags = [],
  links = [],
  className = ""
}: Readonly<ContentCardProps>) {
  return (
    <Card className={`group hover:shadow-lg transition-shadow flex flex-col ${className}`}>
      {image_url && (
        <div className="aspect-video overflow-hidden rounded-t-lg flex-shrink-0">
          <ImageWithFallback
            src={image_url}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className={`${links.length > 0 ? "pb-2" : ""} flex-shrink-0`}>
        <CardTitle className={links.length > 0 ? "text-lg" : undefined}>
          {title}
        </CardTitle>
        <CardDescription className={links.length > 0 ? "text-sm line-clamp-2" : undefined}>
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className={`${links.length > 0 ? "pt-0" : ""} flex flex-col h-full`}>
        {/* Spacer to push tags and links to bottom */}
        <div className="flex-grow"></div>

        {/* Tags Section - at bottom */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3" role="list" aria-label={`${title} 的標籤`}>
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant={tag.variant || "outline"}
                className={tag.style === 'small' ? "text-xs" : undefined}
                role="listitem"
              >
                {tag.content}
              </Badge>
            ))}
          </div>
        )}

        {/* Links Section - at very bottom */}
        {links.length > 0 && (
          <div className="flex gap-2" role="list" aria-label={`${title} 的相關連結`}>
            {links.map((link, index) => {
              // 類型檢查：判斷是新版 UnifiedLink 還是舊版 LegacyContentLink
              const isUnifiedLink = (l: LegacyContentLink | UnifiedLink): l is UnifiedLink => {
                return 'name' in l && 'url' in l && 'type' in l
              }

              if (isUnifiedLink(link)) {
                // 新版格式：使用 LinksButton
                return (
                  <LinksButton
                    key={index}
                    name={link.name}
                    url={link.url}
                    type={link.type}
                    icon={link.icon}
                    color={link.color}
                    variant={link.variant || "outline"}
                    size={link.size || "sm"}
                    disabled={link.disabled}
                  />
                )
              } else {
                // 舊版格式：保持原有的 Button 渲染方式
                return (
                  <Button
                    key={index}
                    size={link.size || "sm"}
                    variant={link.variant || "outline"}
                    asChild
                    role="listitem"
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.text} (在新分頁開啟)`}
                    >
                      {link.text}
                    </a>
                  </Button>
                )
              }
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}