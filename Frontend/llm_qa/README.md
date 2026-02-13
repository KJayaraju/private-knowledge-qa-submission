# 📘 Private Knowledge Q&A – Frontend

This is the frontend application for **Private Knowledge Q&A**, a mini workspace that allows users to upload documents, ask questions, and receive AI-generated answers with clear source references.

The frontend is built with **React (Create React App)** and communicates with a hosted backend API.

---

## 🌐 Live Application

- **Backend API:** https://private-knowledge-qa-backend.onrender.com

---

## ✨ Features

- Upload `.txt` documents or paste text directly
- View list of uploaded documents
- Ask natural-language questions
- Receive AI-generated answers
- See the **source document** and **text snippet** used to answer
- Status section showing:
  - Backend health
  - Database connectivity
  - LLM availability
- Basic validation for empty or invalid inputs
- Clean, simple, and user-friendly UI

---

## 🛠️ Tech Stack

- **React** (Create React App)
- **JavaScript (ES6+)**
- **Fetch API** for backend communication
- **Inline CSS / CSS-in-JS**

---

## 📂 Project Structure
frontend/
├── public/
├── src/
│ ├── App.js # Main UI and logic
│ ├── api.js # Backend API calls
│ ├── index.js
│ └── styles.css # (optional)
├── package.json
└── README.md