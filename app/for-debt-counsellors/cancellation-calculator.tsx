"use client";

import { useMemo, useState } from "react";

/**
 * The cancellation calculator — debt-counselling version of the replacement
 * model, in ZAR.
 *
 * A debt counsellor's income is an annuity: the after-care fee, paid monthly
 * for as long as the client stays under review. So a cancellation does not
 * cost one fee, it costs every fee that was still to come:
 *
 *   lost per cancellation = after-care fee × months still to run
 *   cancellations a year  = active clients × cancellation rate
 *   cost to replace them  = cancellations × cost to win one client
 *
 * The three-year figure compounds the clients kept by a lower cancellation
 * rate, and lets those kept clients cancel at the lower rate too, so it does
 * not overstate the gain.
 *
 * NCR fee guidelines: the after-care fee is 5% of the monthly instalment
 * capped at R450 (excluding VAT) for the first 24 months, then 3% to the same
 * cap. The slider therefore tops out at R450.
 *
 * Everything runs in the browser. Nothing is stored or transmitted.
 */

const FEE_CAP = 450;
const HORIZON_YEARS = 3;

const rand = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

const formatMoney = (value: number) =>
  Number.isFinite(value) ? rand.format(Math.round(value)) : "—";

const formatCompact = (value: number) =>
  value >= 1000 ? `R${Math.round(value / 1000)}k` : `R${value}`;

const formatPercent = (value: number) => `${Math.round(value * 10) / 10}%`;

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

export function CancellationCalculator() {
  const [clients, setClients] = useState(300);
  const [fee, setFee] = useState(350);
  const [monthsLeft, setMonthsLeft] = useState(30);
  const [currentRate, setCurrentRate] = useState(12);
  const [targetRate, setTargetRate] = useState(8);
  const [winCost, setWinCost] = useState(5000);

  const calculation = useMemo(() => {
    const rateNow = currentRate / 100;
    const rateTarget = targetRate / 100;

    const lostPerCancellation = fee * monthsLeft;
    const cancelsNow = clients * rateNow;
    const cancelsTarget = clients * rateTarget;

    const keptPerYear = Math.max(0, cancelsNow - cancelsTarget);
    let extraClients = 0;
    let extraClientMonths = 0;
    for (let year = 1; year <= HORIZON_YEARS; year += 1) {
      extraClients = extraClients * (1 - rateTarget) + keptPerYear;
      extraClientMonths += extraClients * 12;
    }

    return {
      lostPerCancellation,
      cancelsNow,
      cancelsTarget,
      annualLoss: cancelsNow * lostPerCancellation,
      replaceCost: cancelsNow * winCost,
      bookValue: clients * fee * monthsLeft,
      monthlyIncome: clients * fee,
      keptPerYear,
      threeYearFees: extraClientMonths * fee,
      hasGap: targetRate < currentRate,
    };
  }, [clients, fee, monthsLeft, currentRate, targetRate, winCost]);

  return (
    <div className="vrc-calculator">
      <div className="vrc-controls">
        <Slider
          label="Clients active under review"
          value={clients}
          min={20}
          max={2000}
          step={10}
          display={String(clients)}
          onChange={setClients}
        />
        <Slider
          label="Average after-care fee per client"
          value={fee}
          min={100}
          max={FEE_CAP}
          step={10}
          money
          display={`${formatMoney(fee)} / month`}
          onChange={setFee}
        />
        <Slider
          label="Months still to run on an average plan"
          value={monthsLeft}
          min={6}
          max={60}
          step={1}
          unit=" mo"
          display={`${monthsLeft} months`}
          onChange={setMonthsLeft}
        />
        <Slider
          label="Clients who cancel in a typical year"
          value={currentRate}
          min={2}
          max={40}
          step={0.5}
          unit="%"
          display={formatPercent(currentRate)}
          onChange={(value) => {
            setCurrentRate(value);
            if (value < targetRate) setTargetRate(value);
          }}
        />
        <Slider
          label="Cancellation rate you want to model"
          value={targetRate}
          min={1}
          max={40}
          step={0.5}
          unit="%"
          display={formatPercent(targetRate)}
          onChange={(value) => setTargetRate(Math.min(value, currentRate))}
        />
        <Slider
          label="Cost to win and sign one new client"
          value={winCost}
          min={500}
          max={20000}
          step={500}
          money
          display={formatMoney(winCost)}
          onChange={setWinCost}
        />
      </div>

      <div className="vrc-result">
        <p className="eyebrow">What a cancellation really costs</p>
        <p className="vrc-result-figure">{formatMoney(calculation.lostPerCancellation)}</p>
        <p className="vrc-result-explanation">
          That is one client walking away with {monthsLeft} months of after-care fees still to
          come. At {formatPercent(currentRate)} a year, about{" "}
          <b>{Math.round(calculation.cancelsNow)} of your {clients} clients</b> go — roughly{" "}
          <b>{formatMoney(calculation.annualLoss)}</b> of future fees lost in a single year, plus{" "}
          <b>{formatMoney(calculation.replaceCost)}</b> to win replacements.
        </p>

        <div className="vrc-afford">
          <div>
            <span>Your book, if every client finishes</span>
            <strong>{formatMoney(calculation.bookValue)}</strong>
            <small>
              {clients} clients × {formatMoney(fee)} × {monthsLeft} months
            </small>
          </div>
          <div className="vrc-afford-target">
            <span>Fees you collect every month</span>
            <strong>{formatMoney(calculation.monthlyIncome)}</strong>
            <small>before a single new client signs</small>
          </div>
        </div>

        {calculation.hasGap ? (
          <p className="vrc-afford-read">
            Bring cancellations from {formatPercent(currentRate)} down to {formatPercent(targetRate)} and you keep
            about {Math.round(calculation.keptPerYear * 10) / 10} more clients a year. Over three
            years that is roughly <b>{formatMoney(calculation.threeYearFees)}</b> in after-care
            fees you would otherwise never have collected — with no extra marketing spend.
          </p>
        ) : (
          <p className="vrc-afford-read">
            Model a lower cancellation rate than your current {formatPercent(currentRate)} to see what keeping
            more clients under review would be worth.
          </p>
        )}

        <div className="vrc-metrics">
          <div>
            <span>Cancellations a year</span>
            <strong>
              {Math.round(calculation.cancelsNow)} → {Math.round(calculation.cancelsTarget)}
            </strong>
          </div>
          <div>
            <span>Future fees lost each year</span>
            <strong>{formatMoney(calculation.annualLoss)}</strong>
          </div>
          <div>
            <span>Cost to replace them</span>
            <strong>{formatMoney(calculation.replaceCost)}</strong>
          </div>
          <div>
            <span>One cancellation costs</span>
            <strong>{formatMoney(calculation.lostPerCancellation)}</strong>
          </div>
          <div>
            <span>Three-year fees from clients kept</span>
            <strong>{formatMoney(calculation.threeYearFees)}</strong>
          </div>
          <div>
            <span>Clients kept per year</span>
            <strong>{Math.round(calculation.keptPerYear * 10) / 10}</strong>
          </div>
        </div>

        <div className="vrc-note">
          <span aria-hidden="true">i</span>
          <p>
            A planning estimate, not a forecast. The after-care fee follows the NCR guideline — 5%
            of the monthly instalment capped at R450 excluding VAT for the first 24 months, then
            3% to the same cap — so the slider stops at R450. Restructuring fees, legal fees and
            VAT are excluded.
          </p>
        </div>
      </div>
    </div>
  );
}
