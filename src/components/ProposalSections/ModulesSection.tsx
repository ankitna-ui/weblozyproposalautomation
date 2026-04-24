import React from 'react';
import { Settings, Sparkles, Target, CheckCircle2, Shield, Zap, Box, ListChecks } from 'lucide-react';
import { ProposalData, AVAILABLE_MODULES, Module } from '../../types';
import { cn } from '../../lib/utils';
import { getPasteColorFromString } from '../../lib/colors';
import { PageWrapper, SectionProps, formatPrice } from './PageWrapper';

interface ModuleWithColor extends Module {
    color: string;
}

const getModuleInitials = (name: string) => {
    // Remove special characters and split by space
    const cleanName = name.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '');
    const words = cleanName.split(' ').filter(w => w.length > 0);

    if (words.length === 1) return words[0].slice(0, 3).toUpperCase();

    // Take first letter of each significant word
    return words
        .filter(w => !['with', 'the', 'and', 'for', 'system', 'integration'].includes(w.toLowerCase()))
        .map(w => w[0])
        .join('')
        .slice(0, 3)
        .toUpperCase();
};

export const ModulesSection: React.FC<SectionProps> = ({ data, pageNumber }) => {
    const getSelectedModulesData = () => {
        const modulesMap = new Map<string, Module>();
        AVAILABLE_MODULES.forEach(m => modulesMap.set(m.id, m));
        data.customModules.forEach(m => modulesMap.set(m.id, m));
        return data.selectedModules.map(id => modulesMap.get(id)).filter((m): m is Module => !!m);
    };

    const modules = getSelectedModulesData().map(m => ({
        ...m,
        color: m.color || getPasteColorFromString(m.name)
    }));

    // --- EXACT 3 MODULES PER PAGE SPLITTING ---
    const MODULES_PER_PAGE = 3;
    const pages: ModuleWithColor[][] = [];
    for (let i = 0; i < modules.length; i += MODULES_PER_PAGE) {
        pages.push(modules.slice(i, i + MODULES_PER_PAGE));
    }

    return (
        <div className="flex flex-col gap-20">
            {pages.length > 0 ? pages.map((pageModules, pageIdx) => {
                // Determine if VALUATION column should be visible on this page
                const hasValuation = pageModules.some(m => m.price > 0);

                // Calculate total features for density scaling
                const totalFeatures = pageModules.reduce((acc, m) => acc + m.features.filter(f => f.isSelected).length, 0);

                // DYNAMIC DENSITY SETTINGS
                let fontSize = "text-[9px]";
                let padding = "p-6";
                let gapY = "gap-y-2";
                let iconSize = "w-2.5 h-2.5";

                if (totalFeatures > 25) {
                    fontSize = "text-[8.5px]";
                    padding = "p-5";
                    gapY = "gap-y-1.5";
                }
                if (totalFeatures > 40) {
                    fontSize = "text-[7.5px]";
                    padding = "p-4";
                    gapY = "gap-y-1";
                    iconSize = "w-2 h-2";
                }

                // Grid template changes based on valuation visibility
                const gridTemplate = hasValuation
                    ? "grid-cols-[100px_200px_1fr_150px]"
                    : "grid-cols-[100px_200px_1fr]";

                return (
                    <PageWrapper key={pageIdx} data={data} pageNumber={pageNumber ? pageNumber + pageIdx : undefined} className="bg-white">
                        <div className="flex flex-col h-full gap-6">
                            {/* 1. SECTION IDENTITY */}
                            <div className="flex justify-between items-end border-b-2 border-slate-900 pb-6">
                                <div className="flex items-center gap-6">
                                    <a
                                        href="https://www.weblozy.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center p-3 relative group transition-all duration-500 hover:rotate-6 hover:scale-110 shadow-xl border-t border-white/20"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1AA3D9]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                        <img src="/images/logo.png" alt="Weblozy Logo" className="w-full h-full object-contain relative z-10 filter brightness-0 invert" />
                                    </a>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1AA3D9]">Protocol Step // 03</span>
                                        </div>
                                        <h1 className="text-5xl font-black text-[#0D0D0D] tracking-tighter leading-none uppercase">
                                            Modules <span className="text-slate-300">Features.</span>
                                        </h1>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1">
                                    <div className="px-4 py-1.5 bg-[#1AA3D9] rounded-full">
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">
                                            Batch {String(pageIdx + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
                                        </p>
                                    </div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">Technical Delivery Framework</p>
                                </div>
                            </div>

                            {/* 2. ENTERPRISE SPECIFICATION TABLE */}
                            <div className="flex-1 flex flex-col min-h-0 overflow-hidden mt-2">
                                <div className="w-full flex-1 flex flex-col border-collapse">
                                    {/* Table Head */}
                                    <div className={cn("grid bg-slate-900 text-white rounded-t-2xl overflow-hidden border border-slate-900", gridTemplate)}>
                                        <div className="p-4 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10 flex items-center justify-center">Ref ID</div>
                                        <div className="p-4 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10">Module Identity</div>
                                        <div className="p-4 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10">Technical Scope & Features</div>
                                        {hasValuation && (
                                            <div className="p-4 text-[10px] font-black uppercase tracking-[0.2em] text-right">Valuation</div>
                                        )}
                                    </div>

                                    {/* Table Body - Flex grow ensures it fills the page */}
                                    <div className="flex-1 flex flex-col border-x border-b border-slate-200 rounded-b-2xl overflow-hidden shadow-premium">
                                        {pageModules.map((module, idx) => {
                                            const activeFeatures = module.features.filter(f => f.isSelected);
                                            return (
                                                <div key={module.id}
                                                    className={cn(
                                                        "grid flex-1 items-stretch border-b border-slate-100 last:border-0",
                                                        gridTemplate
                                                    )}
                                                    style={{ backgroundColor: `${module.color}08` }} // Subtle 3% module color tint
                                                >
                                                    {/* Column 1: Ref ID */}
                                                    <div className={cn(padding, "border-r border-slate-100 flex items-center justify-center")}>
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-[9px] font-black text-slate-400 font-mono tracking-tighter bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm leading-none whitespace-nowrap">
                                                                W-{getModuleInitials(module.name)}-{String(idx + 1 + (pageIdx * MODULES_PER_PAGE)).padStart(2, '0')}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Column 2: Identity */}
                                                    <div className={cn(padding, "border-r border-slate-100 flex flex-col justify-center relative")}>
                                                        {/* Immersive Vertical Accent */}
                                                        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: module.color }} />
                                                        <div className="pl-2">
                                                            <div className="flex items-center gap-2 mb-1.5">
                                                                <Zap className="w-3 h-3" style={{ color: module.color }} />
                                                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-none">
                                                                    {module.name}
                                                                </h3>
                                                            </div>
                                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-80 leading-none">
                                                                Enterprise Node
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Column 3: Features */}
                                                    <div className={cn(padding, "border-r border-slate-100 bg-white/40 flex items-center")}>
                                                        <div className={cn("grid grid-cols-2 gap-x-8 w-full", gapY)}>
                                                            {activeFeatures.map((feat, fidx) => (
                                                                <div key={fidx} className="flex items-start gap-3 group min-w-0">
                                                                    <div className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: module.color }} />
                                                                    <span className={cn(fontSize, "font-bold text-slate-700 uppercase tracking-tight leading-tight break-words")}>
                                                                        {feat.text}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Column 4: Valuation */}
                                                    {hasValuation && (
                                                        <div className={cn(padding, "flex flex-col justify-center items-end bg-slate-50/50")}>
                                                            {module.price > 0 ? (
                                                                <div className="text-right">
                                                                    <p className="text-[8px] font-black text-[#1AA3D9] tracking-widest mb-1.5 uppercase leading-none opacity-80">Unit Investment</p>
                                                                    <p className="text-base font-black text-slate-900 tracking-tighter leading-none">
                                                                        {formatPrice(module.price, data.currency)}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className="px-3 py-1 bg-slate-200/50 rounded-full">
                                                                    <p className="text-[8px] font-black text-slate-400 tracking-widest uppercase leading-none">Included</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* 3. TECHNICAL MANIFESTO FOOTER */}
                            <div className="p-6 bg-[#0D0D0D] rounded-3xl flex items-center justify-between shadow-2xl mt-auto relative overflow-hidden border border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-black opacity-50" />
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-[#1AA3D9] flex items-center justify-center text-white border border-white/20 shadow-premium">
                                        <ListChecks className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest">Scope Verification & Compliance</p>
                                        <p className="text-[9px] font-bold text-slate-400 leading-tight uppercase tracking-tight max-w-[480px]">
                                            This table serves as the <span className="text-white">definitive technical scope</span>. Each entry represents a commitment to functional delivery and cross-modular compatibility.
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right relative z-10">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1.5">Standard</p>
                                    <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                                        <p className="text-[11px] font-black text-white tracking-[0.2em] uppercase leading-none">ISO-SPEC-DELIVERY</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PageWrapper>
                );
            }) : (
                <PageWrapper data={data} pageNumber={pageNumber}>
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-6">
                        <div className="w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center">
                            <Settings className="w-10 h-10 opacity-20" />
                        </div>
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Selection Empty</p>
                    </div>
                </PageWrapper>
            )}
        </div>
    );
};
