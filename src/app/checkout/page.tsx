"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  Cpu, 
  Sparkles,
  ArrowRight,
  Landmark,
  FileCheck,
  Mail,
  AlertTriangle
} from "lucide-react";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-800 text-sm font-mono font-bold">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading secure checkout...</span>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "ach">("card");
  const [companyName, setCompanyName] = useState("Acme Technologies Inc.");
  const [workEmail, setWorkEmail] = useState("alex@acme.com");
  const [subdomain, setSubdomain] = useState("acme");
  const [companySize, setCompanySize] = useState("26-100");

  // Plan Details (Selected from Step 2)
  const [planId, setPlanId] = useState("growth");
  const [planName, setPlanName] = useState("Growth");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [basePrice, setBasePrice] = useState(63);
  const [perEmpPrice, setPerEmpPrice] = useState(8);
  const [totalMonthlyPrice, setTotalMonthlyPrice] = useState(423);

  // Payment form state
  const [cardData, setCardData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [achData, setAchData] = useState({
    accountHolder: "",
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    accountType: "Business Checking",
  });

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  });

  // State for authorization simulation & error handling
  const [isProcessing, setIsProcessing] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Read query params and session storage
  useEffect(() => {
    const qCompany = searchParams.get("company");
    const qEmail = searchParams.get("email");
    const qSubdomain = searchParams.get("subdomain");
    const qSize = searchParams.get("size");
    const qPlan = searchParams.get("plan");
    const qPlanName = searchParams.get("planName");
    const qBilling = searchParams.get("billing");
    const qBase = searchParams.get("basePrice");
    const qPerEmp = searchParams.get("perEmpPrice");
    const qTotal = searchParams.get("totalMonthlyPrice");

    if (qCompany) setCompanyName(qCompany);
    if (qEmail) setWorkEmail(qEmail);
    if (qSubdomain) setSubdomain(qSubdomain);
    if (qSize) setCompanySize(qSize);
    if (qPlan) setPlanId(qPlan);
    if (qPlanName) setPlanName(qPlanName);
    if (qBilling === "monthly" || qBilling === "annual") setBillingCycle(qBilling);
    if (qBase) setBasePrice(parseFloat(qBase));
    if (qPerEmp) setPerEmpPrice(parseFloat(qPerEmp));
    if (qTotal) setTotalMonthlyPrice(parseFloat(qTotal));

    if (typeof window !== "undefined") {
      const storedReg = sessionStorage.getItem("payrollos_registration");
      if (storedReg) {
        try {
          const parsed = JSON.parse(storedReg);
          if (parsed.companyName) setCompanyName(parsed.companyName);
          if (parsed.email) setWorkEmail(parsed.email);
          if (parsed.subdomain) setSubdomain(parsed.subdomain);
          if (parsed.fullName) {
            setCardData((prev) => ({ ...prev, nameOnCard: parsed.fullName }));
            setAchData((prev) => ({ ...prev, accountHolder: parsed.companyName || parsed.fullName }));
          }
        } catch (e) {
          // ignore
        }
      }

      const storedPlan = sessionStorage.getItem("payrollos_selected_plan");
      if (storedPlan) {
        try {
          const parsedP = JSON.parse(storedPlan);
          if (parsedP.planName) setPlanName(parsedP.planName);
          if (parsedP.tier) setPlanId(parsedP.tier);
          if (parsedP.isAnnual !== undefined) setBillingCycle(parsedP.isAnnual ? "annual" : "monthly");
          if (parsedP.basePrice) setBasePrice(parsedP.basePrice);
          if (parsedP.perEmp) setPerEmpPrice(parsedP.perEmp);
          if (parsedP.calcPrice) setTotalMonthlyPrice(parsedP.calcPrice);
        } catch (e) {
          // ignore
        }
      }
    }
  }, [searchParams]);

  // Card formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + "/" + val.slice(2);
    }
    setCardData((prev) => ({ ...prev, expiry: val }));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    setCardData((prev) => ({ ...prev, cvc: val }));
  };

  // Submit Authorization - Realistic Gateway Rejection Logic
  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsProcessing(false);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts === 1) {
        setErrorMessage(
          "Payment Authorization Failed: Gateway declined — Unable to verify billing account with financial institution (Error Code: GW_DECLINE_102). Please check card details or try ACH Direct Debit."
        );
      } else if (newAttempts === 2) {
        setErrorMessage(
          "Payment Authorization Failed: Card verification declined by bank security network (Attempt 2/4). Please recheck the security code (CVC) and billing address."
        );
      } else if (newAttempts === 3) {
        setErrorMessage(
          "Payment Authorization Failed: Transaction authorization mismatch (Attempt 3/4). 1 attempt remaining before security lockout."
        );
      } else {
        setErrorMessage(
          "Billing authorization has failed 4 times. For enterprise security and manual workspace provisioning assistance, please contact our support team at contact@payrollos.org."
        );
      }
    }, 1200);
  };

  // Calculate trial expiration date (14 days from now)
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 14);
  const formattedTrialEnd = trialEndDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-indigo-600 selection:text-white flex flex-col">
      {/* Top Distraction-Free Header */}
      <header className="bg-white border-b-2 border-slate-300 py-3.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Top Left Go Back Button */}
          <button
            onClick={() => router.push(`/select-plan?company=${companyName}&email=${workEmail}&subdomain=${subdomain}&size=${companySize}&plan=${planId}`)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-800 hover:text-slate-950 hover:bg-slate-100 border-2 border-slate-300 shadow-2xs transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-700 stroke-[2.5]" />
            <span>Go Back</span>
          </button>

          {/* Center Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-2xs">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-950 text-base font-sans tracking-tight">
              Payroll<span className="text-indigo-600">OS</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-mono text-slate-700 font-bold hidden sm:inline">
              Step 3: Secure Checkout
            </span>
          </div>

          {/* Security Indicator */}
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border-2 border-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">256-Bit TLS</span>
            <span>Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Area */}
      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (7 cols): Payment Method & Billing Information Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-900 text-xs font-mono font-bold mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-700" />
                  <span>STEP 3 OF 3: BILLING & ZERO-CHARGE AUTHORIZATION</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
                  Confirm Workspace Subscription
                </h1>
                <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
                  Provide payment details to activate your 14-day evaluation trial for <strong>{companyName}</strong>.
                </p>
              </div>

              {/* 4-Attempt Failure / Support Alert Banner */}
              {failedAttempts >= 4 ? (
                <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 text-xs text-rose-950 shadow-md space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-rose-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-rose-950 font-sans">
                        Billing Authorization Failed (4 Attempts Reached)
                      </h4>
                      <p className="text-xs text-rose-900 leading-relaxed font-medium mt-1">
                        We were unable to verify your billing credentials automatically. For enterprise security and to complete your company workspace onboarding manually, please contact our support desk:
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border-2 border-rose-300 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-indigo-600" />
                      <span className="font-mono text-xs font-bold text-slate-950">contact@payrollos.org</span>
                    </div>
                    <a
                      href="mailto:contact@payrollos.org?subject=Manual%20Workspace%20Provisioning%20Assistance%20-%20"
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Email Enterprise Support
                    </a>
                  </div>
                </div>
              ) : errorMessage ? (
                /* Standard Error Alert */
                <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-xs text-rose-950 flex items-start gap-3 shadow-2xs animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block text-rose-950">
                      Authorization Error (Attempt {failedAttempts}/4)
                    </span>
                    <span className="text-rose-900 leading-relaxed block font-medium">
                      {errorMessage}
                    </span>
                  </div>
                </div>
              ) : null}

              {/* Important Zero-Charge Banner */}
              <div className="p-4 rounded-xl bg-white border-2 border-emerald-300 text-xs text-emerald-950 flex items-start gap-3 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <span className="font-extrabold block text-sm text-emerald-950 font-sans">
                    Charge Today: $0.00 (14-Day Free Evaluation)
                  </span>
                  <span className="text-slate-700 font-medium leading-relaxed block mt-0.5">
                    Your card or account will be authorized for verification ($0.00 charge). Your <strong>{planName} Plan</strong> will continue at <strong>${totalMonthlyPrice}.00 / month</strong> starting on <strong>{formattedTrialEnd}</strong>. You can cancel anytime before with 1-click in settings.
                  </span>
                </div>
              </div>

              {/* Payment Card / Form Container */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-slate-300 shadow-md space-y-6">
                {/* Payment Method Selector Tabs */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-2">
                    Select Payment Method
                  </label>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3.5 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === "card"
                          ? "bg-indigo-50 border-indigo-600 text-indigo-950 shadow-xs ring-1 ring-indigo-600"
                          : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                      <span>Credit / Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("ach")}
                      className={`p-3.5 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === "ach"
                          ? "bg-indigo-50 border-indigo-600 text-indigo-950 shadow-xs ring-1 ring-indigo-600"
                          : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Landmark className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                      <span>Corporate Bank (ACH)</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleAuthorize} className="space-y-4">
                  {paymentMethod === "card" ? (
                    /* Credit Card Form Inputs */
                    <div className="space-y-3.5 animate-in fade-in duration-150">
                      {/* Name on Card */}
                      <div>
                        <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          value={cardData.nameOnCard}
                          onChange={(e) => setCardData({ ...cardData, nameOnCard: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-sans"
                        />
                      </div>

                      {/* Card Number */}
                      <div>
                        <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={cardData.cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="4242 •••• •••• 4242"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-mono font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Expiration and CVC */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                            Expires (MM / YY)
                          </label>
                          <input
                            type="text"
                            required
                            value={cardData.expiry}
                            onChange={handleExpiryChange}
                            placeholder="MM / YY"
                            className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-mono font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                            Security Code (CVC)
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="password"
                              required
                              value={cardData.cvc}
                              onChange={handleCvcChange}
                              placeholder="CVC"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-mono font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ACH Bank Account Inputs */
                    <div className="space-y-3.5 animate-in fade-in duration-150">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                          Account Holder / Company Name
                        </label>
                        <input
                          type="text"
                          required
                          value={achData.accountHolder}
                          onChange={(e) => setAchData({ ...achData, accountHolder: e.target.value })}
                          placeholder="e.g. Acme Technologies Inc."
                          className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          required
                          value={achData.bankName}
                          onChange={(e) => setAchData({ ...achData, bankName: e.target.value })}
                          placeholder="e.g. JPMorgan Chase Bank / Silicon Valley Bank"
                          className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                            Routing Number (9 Digits)
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={9}
                            value={achData.routingNumber}
                            onChange={(e) => setAchData({ ...achData, routingNumber: e.target.value.replace(/\D/g, "") })}
                            placeholder="021000021"
                            className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-mono font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                            Account Number
                          </label>
                          <input
                            type="text"
                            required
                            value={achData.accountNumber}
                            onChange={(e) => setAchData({ ...achData, accountNumber: e.target.value.replace(/\D/g, "") })}
                            placeholder="••••••••••"
                            className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-mono font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                          Account Type
                        </label>
                        <select
                          value={achData.accountType}
                          onChange={(e) => setAchData({ ...achData, accountType: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-bold text-slate-950 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all"
                        >
                          <option value="Business Checking">Business Checking Account</option>
                          <option value="Corporate Treasury">Corporate Treasury</option>
                          <option value="Business Savings">Business Savings Account</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Company Billing Address Section */}
                  <div className="pt-2 border-t-2 border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 font-mono uppercase mb-3">
                      Company Billing Address
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={billingAddress.street}
                          onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
                          placeholder="Street Address (e.g. 100 Market St, Suite 400)"
                          className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-xs font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          required
                          value={billingAddress.city}
                          onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                          placeholder="City"
                          className="w-full px-3 py-2 rounded-lg border-2 border-slate-300 bg-white text-xs font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                        />
                        <input
                          type="text"
                          required
                          value={billingAddress.state}
                          onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                          placeholder="State"
                          className="w-full px-3 py-2 rounded-lg border-2 border-slate-300 bg-white text-xs font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                        />
                        <input
                          type="text"
                          required
                          value={billingAddress.postalCode}
                          onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
                          placeholder="ZIP Code"
                          className="w-full px-3 py-2 rounded-lg border-2 border-slate-300 bg-white text-xs font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="pt-2 text-xs text-slate-700 leading-relaxed font-medium">
                    By authorizing this subscription, you confirm that you are an authorized representative of <strong>{companyName}</strong>. You agree to the 14-day evaluation terms with $0.00 due today. After 14 days, your subscription will continue at <strong>${totalMonthlyPrice}.00 / month</strong> unless cancelled in your company workspace settings.
                  </div>

                  {/* Submit Authorization Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Securing Authorization & Workspace...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 stroke-[2.5]" />
                          <span>Authorize $0.00 Trial & Activate {planName}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column (5 cols): Order Summary & Guarantee Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white border-2 border-slate-300 shadow-md space-y-5">
                <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200">
                  <span className="text-xs font-mono font-extrabold uppercase text-slate-700">
                    Order Summary
                  </span>
                  <span className="text-xs font-mono text-indigo-700 font-extrabold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200">
                    {planName} Workspace Plan
                  </span>
                </div>

                {/* Plan Specs */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-extrabold text-slate-950 font-sans">
                      {planName} Workspace Plan
                    </h3>
                    <span className="text-sm font-mono font-extrabold text-slate-950">
                      ${totalMonthlyPrice}.00 / mo
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium mt-1">
                    Company: <strong>{companyName}</strong> ({workEmail})
                  </p>
                  <p className="text-xs text-indigo-700 font-mono font-bold mt-1">
                    Portal: https://{subdomain || "acme"}.payrollos.com
                  </p>
                  <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                    Billing: {billingCycle === "annual" ? "Annual (20% Savings)" : "Monthly"}
                  </p>
                </div>

                {/* Pricing Breakdown Sheet */}
                <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-300 space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-700 font-medium">
                    <span>Base Subscription:</span>
                    <span className="text-slate-950 font-bold">${basePrice}.00 / mo</span>
                  </div>
                  <div className="flex justify-between text-slate-700 font-medium">
                    <span>Per-Employee Rate:</span>
                    <span className="text-slate-950 font-bold">${perEmpPrice}.00 / emp</span>
                  </div>
                  <div className="flex justify-between text-slate-700 font-medium">
                    <span>14-Day Free Trial Credit:</span>
                    <span className="text-emerald-700 font-extrabold">-${totalMonthlyPrice}.00</span>
                  </div>
                  <div className="flex justify-between text-slate-700 font-medium">
                    <span>Provisioning & Setup Fee:</span>
                    <span className="text-slate-950 font-bold">$0.00</span>
                  </div>

                  <div className="pt-2 border-t-2 border-slate-300 flex justify-between text-base font-extrabold text-slate-950">
                    <span>Due Today:</span>
                    <span className="text-emerald-700 font-mono">$0.00</span>
                  </div>

                  <div className="pt-1 text-[11px] text-slate-600 font-sans font-medium leading-tight">
                    First recurring billing of ${totalMonthlyPrice}.00 will occur on <strong>{formattedTrialEnd}</strong>. Cancel anytime with 1-click in portal settings.
                  </div>
                </div>

                {/* Feature inclusions */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-xs font-mono font-bold uppercase text-slate-800">
                    Included with {planName} plan:
                  </div>
                  {[
                    "Automated regular & overtime payroll calculation",
                    "Multi-rate wage blending & shift differentials",
                    "Pre-payroll validation & exception detection queue",
                    "Source-to-gross reconciliation ledger",
                    "5-tier Role-Based Access Control (RBAC)",
                    "Workforce labor analytics & cost exports",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancel Guarantee Pill */}
              <div className="p-4 rounded-xl bg-white border-2 border-slate-300 text-xs text-slate-800 flex items-center gap-3 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-indigo-700 shrink-0 stroke-[2.5]" />
                <span className="font-medium">
                  <strong>Zero-Risk Guarantee:</strong> Cancel anytime during your 14-day trial in your company portal settings to avoid any billing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Minimal Checkout Footer */}
      <footer className="border-t-2 border-slate-300 bg-white py-4 text-center text-xs text-slate-700 font-medium">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} PayrollOS Platform Inc. • Secure 256-Bit SSL Checkout</span>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span>Cancel Anytime with 1-Click</span>
            <span>•</span>
            <span>Support: contact@payrollos.org</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
