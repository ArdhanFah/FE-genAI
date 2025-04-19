import React, { useState } from 'react';
import './index.css'; // pastikan Tailwind CSS sudah di-import


function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    try {
     	const res = await fetch(import.meta.env.VITE_API_URL, {
	      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data.text);
    } catch (err) {
      console.error(err);
      setResult("❌ Gagal mengambil respons dari API. Kemungkinan API tidak aktif atau terjadi error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Generative AI - LKS Modul 2
      </h1>

      <textarea
        className="w-full max-w-2xl p-4 border border-gray-300 rounded-md mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Masukkan prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 mb-6 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Mengirim..." : "Generate"}
      </button>

      {result && (
        <pre className="w-full max-w-2xl bg-white p-4 rounded-md shadow overflow-x-auto whitespace-pre-wrap text-gray-800">
          {result}
        </pre>
      )}
    </div>
  );
}

export default App;
