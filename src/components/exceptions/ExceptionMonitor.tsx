"use client";

import React, { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  User, 
  Wrench,
  Check,
  AlertCircle
} from "lucide-react";
import { sampleExceptions } from "@/data/sampleData";

export const ExceptionMonitor: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("EX-1082");
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const selectedException = sampleExceptions.find((e) => e.id === selectedId) || sampleExceptions[0];

  const handleResolve = (id: string) => {
    if (!resolvedIds.includes(id)) {
      setResolvedIds([...resolvedIds, id]);
    }
  };

  return (
    <section id="exceptions" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>EXCEPTION DETECTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Catch Payroll Exceptions Before Finalization
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Surfaces missing records, duplicate entries, incorrect rates, and calculation mismatches during pre-payroll validation so discrepancies are resolved before final processing.
          </p>
        </div>

        {/* Exception Queue & Inspection Console */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 shadow-sm overflow-hidden">
          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-800 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>SIMULATED EXCEPTION QUEUE (4 FLAGGED)</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px]">
              Demonstration data
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Exception Queue List */}
            <div className="lg:col-span-5 border-r border-slate-200 p-4 space-y-2 max-h-[500px] overflow-y-auto bg-slate-50">
              <div className="text-[11px] font-mono text-slate-500 font-semibold px-2 py-1 flex items-center justify-between">
                <span>INCIDENT ID</span>
                <span>VARIANCE</span>
              </div>

              {sampleExceptions.map((item) => {
                const isSelected = selectedId === item.id;
                const isResolved = resolvedIds.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 ${
                      isSelected
                        ? "bg-white border-indigo-600 shadow-xs"
                        : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-slate-700">
                        {item.id} • {item.employeeId}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isResolved
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : item.severity === "high"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {isResolved ? "Resolved" : item.severity}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-slate-900 truncate mb-1">
                      {item.category}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                      <span>{item.employeeName}</span>
                      <span className={item.variance > 0 ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"}>
                        {item.variance > 0 ? `+$${item.variance.toFixed(2)}` : `-$${Math.abs(item.variance).toFixed(2)}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Detailed Card */}
            <div className="lg:col-span-7 p-6 sm:p-7 bg-white flex flex-col justify-between">
              <div className="space-y-5">
                {/* Top header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono font-bold">
                        {selectedException.id}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 font-sans">
                        {selectedException.category}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Employee: {selectedException.employeeName} ({selectedException.employeeId}) — {selectedException.department}
                    </p>
                  </div>

                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                    resolvedIds.includes(selectedException.id) 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {resolvedIds.includes(selectedException.id) ? "Resolved" : selectedException.status}
                  </span>
                </div>

                {/* Variance Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase">Expected</span>
                    <span className="text-lg font-bold text-slate-800">
                      ${selectedException.expected.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase">Calculated</span>
                    <span className="text-lg font-bold text-rose-600">
                      ${selectedException.calculated.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase">Variance</span>
                    <span className="text-lg font-bold text-amber-700">
                      {selectedException.variance > 0 ? `+$${selectedException.variance.toFixed(2)}` : `-$${Math.abs(selectedException.variance).toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* Cause and Resolution */}
                <div className="space-y-3 text-xs">
                  <div>
                    <h4 className="font-mono text-slate-500 font-semibold uppercase tracking-wider mb-1">
                      Issue Description
                    </h4>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                      {selectedException.source}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-slate-500 font-semibold uppercase tracking-wider mb-1">
                      Resolution Method
                    </h4>
                    <p className="text-slate-700 bg-indigo-50/60 p-3 rounded-lg border border-indigo-100 leading-relaxed">
                      {selectedException.resolution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Detected during pre-payroll validation
                </span>
                <button
                  onClick={() => handleResolve(selectedException.id)}
                  disabled={resolvedIds.includes(selectedException.id)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    resolvedIds.includes(selectedException.id)
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                  }`}
                >
                  {resolvedIds.includes(selectedException.id) ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Correction Recorded</span>
                    </>
                  ) : (
                    <>
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Record Correction</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
