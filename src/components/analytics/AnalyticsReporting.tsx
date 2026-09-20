"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Clock, 
  DollarSign, 
  Users,
  Calendar
} from "lucide-react";

export const AnalyticsReporting: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const laborData = [
    { day: "Mon", regular: 840, ot: 45 },
    { day: "Tue", regular: 860, ot: 62 },
    { day: "Wed", regular: 855, ot: 58 },
    { day: "Thu", regular: 870, ot: 94 },
    { day: "Fri", regular: 845, ot: 112 },
    { day: "Sat", regular: 320, ot: 140 },
    { day: "Sun", regular: 180, ot: 88 },
  ];

  const compensationSlices = [
    { label: "Base Regular Wages", pct: 72, color: "bg-indigo-600", text: "text-indigo-700" },
    { label: "Overtime Premiums", pct: 14, color: "bg-amber-500", text: "text-amber-700" },
    { label: "Shift Differentials", pct: 8, color: "bg-blue-500", text: "text-blue-700" },
    { label: "Allowances & Stipends", pct: 6, color: "bg-emerald-500", text: "text-emerald-700" },
  ];

  return (
    <section id="analytics" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>REPORTING & ANALYTICS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Workforce & Payroll Visibility
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Operational summaries and reporting previews provide visibility into workforce labor hours, overtime trends, attendance, and payroll costs across cycles.
          </p>
        </div>

        {/* 4 Analytics Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Labor Hours (Stacked Bar Chart) */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-sans">
                      Labor Hours by Shift
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Regular vs Overtime hours per day
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-700 font-bold">
                  4,770 Total Hrs
                </span>
              </div>

              {/* Bar Chart Visual */}
              <div className="h-44 flex items-end justify-between gap-2 pt-2 px-1">
                {laborData.map((d, i) => {
                  const regHeight = (d.regular / 1000) * 90;
                  const otHeight = (d.ot / 200) * 35;

                  return (
                    <div
                      key={d.day}
                      onMouseEnter={() => setHoveredDay(i)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
                    >
                      <div className="w-full flex flex-col items-center gap-0.5 relative">
                        {hoveredDay === i && (
                          <div className="absolute -top-10 z-20 px-2 py-1 rounded bg-slate-900 text-[10px] font-mono text-white shadow-md whitespace-nowrap">
                            Reg: {d.regular}h | OT: {d.ot}h
                          </div>
                        )}
                        <div
                          style={{ height: `${otHeight}px` }}
                          className="w-full max-w-[24px] rounded-t-xs bg-amber-500 transition-all"
                        />
                        <div
                          style={{ height: `${regHeight}px` }}
                          className="w-full max-w-[24px] rounded-b-xs bg-indigo-600 transition-all"
                        />
                      </div>
                      <span className="text-[11px] font-mono text-slate-600">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-xs bg-indigo-600" />
                  <span>Regular (87%)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-xs bg-amber-500" />
                  <span>Overtime (13%)</span>
                </span>
              </div>
              <span>Sample Period W-38</span>
            </div>
          </div>

          {/* Card 2: Overtime Trends (Line Chart) */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-sans">
                      Overtime Trend
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Rolling 6-week overtime hours
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-amber-700 font-bold">
                  Avg: 441h / cycle
                </span>
              </div>

              {/* Line Chart SVG */}
              <div className="h-44 relative flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 110">
                  <defs>
                    <linearGradient id="dayOtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="20" x2="300" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="0" y1="55" x2="300" y2="55" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="300" y2="90" stroke="#E2E8F0" strokeDasharray="3 3" />

                  <polygon
                    points="0,55 60,40 120,65 180,15 240,50 300,70 300,110 0,110"
                    fill="url(#dayOtGrad)"
                  />

                  <polyline
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    points="0,55 60,40 120,65 180,15 240,50 300,70"
                  />

                  {[
                    { cx: 0, cy: 55 },
                    { cx: 60, cy: 40 },
                    { cx: 120, cy: 65 },
                    { cx: 180, cy: 15 },
                    { cx: 240, cy: 50 },
                    { cx: 300, cy: 70 },
                  ].map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.cx}
                      cy={pt.cy}
                      r="3.5"
                      className="fill-white stroke-amber-600 stroke-2"
                    />
                  ))}
                </svg>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Weeks 1–6</span>
              <span className="text-slate-700 font-semibold">Tracked by department</span>
            </div>
          </div>

          {/* Card 3: Payroll Cost Trajectory (Area Chart) */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-sans">
                      Payroll Cost Distribution
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Total gross payroll by pay period
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-700 font-bold">
                  $1.58M Current
                </span>
              </div>

              {/* Area SVG */}
              <div className="h-44 relative flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 110">
                  <defs>
                    <linearGradient id="dayCostGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="300" y2="30" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="0" y1="70" x2="300" y2="70" stroke="#E2E8F0" strokeDasharray="3 3" />

                  <polygon
                    points="0,75 60,60 120,45 180,50 240,30 300,20 300,110 0,110"
                    fill="url(#dayCostGrad)"
                  />

                  <polyline
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    points="0,75 60,60 120,45 180,50 240,30 300,20"
                  />

                  {[
                    { cx: 0, cy: 75 },
                    { cx: 60, cy: 60 },
                    { cx: 120, cy: 45 },
                    { cx: 180, cy: 50 },
                    { cx: 240, cy: 30 },
                    { cx: 300, cy: 20 },
                  ].map((p, i) => (
                    <circle
                      key={i}
                      cx={p.cx}
                      cy={p.cy}
                      r="3.5"
                      className="fill-white stroke-emerald-600 stroke-2"
                    />
                  ))}
                </svg>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Gross Wages Trend</span>
              <span className="text-emerald-700 font-semibold">Balanced vs Budget</span>
            </div>
          </div>

          {/* Card 4: Attendance & Compensation Allocation */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-sans">
                      Compensation Allocation
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Breakdown by wage category
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-700 font-bold">
                  100% Accounted
                </span>
              </div>

              {/* Progress stack */}
              <div className="space-y-4 pt-1">
                <div className="h-5 w-full rounded-md overflow-hidden flex bg-slate-200">
                  <div style={{ width: "72%" }} className="bg-indigo-600 h-full" />
                  <div style={{ width: "14%" }} className="bg-amber-500 h-full" />
                  <div style={{ width: "8%" }} className="bg-blue-500 h-full" />
                  <div style={{ width: "6%" }} className="bg-emerald-500 h-full" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {compensationSlices.map((s, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-xs ${s.color}`} />
                        <span className="text-slate-700 text-[11px] font-sans truncate">{s.label}</span>
                      </div>
                      <span className={`font-bold ${s.text}`}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Categorical Ratio</span>
              <span className="text-indigo-700 font-semibold">General Ledger Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
