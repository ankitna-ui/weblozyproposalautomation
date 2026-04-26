import React from 'react';
import { Zap, TrendingUp, Cpu, Timer, BarChart3, Binary } from 'lucide-react';
import { PageWrapper, SectionProps } from './PageWrapper';

export const TermsSection: React.FC<SectionProps> = ({ data, pageNumber }) => {
    return (
        <PageWrapper data={data} pageNumber={pageNumber}>
            <div className="flex flex-col h-full min-h-0 overflow-hidden relative">
                {/* 1. CINEMATIC HEADER (Fixed Height) */}
                <div className="basis-[8%] shrink-0 flex justify-between items-end border-b border-slate-200 pb-4">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-1 bg-[#98BF45]" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Section 09</span>
                        </div>
                        <h2 className="text-4xl font-black text-[#0D0D0D] tracking-tighter leading-none uppercase italic">The Automation Shift.</h2>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full shrink-0">
                            <Zap className="w-3 h-3 text-[#1AA3D9]" />
                            <span className="font-black uppercase leading-none text-[7px] tracking-widest text-white">Hyper-Growth Logic</span>
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Transformation Roadmap</span>
                    </div>
                </div>

                {/* 2. DUAL-COLUMN VALUE PROPOSITION (Fluid but Contained) */}
                <div className="flex-1 min-h-0 flex gap-10 py-6 overflow-hidden">
                    {/* Left side: The Transformation Narrative */}
                    <div className="basis-[45%] flex flex-col h-full min-h-0">
                        <div className="space-y-3 mb-6 shrink-0">
                            <h3 className="text-xl font-black text-[#0D0D0D] uppercase tracking-tighter leading-tight italic border-l-4 border-[#1AA3D9] pl-3">
                                Manual processes are the friction in your growth.
                            </h3>
                            <p className="text-[12px] text-slate-600 font-bold leading-relaxed uppercase">
                                For years, businesses have relied on human-centric processes. We turn that friction into fuel.
                            </p>
                        </div>

                        {/* Value Pillars (Contained) */}
                        <div className="flex flex-col gap-4 mb-6 shrink-0">
                            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex gap-4 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm transition-transform">
                                    <Timer className="text-[#1AA3D9] w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-black text-[10px] text-[#0D0D0D] uppercase">Phase 01: Manual Friction</h4>
                                    <p className="text-[9px] text-slate-500 font-bold leading-tight uppercase max-w-[200px]">
                                        Human dependency, restricted hours, high error rates.
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex gap-4 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm transition-transform">
                                    <Binary className="text-[#98BF45] w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-black text-[10px] text-[#0D0D0D] uppercase">Phase 02: Total Automation</h4>
                                    <p className="text-[9px] text-slate-500 font-bold leading-tight uppercase max-w-[200px]">
                                        Algorithmic velocity, 24/7 execution, zero errors.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* The Profit Summary (Takes remaining space but has max-h) */}
                        <div className="flex-1 min-h-0 bg-[#1AA3D910] rounded-[2rem] border border-[#1AA3D920] p-6 flex flex-col justify-center gap-3 overflow-hidden">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="text-[#1AA3D9] w-6 h-6" />
                                <span className="text-2xl font-black text-[#0D0D0D] tracking-tighter uppercase italic leading-none">Infinite Profit.</span>
                            </div>
                            <p className="text-[10px] text-[#0D0D0D] font-black leading-tight uppercase opacity-80 overflow-hidden">
                                Moving to automation isn't just about saving time. It's about enabling infinite scalability.
                                We deliver 10x ROI on velocity alone.
                            </p>
                        </div>
                    </div>

                    {/* Right side: Cinematic Visual (Locked Aspect) */}
                    <div className="basis-[55%] flex flex-col h-full min-h-0">
                        <div className="flex-1 relative rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl bg-slate-900 group">
                            <img
                                src="/images/image4.jpg"
                                alt="Automation Transformation Concept"
                                crossOrigin="anonymous"
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://picsum.photos/seed/automation/800/600"; }}
                            />

                            {/* Overlay Plate (Compressed) */}
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent">
                                <div className="flex items-center gap-3 text-white">
                                    <Cpu className="text-[#1AA3D9] w-8 h-8" />
                                    <div className="space-y-0.5">
                                        <h4 className="text-lg font-black uppercase tracking-tighter leading-none italic">Hyper-Scale Engine.</h4>
                                        <p className="text-[8px] font-black text-[#1AA3D9] uppercase tracking-widest">Verified Automation Framework</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. EXECUTIVE FOOTER (Standard Height) */}
                <div className="basis-[8%] shrink-0 mt-2 bg-slate-900 rounded-[2rem] flex items-center justify-between px-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1AA3D910] to-transparent opacity-30" />
                    <div className="flex items-center gap-6 relative z-10 text-white">
                        <div className="flex items-center gap-2">
                            <Zap className="text-[#98BF45] w-4 h-4" />
                            <p className="font-black uppercase tracking-widest leading-none text-[8px]">Absolute Velocity</p>
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <p className="text-white/40 font-bold uppercase leading-tight text-[8px] max-w-[400px]">
                            Operational transformation is verified for stability and performance.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-xl flex items-center gap-3 relative z-10">
                        <BarChart3 className="w-3.5 h-3.5 text-[#1AA3D9]" />
                        <span className="text-[9px] font-black uppercase tracking-widest italic">Metrics Verified</span>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
