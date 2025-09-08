# 動態配置使用指南

## 概述

你的個人網站支援透過 `public/config.json` 文件動態配置所有內容，包含個人資料、社交連結、關於我、專案作品和遊戲清單。系統內建強大的驗證機制，確保配置的正確性和穩定性。

## 配置檔案位置

```path
public/config.json
```

## 系統特色

- ✅ **強健的驗證機制**：自動檢查配置格式和必要欄位
- ✅ **預設值**：缺失的欄位會自動填入合理預設值
- ✅ **詳細錯誤報告**：開發模式下提供詳細的錯誤和警告資訊
- ✅ **統一配置格式**：專案和遊戲使用完全統一的 tags 和 links 系統
- ✅ **統一卡片系統**：專案和遊戲使用統一的 ContentCard 元件

## 配置檔案結構

### 個人資料 (profile)

```json
{
  "profile": {
    "name": "你的姓名",
    "interests": "興趣1 | 興趣2 | 興趣3",
    "avatar": {
      "src": "頭像圖片 URL",
      "alt": "頭像替代文字",
      "fallback": "頭像載入失敗時顯示的文字"
    },
    "background": {
      "src": "背景圖片 URL"
    }
  }
}
```

### 社交連結 (socialLinks)

```json
{
  "socialLinks": [
    {
      "name": "顯示名稱",
      "icon": "圖標名稱 (詳見下方支援的圖標列表)",
      "url": "連結或內容",
      "color": "hover 顏色樣式",
      "type": "連結類型"
    }
  ]
}
```

#### 連結類型說明

- **`link`**: 一般外部連結，點擊會開啟新分頁
- **`copy`**: 複製到剪貼簿，會顯示成功提示
- **`text`**: 顯示對話框，顯示文字內容

### 關於我 (about) - 可選

```json
{
  "about": {
    "story": "個人故事或簡介",
    "skills": [
      "React", "TypeScript", "Node.js", "Python", "Next.js",
      "Tailwind CSS", "MongoDB", "PostgreSQL"
    ]
  }
}
```

### 專案作品 (projects) - 可選

```json
{
  "projects": [
    {
      "title": "專案名稱",
      "description": "專案描述", 
      "image_url": "專案預覽圖片 URL 或關鍵字",
      "tags": [
        { "text": "React", "variant": "outline" },
        { "text": "TypeScript", "variant": "outline" },
        { "text": "Tailwind CSS", "variant": "outline" }
      ],
      "links": [
        { "text": "代碼", "href": "https://github.com/...", "variant": "outline" },
        { "text": "查看", "href": "https://demo.example.com", "variant": "default" }
      ]
    }
  ]
}
```

### 遊戲清單 (games) - 可選

```json
{
  "games": [
    {
      "title": "遊戲名稱",
      "description": "遊戲評價或心得",
      "image_url": "遊戲圖片 URL 或關鍵字",
      "tags": [
        { "text": "RPG", "variant": "secondary" },
        { "text": "PC / Mobile", "variant": "outline" },
        { "text": "正在遊玩", "variant": "default" }
      ],
      "links": [
        { "text": "Steam", "href": "https://store.steampowered.com/...", "variant": "outline" },
        { "text": "攻略", "href": "https://wiki.example.com", "variant": "outline" }
      ]
    }
  ]
}
```

### ContentCard 統一欄位說明

#### 必要欄位

- **`title`** (必要): 卡片標題
- **`description`** (必要): 卡片描述
- **`image_url`** (必要): 圖片 URL 或使用 Unsplash 關鍵字

#### 可選欄位

- **`tags`** (可選): 標籤陣列，每個標籤包含：
  - `text`: 標籤文字內容
  - `variant`: 樣式變體 (`"default"`, `"secondary"`, `"outline"`, `"destructive"`)
  - `style`: 大小樣式 (`"normal"`, `"small"`) - 預設為 `"small"`

- **`links`** (可選): 連結陣列，每個連結包含：
  - `text`: 連結顯示文字  
  - `href`: 連結目標 URL
  - `variant`: 按鈕樣式 (`"default"`, `"outline"`, `"secondary"`, `"ghost"`, `"link"`)
  - `size`: 按鈕大小 (`"default"`, `"sm"`, `"lg"`) - 預設為 `"sm"`
  - `icon`: 可選圖標 (需要在程式碼中定義)

## 修改步驟

### 在 Cloudflare Pages 上更新

1. 修改 `public/config.json` 檔案
2. 提交並推送到 GitHub
3. Cloudflare Pages 會自動重新部署
4. 網站內容即時更新

### 本地測試

1. 修改 `public/config.json`
2. 重新整理瀏覽器即可看到變化（無需重啟開發伺服器）

## 完整配置範例

```json
{
  "profile": {
    "name": "小明",
    "interests": "攝影 | 旅行 | 咖啡 | 程式設計",
    "avatar": {
      "src": "https://example.com/avatar.jpg",
      "alt": "小明的頭像",
      "fallback": "明"
    },
    "background": {
      "src": "https://example.com/background.jpg"
    }
  },
  "socialLinks": [
    {
      "name": "GitHub",
      "icon": "github",
      "url": "https://github.com/username",
      "color": "hover:text-gray-800 dark:hover:text-gray-300",
      "type": "link"
    },
    {
      "name": "Discord",
      "icon": "discord", 
      "url": "username#1234",
      "color": "hover:text-purple-400",
      "type": "copy"
    },
    {
      "name": "個人網站",
      "icon": "website",
      "url": "這就是我的個人網站！",
      "color": "hover:text-blue-400",
      "type": "text"
    }
  ],
  "about": {
    "story": "我是一位熱愛技術和創意的開發者，喜歡探索新技術並用程式碼創造有趣的東西。",
    "skills": [
      "React", "TypeScript", "Node.js", "Python", "Next.js",
      "Tailwind CSS", "MongoDB", "PostgreSQL", "AWS", "Docker"
    ]
  },
  "projects": [
    {
      "title": "個人作品集網站",
      "description": "使用 React 和 TypeScript 建立的響應式個人網站",
      "image_url": "https://images.unsplash.com/800x600/?portfolio+website",
      "tags": [
        { "text": "React", "variant": "outline" },
        { "text": "TypeScript", "variant": "outline" },
        { "text": "Tailwind CSS", "variant": "outline" },
        { "text": "Vite", "variant": "outline" }
      ],
      "links": [
        { "text": "代碼", "href": "https://github.com/username/portfolio", "variant": "outline" },
        { "text": "查看", "href": "https://portfolio.example.com", "variant": "default" }
      ]
    },
    {
      "title": "任務管理應用",
      "description": "團隊協作的任務管理工具，支援即時更新",
      "image_url": "task+management+app",
      "tags": [
        { "text": "Next.js", "variant": "outline" },
        { "text": "PostgreSQL", "variant": "outline" },
        { "text": "Socket.io", "variant": "outline" }
      ],
      "links": [
        { "text": "代碼", "href": "https://github.com/username/task-manager", "variant": "outline" }
      ]
    }
  ],
  "games": [
    {
      "title": "薩爾達傳說：王國之淚",
      "description": "創意無限的開放世界探索遊戲，每次遊玩都有新發現",
      "image_url": "zelda+tears+of+the+kingdom",
      "tags": [
        { "text": "Adventure", "variant": "secondary" },
        { "text": "Nintendo Switch", "variant": "outline" },
        { "text": "已完成", "variant": "secondary" }
      ],
      "links": [
        { "text": "任天堂官網", "href": "https://www.nintendo.com/us/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/", "variant": "outline" }
      ]
    },
    {
      "title": "原神",
      "description": "美麗的開放世界 RPG，劇情和音樂都很棒",
      "image_url": "genshin+impact+game",
      "tags": [
        { "text": "RPG", "variant": "secondary" },
        { "text": "PC / Mobile", "variant": "outline" },
        { "text": "正在遊玩", "variant": "default" }
      ],
      "links": [
        { "text": "官方網站", "href": "https://genshin.mihoyo.com/", "variant": "outline" },
        { "text": "攻略 Wiki", "href": "https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki", "variant": "outline" }
      ]
    }
  ]
}
```

## 錯誤處理與驗證

### 自動驗證機制

系統會自動檢查配置的完整性：

1. **必要欄位檢查**：確保關鍵欄位（如 `title`、`description`）存在
2. **型別驗證**：檢查陣列、物件和字串格式是否正確
3. **預設值填充**：缺失的欄位自動使用合理預設值
4. **錯誤分級**：區分「錯誤」和「警告」兩個級別

### 錯誤顯示

- **載入錯誤**：頁面頂部顯示紅色錯誤訊息
- **配置警告**：開發模式下顯示黃色警告提示
- **控制台詳情**：開發模式下在瀏覽器控制台顯示詳細的錯誤報告

### 容錯機制

- 如果配置檔案載入失敗，會使用預設配置
- 如果某些欄位格式錯誤，會使用預設值並繼續運行
- 應用程式具有完整的容錯能力，不會因為配置錯誤而崩潰
- **重要提醒**：此專案會持續重構，配置格式可能會有破壞性改動

## 開發建議

### 配置檔案管理

- 建議在修改配置檔案前先備份現有版本
- 使用 JSON 格式檢查工具確保語法正確
- 可以先移除非必要欄位測試系統的預設值機制

### 圖片管理

- **外部圖片**：使用完整的 URL 路徑
- **本地圖片**：放在 `public/` 目錄下，使用相對路徑（如 `/images/avatar.jpg`）
- **Unsplash 關鍵字**：使用關鍵字自動生成佔位圖片（如 "web+development", "game+screenshot"）

### 開發測試

1. 打開瀏覽器開發者工具的控制台
2. 修改 `public/config.json` 檔案
3. 重新整理頁面查看變化和驗證結果
4. 檢查控制台的配置載入報告

## 注意事項

- JSON 檔案格式必須正確，注意逗號和引號的使用
- 圖片 URL 必須是可公開存取的連結
- 顏色樣式請使用 Tailwind CSS 類別名稱
- 所有欄位都支援繁體中文內容

## 支援的圖標

系統使用 Bootstrap Icons (react-icons/bs) 並支援以下圖標名稱（建議使用小寫，同時保持向後兼容大寫格式）：

### 社群平台

- `github` - GitHub 圖標 (BsGithub)
- `twitter` / `x` - X (Twitter) 圖標 (BsTwitterX)
- `linkedin` - LinkedIn 圖標 (BsLinkedin)
- `instagram` - Instagram 圖標 (BsInstagram)
- `facebook` - Facebook 圖標 (BsFacebook)
- `discord` - Discord 圖標 (BsDiscord)
- `telegram` - Telegram 圖標 (BsTelegram)
- `whatsapp` - WhatsApp 圖標 (BsWhatsapp)
- `wechat` - WeChat 圖標 (BsWechat)
- `threads` - Threads 圖標 (BsThreads)

### 聯絡方式

- `email` / `mail` - 電子郵件圖標 (BsEnvelope)

### 通用圖標

- `website` - 網站圖標 (BsGlobe)
- `blog` - 部落格圖標 (BsGlobe)  
- `portfolio` - 作品集圖標 (BsGlobe)
- `globe` - 通用網站圖標 (BsGlobe)

### 使用說明

- 使用小寫格式的圖標名稱，如 `"icon": "github"`
- 如果找不到對應的圖標，系統會自動使用 BsGlobe 圖標作為替代
- 所有圖標使用 Bootstrap Icons，提供一致的視覺體驗
- 支援豐富的社群平台和通用圖標
