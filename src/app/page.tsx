"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProblemSection } from "@/components/problem/ProblemSection";
import { CalculationEngine } from "@/components/calculation/CalculationEngine";
import { ExceptionMonitor } from "@/components/exceptions/ExceptionMonitor";
import { ReconciliationLedger } from "@/components/audit/ReconciliationLedger";
import { DiscrepancyTimeline } from "@/components/investigation/DiscrepancyTimeline";
import { RbacSecurityExplorer } from "@/components/security/RbacSecurityExplorer";
import { AnalyticsReporting } from "@/components/analytics/AnalyticsReporting";
import { ArchitectureDiagram } from "@/components/architecture/ArchitectureDiagram";
import { ArchitectureModal } from "@/components/architecture/ArchitectureModal";
import { EngineeringChallenges } from "@/components/challenges/EngineeringChallenges";
import { OutcomeSection } from "@/components/outcome/OutcomeSection";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";

export default function LandingPage() {
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)} />

      {/* Main Showcase Sections */}
      <main className="flex-1">
        {/* 1. Hero & Simplified 5-Stage Pipeline */}
        <HeroSection onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)} />

        {/* 2. Payroll Is More Than Hours × Rate */}
        <ProblemSection />

        {/* 3. Centralized Payroll Calculation (6 Modular Cards) */}
        <CalculationEngine />

        {/* 4. Catch Payroll Exceptions Before Finalization */}
        <ExceptionMonitor />

        {/* 5. Reconcile Payroll Before Processing */}
        <ReconciliationLedger />

        {/* 6. Trace Payroll Discrepancies to Their Source */}
        <DiscrepancyTimeline />

        {/* 7. Protect Sensitive Payroll Information (RBAC) */}
        <RbacSecurityExplorer />

        {/* 8. Workforce & Payroll Visibility (Analytics) */}
        <AnalyticsReporting />

        {/* 9. System Architecture (5 Tiers) */}
        <ArchitectureDiagram onOpenFullscreenModal={() => setIsArchitectureModalOpen(true)} />

        {/* 10. Engineering for Correctness (4 Concise Challenges) */}
        <EngineeringChallenges />

        {/* 11. Engineering Impact */}
        <OutcomeSection />

        {/* 12. Final Enterprise CTA */}
        <FinalCtaSection onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)} />

      {/* System Architecture Modal */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}
