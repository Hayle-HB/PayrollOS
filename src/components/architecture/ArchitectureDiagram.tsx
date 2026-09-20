"use client";

import React, { useState } from "react";
import { 
  GitBranch, 
  Server, 
  ArrowDown, 
  Maximize2, 
  CheckCircle2 
} from "lucide-react";
import { architectureTiers } from "@/data/sampleData";

interface ArchitectureDiagramProps {
  onOpenFullscreenModal?: () => void;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ onOpenFullscreenModal }) => {
  const [selectedComponent, setSelectedComponent] = useState<{ name: string; desc: string } | null>({
    name: "Payroll Calculation",
    desc: "Deterministic calculation engine processing regular pay, overtime, and deductions.",
  });

  return (
    <section id="architecture" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-medium">
            <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
            <span>SYSTEM ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed as a Reliable Payroll Processing System
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A clean modular architecture separating client interfaces, API routing, payroll business logic, data models, and operational reporting.
          </p>
        </div>

        {/* The Architecture Canvas Card */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  LAYERED COMPONENT TOPOLOGY
                </span>
                <span className="text-slate-500 text-[11px]">
                  Click any subsystem block to view its responsibilities
                </span>
              </div>
            </div>

            {onOpenFullscreenModal && (
              <button
                onClick={onOpenFullscreenModal}
                className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Expand Full Blueprint</span>
              </button>
            )}
          </div>

          {/* Architecture Layers Flow */}
          <div className="p-6 sm:p-8 space-y-5 bg-slate-50/50">
            {architectureTiers.map((tier, tierIdx) => (
              <div key={tier.layer} className="space-y-2.5">
                {/* Layer Title */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                    {tier.layer}
                  </span>
                </div>

                {/* Component Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {tier.components.map((comp) => {
                    const isSelected = selectedComponent?.name === comp.name;
                    return (
                      <button
                        key={comp.name}
                        onClick={() => setSelectedComponent(comp)}
                        className={`p-4 rounded-xl text-left border transition-all duration-150 flex flex-col justify-between ${
                          isSelected
                            ? "bg-indigo-50/80 border-indigo-600 shadow-xs"
                            : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold font-mono text-slate-900 mb-1">
                            {comp.name}
                          </h4>
                          <p className="text-xs text-slate-600 leading-snug line-clamp-2">
                            {comp.desc}
                          </p>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                          {isSelected ? "Inspecting" : "Select to inspect"}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Downward connector */}
                {tierIdx < architectureTiers.length - 1 && (
                  <div className="flex items-center justify-center pt-1 text-slate-300">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Inspector footer banner */}
          {selectedComponent && (
            <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-mono text-[11px] block">
                  SELECTED COMPONENT:
                </span>
                <span className="font-bold text-slate-900 text-sm font-sans">
                  {selectedComponent.name}
                </span>
                <p className="text-slate-600 mt-0.5 font-sans">
                  {selectedComponent.desc}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-[11px] shrink-0 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Modular Integration</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
