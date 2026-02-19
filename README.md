🟢 Recommended Dev Architecture (Hybrid Mode)

Instead of running everything inside Docker:

✅ Run in Docker:

    PostgreSQL

    Redis

    Adminer

    Redis UI

✅ Run locally:

    NestJS backend

    Next.js frontend

    This gives you:

    Fast HMR (Hot reload)

    Full watch mode

    Clean logs

    Stable DB + cache in Docker

---

Step 1 — Start Only Infra Containers

    $ docker compose up postgres redis adminer redis-ui mongodb

---

Step 2 — Run Backend and Frontend Locally
$ cd backend_nestjs
$ npm install
$ npm run start:dev

    $ cd frontend_nextjs
    $ npm install
    $ npm run dev

---

Connect Compass to Docker MongoDB

    mongodb://root:root@localhost:27017/?authSource=admin

---

Ollama Setup

    Install Ollama locally: https://ollama.com/docs/installation
    Pull GenAI models: gemma3:latest, gemma2:latest
    Run Ollama: ollama run

    Setup local ollama with Docker:
    In docker/.env, set OLLAMA_BASE_URL=http://host.docker.internal:11434
    This allows backend to connect to local Ollama from Docker.
