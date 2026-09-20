"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Check, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Cpu, 
  Scale, 
  Sparkles,
  Users
} from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const pricingTiers = [
    {
      name: "Starter",
      badge: "Small Teams",
      description: "Essential payroll calculation and time tracking for growing businesses.",
      basePrice: isAnnual ? 31 : 39,
      perEmployeePrice: isAnnual ? 5 : 6,
      popular: false,
      ctaText: "Start 14-Day Trial",
      ctaLink: "/get-started?plan=starter",
      features: [
        "Up to 25 active employees",
        "Regular pay & standard overtime calculation",
        "Employee time & attendance tracking",
        "Standard deductions & allowances",
        "Direct manager timesheet approvals",
        "Standard payroll summary reports",
        "Standard email support",
      ],
    },
    {
      name: "Growth",
      badge: "Most Popular",
      description: "Full automated validation, exception detection, and reconciliation for scaling companies.",
      basePrice: isAnnual ? 63 : 79,
      perEmployeePrice: isAnnual ? 8 : 10,
      popular: true,
      ctaText: "Start 14-Day Trial",
      ctaLink: "/get-started?plan=growth",
      features: [
        "Up to 250 active employees",
        "Multi-rate overtime & shift differentials",
        "Automated pre-payroll exception detection",
        "Source-to-payroll reconciliation ledger",
        "Role-Based Access Control (5 Scopes)",
        "Discrepancy root-cause investigation tools",
        "Workforce & labor cost analytics",
        "Priority email & chat support",
      ],
    },
    {
      name: "Enterprise",
      badge: "Custom Scale",
      description: "Dedicated calculation engine and custom workforce rule configuration for large organizations.",
      basePrice: isAnnual ? 159 : 199,
      perEmployeePrice: isAnnual ? 12 : 15,
      popular: false,
      ctaText: "Contact Enterprise Sales",
      ctaLink: "/get-started?plan=enterprise",
      features: [
        "Unlimited employees & multi-entity support",
        "Custom compensation & overtime rule logic",
        "Tailored department & shift hierarchies",
        "Dedicated exception triage workflows",
        "Full REST API & webhook integrations",
        "Audit trail & granular data masking",
        "Dedicated account manager",
        "Custom SLA & onboarding assistance",
      ],
    },
  ];

  const comparisonFeatures = [
    {
      category: "Payroll & Calculation Engine",
      items: [
        { name: "Regular Pay & Standard Overtime", starter: true, growth: true, enterprise: true },
        { name: "Multiple Hourly Pay Rates per Period", starter: false, growth: true, enterprise: true },
        { name: "Shift Differentials & Night Premiums", starter: false, growth: true, enterprise: true },
        { name: "Pre-Tax & Post-Tax Deductions", starter: true, growth: true, enterprise: true },
        { name: "Effective-Dated Wage Changes & Proration", starter: false, growth: true, enterprise: true },
        { name: "Custom Calculation Rule Configuration", starter: false, growth: false, enterprise: true },
      ],
    },
    {
      category: "Validation & Controls",
      items: [
        { name: "Missing & Duplicate Punch Detection", starter: true, growth: true, enterprise: true },
        { name: "Automated Exception Detection Queue", starter: false, growth: true, enterprise: true },
        { name: "Variance Threshold & Overtime Spikes", starter: false, growth: true, enterprise: true },
        { name: "Source Reconciliation Ledger", starter: false, growth: true, enterprise: true },
        { name: "Discrepancy Root-Cause Traceback", starter: false, growth: true, enterprise: true },
      ],
    },
    {
      category: "Security & Governance",
      items: [
        { name: "Role-Based Access Control (RBAC)", starter: "Basic", growth: "5 Roles", enterprise: "Custom Scopes" },
        { name: "Field-Level Compensation Masking", starter: false, growth: true, enterprise: true },
        { name: "Corporate SSO / SAML Integration", starter: false, growth: false, enterprise: true },
        { name: "Historical Payroll Lineage Records", starter: true, growth: true, enterprise: true },
      ],
    },
  ];

  const faqs = [
    {
      q: "Can I try PayrollOS before subscribing?",
      a: "Yes. All plans include a 14-day free evaluation trial ($0.00 charged today) with full access to our calculation engine, exception detection queue, and reconciliation tools.",
    },
    {
      q: "How does per-employee pricing work?",
      a: "You only pay for employees who receive a calculated paystub in a given billing cycle. Inactive or archived employees are never billed.",
    },
    {
      q: "Why is a corporate work email required to register?",
      a: "To ensure enterprise security and legitimate company workspace provisioning, we require registration using your organization's business domain (e.g. name@yourcompany.com). Public personal domains (@gmail.com, @yahoo.com) are not supported.",
    },
    {
      q: "Can we configure custom overtime and shift rates?",
      a: "Yes. Growth and Enterprise plans support multi-rate blending, shift differentials, and custom department overtime thresholds.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-900 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-indigo-700" />
              <span>TRANSPARENT ENTERPRISE PLANS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans">
              Simple, Predictable Pricing for Modern Payroll
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              Choose the plan that fits your organization. All plans include automated validation, accurate calculations, and instant workspace provisioning.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="pt-4 flex items-center justify-center gap-3 text-sm font-bold">
              <span className={!isAnnual ? "text-slate-950 font-extrabold" : "text-slate-600 font-semibold"}>
                Monthly Billing
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-13 h-7 rounded-full bg-slate-300 p-0.5 transition-colors relative flex items-center shadow-inner cursor-pointer"
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
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-mono font-extrabold">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-7 rounded-2xl bg-white border-2 transition-all flex flex-col justify-between relative shadow-sm hover:shadow-md ${
                  tier.popular
                    ? "border-indigo-600 ring-2 ring-indigo-600/30"
                    : "border-slate-300 hover:border-slate-400"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[11px] font-extrabold uppercase tracking-wider shadow-2xs">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-extrabold text-slate-950 font-sans">
                      {tier.name}
                    </h3>
                    {!tier.popular && (
                      <span className="text-xs font-mono font-bold text-slate-700 px-2.5 py-0.5 rounded bg-slate-100 border border-slate-300">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 font-medium min-h-[36px] mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b-2 border-slate-200">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-slate-950 font-sans">
                          ${tier.basePrice}
                        </span>
                        <span className="text-xs text-slate-700 font-mono font-bold">
                          base / month
                        </span>
                      </div>
                      <div className="text-xs text-indigo-700 font-mono mt-1 font-bold">
                        + ${tier.perEmployeePrice} / employee / month
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono font-bold uppercase text-slate-800">
                      What&apos;s included:
                    </div>
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={tier.ctaLink}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-slate-300"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            ))}
          </div>

          {/* Feature Comparison Matrix */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
                Compare Plan Capabilities
              </h2>
              <p className="text-sm text-slate-700 font-medium mt-2">
                Detailed breakdown of calculation, validation, and security features across tiers.
              </p>
            </div>

            <div className="rounded-2xl bg-white border-2 border-slate-300 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="bg-slate-50 border-b-2 border-slate-300 text-slate-900 font-mono font-bold">
                      <th className="p-4 w-1/2">FEATURE</th>
                      <th className="p-4 text-center">STARTER</th>
                      <th className="p-4 text-center text-indigo-900 bg-indigo-50/70 border-x-2 border-indigo-200">GROWTH</th>
                      <th className="p-4 text-center">ENTERPRISE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-200">
                    {comparisonFeatures.map((cat, catIdx) => (
                      <React.Fragment key={catIdx}>
                        <tr className="bg-slate-100 font-extrabold font-mono text-[11px] text-slate-900">
                          <td colSpan={4} className="p-3.5 uppercase">
                            {cat.category}
                          </td>
                        </tr>
                        {cat.items.map((item, iIdx) => (
                          <tr key={iIdx} className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-950">{item.name}</td>
                            <td className="p-4 text-center">
                              {typeof item.starter === "boolean" ? (
                                item.starter ? (
                                  <Check className="w-4 h-4 text-emerald-600 mx-auto stroke-[3]" />
                                ) : (
                                  <span className="text-slate-400 font-bold">—</span>
                                )
                              ) : (
                                <span className="font-mono text-xs font-bold text-slate-800">{item.starter}</span>
                              )}
                            </td>
                            <td className="p-4 text-center bg-indigo-50/30 border-x-2 border-indigo-100">
                              {typeof item.growth === "boolean" ? (
                                item.growth ? (
                                  <Check className="w-4 h-4 text-indigo-700 mx-auto stroke-[3]" />
                                ) : (
                                  <span className="text-slate-400 font-bold">—</span>
                                )
                              ) : (
                                <span className="font-mono text-xs font-extrabold text-indigo-700">{item.growth}</span>
                              )}
                            </td>
                            <td className="p-4 text-center">
                              {typeof item.enterprise === "boolean" ? (
                                item.enterprise ? (
                                  <Check className="w-4 h-4 text-emerald-600 mx-auto stroke-[3]" />
                                ) : (
                                  <span className="text-slate-400 font-bold">—</span>
                                )
                              ) : (
                                <span className="font-mono text-xs font-bold text-slate-800">{item.enterprise}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pricing FAQs */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-700 font-medium mt-1">
                Common questions about billing, company accounts, and onboarding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {faqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-xl bg-white border-2 border-slate-300 shadow-2xs space-y-2">
                  <h4 className="text-sm font-extrabold text-slate-950 font-sans">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium font-sans">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise CTA Banner */}
          <div className="p-8 sm:p-10 rounded-2xl bg-slate-950 text-white text-center max-w-4xl mx-auto shadow-xl flex flex-col items-center justify-between gap-6 border-2 border-slate-800">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-sans">
                Need Custom Workforce Shift Rules or 500+ Seats?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 max-w-xl">
                Our enterprise solutions team will assist with historical payroll data migration, custom overtime policies, and dedicated SLA contracts.
              </p>
            </div>

            <Link
              href="/get-started?plan=enterprise"
              className="px-6 py-3.5 rounded-xl font-extrabold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Talk to Enterprise Solutions</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
