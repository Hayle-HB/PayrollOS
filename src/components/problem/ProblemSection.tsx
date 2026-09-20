"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  Clock,
  DollarSign,
  ArrowRight
} from "lucide-react";
import { formulaVariables } from "@/data/sampleData";

export const ProblemSection: React.FC = () => {
  const [selectedVarId, setSelectedVarId] = useState<string>("multi_pay_rates");

  const activeVar = formulaVariables.find((v) => v.id === selectedVarId) || formulaVariables[0];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium">
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>CALCULATION STRUCTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Payroll Is More Than Hours × Rate
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Payroll calculations require consistent handling of workforce records, compensation rules, overtime, deductions, and adjustments. The system centralizes these calculations and validates inputs before payroll processing.
          </p>
        </div>

        {/* Interactive Formula Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Formula Stack */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider flex items-center justify-between mb-2">
              <span>Payroll Calculation Components</span>
              <span className="text-indigo-600">Select to inspect</span>
            </div>

            <div className="space-y-2">
              {formulaVariables.map((item, index) => {
                const isSelected = selectedVarId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedVarId(item.id)}
                    className={`w-full p-3.5 rounded-xl text-left transition-all duration-150 border flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-indigo-50/70 border-indigo-600 shadow-xs"
                        : "bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected 
                          ? "bg-indigo-600 text-white" 
                          : "bg-white text-slate-600 border border-slate-200"
                      }`}>
                        {index === 0 ? "1" : `+${index + 1}`}
                      </div>

                      <div>
                        <div className="text-sm font-bold text-slate-900 font-sans flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                            {item.tag}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-slate-500 mt-0.5">
                          {item.formula}
                        </div>
                      </div>
                    </div>

                    <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-indigo-600" : "bg-slate-300"}`} />
                  </button>
                );
              })}

              {/* Equals Result Bar */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-white font-mono font-bold text-sm">
                    =
                  </div>
                  <div>
                    <span className="text-sm font-bold font-sans">
                      Payroll Result
                    </span>
                    <p className="text-xs text-slate-300">
                      Validated and reconciled gross-to-net disbursement.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded font-semibold">
                  Validated
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Component Explanation Card */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-700 px-2.5 py-0.5 rounded bg-indigo-100/70 border border-indigo-200">
                    CALCULATION LOGIC
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {activeVar.title}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-700 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Configured Rule</span>
                </span>
              </div>

              {/* Title & Formula */}
              <div className="my-5">
                <h3 className="text-xl font-bold text-slate-900 font-sans mb-2">
                  {activeVar.title}
                </h3>
                <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-xs text-indigo-900">
                  {activeVar.formula}
                </div>
              </div>

              {/* Example & Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
                    Example Scenario
                  </h4>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-800">
                    {activeVar.example}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
                    Calculation Handling
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                    {activeVar.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
