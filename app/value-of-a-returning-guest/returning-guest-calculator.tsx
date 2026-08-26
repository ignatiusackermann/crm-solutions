"use client";

import { useMemo, useState } from "react";

/**
 * The returning-guest calculator — hospitality version of the returning-customer
 * model, in ZAR.
 *
 * The commercial difference from the general-business version: in hospitality
 * the cost of acquiring a guest is not a vague advertising budget, it is the
 * OTA commission, and the owner knows it exactly. So commission replaces the
 * "marketing spend" slider and becomes the acquisition cost directly:
 *
 *   commission per booking = stay value × commission %          (this is CAC)
 *   margin on a first stay = stay value × (gross margin % − commission %)
 *   margin on a return stay = stay value × gross margin %        (booked direct)
 *
 * A returning guest is therefore worth MORE than the first, not merely the
 * same. Value per guest counts one return at most, which is conservative and
 * is stated on the panel.
 *
 * Everything runs in the browser. Nothing is stored or transmitted.
 */

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

export function ReturningGuestCalculator() {
  const [guests, setGuests] = useState(45);
  const [stayValue, setStayValue] = useState(2200);
  const [commission, setCommission] = useState(15);
  const [currentReturn, setCurrentReturn] = useState(15);
  const [targetReturn, setTargetReturn] = useState(45);
  const [margin, setMargin] = useState(60);

  const calculation = useMemo(() => {
    const annualGuests = guests * 12;
    const returnGap = Math.max(0, targetReturn - currentReturn) / 100;
    const additionalStays = annualGuests * returnGap;
    const additionalRevenue = additionalStays * stayValue;

    const commissionPerBooking = stayValue * (commission / 100);
    const directMargin = stayValue * (margin / 100);
    const firstStayMargin = Math.max(0, stayValue * ((margin - commission) / 100));

    const valueNow = firstStayMargin + (currentReturn / 100) * directMargin;
    const valueTarget = firstStayMargin + (targetReturn / 100) * directMargin;

    return {
      additionalStays,
      additionalRevenue,
      additionalProfit: additionalStays * directMargin,
      commissionPerBooking,
      annualCommission: annualGuests * commissionPerBooking,
      commissionNeverPaid: additionalStays * commissionPerBooking,
      valueNow,
      valueTarget,
      directMargin,
      firstStayMargin,
      ratio: commissionPerBooking > 0 ? valueNow / commissionPerBooking : Infinity,
      uplift: valueNow > 0 ? valueTarget / valueNow - 1 : 0,
      currentAnnualReturns: annualGuests * (currentReturn / 100),
      targetAnnualReturns: annualGuests * (targetReturn / 100),
      hasGap: targetReturn > currentReturn,
      marginSqueezed: commission >= margin,
    };
  }, [guests, stayValue, commission, currentReturn, targetReturn, margin]);

  return (
    <div className="vrc-calculator">
      <div className="vrc-controls">
        <Slider
          label="New guests per month"
          value={guests}
          min={5}
          max={400}
          step={5}
          display={String(guests)}
          onChange={setGuests}
        />
        <Slider
          label="Average value of a stay"
          value={stayValue}
          min={400}
          max={30000}
          step={100}
          money
          display={formatMoney(stayValue)}
          onChange={setStayValue}
        />
        <Slider
          label="Commission on a booking"
          value={commission}
          min={0}
          max={30}
          step={1}
          unit="%"
          display={`${commission}%`}
          onChange={setCommission}
        />
        <Slider
          label="Guests who return today"
          value={currentReturn}
          min={0}
          max={80}
          step={1}
          unit="%"
          display={`${currentReturn}%`}
          onChange={(value) => {
            setCurrentReturn(value);
            if (value > targetReturn) setTargetReturn(value);
          }}
        />
        <Slider
          label="Return rate you want to model"
          value={targetReturn}
          min={5}
          max={90}
          step={1}
          unit="%"
          display={`${targetReturn}%`}
          onChange={(value) => {
            setTargetReturn(value);
            if (value < currentReturn) setCurrentReturn(value);
          }}
        />
        <Slider
          label="Gross margin on a stay"
          value={margin}
          min={20}
          max={90}
          step={1}
          unit="%"
          display={`${margin}%`}
          onChange={setMargin}
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
              If the share of guests who come back moves from {currentReturn}% to {targetReturn}%,
              that is roughly <b>{Math.round(calculation.additionalStays)} additional stays</b> a
              year — in the same rooms, with the same staff, and{" "}
              <b>{formatMoney(calculation.commissionNeverPaid)}</b> of commission you never pay,
              because a returning guest books direct.
            </>
          ) : (
            <>
              Raise the modelled return rate above your current {currentReturn}% to see what a
              working return journey would be worth.
            </>
          )}
        </p>

        <div className="vrc-afford">
          <div>
            <span>A guest is worth, today</span>
            <strong>{formatMoney(calculation.valueNow)}</strong>
            <small>at a {currentReturn}% return rate</small>
          </div>
          <div className="vrc-afford-target">
            <span>A guest would be worth</span>
            <strong>{formatMoney(calculation.valueTarget)}</strong>
            <small>at a {targetReturn}% return rate</small>
          </div>
        </div>

        {calculation.hasGap && (
          <p className="vrc-afford-read">
            That is {Math.round(calculation.uplift * 100)}% more from exactly the same guest, in
            exactly the same room. The second stay carries no commission at all — which is why the
            business that keeps its guests can outbid the one that does not, for the very same
            booking.
          </p>
        )}

        <div className="vrc-metrics">
          <div>
            <span>Commission per new booking</span>
            <strong>{formatMoney(calculation.commissionPerBooking)}</strong>
          </div>
          <div>
            <span>Commission paid per year</span>
            <strong>{formatMoney(calculation.annualCommission)}</strong>
          </div>
          <div>
            <span>Value against commission</span>
            <strong>
              {Number.isFinite(calculation.ratio)
                ? `${calculation.ratio.toFixed(1)} : 1`
                : "no commission"}
            </strong>
          </div>
          <div>
            <span>Margin on a direct return stay</span>
            <strong>{formatMoney(calculation.directMargin)}</strong>
          </div>
          <div>
            <span>Gross-profit opportunity</span>
            <strong>{formatMoney(calculation.additionalProfit)}</strong>
          </div>
          <div>
            <span>Return stays per year, modelled</span>
            <strong>
              {Math.round(calculation.currentAnnualReturns)} →{" "}
              {Math.round(calculation.targetAnnualReturns)}
            </strong>
          </div>
        </div>

        {calculation.marginSqueezed && (
          <p className="vrc-afford-read">
            At {commission}% commission against a {margin}% margin, a first stay earns you nothing
            at all. Every cent of profit in that scenario comes from the guest returning.
          </p>
        )}

        <div className="vrc-note">
          <span aria-hidden="true">i</span>
          <p>
            A planning estimate, not a forecast or a guarantee. It counts one return stay per
            guest, treats first bookings as commissionable and return bookings as direct, and
            excludes seasonality, occupancy limits, cancellations, VAT and operating costs.
          </p>
        </div>
      </div>
    </div>
  );
}
