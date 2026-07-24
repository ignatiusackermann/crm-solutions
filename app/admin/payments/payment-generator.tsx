"use client";
import { FormEvent, useEffect, useState } from "react";
type Plan = { id:string; reference:string; title:string; currency:string; totalAmountCents:number; clientName:string; email:string; paidCount:number; installmentCount:number };
type Created = {
  reference: string;
  clientName: string;
  email: string;
  panelUrl: string;
  loginUrl?: string;
  accessCode?: string;
  emailStatus: string;
};
const money=(c:number,x:string)=>new Intl.NumberFormat("en-US",{style:"currency",currency:x}).format(c/100);
export default function PaymentGenerator() {
  const [plans,setPlans]=useState<Plan[]>([]),[loading,setLoading]=useState(true),[submitting,setSubmitting]=useState(false);
  const [error,setError]=useState(""),[created,setCreated]=useState<Created|null>(null);
  const [copied,setCopied]=useState<""|"link"|"code">("");
  async function load(){const r=await fetch("/api/admin/payment-plans",{cache:"no-store"});const d=await r.json() as {plans?:Plan[];error?:string};if(!r.ok)throw new Error(d.error||"Plans could not be loaded.");setPlans(d.plans||[]);}
  useEffect(()=>{load().catch((e:Error)=>setError(e.message)).finally(()=>setLoading(false));},[]);
  useEffect(()=>{if(!copied)return;const t=window.setTimeout(()=>setCopied(""),1800);return()=>window.clearTimeout(t);},[copied]);
  async function copyText(value:string,kind:"link"|"code"){
    try{await navigator.clipboard.writeText(value);setCopied(kind);}
    catch{setError("Could not copy to clipboard. Select and copy manually.");}
  }
  async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setSubmitting(true);setError("");setCreated(null);setCopied("");const form=e.currentTarget;try{const r=await fetch("/api/admin/payment-plans",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))});const d=await r.json() as {plan?:Created;error?:string};if(!r.ok||!d.plan)throw new Error(d.error||"Plan could not be created.");setCreated(d.plan);form.reset();await load();}catch(x){setError(x instanceof Error?x.message:"Plan could not be created.");}finally{setSubmitting(false);}}
  return <div className="admin-workspace"><aside className="admin-sidebar"><p>Workspace</p><a className="active" href="#generator"><span>01</span> Payment Generator</a><a href="#plans"><span>02</span> Client Plans</a><div><strong>Secure access</strong><p>Client panels use a private access link. PayPal credentials never enter this dashboard.</p></div></aside><div className="admin-content">
    <section className="admin-intro" id="generator"><div><p className="eyebrow">Payment Generator</p><h1>Create a personalised client payment plan<span>.</span></h1></div><p>Enter the agreed commercial details. The system creates the client profile, two instalments and a private Client Payment Panel.</p></section>
    <form className="generator-form" onSubmit={submit}>
      <fieldset><legend><span>01</span> Client details</legend><div className="generator-grid"><label><span>First name *</span><input name="firstName" required /></label><label><span>Surname *</span><input name="lastName" required /></label><label><span>Email *</span><input name="email" type="email" required /></label><label><span>Phone / WhatsApp</span><input name="phone" type="tel" /></label><label className="form-wide"><span>Company</span><input name="company" /></label></div></fieldset>
      <fieldset><legend><span>02</span> Engagement</legend><div className="generator-grid"><label className="form-wide"><span>Engagement title *</span><input name="title" defaultValue="Revenue Platform" required /></label><label className="form-wide"><span>Payment information / agreed scope *</span><textarea name="description" rows={4} required /></label><label><span>Currency *</span><select name="currency" defaultValue="USD"><option value="USD">USD — US Dollar</option><option value="ZAR">ZAR — South African Rand</option><option value="EUR">EUR — Euro</option><option value="GBP">GBP — Pound Sterling</option></select></label><label><span>Total investment *</span><input name="totalAmount" type="number" min="1" step=".01" defaultValue="10000.00" required /></label></div></fieldset>
      <fieldset><legend><span>03</span> Payment arrangement</legend><div className="generator-grid"><label><span>Deposit amount *</span><input name="depositAmount" type="number" min="1" step=".01" defaultValue="5000.00" required /></label><label><span>Deposit timing *</span><input name="depositDue" defaultValue="Due on acceptance" required /></label><label><span>Final amount *</span><input name="finalAmount" type="number" min="1" step=".01" defaultValue="5000.00" required /></label><label><span>Final payment timing *</span><input name="finalDue" defaultValue="Due at the agreed pre-launch milestone" required /></label></div></fieldset>
      {error&&<p className="admin-error" role="alert">{error}</p>}<div className="generator-submit"><p>The two instalments must add up to the total.</p><button className="button button-copper" disabled={submitting}>{submitting?"Generating…":"Generate Client Payment Panel"} <span>↗</span></button></div>
    </form>
    {created&&<section className="generated-panel"><div><p className="eyebrow eyebrow-light">Client panel generated</p><h2>{created.clientName}</h2><p>{created.reference} · {created.email}</p>{created.accessCode?<p>Access code: <strong>{created.accessCode}</strong></p>:null}</div><div><p>{created.emailStatus==="sent"?"The payment email (login + deposit link) has been sent.":"Email delivery is not connected yet. Copy and send the private link and access code securely."}</p><button type="button" onClick={()=>copyText(created.panelUrl,"link")}>{copied==="link"?"Copied to clipboard":"Copy private client link"}</button>{created.accessCode?<button type="button" onClick={()=>copyText(created.accessCode||"","code")}>{copied==="code"?"Copied to clipboard":"Copy access code"}</button>:null}<a href={created.loginUrl||"/client/login"} target="_blank" rel="noreferrer">Open client login ↗</a><a href={created.panelUrl} target="_blank" rel="noreferrer">Open client panel ↗</a></div></section>}
    <section className="admin-plans" id="plans"><div className="admin-plans-heading"><div><p className="eyebrow">Client plans</p><h2>Generated payment arrangements.</h2></div><span>{plans.length} plans</span></div>{loading?<p>Loading…</p>:plans.length===0?<div className="admin-empty">No payment plans yet.</div>:<div className="admin-plan-list">{plans.map(p=><article key={p.id}><div><span>{p.reference}</span><strong>{p.clientName}</strong><small>{p.email}</small></div><div><span>Engagement</span><strong>{p.title}</strong></div><div><span>Investment</span><strong>{money(p.totalAmountCents,p.currency)}</strong></div><div><span>Status</span><strong>{p.paidCount}/{p.installmentCount} paid</strong></div></article>)}</div>}</section>
  </div></div>;
}
