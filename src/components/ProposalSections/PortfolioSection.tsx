import React from 'react';
import { Globe, Monitor, Zap, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PageWrapper, SectionProps } from './PageWrapper';

export const PortfolioSection: React.FC<SectionProps> = React.memo(({ data, pageNumber }) => {
    return (
        <PageWrapper data={data} pageNumber={pageNumber}>
            <div className="flex flex-col h-full min-h-0 overflow-hidden relative">
                {/* ... existing code ... */}
                <div className="basis-[8%] shrink-0 flex justify-between items-end border-b border-slate-100 pb-3">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[8px] font-black text-[#1AA3D9] uppercase tracking-widest bg-[#1AA3D910] px-2 py-0.5 rounded">Section 08</span>
                        </div>
                        <h2 className="text-3xl font-black text-[#0D0D0D] tracking-tighter leading-none uppercase italic">Project Portfolio.</h2>
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl shrink-0">
                        <div className="flex -space-x-1.5">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-4 h-4 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
                            ))}
                        </div>
                        <span className="font-black uppercase leading-none text-[7px] tracking-tight text-slate-500">Live Network</span>
                    </div>
                </div>

                <div className="basis-[4%] shrink-0 flex items-center justify-center border-b border-slate-50 overflow-hidden">
                    <div className="flex gap-10 font-black text-[8px] text-slate-300 uppercase tracking-[0.2em]">
                        <span>Identity</span>
                        <span className="text-[#1AA3D9]">Production Link</span>
                        <span>Performance</span>
                    </div>
                </div>

                <div className="flex-1 min-h-0 grid grid-cols-2 gap-x-8 gap-y-8 py-6 overflow-hidden">
                    {data.portfolio.slice(0, 4).map((project, i) => {
                        const encodedUrl = encodeURIComponent(project.url);
                        const previewUrl = `https://api.microlink.io/?url=${encodedUrl}&screenshot=true&meta=false&embed=screenshot.url`;
                        const fallbackUrl = `https://image.thum.io/get/width/800/crop/1000/${project.url}`;

                        return (
                            <div key={project.id} className="flex flex-col h-full min-h-0 group">
                                <div className="aspect-[16/10] relative bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col shrink-0 animate-pulse-subtle">
                                    <div className="h-7 bg-slate-50/50 border-b border-slate-100 flex items-center px-5 justify-between shrink-0">
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ShieldCheck className="w-2.5 h-2.5 text-[#98BF45]" />
                                            <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest">Secure</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 relative overflow-hidden bg-slate-50">
                                        <img
                                            src={previewUrl}
                                            alt={project.name}
                                            crossOrigin="anonymous"
                                            className="w-full h-full object-cover transition-all duration-1000"
                                            loading="lazy"
                                            decoding="async"
                                            onError={(e) => {
                                                const img = e.target as HTMLImageElement;
                                                if (img.src === previewUrl) {
                                                    img.src = fallbackUrl;
                                                } else if (img.src === fallbackUrl) {
                                                    img.src = `https://s0.wp.com/mshots/v1/${encodedUrl}?w=800&h=600`;
                                                } else {
                                                    img.src = `https://picsum.photos/seed/${project.id}/800/600`;
                                                }
                                            }}
                                        />
                                        <div className="absolute top-3 right-5 pointer-events-none">
                                            <span className="text-2xl font-black text-white/20 italic">0{i + 1}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* ... metadata hub ... */}
                                <div className="mt-3 space-y-2 shrink-0">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-0.5">
                                            <p className="text-[7px] font-black text-[#1AA3D9] uppercase tracking-widest leading-none">Client Showcase</p>
                                            <h3 className="text-lg font-black text-[#0D0D0D] tracking-tighter uppercase leading-none max-w-[140px] truncate">{project.name}</h3>
                                        </div>
                                        <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[#1AA3D910] transition-colors">
                                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#1AA3D9]" />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col gap-1 transition-all group-hover:bg-white group-hover:border-[#1AA3D920]">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-0.5 h-2 bg-[#98BF45] rounded-full" />
                                            <span className="text-[6px] font-black text-slate-400 uppercase tracking-widest leading-none">Active Endpoint:</span>
                                        </div>
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[8px] font-black text-slate-900 break-all leading-tight transition-colors underline decoration-slate-200 underline-offset-2"
                                        >
                                            {project.url}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="basis-[8%] shrink-0 mt-2 bg-[#0D0D0D] text-white rounded-[1.5rem] flex items-center justify-between px-10 relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1AA3D910] to-transparent" />
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="flex items-center gap-2">
                            <Zap className="text-[#98BF45] w-3.5 h-3.5" />
                            <p className="font-black uppercase tracking-[0.2em] leading-none text-[8px] text-white/90">Identity Protocol</p>
                        </div>
                        <div className="h-3.5 w-[0.5px] bg-white/20" />
                        <p className="text-white/40 font-bold uppercase leading-none text-[7px] tracking-tight">
                            Live deployments verified via global secure nodes.
                        </p>
                    </div>
                    <Monitor className="w-3.5 h-3.5 text-[#1AA3D9] relative z-10" />
                </div>
            </div>
        </PageWrapper>
    );
});
