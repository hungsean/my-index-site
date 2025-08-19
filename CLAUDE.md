# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal portfolio/landing page built with React + TypeScript + Vite using pnpm as the package manager. The project showcases personal information and social media links in a card-based layout. It includes shadcn/ui component library with Tailwind CSS v4 for styling and is built with modern tooling including ESLint for code quality.

### Current Implementation
- Personal information card with avatar and interests
- Social media links (GitHub, Twitter, LinkedIn, Instagram, Discord, Email)
- Fixed background image with blur effects
- Responsive design with backdrop-blur styling
- User: 千円 with interests: 遊戲 | 程式 | 僕咖 | 地偶

## Development Commands

### Core Development
- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production (runs TypeScript compilation then Vite build)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint on all files

### Type Checking
- `tsc -b` - Run TypeScript compiler for type checking (included in build process)

### shadcn/ui Components
- `pnpm dlx shadcn@latest add [component]` - Add new shadcn/ui components
- `pnpm dlx shadcn@latest add button card dialog` - Add multiple components at once

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
- `src/lib/utils.ts` - Utility functions including `cn()` for class merging
- `public/` - Static assets served by Vite
- `dist/` - Build output (ignored by ESLint)
- `components.json` - shadcn/ui configuration

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
- Button (with variants: default, destructive, outline, secondary, ghost, link)
- Card (with CardContent)
- Additional components can be added with `pnpm dlx shadcn@latest add [component]`

### Current Assets
- Background image: `https://img.senen.dev/background_nekopara4_Chocola_Vanilla.jpg`
- Avatar image: `https://img.senen.dev/IMG_20240704_135615_512x512.jpg`
- Icons: Using Lucide React (Github, Twitter, Linkedin, Mail, Instagram, MessageCircle)

## Development Notes
- Hot Module Replacement (HMR) is configured and working
- ESLint enforces React Hooks rules and React Refresh patterns
- Build process includes both TypeScript compilation and Vite bundling
- shadcn/ui components are pre-styled but customizable via props and CSS variables