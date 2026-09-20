"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Building2, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  KeyRound,
  AlertTriangle
} from "lucide-react";
import { validateCorporateEmail } from "@/lib/emailValidation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);

    if (val.length > 5 && val.includes("@")) {
      const check = validateCorporateEmail(val);
      if (!check.isValid) {
        setEmailError(check.error || "Please enter a valid company work email.");
      } else {
        setEmailError(null);
        if (!workspaceSlug && check.domain) {
          setWorkspaceSlug(check.domain.split(".")[0].toLowerCase());
        }
      }
    } else {
      setEmailError(null);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const check = validateCorporateEmail(email);
    if (!check.isValid) {
      setEmailError(check.error || "Corporate work email required.");
      return;
    }

    setIsAuthenticating(true);
    setAuthError(null);

    setTimeout(() => {
      setIsAuthenticating(false);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts === 1) {
        setAuthError("Authentication Failed: Email address or password not found in enterprise directory.");
      } else if (newAttempts === 2) {
        setAuthError("Authentication Failed: Invalid workspace credentials (Attempt 2/4). Please verify your password.");
      } else if (newAttempts === 3) {
        setAuthError("Authentication Failed: Workspace access rejected (Attempt 3/4). 1 attempt remaining before security lockout.");
      } else {
        setAuthError("Workspace login failed 4 times. For security, your account access has been restricted. Please contact our support team at contact@payrollos.org.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          <div className="p-7 sm:p-8 rounded-2xl bg-white border-2 border-slate-300 shadow-md space-y-6">
            {/* Card Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-xs">
                <Building2 className="w-6 h-6" />
              </div>

              <h1 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight">
                Company Workspace Login
              </h1>

              <p className="text-xs text-slate-600 font-medium font-sans">
                Sign in to your organization&apos;s PayrollOS portal
              </p>
            </div>

            {/* 4-Attempt Failure / Security Lockout Banner */}
            {failedAttempts >= 4 ? (
              <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-400 text-xs text-rose-950 shadow-xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-rose-950 font-sans">
                      Account Access Restricted (4 Failed Attempts)
                    </h4>
                    <p className="text-xs text-rose-900 leading-relaxed font-medium mt-1">
                      For your organization&apos;s security, automated login is restricted. Please reach out to our enterprise support desk:
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border-2 border-rose-300 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-950">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <span>contact@payrollos.org</span>
                  </div>
                  <a
                    href="mailto:contact@payrollos.org?subject=Workspace%20Login%20Verification%20Assistance"
                    className="px-2.5 py-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            ) : authError ? (
              /* Standard Auth Error */
              <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-xs text-rose-950 flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block text-rose-950">
                    Sign In Error (Attempt {failedAttempts}/4)
                  </span>
                  <span className="text-rose-900 font-medium leading-snug block">
                    {authError}
                  </span>
                </div>
              </div>
            ) : null}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Work Email */}
              <div>
                <label className="block text-xs font-bold text-slate-900 font-mono uppercase mb-1">
                  Corporate Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="name@company.com"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border-2 text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 transition-all font-sans ${
                      emailError
                        ? "border-rose-400 bg-rose-50/40 focus:border-rose-600 focus:ring-rose-500/20"
                        : "border-slate-300 bg-white focus:border-indigo-600 focus:ring-indigo-600/20"
                    }`}
                  />
                </div>

                {emailError && (
                  <div className="mt-2 p-2.5 rounded-lg bg-rose-50 border-2 border-rose-300 text-xs font-semibold text-rose-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                    <span className="leading-snug">{emailError}</span>
                  </div>
                )}
              </div>

              {/* Company Workspace Subdomain */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-900 font-mono uppercase">
                    Workspace Subdomain
                  </label>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    Optional
                  </span>
                </div>
                <div className="flex items-center rounded-lg border-2 border-slate-300 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-800">
                  <input
                    type="text"
                    value={workspaceSlug}
                    onChange={(e) => setWorkspaceSlug(e.target.value.toLowerCase())}
                    placeholder="yourcompany"
                    className="bg-transparent border-none p-0 focus:outline-hidden text-indigo-700 font-extrabold w-full"
                  />
                  <span className="text-slate-600 font-semibold shrink-0">.payrollos.com</span>
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-900 font-mono uppercase">
                    Password
                  </label>
                  <a href="#" className="text-xs font-bold text-indigo-700 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center text-xs text-slate-800 font-medium">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 mr-2"
                />
                <label htmlFor="remember" className="select-none cursor-pointer">
                  Remember this company device for 30 days
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isAuthenticating || !!emailError}
                className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Company Portal</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            {/* Single Sign On Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs font-mono font-bold">
                <span className="bg-white px-2 text-slate-500">OR SIGN IN WITH</span>
              </div>
            </div>

            {/* Corporate SSO options */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAuthError("SSO SAML authentication requires an active Enterprise subscription.")}
                className="p-2.5 rounded-lg border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-bold text-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-4 h-4 text-slate-700" />
                <span>Okta / SAML</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthError("Google Workspace SSO requires administrator configuration.")}
                className="p-2.5 rounded-lg border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-bold text-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-700" />
                <span>Google Workspace</span>
              </button>
            </div>

            {/* Footer link to register */}
            <div className="pt-2 text-center text-xs text-slate-700 font-medium border-t-2 border-slate-200">
              New company?{" "}
              <Link href="/get-started" className="text-indigo-700 font-bold hover:underline">
                Start a 14-day free trial
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
