# 千円 | Developer & Gamer

現代化卡片式設計的個人開發者作品集網站，使用 React + TypeScript + Vite 建構。

## 🌐 線上展示

**網域**: [senen.idv.tw](https://senen.idv.tw)

## ✨ 核心功能

- **統一 ContentCard 架構**: 一致的卡片式佈局系統
- **社群媒體整合**: 支援 Instagram、Threads、Discord、GitHub、Twitter 等平台
- **主題系統**: 深色/淺色模式切換（next-themes）
- **響應式設計**: 行動優先，適配所有螢幕尺寸
- **進階設定系統**: JSON 設定檔搭配 TypeScript 型別驗證與錯誤處理
- **強健圖片處理**: ImageWithFallback 元件提供自動 fallback 機制

## 🛠️ 技術棧

- **框架**: React 19 + TypeScript
- **建置工具**: Vite 7
- **樣式**: Tailwind CSS v4 + shadcn/ui
- **圖示**: Lucide React + React Icons (Bootstrap Icons)
- **部署**: Cloudflare Pages
- **套件管理**: pnpm

## 📦 開發指令

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器
pnpm dev

# 生產建置（含 TypeScript 編譯）
pnpm build

# 預覽建置結果
pnpm preview

# ESLint 檢查
pnpm lint

# 部署至 Cloudflare Pages
pnpm deploy
```

## 🎨 UI 元件

本專案使用 [shadcn/ui](https://ui.shadcn.com/) 元件系統：

```bash
# 新增元件
pnpm dlx shadcn@latest add [component]
```

### 已安裝元件

- Avatar
- Badge
- Button
- Card
- Dialog
- Sonner（Toast 通知）

## ⚙️ 設定系統

網站內容透過 `public/config.json` 管理，詳細說明請參考 `CONFIG_GUIDE.md`。

### 設定特色

- 完整 TypeScript 型別安全
- 進階驗證與錯誤處理
- 向後相容與優雅降級
- 開發模式詳細錯誤報告

## 📁 專案結構

```tree
my-index-site/
├── public/
│   └── config.json          # 網站內容設定
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui 元件
│   │   ├── ContentCard.tsx  # 統一卡片元件
│   │   ├── Hero.tsx         # 首頁 Hero 區塊
│   │   └── ImageWithFallback.tsx  # 圖片 fallback 元件
│   ├── hooks/
│   │   └── useConfig.ts     # 設定管理 hook
│   ├── lib/
│   │   └── utils.ts         # 工具函式
│   └── App.tsx              # 主應用程式
├── CLAUDE.md                # AI 助手專案指引
├── CONFIG_GUIDE.md          # 設定檔指南
└── wrangler.jsonc           # Cloudflare Pages 部署設定
```

## 📝 授權

本專案為個人作品集網站。
