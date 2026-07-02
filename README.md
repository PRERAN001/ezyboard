# EzyBoard

<p align="center">
  <img width="900" alt="EzyBoard" src="https://github.com/user-attachments/assets/37782ae6-476b-46d9-9c09-d777c86eee84" />
</p>

<p align="center">
  <strong>A real-time collaborative whiteboard built with a custom graphics engine.</strong>
</p>

<p align="center">
  Next.js • Node.js • Socket.IO • TypeScript
</p>

---

## Overview

EzyBoard is a real-time collaborative whiteboard inspired by modern visual collaboration tools such as Excalidraw, Miro, and Figma.

Unlike traditional canvas applications, EzyBoard is built around a modular graphics engine that separates rendering, tools, networking, scene management, and input handling into independent systems. This architecture makes the editor scalable, maintainable, and easy to extend with new drawing tools and collaborative features.

---

## Features

### Collaboration

- Real-time collaborative drawing
- Room-based whiteboards
- Multi-user synchronization
- Low-latency event broadcasting
- Live participant management

### Graphics Engine

- Custom Canvas Engine
- Scene Graph architecture
- Tool Manager
- Renderer
- Input Manager
- Socket Manager
- High DPI rendering
- Continuous render loop

### Drawing Tools

- Pen
- Line
- Rectangle
- Circle
- Eraser
- Brush size control
- Color picker
- Zoom controls

---

## Architecture

<p align="center">
  <img width="900" alt="Architecture" src="https://github.com/user-attachments/assets/de53987f-9f97-499d-a6bf-f95a7d13031e" />
</p>

The application follows an event-driven architecture where every drawing action flows through the graphics engine before being synchronized across connected clients.

```
User Action
      │
      ▼
Canvas Engine
      │
      ▼
Tool Manager
      │
      ▼
Current Tool
      │
      ▼
Scene
      ├───────────────┐
      ▼               ▼
Renderer       Socket Manager
      │               │
      ▼               ▼
 HTML Canvas     Socket.IO Server
                      │
                      ▼
               Connected Clients
```

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Socket.IO Client
- Framer Motion
- Lucide React

### Backend

- Node.js
- Express
- Socket.IO
- dotenv

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/ezyboard.git

cd ezyboard
```

### Install dependencies

```bash
npm install

cd server

npm install
```

### Configure Environment

Create a `.env` file inside the `server` directory.

```env
PORT=3001
```

---

## Running the Application

### Start the backend

```bash
cd server

node index.js
```

### Start the frontend

```bash
npm run dev
```

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:3001
```

---

## Realtime Workflow

```
User Draws
      │
      ▼
Canvas Engine
      │
      ▼
Socket Manager
      │
      ▼
Socket.IO Server
      │
      ▼
Broadcast
      │
      ▼
Connected Clients
      │
      ▼
Renderer
```

---

## Current Status

### Completed

- Real-time multiplayer drawing
- Room-based collaboration
- Custom graphics engine
- Scene Graph
- Renderer
- Tool Manager
- Socket Manager
- High DPI rendering

### In Progress

- Camera system
- Infinite canvas
- Pan & Zoom
- Selection tool
- Undo / Redo

---

## Roadmap

### Version 0.2

- Camera
- Infinite Canvas
- Pan & Zoom

### Version 0.3

- Selection Tool
- Object Manipulation
- Arrow Tool
- Text Tool

### Version 0.4

- Undo / Redo
- Autosave
- MongoDB Persistence

### Version 0.5

- Live Cursors
- Comments
- Image Support
- Export PNG
- Export SVG
- Version History

---

## Design Principles

- Modular graphics engine
- Event-driven architecture
- Separation of rendering and networking
- Scene as the single source of truth
- Extensible tool system
- Real-time synchronization through Socket.IO

---

## Contributing

Contributions are welcome.

If you'd like to improve the rendering engine, networking layer, editor tools, or overall architecture, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.
