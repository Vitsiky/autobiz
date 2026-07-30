"use client";
import { useState } from "react";

const TOOLS = [
  {
    id: "preventivo",
    label: "Preventivo",
    icon: "📄",
    desc: "Genera un preventivo professionale in secondi",
    fields: [
      { key: "azienda", label: "Nome Azienda Cliente", placeholder: "Es. Rossi Srl" },
      { key: "servizio", label: "Servizio / Prodotto Offerto", placeholder: "Es. Sviluppo sito web" },
      { key: "dettagli", label: "Dettagli del Lavoro", placeholder: "Es. 5 pagine, design custom, SEO base..." },
      { key: "prezzo", label: "Prezzo (€)", placeholder: "Es. 1500" },
      { key: "tempi", label: "Tempi di Consegna", placeholder: "Es. 30 giorni" },
    ],
    prompt: (d) =>
      `Sei un consulente business professionale italiano. Genera un preventivo formale e convincente per una PMI italiana.
Cliente: ${d.azienda}
Servizio: ${d.servizio}
Dettagli: ${d.dettagli}
Prezzo: €${d.prezzo}
Tempi: ${d.tempi}
Scrivi il preventivo in italiano, in modo professionale, con struttura chiara: oggetto, descrizione servizio, investimento, tempi, condizioni. Tono autorevole ma cordiale.`,
  },
  {
    id: "email",
    label: "Email Commerciale",
    icon: "✉️",
    desc: "Scrivi email di vendita efficaci e non spammose",
    fields: [
      { key: "destinatario", label: "Destinatario", placeholder: "Es. Mario Rossi, titolare" },
      { key: "azienda", label: "Azienda Destinatario", placeholder: "Es. Rossi Costruzioni" },
      { key: "prodotto", label: "Cosa Vuoi Vendere", placeholder: "Es. Software gestionale" },
      { key: "beneficio", label: "Beneficio Principale", placeholder: "Es. Risparmia 5 ore a settimana" },
      { key: "cta", label: "Call to Action", placeholder: "Es. Fissa una demo gratuita" },
    ],
    prompt: (d) =>
      `Sei un esperto di copywriting commerciale italiano. Scrivi un'email di vendita B2B efficace e non spammosa.
Destinatario: ${d.destinatario}, ${d.azienda}
Prodotto/Servizio: ${d.prodotto}
Beneficio principale: ${d.beneficio}
Call to action: ${d.cta}
L'email deve essere concisa (max 150 parole), personale, focalizzata sul beneficio reale. Includi oggetto email accattivante. Tono professionale ma umano.`,
  },
  {
    id: "report",
    label: "Report Settimanale",
    icon: "📊",
    desc: "Genera report chiari e professionali per il team",
    fields: [
      { key: "periodo", label: "Periodo", placeholder: "Es. 7-13 Aprile 2026" },
      { key: "attivita", label: "Attività Svolte", placeholder: "Es. 3 nuovi clienti acquisiti, lancio campagna..." },
      { key: "risultati", label: "Risultati / KPI", placeholder: "Es. +15% fatturato, 20 lead generati" },
      { key: "problemi", label: "Problemi / Ostacoli", placeholder: "Es. Ritardi fornitore X" },
      { key: "prossimi", label: "Prossimi Obiettivi", placeholder: "Es. Chiudere contratto con Bianchi Srl" },
    ],
    prompt: (d) =>
      `Sei un business analyst italiano. Genera un report settimanale professionale e chiaro per una PMI.
Periodo: ${d.periodo}
Attività: ${d.attivita}
Risultati/KPI: ${d.risultati}
Problemi: ${d.problemi}
Prossimi obiettivi: ${d.prossimi}
Struttura il report in sezioni chiare con titoli, tono diretto e professionale. Aggiungi una sintesi esecutiva iniziale di 2 righe.`,
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

  const handleGenerate = async () => {
    if (!allFilled) return;
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("/api/genera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: tool.prompt(formData) }),
      });
      const data = await res.json();
      if (data.error) {
        setError("Errore nella generazione. Riprova.");
      } else {
        setOutput(data.result);
      }
    } catch {
      setError("Errore di connessione. Riprova.");
    }
    setLoading(false);
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
    <main style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,200,50,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,200,50,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />
      {/* Glow */}
      <div style={{
        position: "fixed", top: "-200px", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(255,190,30,0.1) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "40px 20px" }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#ffc81e", boxShadow: "0 0 12px #ffc81e",
              animation: "pulse 2s infinite",
            }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#ffc81e", textTransform: "uppercase" }}>
              Sistema Attivo
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px, 6vw, 58px)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            marginBottom: "10px",
          }}>
            Auto<span style={{ color: "#ffc81e" }}>Biz</span>
          </h1>
          <p style={{ color: "#666", fontSize: "13px", letterSpacing: "0.08em" }}>
            Automazione AI per PMI italiane — genera documenti professionali in secondi
          </p>
        </div>

        {/* Tool Tabs */}
        <div style={{
          display: "flex", gap: "8px", marginBottom: "36px",
          borderBottom: "1px solid rgba(255,200,50,0.12)",
          paddingBottom: "24px", flexWrap: "wrap",
        }}>
          {TOOLS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => switchTool(i)}
              style={{
                padding: "10px 22px",
                background: activeTool === i ? "#ffc81e" : "transparent",
                color: activeTool === i ? "#0a0a0f" : "#666",
                border: `1px solid ${activeTool === i ? "#ffc81e" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: activeTool === i ? "700" : "400",
                letterSpacing: "0.08em",
                transition: "all 0.15s",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: output ? "1fr 1fr" : "1fr",
          gap: "28px",
          alignItems: "start",
          transition: "all 0.3s",
        }}>
          {/* Form */}
          <div>
            <p style={{ color: "#555", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px" }}>
              {tool.desc}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {tool.fields.map((f) => (
                <div key={f.key}>
                  <label style={{
                    display: "block",
                    fontSize: "10px", color: "#ffc81e",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    marginBottom: "7px",
                  }}>
                    {f.label}
                  </label>
                  <input
                    value={formData[f.key] || ""}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,200,50,0.18)",
                      borderRadius: "3px",
                      color: "#e8e6df",
                      fontSize: "13px",
                      fontFamily: "inherit",
                      outline: "none",
                      transition: "border 0.15s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#ffc81e")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,200,50,0.18)")}
                  />
                </div>
              ))}
            </div>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "16px" }}>{error}</p>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !allFilled}
              style={{
                marginTop: "28px",
                width: "100%",
                padding: "14px",
                background: loading ? "rgba(255,200,30,0.25)" : allFilled ? "#ffc81e" : "rgba(255,200,30,0.1)",
                color: allFilled && !loading ? "#0a0a0f" : "#555",
                border: "none",
                borderRadius: "3px",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: loading || !allFilled ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              {loading ? "⟳  Generazione in corso..." : "→  Genera"}
            </button>
          </div>

          {/* Output */}
          {(output || loading) && (
            <div style={{
              background: "rgba(255,200,50,0.02)",
              border: "1px solid rgba(255,200,50,0.12)",
              borderRadius: "3px",
              padding: "22px",
              animation: "fadeIn 0.3s ease",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <span style={{ fontSize: "10px", color: "#ffc81e", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Output
                </span>
                {output && (
                  <button
                    onClick={handleCopy}
                    style={{
                      background: "transparent",
                      border: `1px solid ${copied ? "#ffc81e" : "rgba(255,200,50,0.25)"}`,
                      color: copied ? "#ffc81e" : "#555",
                      padding: "5px 14px",
                      borderRadius: "3px",
                      fontSize: "11px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      letterSpacing: "0.1em",
                      transition: "all 0.15s",
                    }}
                  >
                    {copied ? "✓ Copiato" : "Copia"}
                  </button>
                )}
              </div>
              {loading ? (
                <div style={{ animation: "shimmer 1.2s infinite" }}>
                  {["▓▓▓▓▓▓▓░░░░░", "▓▓▓▓▓▓▓▓▓░░░", "▓▓▓▓▓░░░░░░░"][Math.floor(Date.now() / 400) % 3]}
                  <br />
                  <span style={{ color: "#333", fontSize: "11px", marginTop: "8px", display: "block" }}>
                    Elaborazione in corso...
                  </span>
                </div>
              ) : (
                <pre style={{
                  margin: 0,
                  fontSize: "12px",
                  lineHeight: "1.75",
                  color: "#bbb",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "inherit",
                  maxHeight: "520px",
                  overflowY: "auto",
                }}>
                  {output}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "72px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontSize: "10px", color: "#2a2a2a", letterSpacing: "0.12em" }}>AUTOBIZ v1.0</span>
          <span style={{ fontSize: "10px", color: "#2a2a2a", letterSpacing: "0.12em" }}>POWERED BY CLAUDE AI</span>
        </div>
      </div>
    </main>
  );
}
