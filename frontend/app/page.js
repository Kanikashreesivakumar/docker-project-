"use client";

import { useMemo, useState } from "react";

export default function Home(){
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fileLabel = useMemo(() => {
        if (!file) return "Choose a resume (PDF or text)";
        return `${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`;
    }, [file]);

    const uploadFile = async () => {
        if (!file || loading) return;

        setError("");
        setResult("");

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        try{
            const res =await fetch("http://localhost:5000/upload",{
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `Request failed (${res.status})`);
            }

            const data = await res.json();
            setResult(typeof data?.analysis === "string" ? data.analysis : JSON.stringify(data, null, 2));

        }catch (err){
            setError(err?.message || "Error occurred");
        }

        setLoading(false);
    };

    return (
        <main className="container">
            <section className="card" aria-busy={loading}>
                <h1 className="h1">AI Resume Analyzer</h1>
                <p className="subtle">Upload a resume and get a structured ATS-style review.</p>

                <div className="row">
                    <div className="file">
                        <label>
                            <div style={{ marginBottom: 6 }}>{fileLabel}</div>
                            <input
                                type="file"
                                accept=".pdf,.txt"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                disabled={loading}
                            />
                        </label>
                    </div>

                    <button
                        className="button"
                        onClick={uploadFile}
                        disabled={!file || loading}
                        type="button"
                    >
                        {loading ? "Analyzing…" : "Upload & Analyze"}
                    </button>
                </div>

                <p className="status" role="status" aria-live="polite">
                    {error ? `Error: ${error}` : loading ? "Uploading and analyzing…" : ""}
                </p>

                {result ? (
                    <div className="result">
                        <pre className="pre">{result}</pre>
                    </div>
                ) : null}
            </section>
        </main>
    );
}