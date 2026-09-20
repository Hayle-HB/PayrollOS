"use client";

import React from "react";
import { 
  Clock, 
  TrendingUp, 
  Layers, 
  DollarSign, 
  FileCheck, 
  RotateCcw,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { calculationCards } from "@/data/sampleData";

export const CalculationEngine: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case "regular-pay":
        return <Clock className="w-5 h-5 text-indigo-600" />;
      case "overtime":
        return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      case "multiple-pay-rates":
        return <Layers className="w-5 h-5 text-indigo-600" />;
      case "allowances-deductions":
        return <DollarSign className="w-5 h-5 text-indigo-600" />;
      case "compensation-changes":
        return <FileCheck className="w-5 h-5 text-indigo-600" />;
      default:
        return <RotateCcw className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <section id="engine" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-medium">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>PAYROLL ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Centralized Payroll Calculation
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Centralizes and evaluates regular pay, overtime, multiple pay rates, allowances, deductions, and adjustments prior to final payroll review.
          </p>
        </div>

        {/* 6 Clean Calculation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {calculationCards.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                    {getIcon(card.id)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 font-medium px-2 py-0.5 rounded bg-slate-100">
                    Rule Module
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 font-sans">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-sans">
                {card.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
