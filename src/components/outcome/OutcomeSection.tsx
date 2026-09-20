"use client";

import React from "react";
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  Zap, 
  Layers 
} from "lucide-react";
import { engineeringOutcomes } from "@/data/sampleData";

export const OutcomeSection: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Clock className="w-5 h-5 text-indigo-600" />;
      case 1:
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 2:
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <BarChart3 className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>VALUE & IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering Impact
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            By shifting from retrospective spreadsheet reviews to centralized automated calculation and validation, the platform delivers accuracy and efficiency to payroll operations.
          </p>
        </div>

        {/* 4 Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {engineeringOutcomes.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                  {getIcon(idx)}
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 font-sans">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-mono text-slate-500">
                Core Capability
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
