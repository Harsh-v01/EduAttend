# EduAttend — Minimal Full-stack (Frontend + Express Backend)

EduAttend is a small attendance system originally built as a frontend-only React + TypeScript + Vite + Tailwind app. This repository adds a minimal, readable Express.js backend that stores students, classes, and attendance in a JSON file to make the project look production-oriented for interviews.

Architecture (ASCII)
--------------------
Frontend (Vite/React)  --->  Backend (Express)  --->  data/db.json (simple JSON store)
         |                     |
         |-- src/api.ts -------|
         | (VITE_API_URL)

Project structure (important parts)
- server/
  - index.js
  - routes/
    - students.js
    - classes.js
    - attendance.js
  - controllers/
    - _db.js
    - studentsController.js
    - classesController.js
    - attendanceController.js
  - data/db.json
  - .env.example
- src/
  - api.ts
- .env.example (frontend)

Backend API
- POST /api/students → { name, roll } → adds student
- GET /api/students → list students
- POST /api/classes → { name, code } → adds class
- GET /api/classes → list classes
- POST /api/attendance → { date, classId, presentStudentIds } → mark attendance
- GET /api/attendance/:date → attendance records for date

Setup & Run (2-step quick guide)
--------------------------------
Prerequisites: Node 16+, npm.

1) Backend
- cd server
- npm init -y
- npm i express cors dotenv uuid
- Create a .env in server/ (or copy .env.example) if you want a custom PORT
- Run: node index.js
- By default it runs on PORT=5000 (or process.env.PORT)

2) Frontend (existing project)
- Ensure Vite dev server runs as usual (npm run dev)
- Add frontend .env or copy .env.example in root with:
  VITE_API_URL=http://localhost:5000

Frontend integration (minimal edits)
- Add the provided src/api.ts to your frontend.
- Replace in-memory calls with api.* methods. Examples:

Example: load students & classes (in a React useEffect)
```ts
// ...existing code...
import api from './api';

useEffect(() => {
  async function load() {
    try {
      const students = await api.listStudents();
      setStudents(students);
      const classes = await api.listClasses();
      setClasses(classes);
    } catch (err) {
      console.error(err);
    }
  }
  load();
}, []);
// ...existing code...
```

Example: add a student
```ts
// ...existing code...
async function onAddStudent(name, roll) {
  const student = await api.addStudent({ name, roll });
  setStudents(prev => [...prev, student]);
}
// ...existing code...
```

Example: mark attendance
```ts
// ...existing code...
await api.markAttendance({ date: '2025-11-19', classId, presentStudentIds });
const attendance = await api.getAttendanceByDate('2025-11-19');
// ... use attendance ...
// ...existing code...
```

Quick run — "run this"
----------------------
If you just want to run a minimal backend + your existing frontend quickly, run these commands from your project root.

1) Create and run the backend (quick scaffold)
- Open a terminal and run:
```bash
# from project root
mkdir -p server && cd server

# create package.json and install tiny deps
npm init -y
npm i express cors dotenv uuid

# create a minimal index.js and helper files quickly (paste contents below manually or ask me to create files)
cd ..

# run backend
# In server/ run:
node server/index.js
```

Notes: If you don't yet have the server files, you can ask me to create them automatically (I will add index.js, routes, controllers, data/db.json and .env.example). If files already exist, starting node server/index.js will use PORT from server/.env or default 5000.

2) Frontend — set API URL and run Vite
- Copy root .env.example to .env and set:
```
VITE_API_URL=http://localhost:5000
```
- Start Vite (usual command in your frontend):
```bash
npm install
npm run dev
```

Quick verification (once both servers running)
- Backend health: open http://localhost:5000/api/health → should return { "status": "ok" }
- List students: GET http://localhost:5000/api/students
- Add a student:
  curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{"name":"Alice","roll":"A01"}'

If you want me to create the server files now, reply: "create server files" and I will add them into server/ with simple, readable code you can explain in an interview.

Design choices, trade-offs, and future improvements
--------------------------------------------------
- Simplicity: Using a single JSON file keeps the code easy to read and explain in interviews.
- Not for production: No concurrency control, no authentication, and file-based storage is not robust under concurrent writes.
- Future improvements: migrate to SQLite/Postgres, add validation, input sanitization, authentication, tests, and pagination.

Tech stack
- Frontend: React, TypeScript, Vite, Tailwind CSS (unchanged)
- Backend: Node.js + Express, CORS, dotenv
- Storage: JSON file (server/data/db.json)

Impact
- Adds minimal server-side capabilities so the project demonstrates full-stack awareness.
- Easy to explain: controllers read/write a single file, routes are RESTful, frontend calls a small api.ts.

If you want
- I can patch specific frontend files directly. Add those files to the working set or request edits with exact paths and I will modify them for you.
