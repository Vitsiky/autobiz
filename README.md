# AutoBiz 🚀
**Automazione AI per PMI italiane** — genera preventivi, email commerciali e report in secondi.

---

## Setup in 5 minuti

### 1. Installa dipendenze
```bash
npm install
```

### 2. Configura la chiave API
Crea un file `.env.local` nella cartella principale:
```
GROQ_API_KEY=xxxxxxxxxx
```
Ottieni la tua chiave gratuita su: https://console.groq.com/keys

### 3. Avvia in locale
```bash
npm run dev
```
Apri http://localhost:3000

---

## Deploy su Vercel

1. Crea account su [vercel.com](https://vercel.com)
2. Installa Vercel CLI: `npm i -g vercel`
3. Esegui: `vercel`
4. Vai su Vercel Dashboard → Settings → Environment Variables
5. Aggiungi: `GROQ_API_KEY` = la tua chiave
6. Rideploya: `vercel --prod`

---

## Struttura Progetto

```
autobiz/
├── app/
│   ├── api/
│   │   └── genera/
│   │       └── route.js     ← Backend sicuro (chiave API qui)
│   ├── page.js              ← Frontend principale
│   ├── layout.js            ← Layout app
│   └── globals.css          ← Stili globali
├── .env.example             ← Template variabili ambiente
├── .env.local               ← La TUA chiave (non caricare su Git!)
└── .gitignore               ← Protegge .env.local
```

---

## ⚠️ Sicurezza
- La chiave API è **solo nel backend** (`/api/genera`)
- Chiamata a Groq (Llama 3.3) invece di Anthropic per restare nel free tier
- `.env.local` è in `.gitignore` — non finisce mai su GitHub
- Il frontend chiama `/api/genera`, mai il provider AI direttamente

---

## Monetizzazione
- Aggiungi login con [Clerk](https://clerk.com) (gratuito)
- Aggiungi pagamenti con [Stripe](https://stripe.com)
- Limita gli usi gratuiti e vendi abbonamenti da 9€/mese
