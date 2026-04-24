import React from 'react';
import { PageWrapper, SectionProps } from './PageWrapper';
import { CheckCircle2, Sparkles, Rocket, Zap, Shield, MousePointer2 } from 'lucide-react';

export const AboutSection: React.FC<SectionProps> = ({ data, pageNumber }) => (
    <PageWrapper data={data} pageNumber={pageNumber}>
        <div className="flex flex-col h-full gap-5 overflow-hidden">
            {/* Header Area */}
            <div className="flex justify-between items-end relative shrink-0">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#1AA3D910] rounded-full blur-3xl -z-10" />
                <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1AA3D9] mb-2 block font-mono">Corporate Identity</span>
                    <h2 className="text-4xl font-black text-[#0D0D0D] tracking-tighter leading-none uppercase">{data.aboutTitle} <br />{data.aboutSubtitle}</h2>
                </div>
                <div className="flex gap-4">
                    <div className="px-5 py-2.5 bg-[#0D0D0D] rounded-2xl shadow-premium inline-block">
                        <p className="text-2xl font-black text-white tracking-tighter leading-none">{data.yearsExperience}<span className="text-[#98BF45]">+</span></p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Years Precision</p>
                    </div>
                    <div className="px-5 py-2.5 bg-[#98BF45] rounded-2xl shadow-premium inline-block">
                        <p className="text-2xl font-black text-[#0D0D0D] tracking-tighter leading-none">{data.projectsDelivered}<span className="text-white">+</span></p>
                        <p className="text-[8px] font-black text-[#0D0D0D]/60 uppercase tracking-widest mt-1">Projects Built</p>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
                {/* Left Column: Intro & Why Us */}
                <div className="col-span-7 flex flex-col gap-5 min-h-0">
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex-1 overflow-hidden flex flex-col">
                        <p className="text-[10px] font-black text-[#1AA3D9] uppercase tracking-[0.3em] mb-4 shrink-0">Introduction</p>
                        <p className="text-[13px] text-slate-600 leading-relaxed font-black uppercase tracking-tight mb-6">
                            {data.aboutIntroText}
                        </p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-5 pt-6 border-t border-slate-200">
                            <div className="col-span-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Why Weblozy?</p>
                            </div>
                            {[
                                { icon: <Sparkles className="w-4 h-4 text-[#1AA3D9]" />, text: 'Creatively Customized' },
                                { icon: <Zap className="w-4 h-4 text-[#98BF45]" />, text: 'Reliably Responsive' },
                                { icon: <Shield className="w-4 h-4 text-[#1AA3D9]" />, text: 'Effortlessly Efficient' },
                                { icon: <Rocket className="w-4 h-4 text-[#98BF45]" />, text: 'Securely Streamlined' },
                                { icon: <MousePointer2 className="w-4 h-4 text-[#F2BB16]" />, text: 'Exceptionally Experiential' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="shrink-0">{item.icon}</div>
                                    <span className="text-[11px] font-black text-[#0D0D0D] uppercase tracking-tighter">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-[#0D0D0D] rounded-[2.5rem] relative overflow-hidden shrink-0 border border-white/5 shadow-2xl">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#98BF45] blur-[80px] opacity-20" />
                        <p className="text-xl font-black italic tracking-tighter text-white leading-tight text-center relative z-10 uppercase">
                            "{data.aboutQuote}"
                        </p>
                    </div>
                </div>

                {/* Right Column: Image & Services */}
                <div className="col-span-5 flex flex-col gap-5 min-h-0">
                    <div className="h-48 rounded-[3rem] overflow-hidden relative shadow-premium shrink-0 border-4 border-white">
                        <img
                            src="/images/image3.jpg"
                            alt="Agency"
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = "https://picsum.photos/seed/weblozy-team/800/600"; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 to-transparent" />
                        <div className="absolute bottom-5 left-8 text-white">
                            <p className="text-xl font-black uppercase tracking-tighter leading-none">{data.aboutImageTitle}</p>
                            <p className="text-[8px] font-bold text-white/70 tracking-[0.3em] uppercase">{data.aboutImageSubtitle}</p>
                        </div>
                    </div>

                    <div className="flex-1 p-8 rounded-[2.5rem] border border-slate-100 bg-white flex flex-col min-h-0 overflow-hidden shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 shrink-0">Full-Stack Ecosystem</p>
                        <div className="grid grid-cols-1 gap-2.5 overflow-hidden">
                            {data.services.map((service, i) => (
                                <div key={i} className="flex items-center gap-3 py-1.5 border-b border-slate-50 last:border-0 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#98BF45] shrink-0" />
                                    <span className="text-[9.5px] font-black text-slate-700 uppercase tracking-tight truncate leading-none">{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Callout */}
            <div className="p-6 bg-[#0D0D0D] rounded-[2rem] flex items-center justify-between shadow-2xl shrink-0 border border-white/5">
                <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-white shadow-glow flex items-center justify-center text-sm">✨</div>
                    <div className="max-w-[500px]">
                        <p className="text-[10px] text-white/40 font-black leading-tight uppercase tracking-widest mb-1">Weblozy Manifesto</p>
                        <p className="text-[10px] text-white/70 font-bold leading-relaxed uppercase">
                            {data.aboutManifesto}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Fiscal Status</p>
                    <p className="text-[10px] font-black text-[#1AA3D9] uppercase tracking-widest">Active Partner</p>
                </div>
            </div>
        </div>
    </PageWrapper>
);
