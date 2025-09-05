import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageWithFallback } from '../ImageWithFallback'
import type { SiteConfig } from '@/types/config'

interface GamesProps {
  config: SiteConfig
}

// 擴展配置類型以包含 games 資訊
interface ExtendedConfig extends SiteConfig {
  games?: Array<{
    title: string
    description: string
    image: string
    genre: string
    platform: string
    status: string
  }>
}

export function Games({ config }: GamesProps) {
  const extendedConfig = config as ExtendedConfig
  
  // 預設遊戲，如果配置檔案沒有則使用這些
  const defaultGames = [
    {
      title: "原神",
      description: "開放世界冒險遊戲，美麗的世界觀和豐富的劇情",
      image: "genshin impact game",
      genre: "RPG",
      platform: "PC / Mobile",
      status: "正在遊玩"
    },
    {
      title: "英雄聯盟",
      description: "經典的 MOBA 遊戲，與朋友一起競技對戰",
      image: "league of legends game",
      genre: "MOBA",
      platform: "PC",
      status: "長期遊玩"
    },
    {
      title: "薩爾達傳說：王國之淚",
      description: "創意無限的開放世界探索遊戲",
      image: "zelda tears kingdom",
      genre: "Adventure",
      platform: "Nintendo Switch",
      status: "已完成"
    },
    {
      title: "黑帝斯",
      description: "出色的 Roguelike 遊戲，完美的遊戲機制設計",
      image: "hades game",
      genre: "Roguelike",
      platform: "PC / Switch",
      status: "已完成"
    }
  ]

  const games = extendedConfig.games || defaultGames

  // 如果沒有遊戲要顯示，就不渲染這個節區
  if (!games.length) return null

  return (
    <section id="games" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">我愛玩的遊戲</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            遊戲不只是娛樂，也是我靈感和創意的來源
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={`https://images.unsplash.com/600x800/?${game.image.replace(' ', '+')}`}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{game.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {game.genre}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {game.platform}
                    </Badge>
                  </div>
                  <Badge 
                    variant={game.status === "正在遊玩" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {game.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}