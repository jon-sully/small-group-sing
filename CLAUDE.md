# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Simple Worship is a minimal Astro-based website for hosting worship setlists and song lyrics for small, "backyard" worship sessions. The site provides a simple interface for browsing setlists and viewing song lyrics without requiring projectors or screens.

## Development Commands

- `bun dev` or `astro dev` - Start development server
- `bun build` or `astro build` - Build for production (includes type checking)
- `bun check` - Run Astro and Svelte type checking
- `bun format` - Format code with Prettier
- `astro preview` - Preview production build

## Architecture & Content Structure

### Content Collections
The project uses Astro's content collections for structured content:

- **Setlists** (`/src/content/setlists/`): JSON files defining worship setlists
  - File naming: `YYYYMMDD-event-description.json`
  - Schema: `name`, `date` (UTC), `songs` (array of song references)
  - Songs array references files in the songs collection by filename (without extension)

- **Songs** (`/src/content/songs/`): Markdown files with song lyrics
  - File naming: `<artist-name>-<song-name>.md`
  - Schema: `title`, `artist`, optionally `ccli` (CCLI number)
  - Content: Markdown with `##` headers for song sections (Verse 1, Chorus, Bridge, etc.)
  - Lyrics formatted with empty lines between each lyric line for readability

### Song Structure Format
Songs follow a specific markdown structure for consistent rendering:

```markdown
---
title: Song Title
artist: Artist Name
ccli: 1234567 (optional)
---

## Verse 1

First line of verse

Second line of verse

Third line of verse

## Chorus

First line of chorus

Second line of chorus

## Bridge

Bridge lyrics here

## Tag

Tag lyrics here
```

**Key formatting rules:**
- Each song section uses `##` headers (Verse 1, Verse 2, Chorus, Bridge, Pre-Chorus, Tag, etc.)
- Empty line after each section header
- Empty line between each lyric line within sections
- Sections can be repeated in the song structure to match the actual song flow
- Use `(x2)` notation in headers for repeated sections (e.g., `## Chorus (x2)`)
- Parenthetical notes in lyrics are preserved (e.g., "Oh, we live for you (holy)")
- No need to add section numbers to repeated sections unless they have different lyrics

### Core Pages
- `/` - Homepage with site intro and link to setlists
- `/setlists/` - Lists all setlists sorted by date (newest first)
- `/setlists/[slug]` - Individual setlist page showing song list and full lyrics with smooth scrolling

### Tech Stack
- **Framework**: Astro with Svelte integration
- **Styling**: Tailwind CSS with Flowbite components
- **Type checking**: TypeScript with strict checking
- **Package manager**: Uses pnpm (specified in package.json)
- **Date handling**: dayjs library for date formatting

### Key Features
- Responsive design optimized for mobile devices
- Dark mode theme
- Smooth scrolling navigation between songs on setlist pages
- SetlistJumper component for quick song navigation
- Static site generation for optimal performance

## Content Management

### Adding New Songs
1. Create new `.md` file in `/src/content/songs/` with format: `<artist-name>-<song-name>.md`
2. Add frontmatter with `title`, `artist`, and optionally `ccli`
3. Format lyrics with `##` headers for sections and empty lines between lyric lines
4. Song files must exist before being referenced in setlists or the build will fail

### Adding New Setlists
1. Create new `.json` file in `/src/content/setlists/` with format: `YYYYMMDD-event-description.json`
2. Include required fields: `name`, `date` (UTC timezone), `songs` (array of song file references)
3. Song references must match existing filenames in `/src/content/songs/` (without `.md` extension)

## Development Notes

- Build process includes type checking (`astro check`) before building
- Site URL configured via environment variable for sitemap generation
- Uses experimental Astro env schema for URL configuration
- Prettier configured with plugins for Astro, Svelte, and Tailwind
- Content validation ensures songs referenced in setlists exist as files