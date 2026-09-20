"use client";

import React from "react";
import Link from "next/link";
import { 
  GitBranch, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Lock,
  Zap
} from "lucide-react";

interface FinalCtaSectionProps {
  onOpenArchitectureModal?: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenArchitectureModal }) => {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono mb-5">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>ENTERPRISE ONBOARDING</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 font-sans">
            Ready to Modernize Your Enterprise Payroll?
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Automate workforce data calculations, eliminate manual spreadsheet reconciliation, and catch discrepancies before final processing.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all"
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              <span>View Pricing Plans</span>
            </Link>

            {onOpenArchitectureModal && (
              <button
                onClick={onOpenArchitectureModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-semibold text-slate-400 hover:text-white transition-all"
              >
                <GitBranch className="w-4 h-4" />
                <span>Architecture</span>
              </button>
            )}
          </div>

          {/* Core Highlights */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Corporate Setup</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>14-Day Free Evaluation</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>No Credit Card Required</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
