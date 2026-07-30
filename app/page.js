"use client";
import { useState } from "react";
import { FileText, Mail, BarChart3, Send, Loader2, Copy, Check, Circle } from "lucide-react";
import { generatePreventivo, generateEmail, generateReport } from "./lib/templates";

const TOOLS = [
  {
    id: "preventivo",
    label: "Preventivo",
    Icon: FileText,
    desc: "Genera un preventivo professionale in pochi secondi",
    fields: [
      { key: "azienda", label: "Nome Azienda Cliente", placeholder: "Es. Rossi Srl" },
      { key: "servizio", label: "Servizio / Prodotto Offerto", placeholder: "Es. Sviluppo sito web" },
      { key: "dettagli", label: "Dettagli del Lavoro", placeholder: "Es. 5 pagine, design custom, SEO base..." },
      { key: "prezzo", label: "Prezzo (€)", placeholder: "Es. 1500" },
      { key: "tempi", label: "Tempi di Consegna", placeholder: "Es. 30 giorni" },
    ],
    generate: generatePreventivo,
  },
  {
    id: "email",
    label: "Email Commerciale",
    Icon: Mail,
    desc: "Scrivi email di vendita chiare e dirette",
    fields: [
      { key: "destinatario", label: "Destinatario", placeholder: "Es. Mario Rossi, titolare" },
      { key: "azienda", label: "Azienda Destinatario", placeholder: "Es. Rossi Costruzioni" },
      { key: "prodotto", label: "Cosa Vuoi Vendere", placeholder: "Es. Software gestionale" },
      { key: "beneficio", label: "Beneficio Principale", placeholder: "Es. Risparmia 5 ore a settimana" },
      { key: "cta", label: "Call to Action", placeholder: "Es. Fissa una demo gratuita" },
    ],
    generate: generateEmail,
  },
  {
    id: "report",
    label: "Report Settimanale",
    Icon: BarChart3,
    desc: "Genera report chiari e strutturati per il team",
    fields: [
      { key: "periodo", label: "Periodo", placeholder: "Es. 7-13 Aprile 2026" },
      { key: "attivita", label: "Attività Svolte", placeholder: "Es. 3 nuovi clienti acquisiti, lancio campagna..." },
      { key: "risultati", label: "Risultati / KPI", placeholder: "Es. +15% fatturato, 20 lead generati" },
      { key: "problemi", label: "Problemi / Ostacoli", placeholder: "Es. Ritardi fornitore X" },
      { key: "prossimi", label: "Prossimi Obiettivi", placeholder: "Es. Chiudere contratto con Bianchi Srl" },
    ],
    generate: generateReport,
  },
];

export default function Home() {
  const [activeTool, setActiveTool] = useState(0);
  const [formData, setFormData] = useState({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const tool = TOOLS[activeTool];
  const allFilled = tool.fields.every((f) => formData[f.key]?.trim());

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    if (!allFilled) return;
    setLoading(true);
    setOutput("");
    setError("");
    // Brief pause so the "generation" step still reads as a deliberate action.
    setTimeout(() => {
      try {
        setOutput(tool.generate(formData));
      } catch {
        setError("Errore nella generazione. Controlla i campi e riprova.");
      }
      setLoading(false);
    }, 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchTool = (i) => {
    setActiveTool(i);
    setFormData({});
    setOutput("");
    setError("");
  };

  return (
    <main className="page">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />

      <div className="shell">
        {/* Header */}
        <header className="header">
          <div className="status">
            <Circle className="status-dot" size={8} strokeWidth={0} fill="currentColor" />
            <span className="status-label">Sistema Attivo</span>
          </div>
          <h1 className="logo">
            Auto<span className="logo-accent">Biz</span>
          </h1>
          <p className="tagline">
            Automazione documentale per PMI italiane — genera documenti professionali in secondi
          </p>
        </header>

        {/* Tool Tabs */}
        <div className="tabs" role="tablist" aria-label="Strumenti disponibili">
          {TOOLS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTool === i}
              className={`tab ${activeTool === i ? "tab-active" : ""}`}
              onClick={() => switchTool(i)}
            >
              <t.Icon size={16} strokeWidth={2} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid">
          {/* Form */}
          <div>
            <p className="tool-desc">{tool.desc}</p>

            <div className="field-list">
              {tool.fields.map((f) => (
                <div key={f.key}>
                  <label className="field-label" htmlFor={`${tool.id}-${f.key}`}>
                    {f.label}
                  </label>
                  <input
                    id={`${tool.id}-${f.key}`}
                    className="field-input"
                    value={formData[f.key] || ""}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>

            {error && (
              <p className="error-text" role="alert">
                {error}
              </p>
            )}

            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={loading || !allFilled}
            >
              {loading ? (
                <>
                  <Loader2 className="spin" size={16} strokeWidth={2.5} />
                  Generazione in corso...
                </>
              ) : (
                <>
                  <Send size={15} strokeWidth={2.5} />
                  Genera
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div className="output-panel" aria-live="polite">
            <div className="output-header">
              <span className="output-label">Output</span>
              {output && (
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} strokeWidth={2} />}
                  {copied ? "Copiato" : "Copia"}
                </button>
              )}
            </div>

            {loading ? (
              <div className="output-loading">
                <div className="skeleton-line" style={{ width: "88%" }} />
                <div className="skeleton-line" style={{ width: "95%" }} />
                <div className="skeleton-line" style={{ width: "70%" }} />
                <div className="skeleton-line" style={{ width: "82%" }} />
              </div>
            ) : output ? (
              <pre className="output-text">{output}</pre>
            ) : (
              <div className="output-empty">
                <tool.Icon size={20} strokeWidth={1.5} />
                <span>Il documento generato apparirà qui</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <span>AUTOBIZ v1.0</span>
          <span>ELABORAZIONE 100% LOCALE</span>
          <a href="https://www.instantweb.info" target="_blank" rel="noopener noreferrer" className="footer-credit">
            Sito realizzato da Instant Web
          </a>
        </footer>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .bg-grid {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-image: linear-gradient(rgba(255, 200, 50, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 200, 50, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .bg-glow {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(255, 190, 30, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .shell {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .header {
          margin-bottom: 48px;
        }
        .status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .status-dot {
          color: #ffc81e;
          filter: drop-shadow(0 0 6px #ffc81e);
          animation: pulse 2s infinite;
        }
        .status-label {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #ffc81e;
          text-transform: uppercase;
        }
        .logo {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(36px, 6vw, 58px);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin-bottom: 10px;
        }
        .logo-accent {
          color: #ffc81e;
        }
        .tagline {
          color: #7a7a72;
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.6;
          max-width: 46ch;
        }

        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 36px;
          border-bottom: 1px solid rgba(255, 200, 50, 0.12);
          padding-bottom: 24px;
          flex-wrap: wrap;
        }
        .tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          min-height: 44px;
          background: transparent;
          color: #767670;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-family: inherit;
          font-weight: 400;
          letter-spacing: 0.06em;
          transition: border-color 150ms ease, color 150ms ease, background 150ms ease;
        }
        .tab:hover {
          color: #d8d6cd;
          border-color: rgba(255, 200, 50, 0.35);
        }
        .tab-active,
        .tab-active:hover {
          background: #ffc81e;
          color: #0a0a0f;
          border-color: #ffc81e;
          font-weight: 700;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .tool-desc {
          color: #6b6b64;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .field-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .field-label {
          display: block;
          font-size: 10px;
          color: #ffc81e;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .field-input {
          width: 100%;
          min-height: 44px;
          padding: 11px 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 200, 50, 0.18);
          border-radius: 4px;
          color: #e8e6df;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .field-input::placeholder {
          color: #3a3a35;
        }
        .field-input:hover {
          border-color: rgba(255, 200, 50, 0.32);
        }
        .field-input:focus-visible {
          border-color: #ffc81e;
          box-shadow: 0 0 0 3px rgba(255, 200, 50, 0.18);
        }

        .error-text {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: 16px;
        }

        .generate-btn {
          margin-top: 28px;
          width: 100%;
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px;
          background: #ffc81e;
          color: #0a0a0f;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: inherit;
          transition: transform 120ms ease, opacity 150ms ease, background 150ms ease;
        }
        .generate-btn:hover:not(:disabled) {
          background: #ffd54a;
        }
        .generate-btn:active:not(:disabled) {
          transform: scale(0.98);
        }
        .generate-btn:focus-visible {
          box-shadow: 0 0 0 3px rgba(255, 200, 50, 0.35);
        }
        .generate-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .spin {
          animation: spin 900ms linear infinite;
        }

        .output-panel {
          background: rgba(255, 200, 50, 0.02);
          border: 1px solid rgba(255, 200, 50, 0.12);
          border-radius: 4px;
          padding: 22px;
          min-height: 220px;
          display: flex;
          flex-direction: column;
        }
        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .output-label {
          font-size: 10px;
          color: #ffc81e;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 32px;
          background: transparent;
          border: 1px solid rgba(255, 200, 50, 0.25);
          color: #8a8a82;
          padding: 5px 14px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.06em;
          transition: border-color 150ms ease, color 150ms ease;
        }
        .copy-btn:hover {
          border-color: #ffc81e;
          color: #ffc81e;
        }

        .output-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #4a4a44;
          font-size: 12px;
          text-align: center;
          padding: 24px 0;
        }
        .output-loading {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 4px;
        }
        .skeleton-line {
          height: 10px;
          border-radius: 2px;
          background: rgba(255, 200, 50, 0.12);
          animation: shimmer 1.3s ease-in-out infinite;
        }
        .output-text {
          margin: 0;
          font-size: 12px;
          line-height: 1.75;
          color: #bbb;
          white-space: pre-wrap;
          word-break: break-word;
          font-family: inherit;
          max-height: 520px;
          overflow-y: auto;
        }

        .footer {
          margin-top: 72px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 10px;
          color: #2a2a2a;
          letter-spacing: 0.12em;
        }

        .footer-credit {
          color: #2a2a2a;
          text-decoration: none;
          transition: color 150ms ease;
        }

        .footer-credit:hover {
          color: #ffc81e;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .status-dot,
          .skeleton-line,
          .spin {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
