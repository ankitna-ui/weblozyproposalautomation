import React from 'react';
import { PageWrapper, SectionProps } from './PageWrapper';
import { cn } from '../../lib/utils';

export const CoverPage: React.FC<SectionProps> = ({ data, pageNumber }) => {
    // Dynamic Typography Helper
    const getTitleFontSize = (text: string) => {
        const charCount = text.length;
        if (charCount > 60) return 'text-[42px] leading-[1.1]';
        if (charCount > 40) return 'text-[54px] leading-[1.05]';
        if (charCount > 25) return 'text-[68px] leading-[1]';
        return 'text-[82px] leading-[0.9]';
    };

    const purpose = data.proposalPurpose || "Strategic Digital Transformation";

    return (
        <PageWrapper data={data} hideFooter pageNumber={pageNumber} className="bg-white">
            <div className="h-full flex flex-col relative overflow-hidden font-sans bg-[#F9FBFC]">
                {/* Lateral Accent Bar - Subtle width reduction */}
                <div className="absolute left-0 top-0 w-1.5 h-full bg-[#0D0D0D]" />

                {/* Architectural Grid Background (Subtle) */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0D0D0D 1px, transparent 1px), linear-gradient(90deg, #0D0D0D 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-[#1AA3D905] to-transparent" />

                {/* Top Bar: Primary Identity - Compressed Padding */}
                <div className="w-full pt-12 px-12 pb-8 flex justify-between items-start shrink-0 relative z-10">
                    <div className="flex flex-col gap-6">
                        <a href="https://www.weblozy.com" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                            <img
                                src="/images/banner_image.png"
                                alt="Weblozy"
                                className="h-16 w-auto object-contain"
                                onError={(e: any) => { e.target.src = "https://drive.google.com/uc?id=1yA2uJ5i3yUJirKxQ6ydTzrq_JIIpd-1B"; }}
                            />
                        </a>
                        <div className="w-16 h-1 bg-[#0D0D0D] rounded-full" />
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="flex flex-col items-end group">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.5em] leading-none mb-2 pr-1">{data.documentRefLabel || 'Document Reference'}</p>
                            <div className="px-5 py-2.5 bg-white border-2 border-[#0D0D0D] rounded-xl flex items-center gap-3 shadow-sm group-hover:shadow-md transition-all duration-300">
                                <div className="w-2 h-2 rounded-full bg-[#98BF45]" />
                                <p className="text-sm font-black text-[#0D0D0D] tracking-[0.1em] leading-none uppercase">{data.leadId || 'REF-2024-000'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-3">
                            <span className="w-1 h-1 rounded-full bg-[#1AA3D9]" />
                            <span className="text-[8px] font-black text-[#1AA3D9] uppercase tracking-widest">Verified Secure Protocol</span>
                        </div>
                    </div>
                </div>

                {/* Central Typography Core - Adaptive Scaling */}
                <div className="flex-1 flex flex-col justify-center px-12 relative z-10 py-8">
                    <div className="max-w-4xl space-y-8">
                        <div className="space-y-3">
                            <p className="text-[11px] font-black text-[#1AA3D9] uppercase tracking-[0.7em]">{data.frameworkLabel || 'Executive Framework'}</p>
                            <h1 className={cn(
                                "font-black text-[#0D0D0D] tracking-[-0.04em] uppercase transition-all duration-500",
                                getTitleFontSize(purpose)
                            )}>
                                {purpose.split(' ').map((word, i, arr) => (
                                    <React.Fragment key={i}>
                                        {word}{' '}
                                        {((i + 1) % 3 === 0 && i !== arr.length - 1) && <br />}
                                    </React.Fragment>
                                ))}
                            </h1>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-20 h-0.5 bg-slate-200" />
                            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.3em] leading-relaxed whitespace-pre-line">
                                {data.roadmapDescription || "Bespoke Technical & \nOperational Roadmap"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Strategic Partnership Matrix (Bottom) - Highly Compressed */}
                <div className="px-12 pb-12 pt-0 relative z-10 w-full mt-auto">
                    <div className="grid grid-cols-12 gap-0 border-t border-[#0D0D0D] pt-8">
                        <div className="col-span-4 border-r border-slate-100 pr-8">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Strategic Ally</p>
                            <div className="space-y-1">
                                <p className="text-lg font-black text-[#0D0D0D] tracking-tighter uppercase leading-[1.1]">{data.clientCompany}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight italic">Name: {data.clientName}</p>
                            </div>
                        </div>

                        <div className="col-span-4 border-r border-slate-100 px-8">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Industry Domain</p>
                            <div className="space-y-1">
                                <p className="text-lg font-black text-[#0D0D0D] tracking-tighter uppercase leading-[1.1] text-wrap">{data.industry}</p>
                                <p className="text-[10px] font-black text-[#1AA3D9] uppercase tracking-widest">Enterprise Sector</p>
                            </div>
                        </div>

                        <div className="col-span-4 pl-8">
                            <div className="flex justify-between items-start h-full">
                                <div className="space-y-2">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Release Protocol</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(data.proposalStatus || "CONFIDENTIAL, STABLE-V2").split(',').map((status, idx) => (
                                            <div key={idx} className={cn(
                                                "px-1.5 py-0.5 rounded text-[8px] font-black uppercase",
                                                idx === 0 ? "bg-slate-100 text-slate-600" : "bg-[#98BF4510] text-[#98BF45]"
                                            )}>
                                                {status.trim()}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Filing Date</p>
                                    <p className="text-base font-black text-[#0D0D0D] uppercase tracking-tighter italic whitespace-nowrap">
                                        {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] pt-6 border-t border-slate-50">
                        <p>© {new Date().getFullYear()} {data.companyName.toUpperCase()} SOLUTIONS • GLOBAL OPERATIONS</p>
                        <a href="https://www.weblozy.com" target="_blank" rel="noopener noreferrer" className="text-[#1AA3D9] hover:underline underline-offset-4">WWW.WEBLOZY.COM</a>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
