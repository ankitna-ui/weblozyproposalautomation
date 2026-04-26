import React from 'react';
import { Settings, Orbit, Target, CheckCircle2, Shield, Zap, Box, ListChecks } from 'lucide-react';
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

export const ModulesSection: React.FC<SectionProps> = React.memo(({ data, pageNumber }) => {
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
                    ? "grid-cols-[80px_180px_1fr_140px]"
                    : "grid-cols-[80px_180px_1fr]";

                return (
                    <PageWrapper key={pageIdx} data={data} pageNumber={pageNumber ? pageNumber + pageIdx : undefined} className="bg-white">
                        <div className="flex flex-col h-full gap-6">
                            {/* 1. SECTION IDENTITY */}
                            <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
                                <div className="flex items-center gap-6">
                                    <div
                                        className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center p-3 shadow-xl border-t border-white/20"
                                    >
                                        <img 
                                            src="/images/logo.png" 
                                            alt="Weblozy Logo" 
                                            className="w-full h-full object-contain filter brightness-0 invert" 
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1AA3D9]">Protocol // Node 03</span>
                                        </div>
                                        <h1 className="text-4xl font-black text-[#0D0D0D] tracking-tighter leading-none uppercase italic">
                                            Project <span className="text-slate-300">Modules.</span>
                                        </h1>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1">
                                    <div className="px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">
                                        <p className="text-[8px] font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">
                                            Batch {pageIdx + 1} / {pages.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 2. ENTERPRISE SPECIFICATION TABLE */}
                            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                                <div className="w-full flex-1 flex flex-col">
                                    {/* Table Head */}
                                    <div className={cn("grid bg-slate-950 text-white rounded-t-2xl overflow-hidden", gridTemplate)}>
                                        <div className="p-3 text-[9px] font-black uppercase tracking-[0.2em] border-r border-white/5 flex items-center justify-center">ID</div>
                                        <div className="p-3 text-[9px] font-black uppercase tracking-[0.2em] border-r border-white/5">Module</div>
                                        <div className="p-3 text-[9px] font-black uppercase tracking-[0.2em] border-r border-white/5">Technical Scope</div>
                                        {hasValuation && (
                                            <div className="p-3 text-[9px] font-black uppercase tracking-[0.2em] text-right pr-6">Valuation</div>
                                        )}
                                    </div>

                                    {/* Table Body */}
                                    <div className="flex-1 flex flex-col border-x border-b border-slate-200 rounded-b-2xl overflow-hidden shadow-sm">
                                        {pageModules.map((module, idx) => {
                                            const activeFeatures = module.features.filter(f => f.isSelected);
                                            // Extreme density check
                                            const itemFontSize = activeFeatures.length > 15 ? "text-[7px]" : fontSize;
                                            
                                            return (
                                                <div key={module.id}
                                                    className={cn(
                                                        "grid flex-1 items-stretch border-b border-slate-100 last:border-0 min-h-0 overflow-hidden",
                                                        gridTemplate
                                                    )}
                                                >
                                                    {/* Column 1: Ref ID */}
                                                    <div className={cn(padding, "border-r border-slate-50 flex items-center justify-center bg-slate-50/30")}>
                                                        <span className="text-[8px] font-black text-slate-400 font-mono tracking-tighter">
                                                            {getModuleInitials(module.name)}-{idx + 1}
                                                        </span>
                                                    </div>

                                                    {/* Column 2: Identity */}
                                                    <div className={cn(padding, "border-r border-slate-50 flex flex-col justify-center relative bg-white")}>
                                                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: module.color }} />
                                                        <div className="pl-3">
                                                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-tight mb-1">
                                                                {module.name}
                                                            </h3>
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: module.color }} />
                                                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Active Node</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Column 3: Features */}
                                                    <div className={cn(padding, "border-r border-slate-50 bg-white flex items-center min-h-0 overflow-hidden")}>
                                                        <div className={cn(
                                                            "grid gap-x-6 w-full h-full content-center", 
                                                            activeFeatures.length > 10 ? "grid-cols-2" : "grid-cols-1",
                                                            gapY
                                                        )}>
                                                            {activeFeatures.map((feat, fidx) => (
                                                                <div key={fidx} className="flex items-start gap-2.5 min-w-0">
                                                                    <CheckCircle2 className={cn("shrink-0 mt-0.5", iconSize)} style={{ color: module.color }} />
                                                                    <span className={cn(itemFontSize, "font-bold text-slate-600 uppercase tracking-tight leading-snug")}>
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
});
