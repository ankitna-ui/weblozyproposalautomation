import React from 'react';
import { PageWrapper, SectionProps } from './PageWrapper';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const FutureExpansionSection: React.FC<SectionProps> = ({ data, pageNumber }) => {
    const items = data.futureExpansion;
    const isHighDensity = items.length > 4 || items.some(item => (item.features?.length || 0) > 8);

    return (
        <PageWrapper data={data} pageNumber={pageNumber}>
            <div className="flex flex-col gap-6 h-full">
                {/* Header - Compact */}
                <div className="flex justify-between items-start relative px-2">
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#1AA3D905] rounded-full blur-[80px] -z-10" />
                    <div>
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#1AA3D9] mb-2 block">Section 06</span>
                        <h2 className="text-4xl font-black text-[#0D0D0D] tracking-tighter leading-[0.9] uppercase">Future <br />Expansion.</h2>
                    </div>
                    <div className="text-right">
                        <div className="inline-block px-3 py-1 bg-[#0D0D0D] rounded-full">
                            <span className="text-[8px] font-black text-white uppercase tracking-widest">Scalability Matrix</span>
                        </div>
                        <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-2">v2.0 Architecture</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className={cn(
                    "grid gap-4 flex-1",
                    isHighDensity ? "grid-cols-2" : "grid-cols-1"
                )}>
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-slate-50 border border-slate-100 rounded-[2rem] overflow-hidden flex flex-col shadow-sm hover:border-[#1AA3D915] transition-all"
                        >
                            {/* Card Header with Image Overlay */}
                            <div className="relative h-20 shrink-0">
                                <img 
                                    src={item.image} 
                                    alt="" 
                                    crossOrigin="anonymous"
                                    className="w-full h-full object-cover" 
                                    onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/800/600`; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent" />
                                <div className="absolute bottom-2 left-4">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-[#1AA3D9] block mb-0.5">Phase 0{index + 1}</span>
                                    <h3 className="text-sm font-black text-[#0D0D0D] uppercase tracking-tighter">{item.title}</h3>
                                </div>
                            </div>

                            {/* card body */}
                            <div className="p-4 flex flex-col gap-3 flex-1">
                                <p className="text-[9px] text-slate-500 leading-relaxed font-medium italic">
                                    {item.description}
                                </p>

                                {item.features && item.features.length > 0 && (
                                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-2 border-t border-slate-100">
                                        {item.features.map((feature, fIndex) => (
                                            <div key={fIndex} className="flex items-center gap-1.5 group">
                                                <div className="w-1 h-1 rounded-full bg-[#98BF45] shrink-0" />
                                                <span className="text-[8px] font-bold text-slate-700 leading-none whitespace-normal uppercase tracking-tight">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty State Handle */}
                    {items.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Roadmap Pending Configuration</p>
                        </div>
                    )}
                </div>

                {/* Footer - Informational & Space Filler */}
                <div className="mt-auto grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                    <div className="p-4 bg-slate-900 rounded-[1.5rem] flex flex-col justify-center">
                        <span className="text-[7px] font-black text-[#1AA3D9] uppercase tracking-[0.2em] mb-1">Architecture</span>
                        <p className="text-white text-[9px] font-bold uppercase tracking-tight">Enterprise Scaling</p>
                    </div>
                    <div className="col-span-2 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[10px]">🚀</div>
                            <p className="text-[9px] font-medium text-slate-500 italic max-w-[200px]">"We build for the long-term, ensuring your technology never caps your ambition."</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-[#0D0D0D]">CEO & FOUNDER</p>
                            <p className="text-[7px] font-bold text-slate-400">STRATEGIC NOTE</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
