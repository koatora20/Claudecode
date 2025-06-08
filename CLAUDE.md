# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

This is a Next.js 15 application using the App Router architecture with TypeScript and Tailwind CSS.

### Key Structure
- **App Router**: Uses `src/app/` directory structure with `layout.tsx` and `page.tsx`
- **Styling**: Tailwind CSS with custom CSS variables for theming (`--background`, `--foreground`)
- **Fonts**: Uses Geist Sans and Geist Mono fonts from Google Fonts
- **TypeScript**: Configured with path aliases (`@/*` maps to `./src/*`)

### Styling System
- Primary styling through Tailwind classes
- Dark mode support with `dark:` prefixes
- Custom CSS variables defined in `globals.css`
- Responsive design with `sm:` breakpoints

### Development Notes
- Uses Turbopack for faster development builds
- TypeScript strict mode enabled
- ESLint configured with Next.js defaults