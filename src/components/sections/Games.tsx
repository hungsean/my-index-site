import { Button } from '@/components/ui/button'
import { ContentCard, type Tag, type Link } from '../ContentCard'
import type { SiteConfig } from '@/types/config'
import { useState } from 'react'

interface GamesProps {
  config: SiteConfig
}


export function Games({ config }: GamesProps) {
  const [showAll, setShowAll] = useState(false)
  
  // 預設遊戲，如果配置檔案沒有則使用這些 (使用新的統一格式)
  const defaultGames = [
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
  ]

  const games = config.games || defaultGames
  const displayGames = showAll ? games : games.slice(0, 4)
  const hasMoreGames = games.length > 4

  // 如果沒有遊戲要顯示，就不渲染這個節區
  if (!games.length) return null

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
          {displayGames.map((game, index) => {
            // 直接使用新格式的 tags 和 links
            const contentCardTags: Tag[] = game.tags?.map((tag: any) => ({
              content: tag.text,
              variant: tag.variant || 'outline',
              style: tag.style || 'small'
            })) || []

            const contentCardLinks: Link[] = game.links?.map((link: any) => ({
              content: link.text,
              href: link.href,
              variant: link.variant || 'outline',
              size: link.size || 'sm'
            })) || []

            return (
              <ContentCard
                key={index}
                image_url={game.image_url}
                title={game.title}
                description={game.description}
                tags={contentCardTags}
                links={contentCardLinks}
              />
            )
          })}
        </div>
        
        {hasMoreGames && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="px-8"
            >
              {showAll ? '顯示較少' : '查看更多遊戲'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}