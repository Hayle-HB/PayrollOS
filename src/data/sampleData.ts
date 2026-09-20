export interface PipelineNode {
  id: string;
  step: string;
  title: string;
  countLabel: string;
  status: "success" | "warning" | "error" | "processing" | "ready";
  detail: string;
  subDetails: string[];
}

export const heroPipelineNodes: PipelineNode[] = [
  {
    id: "time_records",
    step: "01",
    title: "TIME RECORDS",
    countLabel: "1,284 time records",
    status: "processing",
    detail: "Workforce hours and attendance entries ingested into staging",
    subDetails: ["Standard Shifts: 1,120", "Overnight Spans: 114", "Split Shifts: 50"],
  },
  {
    id: "validation",
    step: "02",
    title: "VALIDATION",
    countLabel: "17 exceptions flagged",
    status: "warning",
    detail: "Missing punches, overlapping entries, and duplicate records surfaced",
    subDetails: ["9 Missing Punch Out", "5 Unapproved Overtime", "3 Overlapping Entries"],
  },
  {
    id: "payroll_calculation",
    step: "03",
    title: "PAYROLL CALCULATION",
    countLabel: "Calculation completed",
    status: "processing",
    detail: "Regular pay, overtime rules, allowances, and deductions calculated",
    subDetails: ["Base & Weighted Overtime", "Configured Deductions", "Shift Differentials"],
  },
  {
    id: "exception_detection",
    step: "04",
    title: "EXCEPTION DETECTION",
    countLabel: "4 discrepancies detected",
    status: "warning",
    detail: "Rate mismatches and calculation variances queued for review",
    subDetails: ["1 Rate Mismatch", "1 Overtime Variance", "2 Deduction Limits"],
  },
  {
    id: "reconciliation",
    step: "05",
    title: "RECONCILIATION",
    countLabel: "Reconciliation completed",
    status: "ready",
    detail: "Source hours compared against calculated payroll earnings",
    subDetails: ["Source Hours: 51,360.5h", "Calculated Hours: 51,360.5h", "Status: Validated"],
  },
];

export const formulaVariables = [
  {
    id: "regular_pay",
    title: "Regular Pay",
    formula: "Base Rate × Approved Regular Hours",
    example: "40.0h × $32.00/h = $1,280.00",
    description: "Calculates standard earnings from recorded workforce hours and assigned base pay rates.",
    tag: "Standard",
  },
  {
    id: "overtime",
    title: "Overtime",
    formula: "Configured Overtime Multipliers (e.g., 1.5x / 2.0x)",
    example: "8.0h OT × ($32.00 × 1.5) = $384.00",
    description: "Evaluates overtime thresholds based on configured daily or weekly payroll rules.",
    tag: "Configured Rules",
  },
  {
    id: "multi_pay_rates",
    title: "Multiple Pay Rates",
    formula: "Σ (Shift Hours × Shift Rate) with Blended Overtime",
    example: "24h @ $30.00/h + 16h @ $38.00/h (Weighted Base: $33.20/h)",
    description: "Handles employees working multiple roles or shifts at varying wage rates in the same pay cycle.",
    tag: "Rate Blending",
  },
  {
    id: "allowances",
    title: "Allowances & Differentials",
    formula: "Shift Differentials + Configured Stipends",
    example: "Night Differential (16h × $2.50) + $50 Stipend = $90.00",
    description: "Applies non-standard pay additions, shift premiums, and employee allowances.",
    tag: "Additions",
  },
  {
    id: "deductions",
    title: "Deductions",
    formula: "Pre-Tax Deductions + Post-Tax Deductions",
    example: "-$120.00 Retirement - $45.00 Benefits = -$165.00",
    description: "Applies voluntary and statutory benefit deductions against gross earnings.",
    tag: "Reductions",
  },
  {
    id: "adjustments",
    title: "Adjustments",
    formula: "Prior Period Corrections + Mid-Cycle Updates",
    example: "+$75.00 Prior Period Underpayment Correction",
    description: "Accommodates retroactive adjustments, compensation revisions, and manual corrections.",
    tag: "Adjustments",
  },
];

export const calculationCards = [
  {
    id: "regular-pay",
    title: "Regular Pay",
    desc: "Calculates compensation from approved workforce hours and applicable pay rates.",
    details: "Validates base hourly and salaried rates against recorded shift durations.",
  },
  {
    id: "overtime",
    title: "Overtime",
    desc: "Handles overtime calculations based on configured payroll rules.",
    details: "Evaluates daily and weekly hour thresholds to determine applicable overtime multipliers.",
  },
  {
    id: "multiple-pay-rates",
    title: "Multiple Pay Rates",
    desc: "Supports employees working under different rates or compensation structures.",
    details: "Calculates weighted average rates when employees perform multiple roles across a pay period.",
  },
  {
    id: "allowances-deductions",
    title: "Allowances & Deductions",
    desc: "Applies configurable additions and deductions during payroll calculation.",
    details: "Processes pre-tax and post-tax deductions alongside recurring employee allowances.",
  },
  {
    id: "compensation-changes",
    title: "Compensation Changes",
    desc: "Handles changes to employee compensation records and related payroll adjustments.",
    details: "Applies effective-dated wage adjustments with proration for mid-cycle changes.",
  },
  {
    id: "adjustments",
    title: "Adjustments",
    desc: "Supports corrections and payroll adjustments before finalization.",
    details: "Incorporates retroactive corrections, one-time stipends, and payroll adjustments.",
  },
];

export const sampleExceptions = [
  {
    id: "EX-1082",
    employeeId: "EMP-10428",
    employeeName: "Elena Rostova",
    department: "Logistics Operations",
    category: "Overtime Calculation Mismatch",
    severity: "high",
    expected: 486.00,
    calculated: 612.00,
    variance: 126.00,
    source: "Overtime rate was calculated using an incorrect unapproved shift premium multiplier.",
    resolution: "Update shift rate mapping to standard overtime rate and recalculate.",
    status: "Needs Review",
  },
  {
    id: "EX-1083",
    employeeId: "EMP-09214",
    employeeName: "Marcus Vance",
    department: "Engineering",
    category: "Mid-Cycle Rate Change",
    severity: "medium",
    expected: 2450.00,
    calculated: 2310.00,
    variance: -140.00,
    source: "Promotion effective date was not applied to hours worked during the second half of the pay period.",
    resolution: "Prorate 20 hours at initial rate and 20 hours at updated rate.",
    status: "Needs Review",
  },
  {
    id: "EX-1084",
    employeeId: "EMP-11059",
    employeeName: "Devon Chen",
    department: "Operations",
    category: "Missing Time Record (Punch Out)",
    severity: "high",
    expected: 280.00,
    calculated: 840.00,
    variance: 560.00,
    source: "Missing clock-out record resulted in unbounded shift duration calculation.",
    resolution: "Require manager punch correction before finalizing timesheet.",
    status: "Escalated to Manager",
  },
  {
    id: "EX-1085",
    employeeId: "EMP-08341",
    employeeName: "Sarah Jenkins",
    department: "Healthcare",
    category: "Duplicate Time Entry",
    severity: "medium",
    expected: 1600.00,
    calculated: 1920.00,
    variance: 320.00,
    source: "Duplicate shift entry recorded across mobile check-in and terminal punch.",
    resolution: "Merge duplicate entries and remove overlapping timestamp.",
    status: "Needs Review",
  },
];

export const reconciliationSummary = {
  timeRecords: "51,360.5h",
  calculatedHours: "51,360.5h",
  regularEarnings: "$1,540,815",
  overtimeEarnings: "$215,712",
  deductions: "-$168,449",
  payrollTotal: "$1,588,078",
  status: "VALIDATED",
  note: "Reconciliation verified: total source hours match calculated payroll hours exactly.",
};

export const discrepancyTraceSteps = [
  {
    level: "1. Payroll Total",
    item: "Batch Total Check",
    detail: "Identified a $126.00 variance between expected department total and calculated payroll gross.",
    status: "Variance Detected",
  },
  {
    level: "2. Employee Earnings",
    item: "Employee #EMP-10428 Gross Pay",
    detail: "Elena Rostova's earnings calculated at $612.00 vs expected $486.00 for overtime component.",
    status: "Employee Isolated",
  },
  {
    level: "3. Pay Rate Verification",
    item: "Job Code & Shift Multipliers",
    detail: "Base rate verified at $27.00/h. A custom 2.0x multiplier was applied instead of standard 1.5x.",
    status: "Root Cause Found",
  },
  {
    level: "4. Hours Worked Audit",
    item: "Timesheet Shift Logs",
    detail: "40 regular hours and 12 overtime hours confirmed from approved punch timestamps.",
    status: "Hours Verified",
  },
  {
    level: "5. Source Time Record & Resolution",
    item: "Recalculation & Correction",
    detail: "Applied standard 1.5x overtime multiplier ($40.50/h × 12h = $486.00). Variance resolved (+$0.00).",
    status: "Corrected & Balanced",
  },
];

export const rbacRoles = [
  {
    role: "ADMIN",
    title: "System Administrator",
    scope: "Full system configuration, employee records, and payroll finalization.",
    permissions: [
      { name: "Payroll Rules & Configuration", access: "Full Access" },
      { name: "Employee Records & Profiles", access: "Full Access" },
      { name: "Compensation Details", access: "Full Access" },
      { name: "Payroll Finalization", access: "Authorized" },
      { name: "System Reports & Audit Logs", access: "Full Access" },
    ],
  },
  {
    role: "PAYROLL_SPECIALIST",
    title: "Payroll Operations Specialist",
    scope: "Manages payroll runs, validates timesheets, and resolves calculation exceptions.",
    permissions: [
      { name: "Payroll Rules & Configuration", access: "Read Only" },
      { name: "Employee Records & Profiles", access: "Read Only" },
      { name: "Compensation Details", access: "Read & Calculate" },
      { name: "Payroll Finalization", access: "Submit for Approval" },
      { name: "System Reports & Audit Logs", access: "Payroll Reports Only" },
    ],
  },
  {
    role: "HR_MANAGER",
    title: "HR Manager",
    scope: "Oversees employee compensation changes, department allocations, and leave policies.",
    permissions: [
      { name: "Payroll Rules & Configuration", access: "Read Only" },
      { name: "Employee Records & Profiles", access: "Read & Edit Profiles" },
      { name: "Compensation Details", access: "Assigned Department Only" },
      { name: "Payroll Finalization", access: "Restricted" },
      { name: "System Reports & Audit Logs", access: "HR Reports Only" },
    ],
  },
  {
    role: "MANAGER",
    title: "Department / Team Manager",
    scope: "Reviews team attendance, approves timesheets, and inspects team labor hours.",
    permissions: [
      { name: "Payroll Rules & Configuration", access: "Restricted" },
      { name: "Employee Records & Profiles", access: "Direct Reports Only" },
      { name: "Compensation Details", access: "Restricted (Hours Only)" },
      { name: "Payroll Finalization", access: "Restricted" },
      { name: "System Reports & Audit Logs", access: "Team Attendance Only" },
    ],
  },
  {
    role: "EMPLOYEE",
    title: "Individual Contributor",
    scope: "Self-service access to personal timesheets, leave requests, and pay summaries.",
    permissions: [
      { name: "Payroll Rules & Configuration", access: "Restricted" },
      { name: "Employee Records & Profiles", access: "Own Profile Only" },
      { name: "Compensation Details", access: "Own Paystub Only" },
      { name: "Payroll Finalization", access: "Restricted" },
      { name: "System Reports & Audit Logs", access: "Own Records Only" },
    ],
  },
];

export const architectureTiers = [
  {
    layer: "01. CLIENT LAYER",
    components: [
      { name: "Web Application", desc: "Responsive administrative interface for time tracking, payroll review, and reporting." },
      { name: "Manager & Employee Views", desc: "Role-scoped portals for timesheet approvals, leave requests, and pay stub inspection." },
    ],
  },
  {
    layer: "02. API LAYER",
    components: [
      { name: "Payroll API", desc: "REST endpoints orchestrating payroll calculation workflows, adjustments, and approvals." },
      { name: "Workforce API", desc: "Ingestion and validation endpoints for time punches, attendance, and shift schedules." },
      { name: "Reporting API", desc: "Data extraction endpoints powering payroll summaries, labor analytics, and export files." },
    ],
  },
  {
    layer: "03. BUSINESS LOGIC",
    components: [
      { name: "Payroll Calculation", desc: "Deterministic calculation engine processing regular pay, overtime, and deductions." },
      { name: "Validation Service", desc: "Pre-calculation rule engine catching missing punches, duplicates, and invalid rates." },
      { name: "Exception Detection", desc: "Surfaces calculation anomalies, unexpected overtime, and rate discrepancies." },
      { name: "Reconciliation Service", desc: "Compares source hours against calculated gross earnings to verify balance." },
    ],
  },
  {
    layer: "04. DATA LAYER",
    components: [
      { name: "Employee Records", desc: "Stores employee profile data, departmental cost centers, and tax profiles." },
      { name: "Time Records", desc: "Maintains raw and validated timesheet entries, punch logs, and attendance." },
      { name: "Compensation Records", desc: "Stores base pay rates, shift differentials, and historical wage revisions." },
      { name: "Payroll Records", desc: "Historical payroll calculation runs, line item summaries, and reconciliation logs." },
    ],
  },
  {
    layer: "05. REPORTING",
    components: [
      { name: "Payroll Reports", desc: "Aggregated summaries of gross earnings, deductions, and net payouts by pay period." },
      { name: "Workforce Analytics", desc: "Operational reporting on labor hours, overtime trends, and attendance patterns." },
      { name: "Reconciliation Reports", desc: "Detailed audit logs matching source timesheets against final payroll lines." },
    ],
  },
];

export const engineeringChallenges = [
  {
    title: "Complex Business Rules",
    category: "Business Logic",
    summary: "Managing multi-rate tiers, allowances, deductions, and adjustments consistently.",
    description: "Payroll calculations must account for regular hours, overtime thresholds, multiple hourly pay rates, allowances, deductions, and retroactive adjustments without calculation drift.",
  },
  {
    title: "Data Validation",
    category: "Data Integrity",
    summary: "Preventing incomplete or inconsistent workforce records from affecting payroll.",
    description: "Workforce inputs often contain missing clock-out records, duplicate entries, or unapproved hours. The validation engine flags anomalies before calculation starts.",
  },
  {
    title: "Exception Handling",
    category: "Operational Reliability",
    summary: "Identifying and surfacing calculation mismatches prior to finalization.",
    description: "Unexpected variances between expected rates and calculated earnings are automatically surfaced in a dedicated review queue for administrator verification.",
  },
  {
    title: "Reconciliation & Auditability",
    category: "System Correctness",
    summary: "Ensuring every calculated payroll figure is traceable to source records.",
    description: "Reconciliation compares source workforce hours against calculated earnings, providing transparent lineage from the final payroll total back to individual time punches.",
  },
];

export const engineeringOutcomes = [
  {
    title: "Reduced Manual Reconciliation",
    desc: "Automated validation and reconciliation workflows reduce repetitive manual spreadsheet comparisons.",
  },
  {
    title: "Improved Payroll Accuracy",
    desc: "Validation and exception detection help identify inconsistencies before payroll finalization.",
  },
  {
    title: "Better Data Integrity",
    desc: "Centralized employee and compensation records maintain consistency across the entire organization.",
  },
  {
    title: "Operational Visibility",
    desc: "Reports and analytics provide actionable visibility into labor hours, overtime trends, and payroll costs.",
  },
];
