import React from 'react';
import { PageWrapper, SectionProps, formatPrice } from './PageWrapper';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Clock, ShieldCheck, Wallet, Receipt, Tag, FileText, Orbit, TrendingUp, Target, Activity, Zap, CreditCard, Banknote } from 'lucide-react';
import { AVAILABLE_MODULES } from '../../types';

export const PricingSection: React.FC<SectionProps> = ({ data, pageNumber }) => {
    // Financial Calculations
    const modulesMap = new Map();
    AVAILABLE_MODULES.forEach(m => modulesMap.set(m.id, m));
    data.customModules.forEach(m => modulesMap.set(m.id, m));

    const selectedModules = data.selectedModules.map(id => modulesMap.get(id)).filter(Boolean);
    const modulesPrice = selectedModules.reduce((acc, m) => {
        const featuresPrice = (m.features || []).reduce((fAcc: number, f: any) => f.isSelected ? fAcc + (f.price || 0) : fAcc, 0);
        return acc + m.price + featuresPrice;
    }, 0);

    const subtotal = data.basePrice + modulesPrice;
    const discountAmount = data.discountType === 'percent'
        ? (subtotal * data.discount / 100)
        : data.discount;
    const totalSavings = discountAmount + (data.additionalDiscount || 0);

    const netInvestment = subtotal - totalSavings;
    const taxAmount = (netInvestment * data.taxRate) / 100;
    // User wants to show price after discount but with a GST included note, 
    // and specifically says "gst include krke price nhi ayega" in the total.
    const grandTotal = netInvestment; // Use net investment as the final display total

    const termCount = data.paymentTerms.length;

    // Fiscal Year Calculation
    const currentYear = new Date().getFullYear();
    const dynamicFY = `FY ${currentYear}-${(currentYear + 1).toString().slice(-2)}`;

    return (
        <PageWrapper data={data} pageNumber={pageNumber} hideFooter={true}>
            <div className="flex flex-col h-full relative overflow-hidden font-sans">
                
                {/* --- 1. FISCAL HEADER --- */}
                <div className="flex justify-between items-end pb-4 border-b border-slate-200 shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-4 bg-[#1AA3D9]" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Section 07 // Financials</span>
                        </div>
                        <h2 className="text-4xl font-black text-[#0D0D0D] tracking-tighter uppercase italic">Project Investment.</h2>
                    </div>
                    <div className="text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg mb-1">
                            <Zap className="w-3 h-3 text-[#1AA3D9]" />
                            <span className="text-[8px] font-black text-white uppercase tracking-widest">Optimized ROI Protocol</span>
                        </div>
                        <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{dynamicFY} Settlement Matrix</p>
                    </div>
                </div>

                {/* --- 2. MAIN ACCOUNTING DASHBOARD --- */}
                <div className="grid grid-cols-12 gap-6 pt-8 shrink-0">
                    
                    {/* LEFT: Cost Breakdown Audit */}
                    <div className="col-span-7 space-y-4">
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1AA3D9] to-transparent" />
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Valuation</span>
                                    <span className="text-sm font-black text-slate-900">{formatPrice(subtotal, data.currency)}</span>
                                </div>
                                
                                {totalSavings > 0 && (
                                    <div className="flex justify-between items-center group">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-3 h-3 text-[#98BF45]" />
                                            <span className="text-[10px] font-black text-[#98BF45] uppercase tracking-widest">
                                                {data.discountType === 'percent' ? `${data.discount}% ` : ''} 
                                                Strategic Discount
                                                {data.additionalDiscount > 0 ? ' + Additional Rebate' : ''}
                                            </span>
                                        </div>
                                        <span className="text-sm font-black text-[#98BF45] italic">-{formatPrice(totalSavings, data.currency)}</span>
                                    </div>
                                )}

                                <div className="h-px bg-slate-200" />

                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Net Investment</span>
                                    <span className="text-lg font-black text-slate-900 tracking-tight">{formatPrice(netInvestment, data.currency)}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Tax Provision ({data.taxRate}%)</span>
                                    <span className="text-[13px] font-bold text-slate-500">+{formatPrice(taxAmount, data.currency)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Fiscal Note */}
                        <div className="flex items-start gap-4 p-5 border border-dashed border-slate-200 rounded-3xl">
                            <Receipt className="w-4 h-4 text-[#1AA3D9] shrink-0 mt-0.5" />
                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed tracking-wide">
                                All values are in <span className="text-slate-900 font-black">{data.currency}</span>. 
                                The pricing reflects our master-grade service commitment and is valid for 30 business days from the date of issuance.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: GRAND TOTAL PLATE */}
                    <div className="col-span-5">
                        <div className="h-full bg-[#0D0D0D] rounded-[2rem] p-6 text-white flex flex-col justify-between relative overflow-hidden group border border-white/5 shadow-2xl">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1AA3D910] rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent opacity-30" />
                            
                            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                {/* Label */}
                                <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">Final Commitment</p>
                                
                                {/* Price */}
                                <h3 className="text-4xl font-black tracking-tighter leading-none italic">
                                    {formatPrice(grandTotal, data.currency)}
                                </h3>

                                {/* Discount Badge */}
                                <div className="px-4 py-1.5 bg-[#98BF45] rounded-full shadow-[0_0_20px_rgba(152,191,69,0.4)] animate-pulse">
                                    <span className="text-[10px] font-black text-white uppercase italic">
                                        {data.discountType === 'percent' ? `${data.discount}%` : formatPrice(totalSavings, data.currency)} Off
                                    </span>
                                </div>

                                {/* GST Note */}
                                <div className="px-3 py-1 bg-white/10 rounded-lg border border-white/10">
                                    <span className="text-[8px] font-black uppercase text-white/60">+ {data.taxRate}% GST extra as applicable</span>
                                </div>

                                <p className="text-[7px] font-bold text-white/20 uppercase tracking-widest italic">
                                    * Limited time strategic valuation
                                </p>
                            </div>

                            {/* Bottom Badges */}
                            <div className="relative z-10 pt-4 mt-2 border-t border-white/10 space-y-2.5">
                                <div className="flex items-center justify-center gap-2.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#98BF45]" />
                                    <p className="text-[8px] font-black uppercase tracking-widest text-white/50">Verified Settlement Protocol</p>
                                </div>
                                <div className="flex items-center justify-center gap-2.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1AA3D9]" />
                                    <p className="text-[8px] font-black uppercase tracking-widest text-white/50">Quantum Accounting Integrity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 3. MILESTONE ROADMAP --- */}
                <div className="flex-grow flex flex-col mt-6 min-h-0">
                    <div className="flex justify-between items-center mb-3 shrink-0 px-2">
                        <div className="flex items-center gap-3">
                            <CreditCard className="w-4 h-4 text-[#0D0D0D]" />
                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Disbursement Milestones</span>
                        </div>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{termCount} Phases Defined</span>
                    </div>

                    <div className={cn(
                        "grid gap-3 flex-grow overflow-hidden content-start pb-4",
                        termCount <= 3 ? "grid-cols-3" : termCount === 4 ? "grid-cols-4" : "grid-cols-3"
                    )}>
                        {data.paymentTerms.map((term, index) => {
                            const isCompact = termCount > 3;
                            return (
                                <div key={term.id} className={cn(
                                    "bg-white border border-slate-100 rounded-2xl flex flex-col relative overflow-hidden shadow-sm group hover:border-[#1AA3D930] transition-colors",
                                    isCompact ? "p-2.5 gap-1.5" : "p-3.5 gap-2.5"
                                )}>
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-slate-50 flex items-center justify-center border-l border-b border-slate-100">
                                        <span className="text-[8px] font-black text-slate-300">M0{index + 1}</span>
                                    </div>
                                    
                                    <div className="shrink-0">
                                        <p className={cn(
                                            "font-black text-slate-400 uppercase tracking-widest truncate pr-6",
                                            isCompact ? "text-[7px] mb-0.5" : "text-[8px] mb-1"
                                        )}>{term.label}</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className={cn(
                                                "font-black text-slate-900 tracking-tighter leading-none",
                                                isCompact ? "text-xl" : "text-2xl"
                                            )}>{term.percentage}</span>
                                            <span className="text-[10px] font-black text-[#1AA3D9]">%</span>
                                        </div>
                                    </div>

                                    {/* Milestone Deliverables */}
                                    <div className="flex-grow min-h-0 overflow-hidden">
                                        <div className={cn(
                                            "flex flex-wrap gap-1 content-start overflow-hidden",
                                            isCompact ? "max-h-[30px]" : "max-h-[40px]"
                                        )}>
                                            {(term.features || []).map((feature, fIdx) => (
                                                <div key={fIdx} className="px-1.5 py-0.5 bg-slate-50 border border-slate-100 rounded-md">
                                                    <p className="text-[6px] font-bold text-slate-500 uppercase tracking-tighter truncate max-w-[60px]">
                                                        {feature}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={cn(
                                        "mt-auto border-t border-slate-50 space-y-1.5",
                                        isCompact ? "pt-1.5" : "pt-2.5"
                                    )}>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest italic">Phase Allocation</span>
                                            <span className="text-[10px] font-black text-[#1AA3D9]">{term.percentage}%</span>
                                        </div>
                                        <div className="h-0.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#1AA3D9]" style={{ width: `${term.percentage}%` }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* --- 4. EXECUTIVE FOOTER --- */}
                <div className="mt-auto pt-6 border-t border-slate-200 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-900 uppercase italic">Settlement Agreement</span>
                            <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Authorized Verification Required</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-4 h-4 text-[#98BF45]" />
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Master-Grade Financial Integrity Guaranteed</p>
                        </div>
                    </div>
                </div>

                {/* --- 5. GLOBAL BRANDING --- */}
                <div className="pt-6 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <img
                            src="/images/banner_image.png"
                            alt="Weblozy"
                            className="h-7 w-auto"
                        />
                        <div className="h-4 w-px bg-slate-200" />
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Weblozy &bull; Confidential &copy; {new Date().getFullYear()}
                        </p>
                    </div>
                    <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                        SOLUTIONS • GLOBAL OPERATIONS
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
