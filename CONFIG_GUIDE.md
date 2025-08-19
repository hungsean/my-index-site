# 動態配置使用指南

## 概述
現在你的個人網站支援透過 `public/config.json` 文件動態配置個人資訊，無需修改程式碼即可更新內容。

## 配置檔案位置
```
public/config.json
```

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

### 連結類型說明
- **`link`**: 一般外部連結，點擊會開啟新分頁
- **`copy`**: 複製到剪貼簿，會顯示成功提示
- **`text`**: 顯示對話框，顯示文字內容

### 可用圖標
- `Github`: GitHub 圖標
- `Twitter`: X (Twitter) 圖標  
- `Linkedin`: LinkedIn 圖標
- `Mail`: 郵件圖標
- `Instagram`: Instagram 圖標
- `MessageCircle`: 訊息圖標（適合 Discord）
- `Globe`: 地球圖標（適合網站）

## 修改步驟

### 在 Cloudflare Pages 上更新：
1. 修改 `public/config.json` 檔案
2. 提交並推送到 GitHub
3. Cloudflare Pages 會自動重新部署
4. 網站內容即時更新

### 本地測試：
1. 修改 `public/config.json`
2. 重新整理瀏覽器即可看到變化（無需重啟開發伺服器）

## 範例

### 更新個人資訊
```json
{
  "profile": {
    "name": "小明",
    "interests": "攝影 | 旅行 | 咖啡",
    "avatar": {
      "src": "https://example.com/avatar.jpg",
      "alt": "小明的頭像",
      "fallback": "明"
    },
    "background": {
      "src": "https://example.com/background.jpg"
    }
  }
}
```

### 新增社交連結
```json
{
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
    }
  ]
}
```

## 錯誤處理
- 如果配置檔案載入失敗，會顯示錯誤訊息並使用預設配置
- 應用程式具有容錯能力，不會因為配置錯誤而崩潰
- 建議在修改配置檔案前先備份現有版本

## 注意事項
- JSON 檔案格式必須正確，建議使用 JSON 驗證工具檢查
- 圖片 URL 必須是可公開存取的連結
- 顏色樣式請使用 Tailwind CSS 類別名稱

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

### 聯絡方式
- `email` / `mail` - 電子郵件圖標 (BsEnvelope)

### 通用圖標
- `website` - 網站圖標 (BsGlobe)
- `blog` - 部落格圖標 (BsGlobe)  
- `portfolio` - 作品集圖標 (BsGlobe)
- `globe` - 通用網站圖標 (BsGlobe)

### 兼容性
為了向後兼容，仍然支援原有的大寫格式：
- `Github`, `Twitter`, `Linkedin`, `Mail`, `Instagram`, `MessageCircle`, `Globe`

### 使用建議
- 建議使用小寫格式的圖標名稱，如 `"icon": "github"`
- 如果找不到對應的圖標，系統會自動使用 BsGlobe 圖標作為替代
- 所有圖標現在使用 Bootstrap Icons，提供更一致的視覺體驗
- Bootstrap Icons 提供更豐富的社群平台圖標選擇