"use client";

import React, { useState } from "react";
import { 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ArrowDown, 
  Check 
} from "lucide-react";
import { discrepancyTraceSteps } from "@/data/sampleData";

export const DiscrepancyTimeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2);

  return (
    <section id="investigation" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-medium">
            <Search className="w-3.5 h-3.5 text-rose-600" />
            <span>DISCREPANCY INVESTIGATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trace Payroll Discrepancies to Their Source
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            When calculations do not match expected totals, administrators can trace figures step-by-step from aggregate batch totals down to individual punch timestamps and rate multipliers.
          </p>
        </div>

        {/* Investigation Trace Card */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="font-bold text-slate-900">
                CASE TRACE: OVERTIME VARIANCE (+ $126.00)
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px]">
              Demonstration trace
            </span>
          </div>

          {/* Trace Steps Flow */}
          <div className="p-6 sm:p-8">
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:hidden md:before:block">
              {discrepancyTraceSteps.map((step, idx) => {
                const isSelected = activeStepIndex === idx;
                const isRoot = step.status.includes("Root Cause");
                const isResolved = step.status.includes("Corrected");

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStepIndex(idx)}
                    className="relative pl-0 md:pl-10 cursor-pointer group"
                  >
                    {/* Node Dot */}
                    <div className={`hidden md:flex absolute left-3.5 -translate-x-1/2 top-4 w-4 h-4 rounded-full border items-center justify-center transition-colors ${
                      isRoot
                        ? "bg-rose-500 border-rose-600"
                        : isResolved
                        ? "bg-emerald-500 border-emerald-600"
                        : isSelected
                        ? "bg-indigo-600 border-indigo-700"
                        : "bg-white border-slate-300"
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Step Card */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-white border-indigo-600 shadow-xs"
                        : "bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300"
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-500">
                            {step.level}
                          </span>
                          <span className="text-sm font-bold text-slate-900 font-sans">
                            {step.item}
                          </span>
                        </div>

                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full self-start sm:self-auto ${
                          isRoot
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : isResolved
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}>
                          {step.status}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Takeaway */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Root cause identified and corrected in calculation rules, restoring balance to the payroll run.
              </span>
            </div>
            <span className="text-indigo-700 font-mono font-semibold shrink-0">
              Resolved & Recalculated
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
