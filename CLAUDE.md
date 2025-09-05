# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal website (個人網站) built with React + TypeScript + Vite using pnpm as the package manager. **Recently upgraded from a simple linktree style to a comprehensive multi-section personal portfolio website**. The project showcases personal information, social media links, about section, project portfolio, gaming interests, and contact information in a modern, responsive design. It includes shadcn/ui component library with Tailwind CSS v4 for styling and is built with modern tooling including ESLint for code quality.

### Website Information
- **Domain**: senen.dev
- **Current Title**: 千円 | Developer & Gamer
- **Positioning**: Complete personal developer portfolio website (upgraded from linktree style)
- **SEO Description**: "千円的個人網站 - 遊戲玩家 | 程式開發者 | 女僕咖啡廳 | 地下偶像。分享程式、遊戲和生活。"

### Current Implementation
**Multi-section layout with 5 main areas:**
- **Hero Section**: Full-screen welcome area with gradient background, avatar, social links in horizontal layout
- **About Section**: Two-column card layout featuring personal story and skills badges
- **Projects Section**: 3-column grid showcasing project portfolio with images, descriptions, tech stacks
- **Games Section**: 4-column grid displaying gaming interests with status badges
- **Contact Section**: 3-column contact methods (email, Discord, coffee chat)

**Key Features:**
- Social media links with three types: link (normal links), copy (copy to clipboard), text (show dialog)
- Smooth scrolling between sections
- Gradient backgrounds with section-based styling
- Fully responsive design optimized for mobile, tablet, and desktop
- User: 千円 with interests: 遊戲 | 程式 | 僕咖 | 地偶
- Toast notifications using Sonner for copy feedback
- Dialog for text display instead of native alerts
- Image fallback system for project and game images
- Hover animations and scale effects throughout

## Development Commands

### Core Development
- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production (runs TypeScript compilation then Vite build)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint on all files

### Type Checking
- `pnpm exec tsc -b` - Run TypeScript compiler for type checking (included in build process)

### shadcn/ui Components
- `pnpm dlx shadcn@latest add [component]` - Add new shadcn/ui components
- `pnpm dlx shadcn@latest add button card dialog` - Add multiple components at once

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

### Project Structure
- `src/` - Source code directory
- `src/components/ui/` - shadcn/ui components (auto-generated)
- `src/components/sections/` - Main section components
  - `Hero.tsx` - Welcome section with social links
  - `About.tsx` - Personal story and skills section
  - `Projects.tsx` - Portfolio projects display
  - `Games.tsx` - Gaming interests showcase
  - `Contact.tsx` - Contact information and methods
- `src/components/ImageWithFallback.tsx` - Image loading with fallback support
- `src/lib/utils.ts` - Utility functions including `cn()` for class merging
- `src/types/config.ts` - TypeScript type definitions for configuration
- `public/config.json` - Main configuration file for site content
- `public/` - Static assets served by Vite
- `dist/` - Build output (ignored by ESLint)
- `components.json` - shadcn/ui configuration
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

### Current Assets
- Background image: `https://img.senen.dev/background_nekopara4_Chocola_Vanilla.jpg`
- Avatar image: `https://img.senen.dev/IMG_20240704_135615_512x512.jpg`
- Icons: Using Bootstrap Icons (react-icons/bs) with comprehensive icon mapping system
  - Supports lowercase icon names (recommended): github, twitter, linkedin, instagram, discord, email, website, etc.
  - Maintains backward compatibility with original uppercase formats
  - Automatic fallback to BsGlobe icon for unmapped icons
  - Twitter automatically maps to BsTwitterX icon
  - Theme toggle uses BsSun and BsMoonStars icons

## Configuration System

### Main Configuration File: `public/config.json`

**Original (Backward Compatible):**
```json
{
  "profile": { "name": "千円", "interests": "遊戲 | 程式 | 僕咖 | 地偶", ... },
  "socialLinks": [ ... ]
}
```

**Extended (Optional New Sections):**
```json
{
  "about": {
    "story": "Personal story text...",
    "skills": ["React", "TypeScript", "Node.js", ...]
  },
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "image": "project image keywords",
      "technologies": ["React", "TypeScript"],
      "githubUrl": "GitHub link",
      "liveUrl": "Live demo link"
    }
  ],
  "games": [
    {
      "title": "Game Name", 
      "description": "Game description",
      "image": "game image keywords",
      "genre": "RPG",
      "platform": "PC / Mobile",
      "status": "正在遊玩"
    }
  ]
}
```

### Fallback System
- **Backward Compatible**: Existing config.json files work without modification
- **Progressive Enhancement**: New sections use default content if not configured
- **Optional Sections**: Sections without content are automatically populated with defaults

### Image System
- **Unsplash Integration**: Uses image keywords to generate placeholder images
- **Fallback Support**: ImageWithFallback component handles loading failures
- **Format**: `https://images.unsplash.com/{width}x{height}/?{keywords}`

## Development Notes
- Hot Module Replacement (HMR) is configured and working
- ESLint enforces React Hooks rules and React Refresh patterns
- Build process includes both TypeScript compilation and Vite bundling
- shadcn/ui components are pre-styled but customizable via props and CSS variables
- next-themes is installed and configured for theme support
- **Multi-section Architecture**: Organized into modular section components for maintainability
- **Responsive Design**: All sections optimized for mobile-first responsive design