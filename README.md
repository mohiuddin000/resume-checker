# AI Resume Matcher

A MERN-stack AI Resume Screener and ATS Job Matcher.

## Milestone 1 setup

1. Install dependencies from the repository root:

   ```bash
   npm install
   ```

2. Copy the environment templates:

   ```powershell
   Copy-Item server/.env.example server/.env
   Copy-Item client/.env.example client/.env
   ```

3. Update `server/.env` with your MongoDB Atlas connection string.

4. Start client and API together:

   ```bash
   npm run dev
   ```

The client runs at `http://localhost:5173`. The API runs at `http://localhost:5000`, and its health endpoint is `GET /api/health`.
