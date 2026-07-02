# Ezyboard

Ezyboard is a real-time collaborative whiteboard built with Next.js on the frontend and Socket.IO on the backend. Users can join a room, draw on a shared canvas, switch tools, and see updates live across connected clients.

## Features

- Real-time board collaboration
- Room-based sessions
- Live join notifications
- Freehand drawing
- Line, rectangle, and circle tools
- Eraser tool
- Brush color and size controls
- Canvas zoom controls
- Socket-driven synchronization

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Socket.IO client
- Lucide React icons
- Framer Motion

### Backend

- Node.js
- Express
- Socket.IO
- dotenv for environment variables

## Project Structure

```text
ezyboard/
├── app/
│   ├── page.tsx
│   └── room/[roomId]/page.tsx
├── components/
│   ├── board/
│   ├── canvas/
│   ├── network/
│   └── socket-provider.tsx
├── lib/
│   └── socket.ts
├── server/
│   ├── index.js
│   ├── managers/
│   └── socket/
└── public/
```

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer

## Environment Variables

### Frontend

The frontend currently connects to the Socket.IO server at:

```text
http://localhost:3001
```

If you move the backend URL, update `lib/socket.ts` accordingly.

### Backend

Create a `.env` file inside `server/` if you want to override the default port:

```env
PORT=3001
```

## Installation

Install dependencies for both apps:

```bash
npm install
cd server
npm install
```

## Running the Application

### Start the frontend

From the `ezyboard/` directory:

```bash
npm run dev
```

The app will run on:

```text
http://localhost:3000
```

### Start the backend

From the `server/` directory:

```bash
node index.js
```

The socket server will run on:

```text
http://localhost:3001
```

## Available Scripts

### Frontend

From the project root:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Backend

From the `server/` directory:

```bash
node index.js
```

## How It Works

1. A user enters a name and room ID on the landing page.
2. The client emits `join-board` to the Socket.IO server.
3. The server adds the user to the room and broadcasts a `user-joined` event.
4. The frontend socket provider shows a toast when someone joins the room.
5. The board canvas syncs drawing actions through room-scoped socket events.

## Drawing Tools

The board supports these tools:

- Select
- Pen
- Eraser
- Line
- Rectangle
- Circle

Brush controls include color and line width selection.

## Rooms and Collaboration

- Each board is identified by a room ID.
- Users joining the same room share the same live canvas session.
- Join notifications appear for other users already inside the room.
- Drawing events are scoped to the active board room.

## Notes

- Board data is currently managed in memory on the server.
- Refreshing or restarting the backend clears active room state.
- The project is structured to support future persistence and richer collaboration features.

## Contributing

If you want to extend the app, good next steps are:

- Add text editing
- Add shape resizing and selection handles
- Persist boards to a database
- Add undo and redo support
- Improve chat and user presence UI

## License

This project currently does not declare a license.
