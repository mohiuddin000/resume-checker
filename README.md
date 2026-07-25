# AI Resume Matcher

An AI-powered Resume Screening and ATS Job Matching application built with a **microservice architecture** using **React, Node.js, Express, MongoDB, and FastAPI**.

The application analyzes resumes against a job description using Natural Language Processing (NLP), extracts technical skills, calculates an ATS compatibility score, and provides actionable insights into matched, missing, and extra skills.

---

# Features

- 🔐 JWT Authentication
- 📄 Resume PDF Upload
- 🤖 AI-powered Resume Analysis
- 🎯 ATS Compatibility Score
- 🧠 Skill Extraction
- 📊 Resume Match Percentage
- 📚 Resume History
- 📄 Resume Details
- 🗑️ Delete Resume Analysis
- 📑 Pagination Support
- 🔒 Protected APIs
- ⚡ FastAPI ML Microservice
- 📦 MongoDB Data Persistence

---

# Architecture

```text
                    React + Vite
                          │
                          ▼
                 Express.js Backend
          ┌────────────────────────────┐
          │ JWT Authentication         │
          │ Authorization              │
          │ Multer File Upload         │
          │ Resume APIs                │
          │ MongoDB                    │
          └──────────────┬─────────────┘
                         │ HTTP
                         ▼
                 FastAPI ML Service
          ┌────────────────────────────┐
          │ PDF Parsing                │
          │ Text Cleaning              │
          │ Skill Extraction           │
          │ TF-IDF + Cosine Similarity │
          └────────────────────────────┘
```

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## AI Microservice

- FastAPI
- Python
- pdfplumber
- scikit-learn
- TF-IDF Vectorizer
- Cosine Similarity

---

# Project Structure

```text
AI-Resume-Matcher/

│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── ml-service/
│   ├── app/
│   │   ├── parser.py
│   │   ├── preprocessing.py
│   │   ├── skills.py
│   │   ├── scorer.py
│   │   ├── models.py
│   │   └── main.py
│   └── requirements.txt
│
└── README.md
```

---

# Resume Analysis Workflow

```text
Upload Resume
      │
      ▼
Express API
      │
      ▼
FastAPI ML Service
      │
      ├── Extract PDF Text
      ├── Clean Text
      ├── Extract Skills
      ├── Calculate Similarity
      ▼
Return Analysis
      │
      ▼
Store Result in MongoDB
      │
      ▼
Display to User
```

---

# REST API

## Authentication

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register user          |
| POST   | `/api/auth/login`    | Login user             |
| GET    | `/api/auth/profile`  | Get authenticated user |

---

## Resume APIs

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/api/resumes/upload` | Upload and analyze resume |
| GET    | `/api/resumes`        | Get resume history        |
| GET    | `/api/resumes/:id`    | Get single resume         |
| DELETE | `/api/resumes/:id`    | Delete resume             |

---

## ML Service

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| POST   | `/score` | Analyze uploaded resume |
| GET    | `/`      | Health check            |

---

# Environment Variables

## Express Backend

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

JWT_EXPIRES_IN=7d

PYTHON_API_URL=http://127.0.0.1:8000
```

---

## FastAPI Service

```env
APP_NAME=Resume ML Service

APP_VERSION=1.0.0

UPLOAD_DIR=uploads

SKILLS_FILE=data/skills.txt
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/mohiuddin000/resume-checker.git

cd ai-resume-checker
```

---

## Install Dependencies

### Root

```bash
npm install
```

### Server

```bash
cd server

npm install
```

### Client

```bash
cd client

npm install
```

### ML Service

```bash
cd ml-service

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

---

# Running the Project

## Start FastAPI

```bash
cd ml-service

python -m uvicorn app.main:app --reload
```

Runs on:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Start Express Backend

```bash
cd server

npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## Start React

```bash
cd client

npm run dev
```

Runs on:

```
http://localhost:5173
```

---

# Current Project Status

## Backend

- ✅ Authentication
- ✅ Authorization
- ✅ Resume Upload
- ✅ FastAPI Integration
- ✅ Resume Analysis
- ✅ MongoDB Storage
- ✅ Resume History
- ✅ Resume Details
- ✅ Delete Resume
- ✅ Pagination

## AI Service

- ✅ PDF Parsing
- ✅ Text Cleaning
- ✅ Skill Extraction
- ✅ TF-IDF Similarity
- ✅ Cosine Similarity Scoring

## Frontend

- 🚧 Under Development

---

# Future Improvements

- Resume Improvement Suggestions using LLMs
- AI Cover Letter Generator
- Resume Comparison
- Dashboard Analytics
- Docker Support
- CI/CD Pipeline
- Unit & Integration Tests
- Cloud Deployment

---

# Author

**MOHIUDDIN**

If you found this project useful, consider giving it a ⭐ on GitHub.
