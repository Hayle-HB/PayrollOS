"use client";

import React from "react";
import { 
  Scale, 
  CheckCircle2, 
  FileSpreadsheet, 
  Clock, 
  DollarSign, 
  Layers 
} from "lucide-react";
import { reconciliationSummary } from "@/data/sampleData";

export const ReconciliationLedger: React.FC = () => {
  return (
    <section id="reconciliation" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-medium">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>AUDIT & RECONCILIATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reconcile Payroll Before Processing
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Reconciliation compares raw source workforce hours against calculated payroll earnings, deductions, and totals to verify that all figures align prior to final processing.
          </p>
        </div>

        {/* Clean Master Summary Sheet */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  PAYROLL RECONCILIATION SUMMARY
                </span>
                <span className="text-slate-500 text-[11px]">
                  Comparison of source timesheets vs calculated gross earnings
                </span>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px]">
              Demo data
            </span>
          </div>

          {/* Key Metrics Comparison Cards */}
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono bg-slate-50/50">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block text-[10px] uppercase">Time Records</span>
              <span className="text-base font-bold text-slate-900 mt-0.5 block">
                {reconciliationSummary.timeRecords}
              </span>
              <span className="text-[10px] text-emerald-600 block mt-1">Source Recorded</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block text-[10px] uppercase">Calculated Hours</span>
              <span className="text-base font-bold text-indigo-900 mt-0.5 block">
                {reconciliationSummary.calculatedHours}
              </span>
              <span className="text-[10px] text-emerald-600 block mt-1">Matched 100%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block text-[10px] uppercase">Regular Earnings</span>
              <span className="text-base font-bold text-slate-900 mt-0.5 block">
                {reconciliationSummary.regularEarnings}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Base Wages</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block text-[10px] uppercase">Overtime</span>
              <span className="text-base font-bold text-slate-900 mt-0.5 block">
                {reconciliationSummary.overtimeEarnings}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Tier Multipliers</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block text-[10px] uppercase">Deductions</span>
              <span className="text-base font-bold text-rose-600 mt-0.5 block">
                {reconciliationSummary.deductions}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Pre & Post Tax</span>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200">
              <span className="text-indigo-900 block text-[10px] uppercase font-bold">Payroll Total</span>
              <span className="text-base font-bold text-indigo-950 mt-0.5 block">
                {reconciliationSummary.payrollTotal}
              </span>
              <span className="text-[10px] text-indigo-700 block mt-1">Net Calculated</span>
            </div>
          </div>

          {/* Validation Status Footer */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-sans">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{reconciliationSummary.note}</span>
            </div>

            <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-xs">
              STATUS: {reconciliationSummary.status}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
