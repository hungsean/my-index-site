---
allowed-tools: Bash(git *)
description: Create a git commit with gitmoji emoji and English message
---

# Smart Gitmoji Commit Generator

You are an expert at creating concise, meaningful git commit messages using the gitmoji standard. 

## Your Task:
1. **Analyze current changes** by running `git status` and `git diff --staged` (or `git diff` if nothing staged)
2. **Determine the most appropriate gitmoji emoji** based on the change patterns
3. **Generate a concise English commit message** in the format: `emoji description`
4. **Stage all changes** and **create the commit**

## Gitmoji Reference:

### Most Common Patterns:
- 🎨 `:art:` - Improve structure/format of code
- ✨ `:sparkles:` - Introduce new features
- 🐛 `:bug:` - Fix a bug
- 📝 `:memo:` - Add or update documentation
- 🚀 `:rocket:` - Deploy stuff
- 💄 `:lipstick:` - Add/update UI and style files
- ⚡ `:zap:` - Improve performance
- 🔧 `:wrench:` - Add/update configuration files
- 🎉 `:tada:` - Begin a project / Initial commit
- 🔥 `:fire:` - Remove code or files
- ♻️ `:recycle:` - Refactor code
- 🩹 `:adhesive_bandage:` - Simple fix for non-critical issue
- 👷 `:construction_worker:` - Add/update CI build system
- 📱 `:iphone:` - Work on responsive design
- 💚 `:green_heart:` - Fix CI Build
- ⬆️ `:arrow_up:` - Upgrade dependencies
- ⬇️ `:arrow_down:` - Downgrade dependencies
- 📦 `:package:` - Add/update compiled files or packages

### File-based Detection Rules:
- **package.json, yarn.lock, pnpm-lock.yaml** → 📦 `:package:` or ⬆️ `:arrow_up:`
- **README.md, docs/, *.md** → 📝 `:memo:`
- **CSS, SCSS, styles, UI components** → 💄 `:lipstick:`
- **Config files (.env, vite.config, etc.)** → 🔧 `:wrench:`
- **CI/CD files (.github/, Dockerfile)** → 👷 `:construction_worker:`
- **Responsive/mobile changes** → 📱 `:iphone:`
- **New features (new files/major additions)** → ✨ `:sparkles:`
- **Bug fixes (fix, repair, resolve keywords)** → 🐛 `:bug:`
- **Code cleanup/refactor** → ♻️ `:recycle:`
- **Performance improvements** → ⚡ `:zap:`

### Keyword Detection:
- **"fix", "repair", "resolve"** → 🐛 `:bug:`
- **"add", "new", "create"** → ✨ `:sparkles:`  
- **"update", "improve", "enhance"** → 🎨 `:art:` or ⚡ `:zap:`
- **"refactor", "restructure", "cleanup"** → ♻️ `:recycle:`
- **"remove", "delete"** → 🔥 `:fire:`
- **"docs", "documentation"** → 📝 `:memo:`
- **"style", "ui", "css"** → 💄 `:lipstick:`
- **"responsive", "mobile"** → 📱 `:iphone:`

## Commit Message Format:
- **Format**: `emoji description`
- **Style**: Imperative mood (like git default)
- **Length**: Keep under 72 characters
- **Examples**:
  - `✨ Add responsive design for mobile screens`
  - `🐛 Fix card overflow on small devices`
  - `🎨 Improve component structure and formatting`
  - `📱 Optimize layout for mobile and tablet views`
  - `🔧 Update Tailwind CSS configuration`

## Process:
1. Run `git status` to see current changes
2. Run `git diff --staged` or `git diff` to analyze the actual changes
3. Analyze file patterns and change content to determine appropriate emoji
4. Generate concise, descriptive commit message
5. Stage all changes with `git add .` (if needed)
6. Create commit with the generated message
7. Confirm success

**Important**: Always check what files are changed and their content to pick the most accurate emoji and description.