"use client";

import { useMemo, useState } from "react";

/**
 * The standing-still calculator — accounting-practice version of the
 * returning-customer model, in ZAR.
 *
 * An accounting practice does not need clients to "buy again"; it needs them
 * to stay. So the repeat rate becomes an annual loss rate, and the headline is
 * the number of new clients the practice must win just to stay the same size:
 *
 *   clients lost per year  = clients × loss %            (= the standing-still number)
 *   years a client stays   = 1 ÷ loss %                  (capped at MAX_YEARS)
 *   profit from one client = annual fee × margin × years a client stays
 *   cost to stand still    = clients lost × cost to win and onboard one client
 *
 * The five-year figure compounds the clients kept by a lower loss rate, and
 * lets the kept clients leave at the lower rate too, so it does not overstate:
 *
 *   kept per year  = clients × (current loss % − target loss %)
 *   extra clients  = previous extra × (1 − target loss %) + kept per year
 *   five-year fees = Σ extra clients (years 1–5) × annual fee
 *
 * Everything runs in the browser. Nothing is stored or transmitted.
 */

const MAX_YEARS = 20;
const HORIZON_YEARS = 5;

const rand = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

const formatMoney = (value: number) =>
  Number.isFinite(value) ? rand.format(Math.round(value)) : "—";

const formatCompact = (value: number) =>
  value >= 1000 ? `R${Math.round(value / 1000)}k` : `R${value}`;

const formatYears = (value: number) =>
  value >= MAX_YEARS ? `${MAX_YEARS}+ years` : `${value.toFixed(value < 10 ? 1 : 0)} years`;

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

export function StandingStillCalculator() {
  const [clients, setClients] = useState(150);
  const [fee, setFee] = useState(24000);
  const [currentLoss, setCurrentLoss] = useState(10);
  const [targetLoss, setTargetLoss] = useState(7);
  const [margin, setMargin] = useState(40);
  const [winCost, setWinCost] = useState(5000);

  const calculation = useMemo(() => {
    const lossNow = currentLoss / 100;
    const lossTarget = targetLoss / 100;

    const lostNow = clients * lossNow;
    const lostTarget = clients * lossTarget;

    const yearsNow = Math.min(MAX_YEARS, 1 / lossNow);
    const yearsTarget = Math.min(MAX_YEARS, 1 / lossTarget);

    const profitPerYear = fee * (margin / 100);

    const keptPerYear = Math.max(0, lostNow - lostTarget);
    let extraClients = 0;
    let extraClientYears = 0;
    for (let year = 1; year <= HORIZON_YEARS; year += 1) {
      extraClients = extraClients * (1 - lossTarget) + keptPerYear;
      extraClientYears += extraClients;
    }
    const fiveYearFees = extraClientYears * fee;

    return {
      lostNow,
      lostTarget,
      yearsNow,
      yearsTarget,
      feesOut: lostNow * fee,
      standStillCost: lostNow * winCost,
      clientProfitNow: profitPerYear * yearsNow,
      clientProfitTarget: profitPerYear * yearsTarget,
      keptPerYear,
      fiveYearFees,
      fiveYearProfit: fiveYearFees * (margin / 100),
      hasGap: targetLoss < currentLoss,
    };
  }, [clients, fee, currentLoss, targetLoss, margin, winCost]);

  const standStill = Math.round(calculation.lostNow);

  return (
    <div className="vrc-calculator">
      <div className="vrc-controls">
        <Slider
          label="Clients on your books"
          value={clients}
          min={20}
          max={1000}
          step={10}
          display={String(clients)}
          onChange={setClients}
        />
        <Slider
          label="Average annual fee per client"
          value={fee}
          min={2000}
          max={150000}
          step={1000}
          money
          display={formatMoney(fee)}
          onChange={setFee}
        />
        <Slider
          label="Clients lost in a typical year"
          value={currentLoss}
          min={2}
          max={30}
          step={1}
          unit="%"
          display={`${currentLoss}%`}
          onChange={(value) => {
            setCurrentLoss(value);
            if (value < targetLoss) setTargetLoss(value);
          }}
        />
        <Slider
          label="Loss rate you want to model"
          value={targetLoss}
          min={1}
          max={30}
          step={1}
          unit="%"
          display={`${targetLoss}%`}
          onChange={(value) => {
            setTargetLoss(value);
            if (value > currentLoss) setCurrentLoss(value);
          }}
        />
        <Slider
          label="Profit margin on fees"
          value={margin}
          min={10}
          max={80}
          step={1}
          unit="%"
          display={`${margin}%`}
          onChange={setMargin}
        />
        <Slider
          label="Cost to win and onboard one new client"
          value={winCost}
          min={0}
          max={40000}
          step={500}
          money
          display={formatMoney(winCost)}
          onChange={setWinCost}
        />
      </div>

      <div className="vrc-result" aria-live="polite">
        <p className="vrc-result-kicker">Your practice, using your figures</p>
        <p className="vrc-result-label">New clients you must win every year just to stand still</p>
        <strong className="vrc-result-number">
          {standStill} {standStill === 1 ? "client" : "clients"}
        </strong>
        <p className="vrc-result-explanation">
          At {currentLoss}% a year, about <b>{standStill} of your {clients} clients</b> leave.
          Every one has to be replaced before the practice grows by a single client — roughly{" "}
          <b>{formatMoney(calculation.standStillCost)}</b> a year in winning and onboarding, while{" "}
          <b>{formatMoney(calculation.feesOut)}</b> in annual fees walks out of the door.
        </p>

        <div className="vrc-afford">
          <div>
            <span>Profit from one client, over the years they stay</span>
            <strong>{formatMoney(calculation.clientProfitNow)}</strong>
            <small>
              about {formatYears(calculation.yearsNow)} at a {currentLoss}% loss rate
            </small>
          </div>
          <div className="vrc-afford-target">
            <span>At the loss rate you modelled</span>
            <strong>{formatMoney(calculation.clientProfitTarget)}</strong>
            <small>
              about {formatYears(calculation.yearsTarget)} at {targetLoss}%
            </small>
          </div>
        </div>

        {calculation.hasGap ? (
          <p className="vrc-afford-read">
            Bring the loss rate from {currentLoss}% to {targetLoss}% and you keep about{" "}
            {Math.round(calculation.keptPerYear * 10) / 10} more clients a year. Over five years
            that is roughly <b>{formatMoney(calculation.fiveYearFees)}</b> in fees — before a
            single new client is won, and without a cent of extra marketing.
          </p>
        ) : (
          <p className="vrc-afford-read">
            Lower the modelled loss rate below your current {currentLoss}% to see what keeping more
            of your clients would be worth.
          </p>
        )}

        <div className="vrc-metrics">
          <div>
            <span>Clients lost per year</span>
            <strong>
              {Math.round(calculation.lostNow)} → {Math.round(calculation.lostTarget)}
            </strong>
          </div>
          <div>
            <span>Annual fees walking out</span>
            <strong>{formatMoney(calculation.feesOut)}</strong>
          </div>
          <div>
            <span>Cost just to stand still</span>
            <strong>{formatMoney(calculation.standStillCost)}</strong>
          </div>
          <div>
            <span>Years a client stays</span>
            <strong>
              {formatYears(calculation.yearsNow).replace(" years", "")} →{" "}
              {formatYears(calculation.yearsTarget).replace(" years", "")}
            </strong>
          </div>
          <div>
            <span>Five-year fees from clients kept</span>
            <strong>{formatMoney(calculation.fiveYearFees)}</strong>
          </div>
          <div>
            <span>Five-year profit from clients kept</span>
            <strong>{formatMoney(calculation.fiveYearProfit)}</strong>
          </div>
        </div>

        <div className="vrc-note">
          <span aria-hidden="true">i</span>
          <p>
            A planning estimate, not a forecast or a guarantee. It assumes a steady loss rate and
            an average fee, and excludes fee increases, referrals, additional services and VAT.
            Years a client stays is capped at {MAX_YEARS}.
          </p>
        </div>
      </div>
    </div>
  );
}
