"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Cpu, 
  Scale, 
  AlertOctagon, 
  ArrowRight, 
  GitBranch, 
  CheckCircle, 
  Lock,
  Calculator
} from "lucide-react";
import { HeroEnginePipeline } from "./HeroEnginePipeline";

interface HeroSectionProps {
  onOpenArchitectureModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenArchitectureModal }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-slate-50">
      {/* Light background grid */}
      <div className="absolute inset-0 bg-grid-light opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header content */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-slate-700 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span className="font-semibold text-slate-900">ENTERPRISE PAYROLL INFRASTRUCTURE</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Automated Workforce Operations</span>
          </div>

          {/* Primary Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Engineered for Accurate,{" "}
            <span className="text-indigo-600">
              Automated Payroll Processing.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            Automate workforce data validation, payroll calculations, exception detection, reconciliation, and reporting through a centralized payroll workflow.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all group"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              onClick={onOpenArchitectureModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition-all"
            >
              <GitBranch className="w-4 h-4 text-indigo-600" />
              <span>View System Architecture</span>
            </button>
          </div>

          {/* Capability Indicators */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Automated Validation</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
              <Calculator className="w-3.5 h-3.5 text-indigo-600" />
              <span>Payroll Calculation</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
              <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
              <span>Exception Detection</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>Audit & Reconciliation</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-slate-700" />
              <span>RBAC</span>
            </div>
          </div>
        </div>

        {/* Hero Visual: The Pipeline */}
        <div className="mt-12 lg:mt-14">
          <HeroEnginePipeline />
        </div>
      </div>
    </section>
  );
};
