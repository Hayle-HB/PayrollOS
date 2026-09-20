"use client";

import React, { useState } from "react";
import { 
  X, 
  GitBranch, 
  Server, 
  CheckCircle2, 
  Layers 
} from "lucide-react";
import { architectureTiers } from "@/data/sampleData";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(2);

  if (!isOpen) return null;

  const currentTier = architectureTiers[selectedTierIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                System Architecture Specification
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Modular component breakdown across the 5 system tiers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-slate-50">
          {/* Tier Selection Pills */}
          <div className="flex flex-wrap gap-2">
            {architectureTiers.map((t, i) => (
              <button
                key={t.layer}
                onClick={() => setSelectedTierIndex(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                  selectedTierIndex === i
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                TIER 0{i + 1}
              </button>
            ))}
          </div>

          {/* Selected Tier Card */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-700">
                {currentTier.layer}
              </span>
              <span className="text-xs font-mono text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Architecture Layer</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTier.components.map((c, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <span>{c.name}</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Enterprise Payroll & Workforce Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-semibold transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
