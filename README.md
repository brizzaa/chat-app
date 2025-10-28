<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" height="50"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50"/><img src="https://zustand-demo.pmnd.rs/favicon.ico" width="50" height="50"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="50" height="50"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="50" height="50"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50" height="50"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original-wordmark.svg" width="50" height="50" />



# Real-Time Chat Application

Una moderna applicazione di chat in tempo reale costruita con React, Node.js, Socket.io e MongoDB. L'applicazione offre un'esperienza di messaggistica fluida e intuitiva con autenticazione sicura e gestione dello stato avanzata.

## Caratteristiche Principali

### Autenticazione Sicura

- Registrazione e login con validazione completa
- Hash delle password con bcrypt
- JWT tokens per l'autorizzazione
- Gestione sicura dei cookie cross-domain

### Chat in Tempo Reale

- Messaggi istantanei con Socket.io
- Interfaccia chat moderna e responsive
- Supporto per immagini nei messaggi
- Indicatori di tempo e stato messaggi

### UI/UX Moderna

- Design responsive con Tailwind CSS
- Tema chiaro/scuro dinamico
- Componenti ottimizzati con React
- Gestione stato con Zustand

### Funzionalità Avanzate

- Gestione profilo utente con Cloudinary
- Sidebar con lista contatti
- Sistema di notifiche toast
- Routing protetto con React Router

## Stack Tecnologico

### Frontend

- React 19 - Framework UI moderno
- TypeScript - Type safety e developer experience
- Vite - Build tool veloce e moderno
- Tailwind CSS - Utility-first CSS framework
- Zustand - State management leggero
- Socket.io Client - Comunicazione real-time
- React Router - Routing client-side

### Backend

- Node.js - Runtime JavaScript
- Express.js - Framework web
- TypeScript - Type safety
- Socket.io - WebSocket per real-time
- MongoDB - Database NoSQL
- Mongoose - ODM per MongoDB
- JWT - Autenticazione stateless
- Cloudinary - Gestione immagini

## Installazione e Setup

### Prerequisiti

- Node.js (v18+)
- MongoDB
- Account Cloudinary

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configura le variabili d'ambiente
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Funzionalità Implementate

- Autenticazione completa (registrazione, login, logout)
- Chat real-time con Socket.io
- Gestione profilo con upload immagini
- UI responsive con Tailwind CSS
- State management con Zustand
- Routing protetto con React Router
- Validazione dati lato client e server
- Gestione errori e loading states

## Prossimi Sviluppi

- Notifiche push
- Chat di gruppo
- Emoji reactions
- File sharing
- Video/audio calls
- Message encryption

## Architettura Tecnica

L'applicazione segue un'architettura full-stack moderna:

- Frontend: SPA React con routing client-side
- Backend: API RESTful con WebSocket per real-time
- Database: MongoDB con Mongoose ODM
- Real-time: Socket.io per comunicazione bidirezionale
  
---

sviluppato per dimostrare competenze in sviluppo full-stack moderno con focus su real-time
communication e user experience.
