import React from 'react';
import { ProposalData, AVAILABLE_MODULES, PAGES, PortfolioItem, ExpansionItem, PaymentTerm } from '../types';
import { 
  Plus, Trash2, X, ChevronRight, ChevronDown, Layout, Palette, 
  CreditCard, List, Monitor, Orbit, Settings2, ChevronUp, 
  Image as ImageIcon, Link as LinkIcon, Clock, Tag, GripVertical, 
  Users, Phone, Mail, Globe, MapPin, ExternalLink, Layers, Zap, Wallet 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleDesigner } from './ModuleDesigner';

interface InputPanelProps {
  data: ProposalData;
  onChange: (data: ProposalData) => void;
  onClose?: () => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ data, onChange, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'basic' | 'about' | 'modules' | 'flowchart' | 'pricing' | 'portfolio' | 'roadmap' | 'pages' | 'contact'>('basic');
  const [showModuleDesigner, setShowModuleDesigner] = React.useState(false);
  const [editingModule, setEditingModule] = React.useState<any>(null);
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const updateField = (field: keyof ProposalData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateTheme = (field: keyof ProposalData['theme'], value: string) => {
    onChange({ ...data, theme: { ...data.theme, [field]: value } });
  };

  const addPortfolio = () => {
    if (data.portfolio.length >= 4) return;
    const newItem: PortfolioItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Project',
      url: 'https://example.com'
    };
    updateField('portfolio', [...data.portfolio, newItem]);
  };

  const removePortfolio = (id: string) => {
    updateField('portfolio', data.portfolio.filter(p => p.id !== id));
  };

  const updatePortfolio = (id: string, field: keyof PortfolioItem, value: string) => {
    updateField('portfolio', data.portfolio.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const toggleModule = (id: string) => {
    const newModules = data.selectedModules.includes(id)
      ? data.selectedModules.filter(m => m !== id)
      : [...data.selectedModules, id];
    updateField('selectedModules', newModules);
  };

  const moveModule = (id: string, direction: 'up' | 'down') => {
    const index = data.selectedModules.indexOf(id);
    if (index === -1) return;
    const newModules = [...data.selectedModules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newModules.length) {
      [newModules[index], newModules[targetIndex]] = [newModules[targetIndex], newModules[index]];
      updateField('selectedModules', newModules);
    }
  };

  const movePage = (id: string, direction: 'up' | 'down') => {
    const index = data.selectedPages.indexOf(id);
    if (index === -1) return;
    const newPages = [...data.selectedPages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newPages.length) {
      [newPages[index], newPages[targetIndex]] = [newPages[targetIndex], newPages[index]];
      updateField('selectedPages', newPages);
    }
  };

  const addExpansion = () => {
    const newItem: ExpansionItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Expansion Phase',
      description: 'Describe the upcoming feature or scale...',
      image: 'https://picsum.photos/seed/expansion/800/600',
      features: []
    };
    updateField('futureExpansion', [...data.futureExpansion, newItem]);
  };

  const removeExpansion = (id: string) => {
    updateField('futureExpansion', data.futureExpansion.filter(item => item.id !== id));
  };

  const updateExpansion = (id: string, field: keyof ExpansionItem, value: string) => {
    updateField('futureExpansion', data.futureExpansion.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSaveCustomModule = (module: any) => {
    const existingIndex = data.customModules.findIndex(m => m.id === module.id);
    let newCustomModules;
    if (existingIndex > -1) {
      newCustomModules = data.customModules.map(m => m.id === module.id ? module : m);
    } else {
      newCustomModules = [...data.customModules, module];
    }

    // Auto-select if new
    const newSelected = data.selectedModules.includes(module.id)
      ? data.selectedModules
      : [...data.selectedModules, module.id];

    onChange({
      ...data,
      customModules: newCustomModules,
      selectedModules: newSelected
    });
    setShowModuleDesigner(false);
    setEditingModule(null);
  };

  const addPaymentTerm = () => {
    const newTerm: PaymentTerm = {
      id: Math.random().toString(36).substr(2, 9),
      label: 'New Payment Milestone',
      percentage: 0
    };
    updateField('paymentTerms', [...data.paymentTerms, newTerm]);
  };

  const removePaymentTerm = (id: string) => {
    updateField('paymentTerms', data.paymentTerms.filter(t => t.id !== id));
  };

  const updatePaymentTerm = (id: string, field: keyof PaymentTerm, value: any) => {
    updateField('paymentTerms', data.paymentTerms.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addMilestoneFeature = (termId: string) => {
    updateField('paymentTerms', data.paymentTerms.map(t => 
      t.id === termId ? { ...t, features: [...(t.features || []), 'New Deliverable'] } : t
    ));
  };

  const updateMilestoneFeature = (termId: string, featureIndex: number, value: string) => {
    updateField('paymentTerms', data.paymentTerms.map(t => 
      t.id === termId ? { 
        ...t, 
        features: (t.features || []).map((f, i) => i === featureIndex ? value : f) 
      } : t
    ));
  };

  const removeMilestoneFeature = (termId: string, featureIndex: number) => {
    updateField('paymentTerms', data.paymentTerms.map(t => 
      t.id === termId ? { 
        ...t, 
        features: (t.features || []).filter((_, i) => i !== featureIndex) 
      } : t
    ));
  };

  const removeCustomModule = (id: string) => {
    onChange({
      ...data,
      customModules: data.customModules.filter(m => m.id !== id),
      selectedModules: data.selectedModules.filter(m => m !== id)
    });
  };

  const editModule = (module: any) => {
    setEditingModule(module);
    setShowModuleDesigner(true);
  };

  const getActiveModules = () => {
    const modulesMap = new Map();
    AVAILABLE_MODULES.forEach(m => modulesMap.set(m.id, m));
    data.customModules.forEach(m => modulesMap.set(m.id, m));
    return Array.from(modulesMap.values());
  };

  const activeModules = getActiveModules();

  const togglePage = (id: string) => {
    const newPages = data.selectedPages.includes(id)
      ? data.selectedPages.filter(p => p !== id)
      : [...data.selectedPages, id];
    updateField('selectedPages', newPages);
  };

  return (
    <div className="w-full h-screen bg-[#F8FAFC] border-l border-slate-200 flex flex-col z-50 shadow-2xl relative overflow-hidden">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>

      {/* 0. CINEMATIC BACKGROUND ACCENT */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#1AA3D905] to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* 1. PREMIUM HEADER */}
      <div className="p-8 border-b border-slate-100 bg-white/80 backdrop-blur-2xl sticky top-0 z-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#0D0D0D] rounded-2xl flex items-center justify-center p-3 shadow-2xl group transition-all hover:scale-110 active:scale-95">
              <img
                src="/images/logo.png"
                alt="Weblozy"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none uppercase italic">FlowEngine</h1>
                <div className="px-2 py-0.5 bg-[#1AA3D910] rounded-md border border-[#1AA3D920]">
                    <span className="text-[8px] font-black text-[#1AA3D9] uppercase tracking-widest">Enterprise</span>
                </div>
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2 drop-shadow-sm">v2.0 // System Operational</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:flex w-11 h-11 items-center justify-center bg-white hover:bg-slate-50 rounded-xl text-slate-400 transition-all shadow-sm border border-slate-100 hover:border-[#1AA3D920]">
              <Settings2 className="w-5 h-5" />
            </button>
            {onClose && (
              <button 
                onClick={onClose}
                className="lg:hidden w-11 h-11 flex items-center justify-center bg-slate-950 text-white rounded-xl shadow-xl active:scale-90 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* 2. TABBED NAVIGATION */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 rounded-2xl overflow-x-auto no-scrollbar border border-slate-200/50 backdrop-blur-sm">
          {[
            { id: 'basic', icon: Monitor, label: 'Cover' },
            { id: 'about', icon: Users, label: 'About' },
            { id: 'flowchart', icon: Layout, label: 'Flow' },
            { id: 'modules', icon: List, label: 'Modules' },
            { id: 'pricing', icon: CreditCard, label: 'Project Investment' },
            { id: 'portfolio', icon: ImageIcon, label: 'Showcase' },
            { id: 'roadmap', icon: Clock, label: 'Future' },
            { id: 'contact', icon: Phone, label: 'Connect' },
            { id: 'pages', icon: Palette, label: 'Design' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2.5 px-5 py-3 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-lg shadow-slate-200/50 scale-[1.02] border border-slate-100"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
              )}
            >
              <tab.icon className={cn("w-4 h-4 transition-colors", activeTab === tab.id ? "text-[#1AA3D9]" : "text-slate-400")} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 pb-40 space-y-12 custom-scrollbar relative z-10">

        {/* TAB: BASIC INFO */}
        {activeTab === 'basic' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* SECTION 1: GLOBAL IDENTITY */}
            <section className="premium-card p-8 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#1AA3D905] to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1AA3D910] flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-[#1AA3D9]" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Brand Framework</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Agency Designation</label>
                  <input
                    type="text"
                    value={data.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] focus:bg-white focus:ring-8 focus:ring-[#1AA3D905] outline-none transition-all text-sm font-bold text-slate-800 shadow-inner"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Agency Tagline (Footer)</label>
                    <input
                      type="text"
                      value={data.companyTagline}
                      onChange={(e) => updateField('companyTagline', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] focus:bg-white outline-none transition-all text-xs font-bold text-slate-600"
                      placeholder="e.g., SOLUTIONS • GLOBAL OPERATIONS"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Agency Website</label>
                    <input
                      type="text"
                      value={data.contactWebsite}
                      onChange={(e) => updateField('contactWebsite', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] focus:bg-white outline-none transition-all text-xs font-bold text-slate-600"
                      placeholder="www.weblozy.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Lead ID</label>
                    <input
                      type="text"
                      value={data.leadId}
                      onChange={(e) => updateField('leadId', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-[#1AA3D905] border-2 border-transparent focus:border-[#1AA3D9] outline-none transition-all text-xs font-black text-[#1AA3D9]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Domain Focus</label>
                    <input
                      type="text"
                      value={data.industry}
                      onChange={(e) => updateField('industry', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] outline-none transition-all text-xs font-bold text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: COVER ASSETS */}
            <section className="premium-card p-8 space-y-8 relative group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1AA3D910] flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-[#1AA3D9]" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Cover Identity Assets</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Cover Page Logo (Banner)</label>
                  <div className="grid grid-cols-[120px_1fr] gap-6 items-center">
                    <div className="relative aspect-square rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden group/logo">
                      {data.coverLogoUrl ? (
                        <img src={data.coverLogoUrl} className="w-full h-full object-contain p-2" alt="Cover Logo" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => updateField('coverLogoUrl', reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="text"
                          value={data.coverLogoUrl.startsWith('data:') ? '' : data.coverLogoUrl}
                          onChange={(e) => updateField('coverLogoUrl', e.target.value)}
                          className="bg-transparent outline-none text-[10px] font-bold text-slate-600 flex-1"
                          placeholder="Asset URL (or upload)"
                        />
                      </div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Recommended: Transparent PNG (400x160px)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: STRATEGIC MESSAGING */}
            <section className="premium-card p-8 space-y-8">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#98BF4510] flex items-center justify-center">
                    <Orbit className="w-4 h-4 text-[#98BF45]" />
                  </div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Cover Narrative</h2>
                </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Primary Proposal Purpose</label>
                  <textarea
                    value={data.proposalPurpose}
                    onChange={(e) => updateField('proposalPurpose', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#F59E0B] outline-none transition-all text-sm font-black text-slate-800 tracking-tight min-h-[100px] resize-none"
                    placeholder="e.g., Strategic Digital Transformation"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Roadmap Subtitle</label>
                  <textarea
                    value={data.roadmapDescription}
                    onChange={(e) => updateField('roadmapDescription', e.target.value)}
                    className="w-full h-24 px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#F59E0B] outline-none transition-all text-xs font-bold text-slate-600 leading-relaxed resize-none"
                    placeholder="Bespoke Technical & Operational Roadmap"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 4: CLIENT PORTFOLIO */}
            <section className="premium-card p-8 space-y-8 relative">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#98BF4510] flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#98BF45]" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Alliance Profile</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Client Organization</label>
                  <input
                    type="text"
                    value={data.clientCompany}
                    onChange={(e) => updateField('clientCompany', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#98BF45] outline-none transition-all text-sm font-black text-slate-800 uppercase tracking-tight"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Key Decision Maker</label>
                  <input
                    type="text"
                    value={data.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#98BF45] outline-none transition-all text-sm font-bold text-slate-800"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 5: DOCUMENT CONFIG */}
            <section className="bg-slate-950 p-10 rounded-[3rem] text-white space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#1AA3D910] rounded-full blur-[100px]" />
              
              <div className="flex items-center gap-3 opacity-60">
                <Settings2 className="w-5 h-5 text-[#1AA3D9]" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Protocol Metadata</h2>
              </div>

              <div className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Security Clearance Labels</label>
                  <input
                    type="text"
                    value={data.proposalStatus}
                    onChange={(e) => updateField('proposalStatus', e.target.value)}
                    className="w-full bg-white/5 border-2 border-white/5 rounded-2xl px-6 py-4 outline-none focus:bg-white/10 focus:border-[#1AA3D930] transition-all font-black text-xs uppercase tracking-[0.2em] text-[#1AA3D9]"
                    placeholder="CONFIDENTIAL // STABLE-V2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Ref ID Class</label>
                    <input
                      type="text"
                      value={data.documentRefLabel}
                      onChange={(e) => updateField('documentRefLabel', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none font-bold text-[10px] uppercase tracking-widest"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Framework ID</label>
                    <input
                      type="text"
                      value={data.frameworkLabel}
                      onChange={(e) => updateField('frameworkLabel', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none font-bold text-[10px] uppercase tracking-widest"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: ABOUT US */}
        {activeTab === 'about' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* SECTION 1: CORPORATE NARRATIVE */}
            <section className="premium-card p-8 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1AA3D910] flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#1AA3D9]" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Corporate Identity</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Main Title</label>
                    <input
                      type="text"
                      value={data.aboutTitle}
                      onChange={(e) => updateField('aboutTitle', e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] outline-none text-xs font-black text-slate-900 uppercase italic tracking-tighter"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Descriptor</label>
                    <input
                      type="text"
                      value={data.aboutSubtitle}
                      onChange={(e) => updateField('aboutSubtitle', e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] outline-none text-xs font-black text-slate-900 uppercase italic tracking-tighter"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AA3D9] px-1">Executive Summary</label>
                  <textarea
                    value={data.aboutIntroText}
                    onChange={(e) => updateField('aboutIntroText', e.target.value)}
                    className="w-full h-40 px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] outline-none text-sm font-bold text-slate-600 leading-relaxed resize-none shadow-inner"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* SECTION 2: VISION & STATS */}
            <section className="bg-slate-950 p-10 rounded-[3rem] text-white space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-[#98BF4510] rounded-full blur-[80px]" />
              
              <div className="flex items-center gap-3 opacity-60">
                <Orbit className="w-5 h-5 text-[#98BF45]" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Vision & Metrics</h2>
              </div>
              <div className="space-y-8 relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Legacy Years</label>
                    <input
                      type="number"
                      value={data.yearsExperience}
                      onChange={(e) => updateField('yearsExperience', Number(e.target.value))}
                      className="w-full bg-white/5 border-2 border-white/5 rounded-2xl px-6 py-4 outline-none focus:bg-white/10 transition-all font-black text-sm text-[#98BF45]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Units Delivered</label>
                    <input
                      type="number"
                      value={data.projectsDelivered}
                      onChange={(e) => updateField('projectsDelivered', Number(e.target.value))}
                      className="w-full bg-white/5 border-2 border-white/5 rounded-2xl px-6 py-4 outline-none focus:bg-white/10 transition-all font-black text-sm text-[#98BF45]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#98BF45] px-1">Corporate Quote</label>
                  <textarea
                    value={data.aboutQuote}
                    onChange={(e) => updateField('aboutQuote', e.target.value)}
                    className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:bg-white/10 transition-all font-bold text-xs leading-relaxed resize-none italic text-slate-300"
                  ></textarea>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Manifesto Directive</label>
                  <textarea
                    value={data.aboutManifesto}
                    onChange={(e) => updateField('aboutManifesto', e.target.value)}
                    className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:bg-white/10 transition-all font-bold text-xs leading-relaxed resize-none text-slate-400"
                  ></textarea>
                </div>
              </div>
            </section>
          </div>
        )}



        {/* TAB: MODULES */}
        {activeTab === 'modules' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="premium-card p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1AA3D910] flex items-center justify-center">
                    <List className="w-4 h-4 text-[#1AA3D9]" />
                  </div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Capability Map</h2>
                </div>
                <button
                  onClick={() => { setEditingModule(null); setShowModuleDesigner(true); }}
                  className="bg-[#0D0D0D] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all shadow-premium active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Forge Module
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {activeModules.map(module => (
                  <div
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={cn(
                      "group relative px-4 py-5 rounded-2xl border-2 transition-all flex flex-col justify-between items-start h-32 cursor-pointer overflow-hidden",
                      data.selectedModules.includes(module.id)
                        ? "bg-slate-950 border-slate-950 text-white shadow-xl shadow-slate-200"
                        : "bg-white border-slate-100 text-slate-600 hover:border-[#1AA3D920] hover:bg-slate-50/50 shadow-sm"
                    )}
                  >
                    {/* Background Index Decor */}
                    <span className="absolute -bottom-4 -right-2 text-[60px] font-black opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                      {data.selectedModules.indexOf(module.id) !== -1 ? `${data.selectedModules.indexOf(module.id) + 1}` : ''}
                    </span>

                    <div className="flex justify-between w-full relative z-10">
                        <div className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black border transition-colors",
                          data.selectedModules.includes(module.id)
                            ? "bg-white/10 border-white/10 text-white"
                            : "bg-slate-50 border-slate-100 text-slate-300"
                        )}>
                          {data.selectedModules.includes(module.id) ? <Zap className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                        </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <button 
                          onClick={(e) => { e.stopPropagation(); editModule(module); }} 
                          className="hover:text-[#1AA3D9] p-1.5 rounded-lg bg-white shadow-sm border border-slate-100 transition-all text-slate-400"
                        >
                          <Settings2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-tight leading-tight relative z-10 w-full text-left line-clamp-2">
                      {module.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB: PRICING */}
        {activeTab === 'pricing' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-slate-950 p-8 rounded-[2rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#1AA3D910] rounded-full blur-[100px]" />
              
              <div className="flex items-center justify-between opacity-60 relative z-10">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#1AA3D9]" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Investment Blueprint</h2>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="number"
                    value={data.estimatedDays}
                    onChange={(e) => updateField('estimatedDays', Number(e.target.value))}
                    className="w-10 bg-transparent text-center outline-none font-black text-xs text-white"
                  />
                  <span className="text-[7px] font-black uppercase tracking-widest text-slate-500">Days</span>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 px-1">Base Investment</label>
                    <input
                      type="number"
                      value={data.basePrice}
                      onChange={(e) => updateField('basePrice', Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:bg-white/10 focus:border-[#1AA3D940] transition-all font-black text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-[#1AA3D9] px-1">Currency</label>
                    <select
                      value={data.currency}
                      onChange={(e) => updateField('currency', e.target.value as any)}
                      className="w-full bg-[#1AA3D910] border border-white/5 rounded-xl px-4 py-3 outline-none text-[#1AA3D9] font-black text-lg appearance-none"
                    >
                      {['INR', 'USD', 'EUR', 'GBP', 'AED'].map(curr => (
                        <option key={curr} value={curr} className="text-slate-900">{curr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 px-1">Fiscal Tax (%)</label>
                    <input
                      type="number"
                      value={data.taxRate}
                      onChange={(e) => updateField('taxRate', Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 outline-none font-black text-xs"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="bg-[#98BF4510] border border-[#98BF4520] rounded-xl px-4 py-2.5 flex items-center justify-between">
                      <span className="text-[8px] font-black text-[#98BF45] uppercase tracking-widest">Auto-Scale</span>
                      <div className="w-2 h-2 rounded-full bg-[#98BF45] shadow-[0_0_10px_#98BF45]" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="premium-card p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#98BF4510] flex items-center justify-center">
                    <Tag className="w-4 h-4 text-[#98BF45]" />
                  </div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Rebate Matrix</h2>
                </div>
                <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
                  <button
                    onClick={() => updateField('discountType', 'percent')}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-[9px] font-black transition-all uppercase tracking-widest",
                      data.discountType === 'percent' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    %
                  </button>
                  <button
                    onClick={() => updateField('discountType', 'flat')}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-[9px] font-black transition-all uppercase tracking-widest",
                      data.discountType === 'flat' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Flat
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Primary Rebate</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={data.discount}
                      onChange={(e) => updateField('discount', Number(e.target.value))}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#98BF45] outline-none transition-all text-sm font-black text-slate-800"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[11px] font-black text-slate-300">
                      {data.discountType === 'percent' ? '%' : data.currency}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Bonus Deduction</label>
                  <input
                    type="number"
                    value={data.additionalDiscount}
                    onChange={(e) => updateField('additionalDiscount', Number(e.target.value))}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#98BF45] outline-none transition-all text-sm font-black text-slate-800"
                  />
                </div>
              </div>
            </section>

            <section className="premium-card p-10 space-y-10 border-slate-200/60 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1AA3D908] border border-[#1AA3D915] flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-[#1AA3D9]" />
                  </div>
                  <div>
                    <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-900">Investment Milestones</h2>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Structure the fiscal release cycle</p>
                  </div>
                </div>
                <button 
                  onClick={addPaymentTerm} 
                  className="bg-slate-950 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center gap-2 hover:bg-slate-800"
                >
                  <Plus className="w-4 h-4" />
                  Add Milestone
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {data.paymentTerms.map((term, idx) => (
                  <div key={term.id} className="p-6 bg-white rounded-[2rem] border border-slate-100 space-y-6 relative group shadow-sm">
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-slate-950 text-white flex items-center justify-center rounded-xl shadow-lg font-black text-[10px] italic z-10">
                       {idx + 1}
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-1.5">
                          <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 px-1">Phase Designation</label>
                          <input
                            type="text"
                            value={term.label}
                            onChange={(e) => updatePaymentTerm(term.id, 'label', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 focus:border-[#1AA3D9] focus:bg-white rounded-xl px-4 py-2.5 outline-none font-bold text-xs text-slate-800 transition-all"
                            placeholder="Phase name..."
                          />
                        </div>
                        <div className="w-24 space-y-1.5">
                          <label className="text-[8px] font-black uppercase tracking-widest text-[#1AA3D9] px-1">Share (%)</label>
                          <div className="relative">
                              <input
                              type="number"
                              value={term.percentage}
                              onChange={(e) => updatePaymentTerm(term.id, 'percentage', Number(e.target.value))}
                              className="w-full bg-[#1AA3D905] border border-[#1AA3D910] focus:border-[#1AA3D9] rounded-xl px-3 py-2.5 outline-none font-black text-xs text-[#1AA3D9] text-center"
                              />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                        <div className="flex justify-between items-center px-1">
                          <div className="flex items-center gap-2">
                              <Layers className="w-3 h-3 text-slate-400" />
                              <label className="text-[7px] font-black uppercase tracking-widest text-slate-500">Deliverables</label>
                          </div>
                          <button 
                            onClick={() => addMilestoneFeature(term.id)}
                            className="text-[7px] font-black text-[#1AA3D9] uppercase tracking-widest hover:underline"
                          >
                            + Add Item
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {(term.features || []).map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-100 shadow-sm group/feat">
                              <div className="w-1 h-1 rounded-full bg-[#1AA3D9] shrink-0" />
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => updateMilestoneFeature(term.id, fIdx, e.target.value)}
                                className="flex-1 bg-transparent outline-none text-[10px] font-bold text-slate-600"
                                placeholder="Feature..."
                              />
                              <button 
                                onClick={() => removeMilestoneFeature(term.id, fIdx)}
                                className="p-1 text-slate-300 hover:text-red-500"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => removePaymentTerm(term.id)}
                      className="absolute -right-2 -top-2 w-7 h-7 bg-white text-slate-300 rounded-lg border border-slate-100 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1AA3D910] flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-[#1AA3D9]" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Showcase Matrix</h2>
              </div>
              <button 
                onClick={addPortfolio} 
                className="w-10 h-10 bg-[#0D0D0D] text-white rounded-xl hover:bg-slate-800 flex items-center justify-center transition-all shadow-premium"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              {data.portfolio.map((p, idx) => (
                <div key={p.id} className="premium-card p-8 space-y-6 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-[2rem] flex items-center justify-center">
                    <span className="text-xs font-black text-slate-300">0{idx + 1}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block px-1">Project Identifier</label>
                        <input
                          value={p.name}
                          onChange={(e) => updatePortfolio(p.id, 'name', e.target.value)}
                          className="w-full bg-transparent font-black text-base uppercase tracking-tight outline-none border-b-2 border-slate-100 focus:border-[#1AA3D9] transition-all pb-2 text-slate-900"
                          placeholder="ENTER PROJECT NAME..."
                        />
                      </div>
                      <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl text-[11px] text-slate-400 font-bold border border-slate-100 shadow-inner">
                        <LinkIcon className="w-4 h-4 text-[#1AA3D9] shrink-0" />
                        <input
                          value={p.url}
                          onChange={(e) => updatePortfolio(p.id, 'url', e.target.value)}
                          className="w-full bg-transparent outline-none truncate text-slate-600"
                          placeholder="https://showcase-url.com"
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removePortfolio(p.id)} 
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 bg-red-50 text-red-500 p-2.5 rounded-xl transition-all hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="space-y-10">
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#98BF4510] flex items-center justify-center">
                    <Orbit className="w-4 h-4 text-[#98BF45]" />
                  </div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Future Trajectory</h2>
                </div>
                <button 
                  onClick={addExpansion} 
                  className="bg-[#0D0D0D] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-premium active:scale-95 transition-all"
                >
                  + Add Phase
                </button>
              </div>
              <div className="space-y-8">
                {data.futureExpansion.map((item) => (
                  <div key={item.id} className="premium-card p-10 space-y-8 group relative overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#98BF4505] rounded-full blur-2xl" />
                    
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#98BF45] px-1">Phase Directive</label>
                        <input
                          value={item.title}
                          onChange={(e) => updateExpansion(item.id, 'title', e.target.value)}
                          className="w-full bg-transparent font-black text-lg uppercase tracking-tight text-slate-900 outline-none border-b-2 border-slate-100 focus:border-[#98BF45] transition-all pb-2"
                          placeholder="PHASE TITLE..."
                        />
                      </div>
                      <button 
                        onClick={() => removeExpansion(item.id)} 
                        className="opacity-0 group-hover:opacity-100 bg-red-50 text-red-500 p-3 rounded-2xl transition-all hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Strategic Vision</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateExpansion(item.id, 'description', e.target.value)}
                        className="w-full bg-slate-50 p-5 rounded-[2rem] text-sm font-bold text-slate-600 outline-none h-32 resize-none leading-relaxed shadow-inner border border-slate-100"
                        placeholder="Detail the next evolution..."
                      ></textarea>
                    </div>

                    <div className="flex gap-4 items-center bg-white px-6 py-4 rounded-[1.5rem] border-2 border-slate-50 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        <ImageIcon className="w-5 h-5 text-slate-300" />
                      </div>
                      <input
                        value={item.image}
                        onChange={(e) => updateExpansion(item.id, 'image', e.target.value)}
                        className="w-full bg-transparent text-[10px] font-black text-slate-400 outline-none truncate italic"
                        placeholder="PASTE VISUAL ASSET URL..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB: FLOWCHART */}
        {activeTab === 'flowchart' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="premium-card p-10 space-y-10 relative overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-[#1AA3D905] rounded-full blur-[80px]" />
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1AA3D910] flex items-center justify-center">
                  <Layout className="w-4 h-4 text-[#1AA3D9]" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Logic Flow Architecture</h2>
              </div>

              <div className="space-y-8 relative z-10">
                {data.flowchartImage && (
                  <div className="relative group aspect-video rounded-[2.5rem] overflow-hidden border-4 border-slate-50 bg-slate-100 shadow-2xl">
                    <img
                      src={data.flowchartImage}
                      alt="Flowchart"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-4 bg-white rounded-2xl shadow-2xl">
                        <Monitor className="w-6 h-6 text-slate-900" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Phase Index</label>
                    <input
                      type="text"
                      value={data.flowchartSubtitle}
                      onChange={(e) => updateField('flowchartSubtitle', e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] outline-none text-xs font-black text-slate-900 uppercase"
                      placeholder="e.g., Phase 04"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Blueprint Title</label>
                    <input
                      type="text"
                      value={data.flowchartTitle}
                      onChange={(e) => updateField('flowchartTitle', e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] outline-none text-xs font-black text-slate-900 uppercase"
                      placeholder="e.g., Technical Roadmap"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Narrative Directive</label>
                  <textarea
                    value={data.flowchartNote}
                    onChange={(e) => updateField('flowchartNote', e.target.value)}
                    className="w-full h-24 px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] outline-none text-sm font-bold text-slate-600 leading-relaxed resize-none shadow-inner"
                    placeholder="Enter subtle roadmap note..."
                  ></textarea>
                </div>

                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Asset Configuration</label>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                      <LinkIcon className="w-4 h-4 text-[#1AA3D9]" />
                      <input
                        type="text"
                        placeholder="Static Image Source..."
                        value={data.flowchartImage?.startsWith('data:') ? '' : data.flowchartImage}
                        onChange={(e) => updateField('flowchartImage', e.target.value)}
                        className="flex-1 bg-transparent text-[10px] font-black text-slate-600 outline-none uppercase tracking-widest"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-[#1AA3D905] p-4 rounded-2xl border border-[#1AA3D910]">
                      <ExternalLink className="w-4 h-4 text-[#1AA3D9]" />
                      <input
                        type="text"
                        placeholder="Live Demonstration Link..."
                        value={data.flowchartDemoLink}
                        onChange={(e) => updateField('flowchartDemoLink', e.target.value)}
                        className="flex-1 bg-transparent text-[10px] font-black text-[#1AA3D9] outline-none uppercase tracking-widest"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => updateField('flowchartImage', reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center justify-center gap-3 py-5 rounded-[1.5rem] border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-[#1AA3D9] transition-all group">
                    <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-[#1AA3D9] transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900">Inject Blueprint File</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: CONTACT */}
        {activeTab === 'contact' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="premium-card p-10 space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1AA3D910] flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#1AA3D9]" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Communication Matrix</h2>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Agency Email</label>
                  <input
                    type="email"
                    value={data.contactEmail}
                    onChange={(e) => updateField('contactEmail', e.target.value)}
                    className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#1AA3D9] outline-none font-black text-slate-900 shadow-inner"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Primary Voice</label>
                    <input
                      type="text"
                      value={data.contactPhone1}
                      onChange={(e) => updateField('contactPhone1', e.target.value)}
                      className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#1AA3D9] outline-none font-black text-slate-900 shadow-inner"
                    />
                  </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Secondary Voice</label>
                      <input
                        type="text"
                        value={data.contactPhone2}
                        onChange={(e) => updateField('contactPhone2', e.target.value)}
                        className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#1AA3D9] outline-none font-black text-slate-900 shadow-inner"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Agency Website</label>
                    <input
                      type="text"
                      value={data.contactWebsite}
                      onChange={(e) => updateField('contactWebsite', e.target.value)}
                      className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#1AA3D9] outline-none font-black text-slate-900 shadow-inner"
                      placeholder="www.weblozy.com"
                    />
                  </div>
                  <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">HQ Address</label>
                  <textarea
                    value={data.contactAddress}
                    onChange={(e) => updateField('contactAddress', e.target.value)}
                    className="w-full h-28 px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] outline-none font-bold text-slate-600 shadow-inner resize-none leading-relaxed"
                    placeholder="Enter physical coordinate..."
                  ></textarea>
                </div>
              </div>
            </section>

            <section className="bg-slate-950 p-10 rounded-[3rem] text-white space-y-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#1AA3D910] rounded-full blur-[100px]" />
               <div className="flex items-center gap-3 opacity-60">
                <Globe className="w-5 h-5 text-[#1AA3D9]" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Social Ports</h2>
              </div>
              <div className="space-y-6 relative z-10">
                {([
                  { field: 'socialInstagram', label: 'Instagram', icon: ImageIcon },
                  { field: 'socialLinkedin', label: 'LinkedIn', icon: Users },
                  { field: 'socialFacebook', label: 'Facebook', icon: Layout },
                  { field: 'socialYoutube', label: 'YouTube', icon: Monitor }
                ] as const).map((social) => (
                  <div key={social.field} className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 px-1">{social.label} Directive</label>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <social.icon className="w-4 h-4 text-slate-600" />
                      <input
                        type="text"
                        value={(data as any)[social.field]}
                        onChange={(e) => updateField(social.field, e.target.value)}
                        className="w-full bg-transparent outline-none font-bold text-xs text-slate-400"
                        placeholder={`https://${social.label.toLowerCase()}.com/...`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB: PAGES / STYLING */}
        {activeTab === 'pages' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="premium-card p-10 space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1AA3D910] flex items-center justify-center">
                  <Palette className="w-4 h-4 text-[#1AA3D9]" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Visual Core Engine</h2>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Primary Chroma</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={data.theme.primaryColor}
                        onChange={(e) => updateTheme('primaryColor', e.target.value)}
                        className="w-16 h-16 rounded-2xl border-4 border-white shadow-xl cursor-pointer"
                      />
                      <input
                        type="text"
                        value={data.theme.primaryColor}
                        onChange={(e) => updateTheme('primaryColor', e.target.value)}
                        className="flex-1 bg-slate-50 px-4 py-3 rounded-xl outline-none font-black text-xs uppercase"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Typography DNA</label>
                    <select
                      value={data.theme.fontStyle}
                      onChange={(e) => updateTheme('fontStyle', e.target.value)}
                      className="w-full h-16 px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D9] outline-none text-xs font-black uppercase tracking-tighter appearance-none shadow-inner"
                    >
                      <option value="Inter">Modern // Inter</option>
                      <option value="Playfair Display">Executive // Playfair</option>
                    </select>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-100 space-y-6">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Protocol Composition</label>
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Hold to Reorder</span>
                  </div>
                  <div className="space-y-2">
                    {data.selectedPages.map((pageId, idx) => {
                      const page = PAGES.find(p => p.id === pageId);
                      if (!page) return null;
                      return (
                        <div
                          key={pageId}
                          draggable
                          onDragStart={() => setDraggedIndex(idx)}
                          onDragOver={(e) => {
                            e.preventDefault();
                            if (draggedIndex === null || draggedIndex === idx) return;
                            const newPages = [...data.selectedPages];
                            const draggedItem = newPages[draggedIndex];
                            newPages.splice(draggedIndex, 1);
                            newPages.splice(idx, 0, draggedItem);
                            setDraggedIndex(idx);
                            updateField('selectedPages', newPages);
                          }}
                          onDragEnd={() => setDraggedIndex(null)}
                          className={cn(
                            "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group cursor-grab active:cursor-grabbing",
                            draggedIndex === idx ? "bg-slate-950 text-white scale-[1.02] border-[#1AA3D9]" : "bg-white border-slate-50 hover:border-slate-200"
                          )}
                        >
                          <GripVertical className="w-4 h-4 text-slate-300" />
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shadow-lg">{idx + 1}</div>
                          <span className="text-[11px] font-black uppercase tracking-widest text-slate-700 flex-1">{page.label}</span>
                          <button onClick={() => togglePage(pageId)} className="text-slate-300 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-6">
                    {PAGES.map(page => (
                      <button
                        key={page.id}
                        onClick={() => togglePage(page.id)}
                        className={cn(
                          "flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left",
                          data.selectedPages.includes(page.id)
                            ? "bg-slate-900 border-slate-900 text-white shadow-xl"
                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                        )}
                      >
                        <div className={cn(
                          "w-3.5 h-3.5 rounded-md border-2 flex items-center justify-center",
                          data.selectedPages.includes(page.id) ? "bg-[#1AA3D9] border-[#1AA3D9]" : "bg-white border-slate-200"
                        )}>
                          {data.selectedPages.includes(page.id) && <ChevronRight className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-tighter truncate">{page.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModuleDesigner && (
          <ModuleDesigner
            initialModule={editingModule}
            onSave={handleSaveCustomModule}
            onClose={() => { setShowModuleDesigner(false); setEditingModule(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
