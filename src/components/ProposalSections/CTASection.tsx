import React from 'react';
import {
    Phone, Mail, Globe, CheckCircle2, MessageSquare,
    Instagram, Linkedin, Facebook, Twitter, Youtube,
    ShieldCheck
} from 'lucide-react';
import { PageWrapper, SectionProps } from './PageWrapper';

export const CTASection: React.FC<SectionProps> = ({ data, pageNumber }) => {
    return (
        <PageWrapper data={data} pageNumber={pageNumber} className="bg-white">
            <div className="flex flex-col h-full px-12 py-10 relative overflow-hidden">

                {/* 1. HEADER - PINNED TO TOP */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Weblozy®</h2>
                        <p className="text-[10px] font-black text-[#1AA3D9] uppercase tracking-[0.5em] mt-3 opacity-80 font-mono">
                            We Automate Businesses
                        </p>
                    </div>
                </div>

                {/* 2. HERO - CENTERED IN UPPER HALF */}
                <div className="flex-grow flex flex-col justify-center max-h-[30%] py-8">
                    <h3 className="text-7xl font-black text-slate-900 tracking-tight uppercase leading-[0.85]">
                        The Path To <br />
                        <span className="bg-gradient-to-r from-[#98BF45] to-[#1AA3D9] bg-clip-text text-transparent">
                            Innovation.
                        </span>
                    </h3>
                    <div className="w-24 h-2 bg-slate-900 mt-6" />
                </div>

                {/* 3. PREMIUM ACTION CENTER - BALANCED MIDDLE */}
                <div className="grid grid-cols-2 gap-6 py-6 font-sans">
                    {/* PRIMARY: DARK MODE PREMIUM */}
                    <button className="flex-1 group relative p-8 bg-slate-900 rounded-3xl transition-all hover:scale-[1.02] shadow-2xl overflow-hidden min-h-[160px] flex flex-col justify-between text-left">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex justify-between items-start relative">
                            <h4 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Approve <br />Proposal</h4>
                            <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest relative">Official Project Kick-off</p>
                    </button>

                    {/* SECONDARY: GLASSMORPHISM */}
                    <button className="flex-1 group relative p-8 bg-white border border-slate-200 rounded-3xl transition-all hover:border-cyan-400/50 shadow-xl overflow-hidden min-h-[160px] flex flex-col justify-between text-left">
                        <div className="absolute inset-0 bg-slate-50 opacity-50" />
                        <div className="flex justify-between items-start relative">
                            <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Want <br />Discussion</h4>
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-cyan-500 shadow-inner group-hover:bg-cyan-50 transition-colors">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative">Strategic Collaboration</p>
                    </button>
                </div>

                {/* 4. EXPANDED CONNECTIVITY NEXUS - PINNED TO BOTTOM */}
                <div className="mt-auto pt-6 border-t-[8px] border-slate-900">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Column 1: Voice */}
                        <div className="col-span-4 space-y-4">
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Voice Links</p>
                            <div className="space-y-2">
                                <p className="text-lg font-black text-slate-900 tracking-tighter leading-none">+91 96678 96604</p>
                                <p className="text-lg font-black text-slate-500 tracking-tighter leading-none">+1 320 433 0111</p>
                            </div>
                        </div>

                        {/* Column 2: Digital */}
                        <div className="col-span-4 space-y-4 border-l border-slate-100 pl-8">
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Digital Ports</p>
                            <div className="space-y-2">
                                <p className="text-lg font-black text-slate-900 tracking-tighter leading-none">info@weblozy.com</p>
                                <a href="https://www.weblozy.com" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-[#1AA3D9] tracking-tighter uppercase leading-none block hover:underline">weblozy.com</a>
                            </div>
                        </div>

                        {/* Column 3: Social & Proprietary */}
                        <div className="col-span-4 flex flex-col justify-between items-end border-l border-slate-100 pl-8">
                            <div className="w-full">
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4 text-right">Social Portals</p>
                                <div className="flex gap-5 justify-end">
                                    <a href="https://www.instagram.com/weblozy/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-pink-600 transition-colors"><Instagram className="w-4 h-4" /></a>
                                    <a href="https://www.linkedin.com/company/weblozy/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-700 transition-colors"><Linkedin className="w-4 h-4" /></a>
                                    <a href="https://www.facebook.com/weblozy" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors"><Facebook className="w-4 h-4" /></a>
                                    <a href="https://www.youtube.com/@weblozy" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-red-600 transition-colors"><Youtube className="w-4 h-4" /></a>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-4">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#1AA3D9]" />
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">Proprietary Proposal // 2026</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACKGROUND WATERMARK */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
                    <h5 className="text-[120px] font-black text-slate-900 tracking-tighter uppercase leading-none">THANKS</h5>
                </div>

            </div>
        </PageWrapper>
    );
};
