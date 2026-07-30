"use client";

import { useMemo, useState } from "react";

type Stage = {
  number: string;
  title: string;
  short: string;
  promise: string;
  consequence: string;
  action: string;
  questions: string[];
};

const stages: Stage[] = [
  {
    number: "01",
    title: "Position",
    short: "Why choose us?",
    promise: "The right buyer quickly understands your value and why it is worth paying for.",
    consequence: "Price pressure, weak-fit enquiries and a longer sales decision.",
    action: "Interview recent wins and losses, then rebuild the offer around the decision criteria profitable buyers actually use.",
    questions: [
      "A qualified buyer can explain why they should choose us instead of a credible alternative.",
      "Our claims are supported by specific proof that answers risk, price and trust concerns.",
    ],
  },
  {
    number: "02",
    title: "Attract",
    short: "Are we creating profitable demand?",
    promise: "Marketing reaches buyers with a real problem, enough value and credible intent.",
    consequence: "Rising acquisition cost, low-quality traffic and dependence on referrals or paid media.",
    action: "Identify the sources and buyer questions attached to your most profitable customers before increasing traffic spend.",
    questions: [
      "We know which channels produce profitable customers—not merely clicks, followers or leads.",
      "Our content and landing pages answer the high-intent questions buyers ask before contacting a supplier.",
    ],
  },
  {
    number: "03",
    title: "Convert",
    short: "Does attention become action?",
    promise: "The experience creates confidence and makes the next step clear and easy.",
    consequence: "Existing demand is wasted through hesitation, friction and weak proof.",
    action: "Measure the most valuable conversion path and remove the largest uncertainty or point of friction first.",
    questions: [
      "We know the percentage of qualified visitors who become an enquiry, appointment or sale.",
      "Our primary buying journey removes unnecessary choices and presents proof at the point of doubt.",
    ],
  },
  {
    number: "04",
    title: "Follow through",
    short: "Are opportunities protected?",
    promise: "Every serious enquiry receives a fast response, clear ownership and a visible next action.",
    consequence: "High-intent prospects cool down, disappear into inboxes or choose the faster competitor.",
    action: "Create one pipeline with an owner, stage, value and next action for every qualified opportunity.",
    questions: [
      "A new qualified enquiry receives a useful response while the buyer's intent is still high.",
      "Every live opportunity has a named owner, current stage, expected value and next action in one visible pipeline.",
    ],
  },
  {
    number: "05",
    title: "Retain",
    short: "Does one sale create the next?",
    promise: "Customers are deliberately guided toward success, repeat business, reviews and referrals.",
    consequence: "Lifetime value stays low and the business repeatedly pays to replace customers it already earned.",
    action: "Build one post-sale journey that improves onboarding and asks for the next valuable customer action at the right time.",
    questions: [
      "Our onboarding and after-sales communication deliberately improve customer success and confidence.",
      "We have reliable journeys for repeat purchase, renewal, reviews, referrals or reactivation.",
    ],
  },
  {
    number: "06",
    title: "Improve",
    short: "Can management see the constraint?",
    promise: "Decision-makers can see what is working, what is leaking and where the next investment belongs.",
    consequence: "Budget follows opinions and activity while CAC, pipeline and customer value remain unclear.",
    action: "Create a one-page commercial view of demand, conversion, pipeline, acquisition cost and customer value.",
    questions: [
      "Leadership can see qualified demand, conversion, pipeline value and sales outcomes without assembling spreadsheets.",
      "We review CAC, contribution margin, payback and customer lifetime value when deciding what to improve.",
    ],
  },
];

const scale = [
  [1, "Not true"],
  [2, "Rarely true"],
  [3, "Partly true"],
  [4, "Usually true"],
  [5, "Consistently true"],
] as const;

type Answers = Record<string, number>;

function bandFor(score: number) {
  if (score >= 80) return { title: "Connected growth engine", copy: "The foundations are strong. Improvement should focus on the weakest stage and the economics of scaling it." };
  if (score >= 60) return { title: "Growth is constrained", copy: "Several parts work, but one or two weak handoffs are limiting the return from the whole journey." };
  if (score >= 40) return { title: "Material revenue leakage", copy: "Valuable demand is being lost across multiple stages. Prioritisation matters more than adding another isolated tool." };
  return { title: "Revenue is at risk", copy: "The customer journey lacks enough commercial control to scale confidently. Stabilise the most expensive handoff first." };
}

export default function RevenueLeakAudit() {
  const [stageIndex, setStageIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailError, setEmailError] = useState("");

  const stage = stages[stageIndex];
  const keys = stage.questions.map((_, index) => `${stageIndex}-${index}`);
  const stageComplete = keys.every((key) => answers[key]);
  const answered = Object.keys(answers).length;

  const results = useMemo(() => {
    const stageScores = stages.map((item, index) => {
      const values = item.questions.map((_, questionIndex) => answers[`${index}-${questionIndex}`] || 0);
      return { ...item, score: Math.round((values.reduce((sum, value) => sum + value, 0) / (values.length * 5)) * 100) };
    });
    const overall = Math.round(stageScores.reduce((sum, item) => sum + item.score, 0) / stageScores.length);
    return { stageScores, ranked: [...stageScores].sort((a, b) => a.score - b.score), overall };
  }, [answers]);

  function select(questionIndex: number, value: number) {
    setAnswers((current) => ({ ...current, [`${stageIndex}-${questionIndex}`]: value }));
  }

  function next() {
    if (!stageComplete) return;
    if (stageIndex === stages.length - 1) {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStageIndex((current) => current + 1);
  }

  function reset() {
    setAnswers({});
    setStageIndex(0);
    setShowResults(false);
    setCopied(false);
    setEmailTo("");
    setEmailStatus("");
    setEmailError("");
  }

  const summary = showResults
    ? `CRM Solutions Revenue Leak Audit\nOverall score: ${results.overall}/100 — ${bandFor(results.overall).title}\nPriority 1: ${results.ranked[0].title} (${results.ranked[0].score}/100)\nPriority 2: ${results.ranked[1].title} (${results.ranked[1].score}/100)\nPriority 3: ${results.ranked[2].title} (${results.ranked[2].score}/100)`
    : "";

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  async function emailResults() {
    setEmailSending(true);
    setEmailError("");
    setEmailStatus("");
    const band = bandFor(results.overall);
    try {
      const response = await fetch("/api/audit-results-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailTo,
          overall: results.overall,
          bandTitle: band.title,
          bandCopy: band.copy,
          summary,
          priorities: results.ranked.slice(0, 3).map((item) => ({
            title: item.title,
            score: item.score,
            consequence: item.consequence,
            action: item.action,
          })),
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "The results email could not be sent.");
      }
      setEmailStatus(`Results sent to ${emailTo.trim()}. Check inbox and junk.`);
    } catch (error) {
      setEmailError(
        error instanceof Error ? error.message : "The results email could not be sent.",
      );
    } finally {
      setEmailSending(false);
    }
  }

  if (showResults) {
    const band = bandFor(results.overall);
    return (
      <section className="audit-tool audit-results" aria-live="polite">
        <div className="section-shell results-shell">
          <div className="results-heading">
            <p className="eyebrow eyebrow-light">Your diagnostic</p>
            <h2>{band.title}<span>.</span></h2>
            <p>{band.copy}</p>
          </div>
          <div className="score-panel">
            <div className="score-ring" style={{ "--score": `${results.overall * 3.6}deg` } as React.CSSProperties}>
              <strong>{results.overall}</strong><span>/ 100</span>
            </div>
            <p>Overall Revenue Loop strength</p>
          </div>

          <div className="stage-results">
            {results.stageScores.map((item) => (
              <div className="stage-result" key={item.title}>
                <div><span>{item.number}</span><b>{item.title}</b></div>
                <div className="result-track"><i style={{ width: `${item.score}%` }} /></div>
                <strong>{item.score}</strong>
              </div>
            ))}
          </div>

          <div className="priority-heading">
            <p className="eyebrow eyebrow-light">Where to begin</p>
            <h3>Your three priority constraints.</h3>
          </div>
          <div className="priority-grid">
            {results.ranked.slice(0, 3).map((item, index) => (
              <article key={item.title}>
                <span>Priority 0{index + 1}</span>
                <h4>{item.title}</h4>
                <p>{item.consequence}</p>
                <div><small>First action</small><b>{item.action}</b></div>
              </article>
            ))}
          </div>

          <div className="results-actions">
            <div>
              <p className="eyebrow eyebrow-light">Add the business economics</p>
              <h3>Turn the signal into a commercial decision.</h3>
              <p>A senior review tests these priorities against your lead value, margin, capacity, sales cycle and break-even point.</p>
            </div>
            <div>
              <a className="button button-copper" href={`/book-discovery-call?source=revenue-leak-audit&score=${results.overall}`}>Book a Discovery Call <span aria-hidden="true">↗</span></a>
              <form
                className="audit-email-results"
                onSubmit={(event) => {
                  event.preventDefault();
                  void emailResults();
                }}
              >
                <label>
                  <span>Email results to <em>(optional)</em></span>
                  <input
                    type="email"
                    name="email"
                    value={emailTo}
                    onChange={(event) => setEmailTo(event.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </label>
                <button
                  className="result-secondary"
                  type="submit"
                  disabled={emailSending || !emailTo.trim()}
                >
                  {emailSending ? "Sending…" : "Email my results"}
                </button>
              </form>
              {emailStatus ? <p className="audit-email-status">{emailStatus}</p> : null}
              {emailError ? (
                <p className="audit-email-error" role="alert">
                  {emailError}
                </p>
              ) : null}
              <button className="result-secondary" type="button" onClick={copySummary}>{copied ? "Summary copied" : "Copy result summary"}</button>
              <button className="result-secondary" type="button" onClick={reset}>Retake the audit</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="audit-tool">
      <div className="section-shell audit-tool-shell">
        <aside className="audit-progress" aria-label="Audit progress">
          <p>Revenue Loop</p>
          <ol>
            {stages.map((item, index) => {
              const complete = item.questions.every((_, questionIndex) => answers[`${index}-${questionIndex}`]);
              return (
                <li className={index === stageIndex ? "current" : complete ? "complete" : ""} key={item.title}>
                  <button type="button" disabled={index > stageIndex && !complete} onClick={() => index <= stageIndex && setStageIndex(index)}>
                    <span>{complete ? "✓" : item.number}</span><b>{item.title}</b>
                  </button>
                </li>
              );
            })}
          </ol>
          <small>{answered} of 12 questions answered</small>
        </aside>

        <div className="audit-questions">
          <div className="question-stage">
            <span>{stage.number} / 06</span>
            <p>{stage.short}</p>
            <h2>{stage.title}</h2>
            <b>{stage.promise}</b>
          </div>

          <div className="question-list">
            {stage.questions.map((question, questionIndex) => (
              <fieldset key={question}>
                <legend><span>0{questionIndex + 1}</span>{question}</legend>
                <div className="answer-scale">
                  {scale.map(([value, label]) => {
                    const key = `${stageIndex}-${questionIndex}`;
                    return (
                      <label className={answers[key] === value ? "selected" : ""} key={value}>
                        <input type="radio" name={key} value={value} checked={answers[key] === value} onChange={() => select(questionIndex, value)} />
                        <b>{value}</b><span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="audit-navigation">
            <button className="audit-back" type="button" disabled={stageIndex === 0} onClick={() => setStageIndex((current) => current - 1)}>← Previous stage</button>
            <button className="button button-copper" type="button" disabled={!stageComplete} onClick={next}>
              {stageIndex === stages.length - 1 ? "Reveal My Results" : "Next Stage"}<span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
