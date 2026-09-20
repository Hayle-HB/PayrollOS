"use client";

import React from "react";
import { 
  Calculator, 
  ShieldCheck, 
  AlertOctagon, 
  Scale, 
  CheckCircle2 
} from "lucide-react";
import { engineeringChallenges } from "@/data/sampleData";

export const EngineeringChallenges: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Calculator className="w-5 h-5 text-indigo-600" />;
      case 1:
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 2:
        return <AlertOctagon className="w-5 h-5 text-amber-600" />;
      default:
        return <Scale className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium">
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>ENGINEERING CHALLENGES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering for Correctness
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Key software engineering considerations addressed in the design and implementation of the payroll engine.
          </p>
        </div>

        {/* 4 Concise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {engineeringChallenges.map((c, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                      {getIcon(idx)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                        {c.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 font-sans">
                        {c.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {c.description}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Architectural Focus</span>
                </span>
                <span>PayrollOS Core</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
