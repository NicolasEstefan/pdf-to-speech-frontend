<h1 align="center">📄 PDF2Speech 🔊</h1>

<p align="center">A React frontend for turning PDF documents into audiobooks.</p>

## Description

This is the frontend for PDF2Speech, a system that turns PDF documents into audiobooks (see the [backend repo](https://github.com/NicolasEstefan/pdf-to-speech-backend)).

Users upload a PDF, pick a language and voice, and track generation progress in real time. Once an audio finishes processing, it can be downloaded directly from the generations list.

## Features

- Drag-and-drop PDF upload
- Language and voice selection, with sample audio previews for each voice
- Real-time generation progress over WebSockets
- Google login
- English and Spanish UI (i18next)

## Tech stack

- **Framework:** React 19 + TypeScript, built with Vite
- **UI:** Mantine
- **State / data fetching:** Redux Toolkit + RTK Query
- **Forms:** React Hook Form + Zod
- **Realtime:** Socket.IO client
- **i18n:** i18next / react-i18next
- **Routing:** React Router

## Project setup

```bash
npm install
```

Create a `.env` file with the URL of the [backend](https://github.com/NicolasEstefan/pdf-to-speech-backend):

```
VITE_API_URL=http://localhost:3000
```

## Run the project

```bash
# development server with HMR
npm run dev

# production build
npm run build

# preview the production build
npm run preview
```

## Lint

```bash
npm run lint
```
