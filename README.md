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
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxx
```
Ottieni la tua chiave su: https://console.anthropic.com

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
5. Aggiungi: `ANTHROPIC_API_KEY` = la tua chiave
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
- `.env.local` è in `.gitignore` — non finisce mai su GitHub
- Il frontend chiama `/api/genera`, mai Anthropic direttamente

---

## Monetizzazione
- Aggiungi login con [Clerk](https://clerk.com) (gratuito)
- Aggiungi pagamenti con [Stripe](https://stripe.com)
- Limita gli usi gratuiti e vendi abbonamenti da 9€/mese
