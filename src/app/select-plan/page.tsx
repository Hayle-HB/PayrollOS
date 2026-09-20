"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Building2,
  Users,
  CreditCard,
  Zap
} from "lucide-react";

export default function SelectPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-800 text-sm font-mono font-semibold">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading workspace plans...</span>
          </div>
        </div>
      }
    >
      <SelectPlanContent />
    </Suspense>
  );
}

function SelectPlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [companyName, setCompanyName] = useState("Your Company");
  const [workEmail, setWorkEmail] = useState("");
  const [subdomain, setSubdomain] = useState("acme");
  const [companySize, setCompanySize] = useState("26-100");
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedTier, setSelectedTier] = useState<"starter" | "growth" | "enterprise">("growth");

  useEffect(() => {
    const qCompany = searchParams.get("company");
    const qEmail = searchParams.get("email");
    const qSubdomain = searchParams.get("subdomain");
    const qSize = searchParams.get("size");
    const qPlan = searchParams.get("plan");

    if (qCompany) setCompanyName(qCompany);
    if (qEmail) setWorkEmail(qEmail);
    if (qSubdomain) setSubdomain(qSubdomain);
    if (qSize) setCompanySize(qSize);
    if (qPlan === "starter" || qPlan === "growth" || qPlan === "enterprise") {
      setSelectedTier(qPlan);
    }

    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("payrollos_registration");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.companyName) setCompanyName(parsed.companyName);
          if (parsed.email) setWorkEmail(parsed.email);
          if (parsed.subdomain) setSubdomain(parsed.subdomain);
          if (parsed.companySize) setCompanySize(parsed.companySize);
        } catch (e) {
          // ignore parsing error
        }
      }
    }
  }, [searchParams]);

  // Estimate approximate employee count based on range for live calculation
  const getEstimatedEmployeeCount = () => {
    switch (companySize) {
      case "1-25": return 15;
      case "26-100": return 45;
      case "101-500": return 150;
      case "500+": return 300;
      default: return 25;
    }
  };

  const estCount = getEstimatedEmployeeCount();

  const tiers = [
    {
      id: "starter" as const,
      name: "Starter",
      badge: "Small Teams",
      target: "Up to 25 employees",
      basePrice: isAnnual ? 31 : 39,
      perEmp: isAnnual ? 5 : 6,
      calcPrice: (isAnnual ? 31 : 39) + (isAnnual ? 5 : 6) * Math.min(estCount, 25),
      description: "Essential automated payroll calculation and standard timesheets.",
      features: [
        "Up to 25 active employees",
        "Regular pay & standard overtime engine",
        "Employee time & attendance tracking",
        "Standard deductions & tax withholdings",
        "Direct manager timesheet approvals",
        "Standard payroll summary exports",
      ],
    },
    {
      id: "growth" as const,
      name: "Growth",
      badge: "Most Popular",
      target: "25 – 250 employees",
      basePrice: isAnnual ? 63 : 79,
      perEmp: isAnnual ? 8 : 10,
      calcPrice: (isAnnual ? 63 : 79) + (isAnnual ? 8 : 10) * estCount,
      description: "Full automated validation, exception detection, and discrepancy reconciliation.",
      features: [
        "Up to 250 active employees",
        "Multi-rate overtime & shift differentials",
        "Automated pre-payroll exception queue",
        "Source-to-gross reconciliation ledger",
        "5-tier Role-Based Access Control (RBAC)",
        "Discrepancy root-cause investigation",
        "Labor cost analytics & reporting",
      ],
    },
    {
      id: "enterprise" as const,
      name: "Enterprise",
      badge: "Custom Scale",
      target: "250+ employees & multi-entity",
      basePrice: isAnnual ? 159 : 199,
      perEmp: isAnnual ? 12 : 15,
      calcPrice: (isAnnual ? 159 : 199) + (isAnnual ? 12 : 15) * estCount,
      description: "Dedicated calculation engine, custom compensation rules, and SLA contracts.",
      features: [
        "Unlimited employees & multi-entity",
        "Custom overtime & shift rule engine",
        "Historical data migration assistance",
        "Dedicated exception triage workflows",
        "Granular audit lineage & data masking",
        "Dedicated account manager & SLA",
      ],
    },
  ];

  const currentTierObj = tiers.find((t) => t.id === selectedTier) || tiers[1];

  const handleProceedToCheckout = () => {
    const params = new URLSearchParams({
      company: companyName,
      email: workEmail,
      subdomain: subdomain,
      size: companySize,
      plan: currentTierObj.id,
      planName: currentTierObj.name,
      billing: isAnnual ? "annual" : "monthly",
      basePrice: currentTierObj.basePrice.toString(),
      perEmpPrice: currentTierObj.perEmp.toString(),
      totalMonthlyPrice: currentTierObj.calcPrice.toString(),
    }).toString();

    // Store chosen plan in session storage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("payrollos_selected_plan", JSON.stringify({
        tier: currentTierObj.id,
        planName: currentTierObj.name,
        isAnnual,
        basePrice: currentTierObj.basePrice,
        perEmp: currentTierObj.perEmp,
        calcPrice: currentTierObj.calcPrice,
      }));
    }

    router.push(`/checkout?${params}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-300 py-3.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Top Left Go Back Button */}
          <button
            onClick={() => router.push("/get-started")}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 shadow-2xs transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" />
            <span>Go Back</span>
          </button>

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-2xs">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-950 text-base font-sans tracking-tight">
              Payroll<span className="text-indigo-600">OS</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-mono text-slate-700 font-semibold hidden sm:inline">
              Step 2: Choose Plan
            </span>
          </div>

          {/* Guarantee Pill */}
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>14-Day Free Evaluation</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Title Area */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-300 text-indigo-800 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>STEP 2 OF 3: SELECT WORKSPACE PLAN</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Choose the Plan for {companyName || "Your Company"}
            </h1>

            <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-xl mx-auto">
              All plans begin with a <strong>14-day free trial ($0.00 charged today)</strong>. Select the tier that matches your workforce scale.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="pt-3 flex items-center justify-center gap-3 text-sm font-bold">
              <span className={!isAnnual ? "text-slate-950 font-extrabold" : "text-slate-600 font-semibold"}>
                Monthly Billing
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-13 h-7 rounded-full bg-slate-300 p-0.5 transition-colors relative flex items-center shadow-inner"
              >
                <div
                  className={`w-6 h-6 rounded-full bg-indigo-600 shadow-sm transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={isAnnual ? "text-slate-950 font-extrabold" : "text-slate-600 font-semibold"}>
                  Annual Billing
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-mono font-extrabold">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`p-6 rounded-2xl bg-white border-2 cursor-pointer transition-all flex flex-col justify-between relative shadow-sm hover:shadow-md ${
                    isSelected
                      ? "border-indigo-600 ring-2 ring-indigo-600/30 bg-indigo-50/10"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  {tier.badge && (
                    <div className={`absolute -top-3 left-6 px-3 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider ${
                      isSelected ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-800 border border-slate-300"
                    }`}>
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1 pt-1">
                      <h3 className="text-xl font-extrabold text-slate-950 font-sans">
                        {tier.name}
                      </h3>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-400"
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div className="text-xs font-bold text-indigo-700 font-mono mb-3">
                      {tier.target}
                    </div>

                    <p className="text-xs text-slate-700 leading-snug mb-5 min-h-[34px]">
                      {tier.description}
                    </p>

                    {/* Price Breakdown */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 mb-5 space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-slate-950 font-sans">
                          ${tier.basePrice}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-700">
                          base / month
                        </span>
                      </div>
                      <div className="text-xs font-mono font-bold text-indigo-700">
                        + ${tier.perEmp} / employee / month
                      </div>
                      <div className="pt-1.5 border-t border-slate-200 text-[11px] font-mono text-slate-700 flex justify-between">
                        <span>Est. Total ({estCount} team):</span>
                        <span className="font-extrabold text-slate-950">${tier.calcPrice} / mo</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2.5 mb-6">
                      <div className="text-xs font-mono font-bold uppercase text-slate-800">
                        Included capabilities:
                      </div>
                      {tier.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Select button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTier(tier.id);
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300"
                    }`}
                  >
                    <span>{isSelected ? "Selected Plan" : "Choose " + tier.name}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-slate-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-600">Selected Plan:</span>
                <span className="text-base font-extrabold text-indigo-700 font-sans">{currentTierObj.name} Workspace Tier</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800">
                  {isAnnual ? "Annual (-20%)" : "Monthly"}
                </span>
              </div>
              <div className="text-xs text-slate-700 font-medium">
                <strong>$0.00 charged today</strong> (14-day evaluation trial). After trial, your subscription bills at <strong>${currentTierObj.calcPrice}.00 / month</strong> (cancel anytime before).
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="px-8 py-3.5 rounded-xl font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow transition-all flex items-center gap-2 shrink-0"
            >
              <span>Continue to Secure Billing ($0.00 Today)</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-300 bg-white py-4 text-center text-xs text-slate-700 font-medium">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} PayrollOS Platform Inc. • Enterprise Workforce Systems</span>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span>Zero Risk • 14-Day Free Trial</span>
            <span>•</span>
            <span>Cancel Anytime with 1-Click</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
