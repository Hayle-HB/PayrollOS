"use client";

import React from "react";
import Link from "next/link";
import { Cpu, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenArchitectureModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenArchitectureModal }) => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-200">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 font-sans">
                Payroll<span className="text-indigo-600">OS</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Enterprise payroll calculation, validation, reconciliation, and workforce reporting infrastructure designed for modern businesses.
            </p>
            <div className="pt-1">
              <Link
                href="/get-started"
                className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                <span>Start your 14-day free trial ➔</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Core Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#engine" className="hover:text-indigo-600 transition-colors">
                  Calculation Engine
                </Link>
              </li>
              <li>
                <Link href="/#exceptions" className="hover:text-indigo-600 transition-colors">
                  Exception Detection
                </Link>
              </li>
              <li>
                <Link href="/#reconciliation" className="hover:text-indigo-600 transition-colors">
                  Payroll Reconciliation
                </Link>
              </li>
              <li>
                <Link href="/#investigation" className="hover:text-indigo-600 transition-colors">
                  Discrepancy Traceback
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Controls & Access */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono mb-3">
              Security & Plans
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/#security" className="hover:text-indigo-600 transition-colors">
                  Role-Based Access Control
                </Link>
              </li>
              <li>
                <Link href="/#analytics" className="hover:text-indigo-600 transition-colors">
                  Workforce Analytics
                </Link>
              </li>
              {onOpenArchitectureModal && (
                <li>
                  <button
                    onClick={onOpenArchitectureModal}
                    className="hover:text-indigo-600 transition-colors flex items-center gap-1 text-indigo-600"
                  >
                    <span>System Architecture</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Company & Access */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono mb-3">
              Account
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-indigo-600 transition-colors font-medium">
                  Company Login
                </Link>
              </li>
              <li>
                <Link href="/get-started" className="hover:text-indigo-600 transition-colors font-medium text-indigo-600">
                  Register Company
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
                  Enterprise Plans
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} PayrollOS Platform Inc. All rights reserved.</span>
            <span>•</span>
            <span>Enterprise Payroll & Workforce Infrastructure.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span>
              Developed by{" "}
              <a
                href="https://linkedin.com/in/haylemeskel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-indigo-600 transition-colors"
              >
                Haylemeskel Bantiyerga
              </a>
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
