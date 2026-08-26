"use client";

import { useMemo, useState } from "react";

/**
 * The returning-customer calculator — South African general-business version.
 *
 * Deliberately conservative: it counts at most ONE additional purchase per
 * customer, and says so on the panel.
 *
 *   additional sales   = new customers × 12 × (target repeat % − current repeat %)
 *   additional revenue = additional sales × average sale value
 *
 * The affordability half extends the same model, so the two halves of the
 * panel cannot contradict each other:
 *
 *   sales per customer = 1 + repeat rate
 *   value per customer = sales per customer × sale value × gross margin
 *   affordable spend   = value per customer ÷ 3   (conventional healthy ratio)
 *   acquisition cost   = marketing spend ÷ new customers
 *
 * Everything runs in the browser. Nothing is stored or transmitted.
 */

const HEALTHY_RATIO = 3;

const rand = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

const formatMoney = (value: number) =>
  Number.isFinite(value) ? rand.format(Math.round(value)) : "—";

const formatCompact = (value: number) =>
  value >= 1000 ? `R${Math.round(value / 1000)}k` : `R${value}`;

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  unit,
  money,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  unit?: string;
  money?: boolean;
  onChange: (value: number) => void;
}) {
  const progress = ((value - min) / (max - min)) * 100;
  const bound = (n: number) => (money ? formatCompact(n) : `${n}${unit ?? ""}`);

  return (
    <label className="vrc-slider">
      <span className="vrc-slider-label">
        <span>{label}</span>
        <strong>{display}</strong>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
        aria-label={label}
      />
      <span className="vrc-slider-range">
        <small>{bound(min)}</small>
        <small>{bound(max)}</small>
      </span>
    </label>
  );
}

export function ReturningCustomerCalculator() {
  const [customers, setCustomers] = useState(40);
  const [saleValue, setSaleValue] = useState(1500);
  const [currentRepeat, setCurrentRepeat] = useState(20);
  const [targetRepeat, setTargetRepeat] = useState(45);
  const [margin, setMargin] = useState(55);
  const [spend, setSpend] = useState(15000);

  const calculation = useMemo(() => {
    const annualCustomers = customers * 12;
    const repeatGap = Math.max(0, targetRepeat - currentRepeat) / 100;
    const additionalSales = annualCustomers * repeatGap;
    const additionalRevenue = additionalSales * saleValue;
    const grossProfit = additionalRevenue * (margin / 100);

    const marginPerSale = saleValue * (margin / 100);
    const valueNow = (1 + currentRepeat / 100) * marginPerSale;
    const valueTarget = (1 + targetRepeat / 100) * marginPerSale;
    const cac = customers > 0 ? spend / customers : 0;

    return {
      additionalSales,
      additionalRevenue,
      grossProfit,
      currentAnnualRepeats: annualCustomers * (currentRepeat / 100),
      targetAnnualRepeats: annualCustomers * (targetRepeat / 100),
      cac,
      valueNow,
      affordNow: valueNow / HEALTHY_RATIO,
      affordTarget: valueTarget / HEALTHY_RATIO,
      ratio: cac > 0 ? valueNow / cac : Infinity,
      paybackSales: marginPerSale > 0 ? cac / marginPerSale : 0,
      uplift: valueNow > 0 ? valueTarget / valueNow - 1 : 0,
      hasGap: targetRepeat > currentRepeat,
    };
  }, [customers, saleValue, currentRepeat, targetRepeat, margin, spend]);

  return (
    <div className="vrc-calculator">
      <div className="vrc-controls">
        <Slider
          label="New customers per month"
          value={customers}
          min={5}
          max={500}
          step={5}
          display={String(customers)}
          onChange={setCustomers}
        />
        <Slider
          label="Average sale value"
          value={saleValue}
          min={250}
          max={25000}
          step={250}
          money
          display={formatMoney(saleValue)}
          onChange={setSaleValue}
        />
        <Slider
          label="Customers who buy again today"
          value={currentRepeat}
          min={0}
          max={80}
          step={1}
          unit="%"
          display={`${currentRepeat}%`}
          onChange={(value) => {
            setCurrentRepeat(value);
            if (value > targetRepeat) setTargetRepeat(value);
          }}
        />
        <Slider
          label="Repeat rate you want to model"
          value={targetRepeat}
          min={5}
          max={90}
          step={1}
          unit="%"
          display={`${targetRepeat}%`}
          onChange={(value) => {
            setTargetRepeat(value);
            if (value < currentRepeat) setCurrentRepeat(value);
          }}
        />
        <Slider
          label="Gross margin per sale"
          value={margin}
          min={20}
          max={90}
          step={1}
          unit="%"
          display={`${margin}%`}
          onChange={setMargin}
        />
        <Slider
          label="Marketing spend per month"
          value={spend}
          min={0}
          max={150000}
          step={1000}
          money
          display={formatMoney(spend)}
          onChange={setSpend}
        />
      </div>

      <div className="vrc-result" aria-live="polite">
        <p className="vrc-result-kicker">One year, using your figures</p>
        <p className="vrc-result-label">Revenue you are leaving behind</p>
        <strong className="vrc-result-number">
          {formatMoney(calculation.additionalRevenue)}
        </strong>
        <p className="vrc-result-explanation">
          {calculation.hasGap ? (
            <>
              If the share of customers who buy a second time moves from {currentRepeat}% to{" "}
              {targetRepeat}%, that is roughly{" "}
              <b>{Math.round(calculation.additionalSales)} additional sales</b> a year — on the
              same marketing spend, the same premises and the same team.
            </>
          ) : (
            <>
              Raise the modelled repeat rate above your current {currentRepeat}% to see what a
              working return journey would be worth.
            </>
          )}
        </p>

        <div className="vrc-afford">
          <div>
            <span>You can afford to pay, per customer</span>
            <strong>{formatMoney(calculation.affordNow)}</strong>
            <small>at your repeat rate today</small>
          </div>
          <div className="vrc-afford-target">
            <span>You could afford</span>
            <strong>{formatMoney(calculation.affordTarget)}</strong>
            <small>at a {targetRepeat}% repeat rate</small>
          </div>
        </div>

        {calculation.hasGap && (
          <p className="vrc-afford-read">
            That is {Math.round(calculation.uplift * 100)}% more than you can bid today for
            exactly the same customer — the same advert, the same enquiry, the same competitor
            bidding against you. What changed is not your marketing. It is what happens after the
            first sale.
          </p>
        )}

        <div className="vrc-metrics">
          <div>
            <span>Cost to acquire a customer</span>
            <strong>{formatMoney(calculation.cac)}</strong>
          </div>
          <div>
            <span>What a customer is worth</span>
            <strong>{formatMoney(calculation.valueNow)}</strong>
          </div>
          <div>
            <span>Value against cost</span>
            <strong>
              {Number.isFinite(calculation.ratio)
                ? `${calculation.ratio.toFixed(1)} : 1`
                : "no spend"}
            </strong>
          </div>
          <div>
            <span>Sales to pay back acquisition</span>
            <strong>
              {calculation.paybackSales > 0 && calculation.paybackSales < 0.05
                ? "under 0.1"
                : calculation.paybackSales.toFixed(1)}
            </strong>
          </div>
          <div>
            <span>Gross-profit opportunity</span>
            <strong>{formatMoney(calculation.grossProfit)}</strong>
          </div>
          <div>
            <span>Repeat sales per year, modelled</span>
            <strong>
              {Math.round(calculation.currentAnnualRepeats)} →{" "}
              {Math.round(calculation.targetAnnualRepeats)}
            </strong>
          </div>
        </div>

        <div className="vrc-note">
          <span aria-hidden="true">i</span>
          <p>
            A planning estimate, not a forecast or a guarantee. It models one additional sale
            only, and excludes product mix, capacity, discounts, returns, VAT and operating costs.
          </p>
        </div>
      </div>
    </div>
  );
}
