import { useMemo, useState } from 'react'

const initialTopics = {
  plugin: 'Individuelles Plugin',
  storefront: 'Storefront oder Theme',
  integration: 'Schnittstelle / Integration',
  wartung: 'Wartung / Notfall-Hilfe',
}
const options = ['Individuelles Plugin', 'Storefront oder Theme', 'Schnittstelle / Integration', 'Wartung / Notfall-Hilfe', 'Fehleranalyse / Update', 'Noch nicht sicher']
const audienceOptions = ['Für eine Agentur', 'Für meinen Shop', 'Anderer Kontext']
const timeframeOptions = ['So bald wie möglich', 'In den nächsten Monaten', 'Termin noch offen']
const apiUrl = import.meta.env.PUBLIC_LEAD_API_URL || 'https://api.erniez28.de/api/anfrage'
const fallbackSelections = { audience: 'Anderer Kontext', topic: 'Noch nicht sicher', timeframe: 'Termin noch offen' }

export default function ProjectBrief() {
  const incoming = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('thema') : null
  const [step, setStep] = useState(0)
  const [audience, setAudience] = useState('')
  const [topic, setTopic] = useState(options.find(x => x === initialTopics[incoming]) || '')
  const [timeframe, setTimeframe] = useState('')
  const [details, setDetails] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contactMethod, setContactMethod] = useState('email')
  const [contactRequest, setContactRequest] = useState(false)
  const [website, setWebsite] = useState('')
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [copied, setCopied] = useState(false)
  const summary = useMemo(() => [
    'Guten Tag Ernie,', '',
    `Projektkontext: ${audience || fallbackSelections.audience}.`,
    `Thema: ${topic || fallbackSelections.topic}.`,
    `Zeitrahmen: ${timeframe || '[noch offen]'}.`,
    details ? `Zum Vorhaben: ${details}` : '',
    email ? `Meine E-Mail-Adresse: ${email}` : '',
    phone ? `Meine Telefonnummer: ${phone}` : '', '',
    'Viele Grüße',
    name,
  ].filter(Boolean).join('\n'), [audience, topic, timeframe, details, email, phone, name])
  const mailto = `mailto:kontakt@erniez28.de?subject=${encodeURIComponent('Projektanfrage Shopware')}&body=${encodeURIComponent(summary)}`

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setFeedback({ kind: 'error', text: 'Kopieren war nicht möglich. Du kannst die Nachricht per E-Mail öffnen.' })
    }
  }

  async function submitRequest(event) {
    event.preventDefault()
    if (sending) return
    setSending(true)
    setFeedback(null)
    let timeout
    try {
      const controller = new AbortController()
      timeout = window.setTimeout(() => controller.abort(), 12_000)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: contactMethod === 'phone' ? phone : '', contactMethod, audience: audience || fallbackSelections.audience, topic: topic || fallbackSelections.topic, timeframe: timeframe || fallbackSelections.timeframe, details, contactRequest, website }),
        signal: controller.signal,
      })
      window.clearTimeout(timeout)
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.accepted) throw new Error(result.error || 'Die Anfrage konnte gerade nicht übermittelt werden.')
      setFeedback({ kind: 'success', text: `Danke, Deine Anfrage ist eingegangen und für die Zustellung vorgemerkt.${result.reference ? ` Referenz: ${result.reference}.` : ''} Ich antworte an ${email}.` })
    } catch (error) {
      setFeedback({ kind: 'error', text: error.name === 'AbortError' ? 'Der Dienst antwortet gerade nicht. Nutze bitte die E-Mail- oder Buchungsoption.' : `${error.message} Du kannst stattdessen eine vorbereitete E-Mail öffnen oder einen Termin buchen.` })
    } finally {
      window.clearTimeout(timeout)
      setSending(false)
    }
  }

  return <div className="brief-tool">
    <div className="brief-progress" role="progressbar" aria-label={`Schritt ${Math.min(step + 1, 4)} von 4`} aria-valuemin="1" aria-valuemax="4" aria-valuenow={Math.min(step + 1, 4)}><span style={{ transform: `scaleX(${Math.min((step + 1) / 4, 1)})` }} /></div>
    <div className="brief-step" aria-live="polite">
      {step === 0 && <fieldset><legend>In welchem Zusammenhang fragst Du an?</legend><div className="choice-list">{audienceOptions.map(x => <button type="button" key={x} className={`choice ${audience === x ? 'is-active' : ''}`} aria-pressed={audience === x} onClick={() => setAudience(x)}>{x}</button>)}</div></fieldset>}
      {step === 1 && <fieldset><legend>Worum geht es hauptsächlich?</legend><div className="choice-list">{options.map(x => <button type="button" key={x} className={`choice ${topic === x ? 'is-active' : ''}`} aria-pressed={topic === x} onClick={() => setTopic(x)}>{x}</button>)}</div></fieldset>}
      {step === 2 && <fieldset><legend>Wann möchtest Du starten?</legend><div className="choice-list">{timeframeOptions.map(x => <button type="button" key={x} className={`choice ${timeframe === x ? 'is-active' : ''}`} aria-pressed={timeframe === x} onClick={() => setTimeframe(x)}>{x}</button>)}</div><label className="field-label" htmlFor="brief-details">Gibt es schon eine Shop-URL, Shopware-Version oder eine kurze Beschreibung? <span>(optional)</span></label><textarea id="brief-details" rows="4" maxLength="1200" value={details} onChange={e => setDetails(e.target.value)} placeholder="Was soll sich ändern oder besser funktionieren?" /></fieldset>}
      {step >= 3 && <div className="brief-summary"><p className="eyebrow">// Dein Projektbrief</p><h2>So könnte eine erste Nachricht aussehen.</h2><pre>{summary}</pre>
        <form className="lead-request" onSubmit={submitRequest}>
          <div className="lead-request__fields">
            <label className="field-label" htmlFor="brief-name">Name <span>(optional)</span><input id="brief-name" autoComplete="name" maxLength="100" value={name} onChange={e => setName(e.target.value)} /></label>
            <label className="field-label" htmlFor="brief-email">E-Mail für meine Antwort<input id="brief-email" type="email" autoComplete="email" maxLength="254" value={email} onChange={e => setEmail(e.target.value)} required /></label>
          </div>
          <fieldset><legend>Wie soll ich Dich erreichen?</legend><div className="choice-list choice-list--inline">
            <button type="button" className={`choice ${contactMethod === 'email' ? 'is-active' : ''}`} aria-pressed={contactMethod === 'email'} onClick={() => setContactMethod('email')}>Per E-Mail</button>
            <button type="button" className={`choice ${contactMethod === 'phone' ? 'is-active' : ''}`} aria-pressed={contactMethod === 'phone'} onClick={() => setContactMethod('phone')}>Per Rückruf</button>
          </div></fieldset>
          {contactMethod === 'phone' && <label className="field-label" htmlFor="brief-phone">Telefonnummer für den Rückruf<input id="brief-phone" type="tel" autoComplete="tel" maxLength="40" value={phone} onChange={e => setPhone(e.target.value)} required /></label>}
          <label className="field-label lead-request__trap" aria-hidden="true" htmlFor="brief-website">Website<input id="brief-website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label>
          <label className="lead-request__confirm"><input type="checkbox" checked={contactRequest} onChange={e => setContactRequest(e.target.checked)} required /> <span>Ich bitte um Rückmeldung zu dieser Anfrage. Meine Angaben werden dafür an den Kontakt-Dienst von erniez28.de übermittelt. <a href="/datenschutz/">Datenschutzhinweise</a>.</span></label>
          <div className="brief-actions"><button className="btn btn--primary" type="submit" disabled={sending || !contactRequest}>{sending ? 'Wird übermittelt …' : contactMethod === 'phone' ? 'Rückruf anfragen' : 'Rückmeldung anfragen'} <span aria-hidden="true">↗</span></button><a className="btn" href={mailto}>E-Mail selbst öffnen <span aria-hidden="true">↗</span></a><button className="btn btn--quiet" type="button" onClick={copySummary}>{copied ? 'Kopiert' : 'Projektbrief kopieren'}</button></div>
          {feedback && <p className={`lead-feedback lead-feedback--${feedback.kind}`} role={feedback.kind === 'error' ? 'alert' : 'status'}>{feedback.text}</p>}
        </form>
        <div className="book-fallback"><p>Lieber direkt einen Termin wählen?</p><a className="link" href="https://cal.erniez28.de/ernie/erstgespraech" target="_blank" rel="noreferrer">30-minütiges Erstgespräch buchen <span aria-hidden="true">↗</span></a></div>
      </div>}
    </div>
    <div className="brief-controls">{step > 0 && <button type="button" className="btn btn--quiet" onClick={() => setStep(step - 1)}>Zurück</button>}{step < 3 && <button type="button" className="btn btn--primary" disabled={(step === 0 && !audience) || (step === 1 && !topic) || (step === 2 && !timeframe)} onClick={() => setStep(step + 1)}>Weiter <span aria-hidden="true">→</span></button>}{step < 3 && <button type="button" className="skip-link" onClick={() => setStep(3)}>Direkt zum Abschluss</button>}{step === 3 && <button type="button" className="skip-link" onClick={() => setStep(0)}>Projektbrief bearbeiten</button>}</div>
    <p className="brief-email">Direkter Kontakt: <a href="mailto:kontakt@erniez28.de">kontakt@erniez28.de</a></p>
  </div>
}
