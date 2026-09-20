"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Cpu, 
  Menu, 
  X, 
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Building2,
  Lock
} from "lucide-react";

interface NavbarProps {
  onOpenArchitectureModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenArchitectureModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Platform", href: "/#engine" },
    { name: "Exceptions", href: "/#exceptions" },
    { name: "Reconciliation", href: "/#reconciliation" },
    { name: "Security", href: "/#security" },
    { name: "Analytics", href: "/#analytics" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled || pathname !== "/"
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-3"
          : "bg-white/80 backdrop-blur-xs border-b border-slate-200/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Commercial Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 font-sans">
                  Payroll<span className="text-indigo-600">OS</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-tight hidden sm:block">
                Workforce & Payroll Infrastructure
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                    isActive
                      ? "bg-white text-indigo-700 font-semibold shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {onOpenArchitectureModal && (
              <button
                onClick={onOpenArchitectureModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs hover:text-slate-900 transition-all"
              >
                <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
                <span>Architecture</span>
              </button>
            )}

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              <span>Log In</span>
            </Link>

            <Link
              href="/get-started"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm rounded-lg transition-all"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-xl animate-in fade-in duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                >
                  <span>Company Log In</span>
                </Link>
                <Link
                  href="/get-started"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm rounded-lg transition-all"
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
