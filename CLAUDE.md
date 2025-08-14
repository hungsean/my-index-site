# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a React + TypeScript + Vite project using pnpm as the package manager. It's a minimal React application built with modern tooling including ESLint for code quality.

## Development Commands

### Core Development
- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production (runs TypeScript compilation then Vite build)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint on all files

### Type Checking
- `tsc -b` - Run TypeScript compiler for type checking (included in build process)

## Architecture & Key Files

### Configuration
- **Vite**: Uses `@vitejs/plugin-react` for React support
- **TypeScript**: Project references configuration with separate `tsconfig.app.json` for source code
- **ESLint**: Modern flat config with TypeScript, React Hooks, and React Refresh plugins
- **Package Manager**: Uses pnpm (lockfile: `pnpm-lock.yaml`)

### Project Structure
- `src/` - Source code directory
- `public/` - Static assets served by Vite
- `dist/` - Build output (ignored by ESLint)

### TypeScript Configuration
- Strict mode enabled with modern ES2022 target
- React JSX transform configured
- Bundler module resolution for Vite compatibility
- Unused locals/parameters detection enabled

## Development Notes
- Hot Module Replacement (HMR) is configured and working
- ESLint enforces React Hooks rules and React Refresh patterns
- Build process includes both TypeScript compilation and Vite bundling