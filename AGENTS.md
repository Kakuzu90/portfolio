# AGENTS.md

## Project

This repository contains Clyde Arellano's dual-audience portfolio. It is a Vue 3 single-page application built with Vite and Vue Router.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite development server
- `npm run build` — create the production build
- `npm run preview` — preview the production build

## Architecture

- `/` is the audience selector.
- `/dev` is the technical portfolio.
- `/client` is the client-facing portfolio.
- `data.json` is the single source of portfolio content.
- Shared UI belongs in `src/components`.
- Route-level presentations belong in `src/views`.
- Global responsive and theme styles belong in `style.css`.

## Implementation Rules

- Use Vue 3 Composition API with `<script setup>`.
- Keep components focused and reusable; do not duplicate project data between views.
- Preserve the `portfolio_view` localStorage contract with `dev` and `client` values.
- Preserve the `portfolio_palette` localStorage contract with `cobalt`, `forest`, `aubergine`, `cyan`, and `lime` values.
- Direct route visits must work without passing through the selector.
- Keep the application dependency-light; add a package only when the platform cannot reasonably provide the behavior.
- Preserve keyboard navigation, visible focus styles, semantic HTML, accessible contrast, and `prefers-reduced-motion` support.
- Do not fabricate project outcomes, technical claims, screenshots, or client results.
- Treat generated project imagery as illustrative and label it accordingly.
- Run `npm run build` after implementation changes.

## Content

- Keep core identity, experience, project, skill, and contact content in `data.json`.
- Add view-specific copy as fields on the same project record.
- Screenshot entries use `{ "src": string, "alt": string, "caption"?: string }`.
- Projects without screenshots must render without empty media placeholders.
