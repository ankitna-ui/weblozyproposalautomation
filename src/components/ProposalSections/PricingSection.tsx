import React from 'react';
import { PageWrapper, SectionProps, formatPrice } from './PageWrapper';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Clock, ShieldCheck, Wallet, Receipt, Tag, FileText, Sparkles, TrendingUp, Target, Activity, Zap, CreditCard, Banknote } from 'lucide-react';
import { AVAILABLE_MODULES } from '../../types';

export const PricingSection: React.FC<SectionProps> = ({ data, pageNumber }) => {
    // Financial Calculations
    const modulesMap = new Map();
    AVAILABLE_MODULES.forEach(m => modulesMap.set(m.id, m));
    data.customModules.forEach(m => modulesMap.set(m.id, m));

    const selectedModules = data.selectedModules.map(id => modulesMap.get(id)).filter(Boolean);
    const modulesPrice = selectedModules.reduce((acc, m) => {
        const featuresPrice = m.features.reduce((fAcc: number, f: any) => f.isSelected ? fAcc + (f.price || 0) : fAcc, 0);
        return acc + m.price + featuresPrice;
    }, 0);

    const grossBase = data.basePrice + modulesPrice;
    const discountAmount = data.discountType === 'percent'
        ? (grossBase * data.discount / 100)
        : data.discount;
    const totalDiscount = discountAmount + (data.additionalDiscount || 0);

    const netInvestment = grossBase - totalDiscount;
    const taxAmount = (netInvestment * data.taxRate) / 100;
    const grandTotal = netInvestment + taxAmount;

    const termCount = data.paymentTerms.length;

    // DYNAMIC FISCAL YEAR CALCULATION
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const fyStart = currentMonth >= 3 ? currentYear : currentYear - 1;
    const fyEnd = fyStart + 1;
    const dynamicFY = `FY ${fyStart}-${fyEnd.toString().slice(-2)}`;

    // DENSITY-AWARE LAYOUT ENGINE (Strict for A4)
    const rowCount = Math.ceil(termCount / 3);
    const isHeavy = rowCount >= 3;
    const isVeryHeavy = rowCount >= 4;
    const isVeryLight = termCount <= 3;

    return (
        <PageWrapper data={data} pageNumber={pageNumber}>
            {/* Master Executive Container */}
            <div className="flex flex-col h-full min-h-0 overflow-hidden relative">

                {/* 1. HEADER - BASIS 8% */}
                <div className="basis-[8%] shrink-0 flex justify-between items-end border-b-2 border-slate-900 pb-3">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-1 bg-[#1AA3D9]" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Fiscal Section 07</span>
                        </div>
                        <h2 className="font-black text-[#0D0D0D] tracking-tight leading-none uppercase text-4xl">Project Investment.</h2>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl shrink-0">
                        <Clock className="w-3.5 h-3.5 text-[#1AA3D9]" />
                        <span className="font-black uppercase leading-none text-[9px] tracking-tight">
                            {data.estimatedDays} Standard Cycle
                        </span>
                    </div>
                </div>

                {/* 2. PRIMARY DASHBOARD - BASIS 25% (Controlled) */}
                <div className={cn(
                    "shrink-0 flex items-stretch gap-4 mt-6",
                    isHeavy ? "basis-[22%]" : "basis-[25%]"
                )}>
                    <div className={cn(
                        "flex-1 relative bg-[#0D0D0D] rounded-[2rem] text-white shadow-xl overflow-hidden flex flex-col justify-center border border-white/5",
                        isHeavy ? "p-6" : "p-8"
                    )}>
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(26,163,217,0.05),transparent_70%)]" />

                        {(data.discount > 0 || data.additionalDiscount > 0) && (
                            <div className="absolute top-6 right-6">
                                <div className="bg-[#98BF45] text-white px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
                                    <Sparkles className="w-3 h-3" />
                                    <span className="text-[8px] font-black uppercase tracking-widest leading-none">
                                        STRATEGIC REBATE APPLIED
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <Wallet className="w-3.5 h-3.5 text-[#1AA3D9]" />
                                <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] leading-none">Investment Valuation</span>
                            </div>

                            <div className="flex items-baseline gap-4 mb-6">
                                <h3 className={cn(
                                    "font-black tracking-tighter leading-none transition-all",
                                    isHeavy ? "text-6xl" : "text-7xl"
                                )}>
                                    {formatPrice(netInvestment, data.currency)}
                                </h3>
                                <div className="text-left border-l-2 border-[#98BF45] pl-4 py-1">
                                    <p className="text-[9px] font-black text-[#98BF45] uppercase tracking-widest leading-none mb-0.5">Net Allocation</p>
                                    <p className="text-[5px] font-bold text-white/20 uppercase tracking-widest leading-none">Enterprise Standards</p>
                                </div>
                            </div>

                            <div className="mt-auto grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                                <div>
                                    <p className="text-white/30 text-[7px] font-black uppercase tracking-widest leading-none mb-1">Gross Valuation</p>
                                    <p className="text-base font-black tracking-tight">{formatPrice(grossBase, data.currency)}</p>
                                </div>
                                <div className="text-right border-l border-white/10 pl-6">
                                    <p className="text-[#1AA3D9] text-[7px] font-black uppercase tracking-widest leading-none mb-1">GST ({data.taxRate}%)</p>
                                    <p className="text-base font-black text-[#1AA3D9] tracking-tight">{formatPrice(taxAmount, data.currency)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[25%] flex flex-col gap-3">
                        <div className="bg-slate-50 border border-slate-100 rounded-[1.5rem] flex-1 flex flex-col justify-center items-center p-3 text-center">
                            <Activity className="w-4 h-4 text-[#1AA3D9] mb-1.5" />
                            <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest">PERFORMANCE</h4>
                        </div>
                        <div className="bg-slate-900 border border-white/5 rounded-[1.5rem] flex-1 flex flex-col justify-center items-center p-3 text-center text-white">
                            <ShieldCheck className="w-4 h-4 text-[#98BF45] mb-1.5" />
                            <h4 className="text-[8px] font-black uppercase tracking-widest text-[#98BF45]">VERIFIED</h4>
                        </div>
                    </div>
                </div>

                {/* 3. AUDIT TRANSCRIPT - BASIS 8% */}
                <div className="basis-[8%] shrink-0 flex items-center bg-white border border-slate-100 rounded-xl shadow-inner px-8 mt-4 min-h-0">
                    <div className="grid grid-cols-4 w-full gap-6 divide-x divide-slate-100 py-3">
                        {[
                            { label: 'Baseline', val: formatPrice(grossBase, data.currency) },
                            { label: 'Savings', val: `- ${formatPrice(totalDiscount, data.currency)}`, color: 'text-[#98BF45]' },
                            { label: `Prov. Tax`, val: `+ ${formatPrice(taxAmount, data.currency)}`, color: 'text-[#1AA3D9]' },
                            { label: 'Final Total', val: formatPrice(grandTotal, data.currency), weight: 'font-black' }
                        ].map((item, i) => (
                            <div key={i} className={cn("flex flex-col justify-center", i > 0 && "pl-6")}>
                                <p className="text-[7px] font-black text-slate-400 tracking-[0.1em] uppercase leading-none mb-1 truncate">{item.label}</p>
                                <p className={cn("text-base font-bold leading-none truncate", item.color, item.weight)}>{item.val}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. PAYMENT ROADMAP - FLEX-1 (Auto-Density Fitting) */}
                <div className="flex-1 min-h-0 flex flex-col mt-4 overflow-hidden">
                    <div className="flex justify-between items-center px-4 mb-3 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="h-3.5 w-1 bg-slate-900" />
                            <span className="text-[9px] font-black text-slate-900 uppercase tracking-[0.3em] leading-none">Disbursement milestones</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#98BF45]/40" />
                            <span className="text-[7px] font-black text-[#98BF45] uppercase tracking-widest leading-none">Account Integrity: 100% Verified</span>
                        </div>
                    </div>

                    <div className={cn(
                        "grid grid-cols-3 flex-1 min-h-0 content-start overflow-hidden",
                        isVeryHeavy ? "gap-2 pb-1" : isHeavy ? "gap-3 pb-2" : "gap-4 pb-4"
                    )}>
                        {data.paymentTerms.map((term, index) => {
                            const milestoneAmount = (term.percentage / 100) * grandTotal;
                            return (
                                <div
                                    key={term.id}
                                    className={cn(
                                        "bg-white border border-slate-100 rounded-[1.5rem] flex flex-col relative overflow-hidden shadow-sm flex-1 min-h-0",
                                        isVeryHeavy ? "p-3" : isHeavy ? "p-4" : "p-6"
                                    )}
                                >
                                    {/* Small Index Marker */}
                                    <div className="absolute top-0 right-0 py-1 px-2.5 bg-slate-50 text-slate-300 font-extrabold text-[10px] leading-none rounded-bl-lg border-l border-b border-slate-100">
                                        M0{index + 1}
                                    </div>

                                    <div className="flex flex-col h-full gap-2 relative z-10 min-h-0">
                                        <div className="shrink-0">
                                            <span className="font-black text-slate-400 uppercase tracking-widest truncate text-[7px] block mb-0.5">
                                                {term.label}
                                            </span>
                                        </div>

                                        <div className="flex items-baseline gap-1 shrink-0">
                                            <span className={cn(
                                                "font-black text-[#0D0D0D] tracking-tighter leading-none",
                                                isVeryHeavy ? "text-2xl" : isHeavy ? "text-3xl" : "text-5xl"
                                            )}>{term.percentage}</span>
                                            <span className={cn("font-black text-[#1AA3D9] leading-none", isVeryHeavy ? "text-xs" : "text-base")}>%</span>
                                        </div>

                                        {/* COMPACT VALUATION BOX */}
                                        <div className={cn(
                                            "mt-auto shrink-0 bg-slate-50 rounded-xl border border-slate-100 transition-all",
                                            isVeryHeavy ? "p-1.5" : "p-2.5"
                                        )}>
                                            <p className="text-[6px] font-black text-slate-400 uppercase tracking-widest mb-0.5 leading-none">Payable Amount</p>
                                            <p className={cn("font-bold text-[#0D0D0D] tracking-tight leading-none truncate", isVeryHeavy ? "text-[11px]" : isHeavy ? "text-sm" : "text-base")}>
                                                {formatPrice(milestoneAmount, data.currency)}
                                            </p>
                                        </div>

                                        {/* Slim Progress Bar */}
                                        <div className="shrink-0 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-[#1AA3D9] to-[#98BF45]" style={{ width: `${term.percentage}%` }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 5. SLIM EXECUTIVE FOOTER - BASIS 10% */}
                <div className="basis-[10%] shrink-0 mt-3 bg-[#0D0D0D] text-white rounded-[1.5rem] flex items-center justify-between px-8 border border-white/10 shadow-2xl relative overflow-hidden min-h-0">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1AA3D930] to-transparent opacity-50" />

                    <div className="flex items-center gap-6 relative z-10 py-2">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                            <Banknote className="w-5 h-5 text-[#98BF45]" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                            <p className="font-black uppercase tracking-[0.2em] leading-none text-[9px] truncate text-[#1AA3D9]">Fiscal Settlement Protocol</p>
                            <p className="text-white/20 font-bold uppercase leading-none text-[7px] max-w-[400px] truncate">
                                NEFT/RTGS Disbursement Required. Total: <span className="text-white/40">{formatPrice(grandTotal, data.currency)}</span>.
                            </p>
                        </div>
                    </div>

                    <div className="text-right pl-6 border-l border-white/10 shrink-0 relative z-10 flex flex-col justify-center h-full gap-0.5 py-2">
                        <div className="flex items-center justify-end gap-1.5 text-[7px] font-black text-[#1AA3D9] uppercase tracking-widest leading-none mb-0.5">
                            <Zap className="w-3 h-3" />
                            <span>Weblozy Standard</span>
                        </div>
                        <p className="font-black tracking-widest leading-none text-2xl">{dynamicFY}</p>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
