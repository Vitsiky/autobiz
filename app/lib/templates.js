export function generatePreventivo(d) {
  return `OGGETTO: Preventivo per ${d.servizio}

Gentile ${d.azienda},

La ringraziamo per l'interesse dimostrato nei nostri servizi. Di seguito trova il preventivo richiesto.

DESCRIZIONE DEL SERVIZIO
${d.dettagli}

INVESTIMENTO
€ ${d.prezzo}

TEMPI DI CONSEGNA
${d.tempi}

CONDIZIONI
Il presente preventivo ha validità 30 giorni dalla data di emissione. Le modalità di pagamento verranno concordate in fase di conferma dell'incarico.

Restiamo a disposizione per qualsiasi chiarimento.

Cordiali saluti`;
}

export function generateEmail(d) {
  return `OGGETTO: ${d.cta} — ${d.prodotto} per ${d.azienda}

Gentile ${d.destinatario},

Ho notato che ${d.azienda} potrebbe trarre reale vantaggio da ${d.prodotto}.

${d.beneficio}.

Se può interessarLe, ${d.cta.charAt(0).toLowerCase() + d.cta.slice(1)}: bastano pochi minuti per capire se può fare al caso vostro.

Resto a disposizione per qualsiasi domanda.

Cordiali saluti`;
}

export function generateReport(d) {
  return `REPORT SETTIMANALE — ${d.periodo}

SINTESI ESECUTIVA
Nel periodo di riferimento sono state svolte le attività pianificate, con risultati in linea con gli obiettivi.

ATTIVITÀ SVOLTE
${d.attivita}

RISULTATI E KPI
${d.risultati}

PROBLEMI E OSTACOLI
${d.problemi}

PROSSIMI OBIETTIVI
${d.prossimi}`;
}
