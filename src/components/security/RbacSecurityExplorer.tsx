"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  CheckCircle2, 
  EyeOff, 
  Key 
} from "lucide-react";
import { rbacRoles } from "@/data/sampleData";

export const RbacSecurityExplorer: React.FC = () => {
  const [selectedRoleKey, setSelectedRoleKey] = useState<string>("PAYROLL_SPECIALIST");

  const currentRole = rbacRoles.find((r) => r.role === selectedRoleKey) || rbacRoles[0];

  const getMaskedRate = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "$38.50 / hr (Full Access)";
      case "PAYROLL_SPECIALIST":
        return "$38.50 / hr (Calculate Only)";
      case "HR_MANAGER":
        return "$38.50 / hr (Assigned Dept)";
      case "MANAGER":
        return "•••••••• (Rate Restricted - Hours Only)";
      default:
        return "•••••••• (Restricted)";
    }
  };

  const getMaskedBanking = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Direct Deposit •••••••• 1948";
      case "PAYROLL_SPECIALIST":
        return "Direct Deposit •••••••• 1948";
      case "EMPLOYEE":
        return "Direct Deposit •••••••• 1948 (Self View)";
      default:
        return "•••••••• (Restricted)";
    }
  };

  return (
    <section id="security" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-medium">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            <span>ROLE-BASED ACCESS CONTROL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Protect Sensitive Payroll Information
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Role-based access control and field-level masking ensure that administrators, managers, and employees access only the workforce and compensation records appropriate to their role.
          </p>
        </div>

        {/* Interactive Role Switcher & Masking Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Role Selector */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider mb-2">
              Select Role View
            </div>

            {rbacRoles.map((r) => {
              const isSelected = selectedRoleKey === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => setSelectedRoleKey(r.role)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-white border-indigo-600 shadow-xs"
                      : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {r.role.replace("_", " ")}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <div className="text-xs text-slate-600 leading-snug">
                    {r.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Scoped Record & Permissions Matrix */}
          <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-700 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-200">
                  CURRENT ROLE: {currentRole.role.replace("_", " ")}
                </span>
                <p className="text-xs text-slate-600 mt-1.5">
                  Scope: {currentRole.scope}
                </p>
              </div>

              <span className="text-xs font-mono text-slate-500">
                Demo record: #EMP-10428
              </span>
            </div>

            {/* Field-level masking preview cards */}
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase">Base Pay Rate</span>
                  <div className="text-sm font-bold text-slate-900 mt-1">
                    {getMaskedRate(currentRole.role)}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase">Payment Account Info</span>
                  <div className="text-sm font-bold text-slate-900 mt-1">
                    {getMaskedBanking(currentRole.role)}
                  </div>
                </div>
              </div>

              {/* Permissions List */}
              <div className="pt-3">
                <h4 className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider mb-2.5">
                  Permission Boundaries for {currentRole.title}
                </h4>

                <div className="divide-y divide-slate-100 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                  {currentRole.permissions.map((p, i) => (
                    <div key={i} className="p-3 flex items-center justify-between gap-3">
                      <span className="text-slate-700 font-sans">{p.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        p.access.includes("Full") || p.access.includes("Authorized")
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : p.access.includes("Restricted")
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      }`}>
                        {p.access}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
