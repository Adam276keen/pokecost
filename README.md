# Pokecost Progressive Web App

Pokecost is a progressive web application for browsing Pokémon TCG cards, tracking their prices, and managing a personal collection. The experience is optimised for mobile and desktop with offline support provided through a service worker.

## Features

- 🔍 **Powerful filtering** – Search by card name, set, rarity, or type with instant results.
- 📈 **Localized pricing** – Prices are automatically converted into your preferred currency.
- 🗂️ **Collection management** – Add cards to a personal collection stored in the browser with quantity controls.
- 🌓 **Theme aware** – Toggle between light and dark modes, with preferences saved locally.
- 📱 **Installable PWA** – Works offline thanks to a caching service worker and install prompts on supported devices.

## Getting started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

The generated assets are emitted to the `dist/` directory. Deploy the contents of this folder to any static hosting provider.

## Environment variables

An API key for the Pokémon TCG API is bundled for convenience. If you have your own key you can update the value inside [`constants.ts`](constants.ts).

## Progressive Web App behaviour

- A service worker (`sw.js`) precaches the application shell and serves content using a network-first strategy with offline fallbacks.
- The app manifest (`manifest.json`) exposes install metadata and icons so the experience can be added to home screens.
- User preferences (theme, language, and collection) are stored locally to provide a seamless offline experience.
