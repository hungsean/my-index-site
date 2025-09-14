# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal website (個人網站) built with React + TypeScript + Vite using pnpm as the package manager. **Complete personal developer portfolio website with modern card-based design**. The project showcases personal information, social media links, about section, project portfolio, gaming interests, and contact information in a modern, responsive design. It includes shadcn/ui component library with Tailwind CSS v4 for styling and is built with modern tooling including ESLint for code quality.

### Website Information
- **Domain**: senen.dev
- **Current Title**: 千円 | Developer & Gamer
- **Positioning**: Complete personal developer portfolio website with unified card-based layout
- **SEO Description**: "千円的個人網站 - 遊戲玩家 | 程式開發者 | 女僕咖啡廳 | 地下偶像。分享程式、遊戲和生活。"
- **Deployment**: Cloudflare Pages with automated deployment via `pnpm deploy`

### Current Implementation
**Multi-section layout with 5 main areas using ContentCard system:**
- **Hero Section**: Full-screen welcome area with gradient background, avatar, comprehensive social links including Instagram, Threads
- **About Section**: Personal story and skills showcase using card layout
- **Projects Section**: Portfolio showcase featuring unified ContentCard components with badges and links
- **Games Section**: Gaming interests display with game images, status badges, and external links
- **Contact Section**: Multiple contact methods with copy-to-clipboard functionality

**Key Features:**
- **Unified ContentCard Architecture**: Consistent card-based layout system for Projects and Games sections
- **Enhanced Social Media Integration**: Support for Instagram (main/idol), Threads (main/idol), Discord, GitHub, Twitter
- Social media links with three types: link (normal links), copy (copy to clipboard), text (show dialog)
- **Advanced Configuration System**: JSON-based configuration with validation, error handling, and fallback defaults
- **Theme System**: Dark/light mode toggle with system preference detection via next-themes
- **Responsive Design**: Mobile-first design optimized for all screen sizes
- User: 千円 with interests: 遊戲 | 程式 | 僕咖 | 地偶
- Toast notifications using Sonner for copy feedback and user interactions
- Dialog components for enhanced UX instead of native alerts
- **Robust Image Handling**: ImageWithFallback component with automatic fallback support
- Loading states and error handling for configuration loading
- **Development Mode Features**: Configuration validation with warnings and error display

## Development Commands

### Core Development
- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production (runs TypeScript compilation then Vite build)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint on all files
- `pnpm deploy` - Deploy to Cloudflare Pages using Wrangler

### Type Checking
- `pnpm exec tsc -b` - Run TypeScript compiler for type checking (included in build process)

### shadcn/ui Components
- `pnpm dlx shadcn@latest add [component]` - Add new shadcn/ui components
- `pnpm dlx shadcn@latest add button card dialog` - Add multiple components at once

### Deployment
- **Platform**: Cloudflare Pages
- **Configuration**: `wrangler.jsonc` with SPA support
- **Assets Directory**: `./dist`
- **Compatibility Date**: 2025-04-01

## UI Implementation Guidelines

### IMPORTANT: shadcn/ui Reference
- **ALWAYS refer to https://ui.shadcn.com/ for UI implementation questions**
- Check official documentation for correct component usage, installation, and best practices
- Do NOT remove or simplify component functionality without consulting the docs
- Ensure all required dependencies are installed (e.g., next-themes for Sonner)
- Follow standard implementation patterns from the official examples

### When encountering UI issues:
1. First check https://ui.shadcn.com/ for the specific component
2. Review installation requirements and dependencies
3. Follow the official implementation patterns
4. Maintain complete component functionality

## Architecture & Key Files

### Configuration
- **Vite**: Uses `@vitejs/plugin-react` for React support and `@tailwindcss/vite` for Tailwind CSS v4
- **TypeScript**: Project references configuration with path aliases (`@/*` -> `src/*`)
- **ESLint**: Modern flat config with TypeScript, React Hooks, and React Refresh plugins
- **shadcn/ui**: Configured with Neutral color theme, New York style, Lucide icons
- **Package Manager**: Uses pnpm (lockfile: `pnpm-lock.yaml`)
- **Cloudflare**: Wrangler configuration for Pages deployment with SPA support

### Project Structure
- `src/` - Source code directory
  - `App.tsx` - Main application component with theme provider and section orchestration
  - `main.tsx` - Application entry point
- `src/components/ui/` - shadcn/ui components (auto-generated)
  - `avatar.tsx` - Avatar component with image and fallback support
  - `badge.tsx` - Badge component for tags and status indicators
  - `button.tsx` - Button component with multiple variants
  - `card.tsx` - Card component suite for content containers
  - `dialog.tsx` - Dialog component for modals and overlays
  - `sonner.tsx` - Toast notification component with theme support
- `src/components/sections/` - Main section components
  - `Hero.tsx` - Welcome section with avatar and social links
  - `About.tsx` - Personal story and skills section
  - `Projects.tsx` - Portfolio projects display with ContentCard
  - `Games.tsx` - Gaming interests showcase with ContentCard
  - `Contact.tsx` - Contact information and methods
- `src/components/` - Shared components
  - `ContentCard.tsx` - Unified card component for projects and games
  - `ImageWithFallback.tsx` - Image loading with automatic fallback support
- `src/lib/` - Utility libraries
  - `utils.ts` - Core utility functions including `cn()` for class merging
  - `config-loader.ts` - Configuration loading with validation and error handling
  - `button-variants.ts` - Button variant configurations
- `src/types/config.ts` - TypeScript type definitions for configuration system
- `public/config.json` - Main configuration file for site content and settings
- `public/` - Static assets served by Vite
- `dist/` - Build output (ignored by ESLint)
- `components.json` - shadcn/ui configuration
- `wrangler.jsonc` - Cloudflare Pages deployment configuration
- `.local/` - Development files and documentation

### TypeScript Configuration
- Strict mode enabled with modern ES2022 target
- React JSX transform configured
- Bundler module resolution for Vite compatibility
- Path aliases configured: `@/*` maps to `src/*`
- Unused locals/parameters detection enabled

## UI Components & Styling

### shadcn/ui Usage
- Components are installed in `src/components/ui/`
- Import components: `import { Button } from "@/components/ui/button"`
- Uses class-variance-authority (cva) for variant-based styling
- Utility function `cn()` combines clsx and tailwind-merge for conditional classes

### Tailwind CSS v4
- Modern Tailwind CSS with native support for CSS variables
- Dark mode support via `.dark` class
- Custom color palette defined in `src/index.css`
- Uses `oklch()` color space for better color consistency

### Available Components
Currently implemented shadcn/ui components:
- Avatar (with AvatarImage and AvatarFallback)
- Badge (for skill tags and status indicators)
- Button (with variants: default, destructive, outline, secondary, ghost, link)
- Card (with CardContent, CardHeader, CardTitle, CardDescription)
- Dialog (with DialogContent, DialogHeader, DialogTitle, DialogDescription)
- Sonner (toast notifications with theme support via next-themes)
- Additional components can be added with `pnpm dlx shadcn@latest add [component]`

### Theme Support
- Uses next-themes for theme management
- ThemeProvider wraps the entire application
- Supports system/light/dark themes
- Toast notifications follow system theme

### Social Links Implementation
- Three types of social links:
  - `link`: Normal external links (GitHub, Twitter, LinkedIn, Instagram, Email)
  - `copy`: Copy to clipboard with toast feedback (Discord)
  - `text`: Show dialog with message (Website info)
- Uses Sonner toast for copy success/error feedback
- Uses Dialog for text display instead of native alerts

### Current Assets and Icon System
- **Background image**: `https://img.senen.dev/background_nekopara4_Chocola_Vanilla.jpg`
- **Avatar image**: `https://img.senen.dev/IMG_20240704_135615_512x512.jpg`
- **Game Images**: Custom hosted images for game showcases (e.g., `azuelane_laffey.png`, `gakumas_hanami_saki.png`)
- **Icons**: Using Bootstrap Icons (react-icons/bs) with comprehensive icon mapping system
  - Supports lowercase icon names: github, twitter, linkedin, instagram, discord, email, website, threads
  - Maintains backward compatibility with original uppercase formats
  - Automatic fallback to BsGlobe icon for unmapped icons
  - Twitter automatically maps to BsTwitterX icon
  - Threads icon mapping for Meta's Threads platform
  - Theme toggle uses BsSun and BsMoonStars icons

## Configuration System

### Main Configuration File: `public/config.json`

**Current Structure (Comprehensive Configuration):**
```json
{
  "profile": {
    "name": "千円",
    "interests": "遊戲 | 程式 | 僕咖 | 地偶",
    "avatar": { "src": "...", "alt": "個人頭像", "fallback": "你" },
    "background": { "src": "..." }
  },
  "socialLinks": [
    {
      "name": "Instagram(main)",
      "icon": "instagram",
      "url": "https://instagram.com/senen.3454",
      "color": "text-pink-400",
      "type": "link"
    },
    {
      "name": "Discord",
      "icon": "discord",
      "url": "senen_3454",
      "color": "text-blue-500",
      "type": "copy"
    }
  ],
  "about": {
    "story": "就個資訊系學生兼打工人兼指揮官...",
    "skills": ["React", "TypeScript", "Python", "Tailwind CSS", "Docker", "n8n", "app script"]
  },
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "tags": [{ "text": "React", "variant": "outline" }],
      "links": [{ "text": "查看", "href": "...", "variant": "default" }]
    }
  ],
  "games": [
    {
      "title": "碧藍航線",
      "description": "理論上是個彈幕射擊的艦娘遊戲...",
      "image_url": "https://img.senen.dev/azuelane_laffey.png",
      "tags": [
        { "text": "RPG", "variant": "secondary" },
        { "text": "Mobile", "variant": "outline" },
        { "text": "正在遊玩", "variant": "default" }
      ],
      "links": [{ "text": "官方網站", "href": "...", "variant": "outline" }]
    }
  ]
}
```

### Configuration System Features
- **Advanced Validation**: Configuration loading with comprehensive error handling and validation
- **Backward Compatible**: Existing config.json files work without modification
- **Progressive Enhancement**: New sections use default content if not configured
- **Error Recovery**: Graceful fallback to defaults when configuration is invalid
- **Development Support**: Detailed error reporting and warnings in development mode
- **Type Safety**: Full TypeScript typing with config validation

### Enhanced Image System
- **Custom Hosted Images**: Direct URLs for game and project images (e.g., `img.senen.dev`)
- **ImageWithFallback Component**: Robust fallback handling for failed image loads
- **Avatar System**: Structured avatar configuration with fallback text support
- **Background Images**: Configurable background images with theme support

## Development Notes
- **Hot Module Replacement (HMR)**: Configured and working for rapid development
- **ESLint Configuration**: Modern flat config enforcing React Hooks rules and React Refresh patterns
- **Build Process**: TypeScript compilation followed by Vite bundling with optimization
- **Component System**: shadcn/ui components pre-styled but fully customizable via props and CSS variables
- **Theme Management**: next-themes integration for seamless dark/light mode switching
- **Architecture**: Modular section-based components with unified ContentCard system for maintainability
- **Responsive Design**: Mobile-first approach optimized for all screen sizes and devices
- **Configuration Management**: Advanced config loading system with validation and error handling
- **Deployment**: Automated Cloudflare Pages deployment with Wrangler integration
- **Development Features**: Configuration validation, error display, and development-mode warnings
- **TypeScript**: Full type safety with strict mode and comprehensive type definitions
- **Performance**: Optimized image loading, lazy loading, and efficient state management

## Recent Updates
- Unified ContentCard architecture for consistent project and game display
- Enhanced social media integration with Instagram and Threads support
- Advanced configuration validation system with error recovery
- Improved theme system with better icon handling
- Cloudflare Pages deployment configuration
- Enhanced image handling with custom hosted images
- Better mobile responsiveness and accessibility improvements