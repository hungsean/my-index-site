import { Button } from '@/components/ui/button'
import { ContentCard, type Tag, type Link } from '../ContentCard'
import type { SiteConfig } from '@/types/config'
import { useState, useMemo } from 'react'
import { validateUrl } from '@/lib/url-validation'

interface GamesProps {
  config: SiteConfig
}


export function Games({ config }: GamesProps) {
  const [showAll, setShowAll] = useState(false)
  
  // 使用 useMemo 緩存預設遊戲，避免每次渲染重新創建
  const defaultGames = useMemo(() => [
    {
      title: "原神",
      description: "開放世界冒險遊戲，美麗的世界觀和豐富的劇情",
      image_url: "https://images.unsplash.com/800x600/?genshin+impact+game",
      tags: [
        { text: "RPG", variant: "secondary" },
        { text: "PC / Mobile", variant: "outline" },
        { text: "正在遊玩", variant: "default" }
      ],
      links: [
        { text: "官方網站", href: "https://genshin.mihoyo.com/", variant: "outline" }
      ]
    },
    {
      title: "英雄聯盟",
      description: "經典的 MOBA 遊戲，與朋友一起競技對戰",
      image_url: "https://images.unsplash.com/800x600/?league+of+legends+game",
      tags: [
        { text: "MOBA", variant: "secondary" },
        { text: "PC", variant: "outline" },
        { text: "長期遊玩", variant: "secondary" }
      ],
      links: [
        { text: "官方網站", href: "https://www.leagueoflegends.com/", variant: "outline" }
      ]
    },
    {
      title: "薩爾達傳說：王國之淚",
      description: "創意無限的開放世界探索遊戲",
      image_url: "https://images.unsplash.com/800x600/?zelda+tears+kingdom",
      tags: [
        { text: "Adventure", variant: "secondary" },
        { text: "Nintendo Switch", variant: "outline" },
        { text: "已完成", variant: "secondary" }
      ]
    },
    {
      title: "黑帝斯",
      description: "出色的 Roguelike 遊戲，完美的遊戲機制設計",
      image_url: "https://images.unsplash.com/800x600/?hades+game",
      tags: [
        { text: "Roguelike", variant: "secondary" },
        { text: "PC / Switch", variant: "outline" },
        { text: "已完成", variant: "secondary" }
      ]
    }
  ], [])

  // 使用 useMemo 優化 games 數據處理
  const processedGames = useMemo(() => {
    const games = config.games || defaultGames

    // 驗證每個遊戲的 URL
    const validatedGames = games.map(game => ({
      ...game,
      links: game.links?.map(link => {
        const validation = validateUrl(link.href)
        if (!validation.isValid || !validation.isSafe) {
          console.warn(`Invalid URL in game "${game.title}":`, link.href, validation.error)
          return { ...link, href: '#', disabled: true }
        }
        return link
      }) || []
    }))

    return {
      games: validatedGames,
      displayGames: showAll ? validatedGames : validatedGames.slice(0, 4),
      hasMoreGames: validatedGames.length > 4
    }
  }, [config.games, showAll, defaultGames])

  // 如果沒有遊戲要顯示，就不渲染這個節區
  if (!processedGames.games.length) return null

  return (
    <section id="games" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4">我愛玩的遊戲</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            遊戲不只是娛樂，也是我靈感和創意的來源
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {processedGames.displayGames.map((game, index) => {
            // 直接處理 tags 和 links 轉換，不在 map 中使用 useMemo
            const contentCardTags: Tag[] = game.tags?.map((tag: { text: string; variant?: string; style?: string }) => ({
              content: tag.text,
              variant: (tag.variant as Tag['variant']) || 'outline',
              style: (tag.style as Tag['style']) || 'small'
            })) || []

            const contentCardLinks: Link[] = game.links?.map((link: { text: string; href: string; variant?: string; size?: string; disabled?: boolean }) => ({
              content: link.text,
              href: link.href,
              variant: (link.variant as Link['variant']) || 'outline',
              size: (link.size as Link['size']) || 'sm',
              disabled: link.disabled
            })) || []

            return (
              <ContentCard
                key={`game-${game.title}-${index}`}
                image_url={game.image_url}
                title={game.title}
                description={game.description}
                tags={contentCardTags}
                links={contentCardLinks}
              />
            )
          })}
        </div>
        
        {processedGames.hasMoreGames && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="px-8"
              aria-label={showAll ? '收起部分遊戲項目' : `顯示全部 ${processedGames.games.length} 個遊戲項目`}
            >
              {showAll ? '顯示較少' : '查看更多遊戲'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}