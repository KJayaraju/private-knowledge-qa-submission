import React, { useEffect, useState } from "react";
import {
  uploadDocument,
  fetchDocuments,
  askQuestion,
  checkStatus
} from "./api";

function App() {
  const [docs, setDocs] = useState([]);
  const [file, setFile] = useState(null);
  const [docText, setDocText] = useState("");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingAsk, setLoadingAsk] = useState(false);

  useEffect(() => {
    const load = async () => {
      setDocs(await fetchDocuments());
      setStatus(await checkStatus());
    };
    load();
  }, []);

  const handleUpload = async () => {
    if (!file && !docText) {
      alert("Upload a .txt file or paste text");
      return;
    }

    setLoadingUpload(true);

    let content = docText;
    let name = "pasted-text.txt";

    if (file) {
      name = file.name;
      content = await file.text();
    }

    await uploadDocument(name, content);
    setDocs(await fetchDocuments());

    setFile(null);
    setDocText("");
    setLoadingUpload(false);
  };

  const handleAsk = async () => {
    if (!question) {
      alert("Please enter a question");
      return;
    }

    setLoadingAsk(true);
    setResult(null);

    const res = await askQuestion(question);
    setResult(res);

    setLoadingAsk(false);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📚 Private Knowledge Q&A</h1>

      {/* STATUS */}
      <div style={styles.card}>
        <h3>System Status</h3>
        {status ? (
          <div style={styles.statusRow}>
            <span>Backend: {status.backend}</span>
            <span>Database: {status.database}</span>
            <span>LLM: {status.llm}</span>
          </div>
        ) : (
          <p>Checking system health...</p>
        )}
      </div>

      {/* UPLOAD */}
      <div style={styles.card}>
        <h3>Upload Document</h3>

        <input
          type="file"
          accept=".txt"
          onChange={e => setFile(e.target.files[0])}
        />

        <p style={{ margin: "12px 0", fontSize: 14 }}>or paste text</p>

        <textarea
          rows="5"
          placeholder="Paste document content here..."
          value={docText}
          onChange={e => setDocText(e.target.value)}
          style={styles.textarea}
        />

        <button
          style={{
            ...styles.button,
            opacity: loadingUpload ? 0.6 : 1
          }}
          disabled={loadingUpload}
          onClick={handleUpload}
        >
          {loadingUpload ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* DOCUMENT LIST */}
      <div style={styles.card}>
        <h3>Uploaded Documents</h3>
        {docs.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No documents uploaded</p>
        ) : (
          <ul style={styles.docList}>
            {docs.map(d => (
              <li key={d.id} style={styles.docItem}>
                📄 {d.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ASK */}
      <div style={styles.card}>
        <h3>Ask a Question</h3>

        <input
          style={styles.input}
          placeholder="Type your question..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />

        <button
          style={{
            ...styles.button,
            background: "#16a34a",
            opacity: loadingAsk ? 0.6 : 1
          }}
          disabled={loadingAsk}
          onClick={handleAsk}
        >
          {loadingAsk ? "Thinking..." : "Ask"}
        </button>

        {result && (
          <div style={styles.answerBox}>
            <h4>Answer</h4>
            <p style={{ lineHeight: 1.6 }}>{result.answer}</p>
            <hr />
            <small>
              <strong>Source:</strong> {result.source}
              <br />
              <strong>Snippet:</strong> {result.snippet}
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 950,
    margin: "auto",
    padding: 30,
    fontFamily: "Inter, Arial, sans-serif",
    background: "linear-gradient(to bottom, #f8fafc, #eef2ff)",
    minHeight: "100vh",
    animation: "fadeIn 0.6s ease-in"
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 32
  },
  card: {
    background: "#ffffff",
    padding: 22,
    marginBottom: 24,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease",
  },
  statusRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #d1d5db"
  },
  textarea: {
    width: "100%",
    padding: 12,
    borderRadius: 6,
    border: "1px solid #d1d5db"
  },
  button: {
    marginTop: 14,
    padding: "12px 18px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  docList: {
    listStyle: "none",
    padding: 0
  },
  docItem: {
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
    transition: "background 0.2s"
  },
  answerBox: {
    marginTop: 18,
    padding: 18,
    background: "#ecfeff",
    borderRadius: 10,
    animation: "slideUp 0.4s ease"
  }
};

export default App;