import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from './ImageWithFallback'
import type { ReactNode } from 'react'

export interface Tag {
  content: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  style?: 'normal' | 'small'
}

export interface Link {
  content: string
  href: string
  icon?: ReactNode
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg'
}

export interface ContentCardProps {
  image_url?: string
  title: string
  description: string
  tags?: Tag[]
  links?: Link[]
  className?: string
}

export function ContentCard({
  image_url,
  title,
  description,
  tags = [],
  links = [],
  className = ""
}: ContentCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-shadow flex flex-col ${className}`}>
      {image_url && (
        <div className="aspect-video overflow-hidden rounded-t-lg flex-shrink-0">
          <ImageWithFallback
            src={image_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant={tag.variant || "outline"}
                className={tag.style === 'small' ? "text-xs" : undefined}
              >
                {tag.content}
              </Badge>
            ))}
          </div>
        )}

        {/* Links Section - at very bottom */}
        {links.length > 0 && (
          <div className="flex gap-2">
            {links.map((link, index) => (
              <Button
                key={index}
                size={link.size || "sm"}
                variant={link.variant || "outline"}
                asChild
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.icon && <span className="w-4 h-4 mr-1">{link.icon}</span>}
                  {link.content}
                </a>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}