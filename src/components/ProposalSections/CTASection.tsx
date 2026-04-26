import React from 'react';
import {
    Phone, Mail, Globe, MapPin,
    Instagram, Linkedin, Facebook, Youtube,
    ExternalLink, ArrowUpRight
} from 'lucide-react';
import { PageWrapper, SectionProps } from './PageWrapper';
import { cn } from '../../lib/utils';

export const CTASection: React.FC<SectionProps> = ({ data, pageNumber }) => {
    return (
        <PageWrapper data={data} pageNumber={pageNumber} className="bg-[#0D0D0D]" hideFooter>
            <div className="flex flex-col h-full relative overflow-hidden font-sans">
                
                {/* --- BACKGROUND ELEMENTS --- */}
                <div className="absolute top-0 right-0 w-[65%] h-full opacity-40 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-l from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent z-10" />
                    <img 
                        src="/images/contact_hero_v2.png" 
                        alt="Contact Hero" 
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                        onError={(e: any) => { e.target.src = "https://picsum.photos/seed/contact/1200/800"; }}
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#0D0D0D] to-transparent z-10" />

                <div className="flex flex-col h-full px-12 py-12 relative z-20">
                    
                    {/* --- 1. CORPORATE HEADER --- */}
                    <div className="flex justify-between items-center pb-6 border-b border-white/10 shrink-0">
                        <div className="flex items-center gap-6">
                            <img 
                                src="/images/logo.png" 
                                alt="Weblozy" 
                                crossOrigin="anonymous"
                                className="h-10 w-auto object-contain brightness-0 invert" 
                                onError={(e: any) => { e.target.src = "https://drive.google.com/uc?id=1yA2uJ5i3yUJirKxQ6ydTzrq_JIIpd-1B"; }} 
                            />
                            <div className="h-5 w-px bg-white/20" />
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Strategic Operations</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-[#1AA3D9] uppercase tracking-widest italic">Confidential Proposal &bull; 2026</span>
                        </div>
                    </div>

                    {/* --- 2. HERO SECTION --- */}
                    <div className="pt-12 pb-10 shrink-0">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full mb-4 border border-white/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1AA3D9] animate-pulse" />
                            <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em]">Establish Connection</p>
                        </div>
                        <h1 className="text-[76px] font-black text-white tracking-[-0.04em] uppercase leading-[0.8] italic">
                            Let's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1AA3D9] via-[#2563EB] to-[#98BF45]">Collaborate.</span>
                        </h1>
                    </div>

                    {/* --- 3. DYNAMIC CONTENT GRID --- */}
                    <div className="flex-grow grid grid-cols-12 gap-8 min-h-0">
                        
                        {/* LEFT COLUMN: Narrative & Info */}
                        <div className="col-span-5 flex flex-col h-full pb-6">
                            <div className="space-y-8 flex-grow">
                                <div className="space-y-5">
                                    <div className="w-20 h-1.5 bg-gradient-to-r from-[#1AA3D9] to-[#98BF45] rounded-full" />
                                    <p className="text-lg font-bold text-white/70 leading-[1.4] uppercase tracking-tight">
                                        Our architecture is engineered for precision. We are ready to deploy your strategic roadmap and scale your operations with master-grade automation.
                                    </p>
                                </div>

                                <div className="p-6 bg-white/[0.03] border border-white/10 rounded-[2rem] backdrop-blur-xl relative group overflow-hidden">
                                    <img 
                                        src="/images/support_network.png" 
                                        alt="Support Network" 
                                        crossOrigin="anonymous"
                                        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="relative z-10 space-y-3">
                                        <p className="text-[9px] font-black text-[#98BF45] uppercase tracking-[0.3em]">Support Protocol</p>
                                        <h3 className="text-base font-black text-white uppercase italic">24/7 Technical Liaison</h3>
                                        <p className="text-[11px] font-medium text-white/40 leading-relaxed">
                                            Integrated support systems ensuring zero downtime and continuous operational evolution.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* HQ ADDRESS - Moved up to avoid footer overlap */}
                            <div className="space-y-3 mt-auto">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-3.5 h-3.5 text-[#1AA3D9]" />
                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Global HQ</span>
                                </div>
                                <p className="text-[11px] font-bold text-white/60 uppercase tracking-wide leading-relaxed max-w-[280px]">
                                    {data.contactAddress}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: CONTACT CARDS */}
                        <div className="col-span-7 flex flex-col gap-4 justify-center">
                            
                            {/* Phone Card */}
                            <div className="p-6 bg-white/[0.03] rounded-[2rem] border border-white/10 flex items-center gap-6 group hover:bg-white/[0.06] hover:border-[#1AA3D9]/30 transition-all duration-500 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#1AA3D9] border border-white/5 group-hover:scale-110 transition-transform shadow-2xl shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] mb-1.5">Voice Ports</p>
                                    <div className="flex flex-col gap-0.5">
                                        <a href={`tel:${data.contactPhone1}`} className="text-2xl font-black text-white tracking-tighter hover:text-[#1AA3D9] transition-colors whitespace-nowrap">
                                            {data.contactPhone1}
                                        </a>
                                        {data.contactPhone2 && (
                                            <a href={`tel:${data.contactPhone2}`} className="text-[11px] font-bold text-white/40 tracking-widest hover:text-[#1AA3D9] transition-colors whitespace-nowrap">
                                                {data.contactPhone2}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div className="p-6 bg-white/[0.03] rounded-[2rem] border border-white/10 flex items-center gap-6 group hover:bg-white/[0.06] hover:border-[#98BF45]/30 transition-all duration-500 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#98BF45] border border-white/5 group-hover:rotate-12 transition-transform shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] mb-1.5">Digital Core</p>
                                    <a href={`mailto:${data.contactEmail}`} className="text-[13px] font-black text-white tracking-tight hover:text-[#98BF45] transition-colors block overflow-hidden text-ellipsis whitespace-nowrap">
                                        {data.contactEmail}
                                    </a>
                                </div>
                            </div>

                            {/* Website Card */}
                            <div className="p-6 bg-white/[0.03] rounded-[2rem] border border-white/10 flex items-center gap-6 group hover:bg-white/[0.06] hover:border-[#1AA3D9]/30 transition-all duration-500 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#1AA3D9] border border-white/5 group-hover:-rotate-12 transition-transform shrink-0">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] mb-1.5">Network Port</p>
                                    <a 
                                        href={data.contactWebsite.startsWith('http') ? data.contactWebsite : `https://${data.contactWebsite}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[13px] font-black text-white tracking-widest uppercase hover:text-[#1AA3D9] transition-colors block overflow-hidden text-ellipsis whitespace-nowrap"
                                    >
                                        {data.contactWebsite}
                                    </a>
                                </div>
                            </div>

                            {/* SOCIAL MEDIA STRIP */}
                            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-between backdrop-blur-3xl">
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">Digital Expansion</p>
                                <div className="flex gap-6">
                                    {[
                                        { icon: Instagram, url: data.socialInstagram, color: 'hover:text-pink-500' },
                                        { icon: Linkedin, url: data.socialLinkedin, color: 'hover:text-blue-500' },
                                        { icon: Facebook, url: data.socialFacebook, color: 'hover:text-blue-600' },
                                        { icon: Youtube, url: data.socialYoutube, color: 'hover:text-red-500' }
                                    ].map((social, i) => social.url && (
                                        <a 
                                            key={i} 
                                            href={social.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className={cn("text-white/20 transition-all hover:scale-125", social.color)}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- 4. CORPORATE FOOTER --- */}
                    <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-10">
                            <div className="flex flex-col">
                                <p className="text-[9px] font-black text-white uppercase tracking-tighter italic">Weblozy Strategic Systems</p>
                                <p className="text-[7px] font-bold text-white/30 uppercase tracking-[0.4em] mt-0.5">Global Delivery Protocol</p>
                            </div>
                            <div className="h-6 w-px bg-white/10" />
                            <p className="text-[9px] font-black text-white/15 uppercase tracking-[0.5em]">
                                &copy; 2026 WEBLOZY &bull; QUANTUM SECURED
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] italic">
                                SEC_ID // {String(pageNumber).padStart(2, '0')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* LOGO WATERMARK */}
                <div className="absolute -bottom-16 -left-16 opacity-[0.015] pointer-events-none select-none rotate-12 scale-110">
                    <img src="/images/logo.png" crossOrigin="anonymous" className="w-[500px] h-auto" alt="Watermark" />
                </div>
            </div>
        </PageWrapper>
    );
};
