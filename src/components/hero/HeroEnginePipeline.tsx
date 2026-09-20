"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  Cpu,
  RefreshCw,
  Clock,
  Layers,
  FileCheck2,
  AlertCircle
} from "lucide-react";
import { heroPipelineNodes, PipelineNode } from "@/data/sampleData";

export const HeroEnginePipeline: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("validation");
  const [activePacketIndex, setActivePacketIndex] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Cycling active packet
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActivePacketIndex((prev) => (prev + 1) % heroPipelineNodes.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const activeNode = heroPipelineNodes.find((n) => n.id === selectedNodeId) || heroPipelineNodes[1];

  const getStatusBadge = (status: PipelineNode["status"]) => {
    switch (status) {
      case "warning":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
          label: "Needs Review",
        };
      case "ready":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "Verified",
        };
      default:
        return {
          bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
          icon: <Clock className="w-3.5 h-3.5 text-indigo-600" />,
          label: "Processed",
        };
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-white border border-slate-200 shadow-elevated overflow-hidden">
        {/* Pipeline Control & Status Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span className="font-semibold text-slate-800">
              PAYROLL WORKFLOW PIPELINE
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-sans">
              Interactive demonstration of calculation stages
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium text-[11px]">
              Demo / Simulated Data
            </span>
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3 h-3 ${isSimulating ? "animate-spin text-indigo-600" : ""}`} />
              <span>{isSimulating ? "Auto-Cycling" : "Paused"}</span>
            </button>
          </div>
        </div>

        {/* 5-Stage Horizontal / Vertical Flow Node Grid */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {heroPipelineNodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const isCurrentPacket = activePacketIndex === index;
              const badge = getStatusBadge(node.status);

              return (
                <div key={node.id} className="relative flex flex-col">
                  {/* Arrow for Desktop */}
                  {index < heroPipelineNodes.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-slate-300">
                      <ChevronRight className={`w-5 h-5 transition-colors ${isCurrentPacket ? "text-indigo-600 font-bold" : "text-slate-300"}`} />
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border relative ${
                      isSelected
                        ? "bg-indigo-50/50 border-indigo-600 shadow-sm"
                        : isCurrentPacket
                        ? "bg-slate-50 border-slate-300"
                        : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {/* Top indicator & step */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold text-slate-500 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                        0{index + 1}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${badge.bg}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xs font-bold font-mono text-slate-900 mb-1">
                      {node.title}
                    </h4>

                    {/* Count */}
                    <div className="text-sm font-bold text-indigo-950 font-mono">
                      {node.countLabel}
                    </div>

                    {/* Detail */}
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-snug line-clamp-2">
                      {node.detail}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Interactive Inspection Details Bar */}
          <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold font-mono text-slate-900">
                    STAGE DETAILS: {activeNode.title}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {activeNode.detail}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-slate-500 self-start sm:self-auto">
                Status: {activeNode.countLabel}
              </span>
            </div>

            {/* Sub-details breakdown */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              {activeNode.subDetails.map((sub, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                  <span>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info tag */}
        <div className="px-6 py-2.5 bg-slate-50/80 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
          <span>Workflow: Time Capture ➔ Validation ➔ Calculation ➔ Exceptions ➔ Reconciliation</span>
          <span className="text-slate-600 font-semibold">Simulated Pipeline Execution</span>
        </div>
      </div>
    </div>
  );
};
