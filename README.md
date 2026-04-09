# KidsMindSprout

Premium AI-native landing site and story creation flow for personalized children's books in India.

## Stack

- Next.js 15
- React 19
- TypeScript

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Checks

```bash
npm run lint
npm run build
```

## Vercel Deployment

This repository is ready to deploy on Vercel.

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Root Directory: `.`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave empty
- Node.js Version: `22.x`

## Routes

- `/` homepage
- `/create` story creation flow

## Assets

Current image and video assets live in `public/assets/covers/`.

Note: some asset filenames currently include doubled extensions such as `.jpg.png` and `.mp4.mp4`. The app is wired to those exact filenames right now, so rename them only if you also update the references in the code.
