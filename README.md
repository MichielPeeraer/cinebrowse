# 🎬 CineBrowse Movies App
A full-stack movie browsing application built with Next.js, Express, MongoDB, and Docker.



## 🚀 Getting Started
Build the app with Docker

### Start Containers
```docker compose up -d --build```

```-d``` Run in detached mode (background).

```--build```  Rebuild images before starting (ensures code changes are applied).

### Stop Containers
```docker compose down -v```

```-v``` Removes named volumes (wipes the MongoDB data for a clean slate).

### View Logs
```docker compose logs -f [service_name]```

```-f``` Stream/follow the logs in real-time.

- *Example: ```docker compose logs -f backend```*



## 🛠 Database & Backend

### Seed Database
The database seeds automatically on startup, but you can manually trigger it:

```docker compose exec backend npm run seed```

### Swagger Documentation
Explore the API endpoints and schemas: 🔗 http://localhost:5000/api/docs



## 🧪 Testing
These tests verify the full integration from the UI to the Database. Ensure the containers are running before starting.

### Frontend Tests (Playwright)
Run tests with the UI Dashboard (Recommended for debugging)

```cd .\frontend\``` and ```npm run test```

### Backend Tests (Jest + Supertest)

```docker compose exec backend npm run test```



## 🏗️ Architectural Decisions
### Why SSR (Server-Side Rendering)?
For this project, I transitioned the data-fetching logic from Client-Side (CSR) to Server-Side Rendering (SSR) using Next.js. This choice was driven by three main factors:

- Security & Internal Networking: By using SSR, the application communicates with the backend via the internal Docker network (http://backend:5000). This allows us to keep the backend and database private, exposing only the necessary ports to the user's browser.
- Performance (Reduced Latency): Server-to-server communication within a Docker network is significantly faster than a client’s browser making multiple requests over the public internet. This results in faster initial page loads and better Core Web Vitals.
- SEO & Metadata: SSR allows us to generate dynamic metadata (like movie titles and descriptions) on the server. This ensures that social media crawlers and search engines can accurately index each movie page.

### Dockerized Environment
The project is fully containerized to ensure "it works on my machine" translates to "it works on every machine."

- Isolation: The database, backend, and frontend run in isolated environments with specific dependencies.
- Volume Persistence: MongoDB data is stored in a named volume (mongo-data), ensuring that movie data persists even if the containers are stopped or removed.
- Hot Reloading: During development, I utilized Docker volumes to enable hot-reloading for both the frontend and backend, allowing for a seamless developer experience without constant container rebuilds.



## 📈 Handling Large Datasets
As the movie database grows, performance becomes a challenge. I have architected the system to handle data scaling through the following strategies:

- Efficient Querying with MongoDB Indexes: To prevent "Full Collection Scans" (which slow down as data grows), I implemented a unique index on the key field. This ensures that retrieving a specific movie’s details remains instantaneous ($O(1)$ complexity) regardless of whether there are 100 or 1,000,000 records.
- Server-Side Filtering: Instead of fetching all movies and filtering them in the browser (which would crash the user's device with large datasets), all filtering logic—including the multi-genre "AND" logic—is performed at the database level. This ensures the frontend only receives the exact data it needs to display.
- Memory Management via SSR: By using Server-Side Rendering, we shift the data-processing burden away from the user's browser. The server handles the heavy lifting of parsing large JSON objects, sending only the final HTML/CSS to the client, which is essential for low-powered mobile devices.



## 🔧 Refinements
Why not fetch-all and filter-locally? While fetching all data once is simpler for small datasets, I chose Backend Filtering to ensure the application remains performant at scale. This avoids sending massive JSON payloads to the client, reduces browser memory usage, and leverages MongoDB's indexing for near-instant results. This architecture follows the "Thin Client" principle, where the heavy computational lifting is handled by the server.
