# AI Usage Notes

This document explains how AI tools were used during development and what was manually verified.

---

## 🧠 How AI Was Used

- Designing backend API structure (Express routes)
- Improving keyword-matching logic for multi-document Q&A
- Refining LLM prompts to prevent hallucinations
- Debugging CORS, deployment, and runtime errors
- Writing clean, professional documentation

---

## 🔍 What Was Checked Manually

- All backend logic (document scanning, keyword matching)
- Database queries and schema
- Frontend-backend integration
- Error handling and edge cases
- Hosting configuration on Render and Vercel

---

## 🤖 LLM Used

- **Provider:** Groq
- **Model:** LLaMA-based text completion model (via Groq API)
- **Why:** Groq provides extremely fast inference with high-quality reasoning.
  The model performs well for document-based question answering, follows strict
  prompts reliably, and is suitable for real-time applications without adding
  significant latency.

---

## ⚠️ Guardrails Implemented

- LLM is restricted to answer **only from provided documents**
- Explicit instructions to say *“I don’t know”* if answer is missing
- No external knowledge or hallucination allowed

---

AI was used as an **assistant**, not a replacement for understanding or decision-making.
