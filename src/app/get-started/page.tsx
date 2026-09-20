"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Check,
  ShieldCheck
} from "lucide-react";
import { validateCorporateEmail } from "@/lib/emailValidation";

export default function GetStartedPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    subdomain: "",
    companySize: "26-100",
    password: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));

    if (val.length > 5 && val.includes("@")) {
      const res = validateCorporateEmail(val);
      if (!res.isValid) {
        setEmailError(res.error || "Invalid corporate domain");
      } else {
        setEmailError(null);
        if (!formData.companyName && res.companyName) {
          setFormData((prev) => ({
            ...prev,
            companyName: res.companyName || "",
            subdomain: (res.domain?.split(".")[0] || "").toLowerCase(),
          }));
        }
      }
    } else {
      setEmailError(null);
    }
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      companyName: val,
      subdomain: val.toLowerCase().replace(/[^a-z0-9]/g, ""),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailCheck = validateCorporateEmail(formData.email);
    if (!emailCheck.isValid) {
      setEmailError(emailCheck.error || "Please provide a corporate work email.");
      return;
    }

    setIsSubmitting(true);

    // Save registration payload to sessionStorage for subsequent steps
    if (typeof window !== "undefined") {
      sessionStorage.setItem("payrollos_registration", JSON.stringify(formData));
    }

    // Redirect to Step 2: Choose Plan
    const queryParams = new URLSearchParams({
      company: formData.companyName || "Acme",
      email: formData.email,
      subdomain: formData.subdomain || "acme",
      size: formData.companySize,
    }).toString();

    router.push(`/select-plan?${queryParams}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Product Value */}
            <div className="lg:col-span-5 space-y-6 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-900 text-xs font-mono font-bold">
                <Sparkles className="w-4 h-4 text-indigo-700" />
                <span>STEP 1 OF 3: COMPANY REGISTRATION</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
                Register Your Enterprise Workspace
              </h1>

              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                Start your 14-day free trial. In the next steps, you will select your workspace tier and confirm billing authorization with <strong>$0 charge today</strong>.
              </p>

              {/* Pricing Terms Highlight Box */}
              <div className="p-4 rounded-xl bg-white border-2 border-indigo-200 shadow-2xs space-y-2 text-xs">
                <div className="flex items-center justify-between text-indigo-950 font-extrabold">
                  <span className="text-sm">14-Day Free Evaluation</span>
                  <span className="text-emerald-700 font-mono text-base font-extrabold">$0.00 Today</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed font-medium">
                  Zero charge for your first 14 days. You can choose your plan in Step 2 and cancel anytime with no penalty.
                </p>
              </div>

              {/* Benefits checklist */}
              <div className="space-y-3 pt-1">
                {[
                  "Full automated payroll calculation & overtime engine",
                  "Automated timesheet anomaly & exception detection queue",
                  "Source-to-gross reconciliation balance ledger",
                  "5-tier Role-Based Access Control (RBAC)",
                  "Cancel anytime during trial with 1-click in settings",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-900 font-semibold">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Corporate Domain Security Note */}
              <div className="p-4 rounded-xl bg-white border-2 border-slate-300 shadow-2xs space-y-1 text-xs">
                <div className="flex items-center gap-2 text-slate-950 font-bold">
                  <ShieldCheck className="w-4 h-4 text-indigo-700" />
                  <span>Corporate Domain Requirement</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed font-medium">
                  To protect sensitive workforce compensation data, workspaces must be registered under your corporate business domain. Personal domains (@gmail.com, @yahoo.com) are blocked.
                </p>
              </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="lg:col-span-7">
              <div className="p-7 sm:p-8 rounded-2xl bg-white border-2 border-slate-300 shadow-md">
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight">
                    Company Account Setup
                  </h2>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    Enter your organization details to provision your dedicated workspace.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Corporate Work Email */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-900 font-mono uppercase">
                        Corporate Work Email
                      </label>
                      <span className="text-[11px] font-mono text-indigo-700 font-bold">
                        Corporate domain required
                      </span>
                    </div>

                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleEmailChange}
                        placeholder="alex@yourcompany.com"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-lg border-2 text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 transition-all font-sans ${
                          emailError
                            ? "border-rose-400 bg-rose-50/40 focus:border-rose-600 focus:ring-rose-500/20"
                            : "border-slate-300 bg-white focus:border-indigo-600 focus:ring-indigo-600/20"
                        }`}
                      />
                    </div>

                    {/* Alert for personal / free email addresses */}
                    {emailError && (
                      <div className="mt-2 p-3 rounded-lg bg-rose-50 border-2 border-rose-300 text-xs font-semibold text-rose-900 flex items-start gap-2.5 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{emailError}</span>
                      </div>
                    )}
                  </div>

                  {/* Company Legal Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                      Company Legal Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={handleCompanyNameChange}
                        placeholder="Acme Technologies Inc."
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Workspace Subdomain Preview */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                      Company Workspace URL
                    </label>
                    <div className="flex items-center rounded-lg border-2 border-slate-300 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-800">
                      <span className="text-indigo-700 font-extrabold">
                        {formData.subdomain || "yourcompany"}
                      </span>
                      <span className="font-semibold">.payrollos.com</span>
                    </div>
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                      Active Employee Count
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-bold text-slate-950 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-sans cursor-pointer"
                    >
                      <option value="1-25">1 – 25 employees (Starter)</option>
                      <option value="26-100">26 – 100 employees (Growth)</option>
                      <option value="101-500">101 – 500 employees (Growth)</option>
                      <option value="500+">500+ employees (Enterprise Scale)</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                      Admin Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Min. 8 characters"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !!emailError}
                      className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Saving Company Details...</span>
                        </>
                      ) : (
                        <>
                          <span>Continue to Step 2: Choose Plan</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Bottom notice */}
                  <div className="pt-1 text-center text-xs font-medium text-slate-600">
                    Step 2 selects your tier, followed by zero-charge billing verification ($0.00 today).
                  </div>

                  {/* Login Link */}
                  <div className="pt-2 text-center text-xs text-slate-700 font-medium border-t border-slate-200">
                    Already registered?{" "}
                    <Link href="/login" className="text-indigo-700 font-bold hover:underline">
                      Log In to Workspace
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
