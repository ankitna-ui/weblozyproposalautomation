import React from 'react';
import { Cloud, CheckCircle2, ShieldCheck, Zap, BarChart3, Users } from 'lucide-react';
import { PageWrapper, SectionProps } from './PageWrapper';
import { cn } from '../../lib/utils';

export const ProblemSection: React.FC<SectionProps> = ({ data, pageNumber }) => {
    return (
        <PageWrapper data={data} pageNumber={pageNumber}>
            <div className="h-full flex flex-col gap-6 relative">
                {/* Header Section */}
                <div className="flex justify-between items-start relative">
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#1AA3D905] rounded-full blur-[60px] -z-10" />
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1AA3D9] mb-3 block">Section 03</span>
                        <h2 className="text-5xl font-black text-[#0D0D0D] tracking-tighter leading-[0.85] uppercase">Cloud Software <br />Development.</h2>
                    </div>
                    <div className="flex gap-3">
                        <div className="px-5 py-3 bg-[#0D0D0D] rounded-2xl shadow-xl flex items-center gap-3">
                            <Cloud className="w-5 h-5 text-[#1AA3D9]" />
                            <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none">Scalable Architecture</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-12 gap-8 flex-1 min-h-0 items-start">
                    {/* Left Column: Narrative Content */}
                    <div className="col-span-7 space-y-6">
                        <div className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1AA3D9] to-transparent" />
                            <p className="text-xl font-black text-[#0D0D0D] tracking-tight uppercase leading-[1.3] pl-4 italic">
                                Weblozy’s Cloud Software Development Service opens a doorway to your future business.
                            </p>
                        </div>

                        <div className="space-y-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed text-justify pr-4">
                            <p>
                                We build an avant-garde cloud solution that has to guarantee growth and triumph for your company in this digitized world. Our expert team applies advanced techniques to construct fast, secure, and user-friendly software applications.
                            </p>
                            <p>
                                We value your specific requirements and design tailored cloud systems to merge with your objective. With Weblozy, you will remain competitive and ready for the next big thing.
                            </p>
                            <p>
                                Our experts in the development of cloud software can see into your operation and have the technical prowess to bring about transformation. We will move your systems to the cloud, making you efficient, collaborate more effectively, and reduce your IT costs. In partnership with us, enjoy the freedom and flexibility of seamlessly integrated cloud-based tools.
                            </p>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-[#1AA3D920] transition-colors">
                                    <Zap className="w-5 h-5 text-[#1AA3D9]" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-[#0D0D0D] uppercase tracking-tight">Avant-Garde Technology</h4>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Advanced Techniques • Secure Construction</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image & Highlights */}
                    <div className="col-span-5 space-y-6 flex flex-col h-full">
                        {/* Architectural Blueprint Image Frame */}
                        <div className="relative group">
                            {/* Technical Grid Overlay (Subtle) */}
                            <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.15]"
                                style={{ backgroundImage: 'radial-gradient(#1AA3D9 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }} />

                            {/* Scanning Animation Line */}
                            <div className="absolute inset-x-0 h-[1.5px] bg-[#1AA3D9] z-30 shadow-[0_0_15px_#1AA3D9] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[scan_3s_ease-in-out_infinite]" />

                            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl border-4 border-white">
                                <img
                                    src="/images/image2.jpg"
                                    alt="Cloud Technology"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                    onerror={(e: any) => { e.target.src = "https://picsum.photos/seed/cloud/800/600"; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D90] to-transparent opacity-60" />
                            </div>

                            {/* Corner Brackets */}
                            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#1AA3D9] z-40" />
                            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#1AA3D9] z-40" />

                            {/* Technical Annotations */}
                            <div className="absolute -top-3 left-10 text-[7px] font-black text-[#1AA3D9] uppercase tracking-widest z-40 bg-white px-2">REF_TRANSFORM_01</div>
                            <div className="absolute -bottom-3 right-10 text-[7px] font-black text-[#1AA3D9] uppercase tracking-widest z-40 bg-white px-2">COORD: 42.09N / 11.23E</div>

                            {/* Floating Identity Badge */}
                            <div className="absolute bottom-6 left-6 right-6 z-40">
                                <div className="backdrop-blur-md bg-white/10 border border-white/20 p-3 rounded-2xl shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] leading-none mb-1">Visualizing Transformation</p>
                                    <p className="text-[8px] font-bold text-[#1AA3D9] uppercase tracking-widest leading-none">Cloud Strategy Framework v2.4</p>
                                </div>
                            </div>
                        </div>

                        <style>{`
                            @keyframes scan {
                                0% { top: 0%; opacity: 0; }
                                20% { opacity: 1; }
                                80% { opacity: 1; }
                                100% { top: 100%; opacity: 0; }
                            }
                        `}</style>

                        {/* Value Proposition Box */}
                        <div className="bg-[#0D0D0D] text-white p-6 rounded-[2.5rem] flex-1 space-y-4 border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#98BF4510] rounded-full blur-2xl" />
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#98BF45] px-1">Why Partner With Weblozy?</h3>
                            <div className="space-y-3">
                                {[
                                    "Forward-thinking experts in cloud tech",
                                    "Customized solutions for your business",
                                    "Premier security & data protection",
                                    "Continuous 24/7 technical support",
                                    "Agile systems that scale with growth"
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 items-start group">
                                        <div className="mt-0.5 shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#98BF45]" />
                                        </div>
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-300 leading-tight group-hover:text-white transition-colors">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Notice */}
                <div className="mt-auto flex justify-between items-center py-4 border-t border-slate-100">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#98BF45]" />
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Security Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-[#1AA3D9]" />
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">ROI Guaranteed</span>
                        </div>
                    </div>
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">Innovation • Continuity • Excellence</p>
                </div>
            </div>
        </PageWrapper>
    );
};
