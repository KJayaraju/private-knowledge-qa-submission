const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://private-knowledge-qa-backend.onrender.com";

export async function uploadDocument(name, content) {
  const res = await fetch(`${BASE_URL}/documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, content })
  });
  return res.json();
}

export async function fetchDocuments() {
  const res = await fetch(`${BASE_URL}/documents`);
  return res.json();
}

export async function askQuestion(question) {
  const res = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  return res.json();
}

export async function checkStatus() {
  const res = await fetch(`${BASE_URL}/status`);
  return res.json();
}