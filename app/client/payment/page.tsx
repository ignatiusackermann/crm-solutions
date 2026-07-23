import type { Metadata } from "next";
import Link from "next/link";
import PaymentPanel from "./payment-panel";
export const dynamic="force-dynamic";
export const metadata: Metadata={title:"Client Payment Panel | CRM Solutions",robots:{index:false,follow:false},other:{referrer:"no-referrer"}};
export default function ClientPaymentPage(){return <main className="client-payment-page"><header className="client-payment-header"><Link className="wordmark" href="/"><span className="wordmark-icon"><i/><i/><i/></span><span>CRM Solutions</span></Link><span>Secure Client Payment Panel</span><a href="mailto:ignatius@crmsolutions.app">Need help?</a></header><PaymentPanel/></main>;}
