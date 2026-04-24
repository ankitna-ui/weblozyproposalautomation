import React from 'react';
import { ProposalData, AVAILABLE_MODULES, PAGES, PortfolioItem, ExpansionItem, PaymentTerm } from '../types';
import { Plus, Trash2, ChevronRight, ChevronDown, Layout, Palette, CreditCard, List, Monitor, Sparkles, Settings2, ChevronUp, Image as ImageIcon, Link as LinkIcon, Clock, Tag, GripVertical, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { ModuleDesigner } from './ModuleDesigner';

interface InputPanelProps {
  data: ProposalData;
  onChange: (data: ProposalData) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = React.useState<'basic' | 'modules' | 'flowchart' | 'pricing' | 'portfolio' | 'roadmap' | 'pages'>('basic');
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
    <div className="w-[380px] h-screen bg-[#FDFDFD] border-r border-slate-200 flex flex-col z-50 shadow-2xl">

      {/* 1. PREMIUM HEADER */}
      <div className="p-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center p-2 shadow-lg shadow-slate-200">
              <img
                src="/images/logo.png"
                alt="Weblozy Logo"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tighter leading-none">ProposeFlow</h1>
              <p className="text-[9px] font-bold text-[#1AA3D9] uppercase tracking-widest mt-1">Enterprise Engine</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
            <Settings2 className="w-5 h-5" />
          </button>
        </div>

        {/* 2. TABBED NAVIGATION */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          {[
            { id: 'basic', icon: Monitor, label: 'Basic' },
            { id: 'about', icon: Users, label: 'About' },
            { id: 'modules', icon: List, label: 'Capa' },
            { id: 'flowchart', icon: Layout, label: 'Flow' },
            { id: 'pricing', icon: CreditCard, label: 'Fin' },
            { id: 'portfolio', icon: ImageIcon, label: 'Port' },
            { id: 'roadmap', icon: Clock, label: 'Future' },
            { id: 'pages', icon: Palette, label: 'Style' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              <tab.icon className={cn("w-3.5 h-3.5", activeTab === tab.id ? "text-[#1AA3D9]" : "text-slate-400")} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-[#F8FAFC]/30">

        {/* TAB: BASIC INFO */}
        {/* TAB: BASIC INFO */}
        {activeTab === 'basic' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* SECTION 1: GLOBAL IDENTITY */}
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Layout className="w-4 h-4 text-[#1AA3D9]" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Brand Identity</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Agency Architecture</label>
                  <input
                    type="text"
                    value={data.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] focus:bg-white focus:ring-4 focus:ring-[#1AA3D905] outline-none transition-all text-sm font-bold text-slate-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Lead Architect ID</label>
                    <input
                      type="text"
                      value={data.leadId}
                      onChange={(e) => updateField('leadId', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100/50 border-2 border-transparent focus:border-[#1AA3D920] outline-none transition-all text-xs font-black text-[#1AA3D9]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Industry Domain</label>
                    <input
                      type="text"
                      value={data.industry}
                      onChange={(e) => updateField('industry', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none transition-all text-xs font-bold text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: CLIENT PORTFOLIO */}
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-[#1AA3D9]" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Strategic Ally</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Enterprise Name</label>
                  <input
                    type="text"
                    value={data.clientCompany}
                    onChange={(e) => updateField('clientCompany', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none transition-all text-sm font-black text-slate-700 uppercase tracking-tight"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Point of Contact</label>
                  <input
                    type="text"
                    value={data.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none transition-all text-sm font-bold text-slate-700"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 3: STRATEGIC INTENT */}
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#1AA3D9]" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Executive Narrative</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Proposal Subject</label>
                  <input
                    type="text"
                    value={data.proposalPurpose}
                    onChange={(e) => updateField('proposalPurpose', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none transition-all text-sm font-black text-slate-900 uppercase tracking-tight"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 4: DOCUMENT METALLURGY (COVER EXCLUSIVES) */}
            <section className="bg-slate-900 p-6 rounded-[2rem] text-white space-y-6 shadow-xl shadow-slate-200">
              <div className="flex items-center gap-2 opacity-60">
                <Settings2 className="w-4 h-4" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Front-Desk Configuration</h2>
              </div>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Release Protocol (Comma separated)</label>
                  <input
                    type="text"
                    value={data.proposalStatus}
                    onChange={(e) => updateField('proposalStatus', e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:bg-white/20 transition-all font-black text-xs uppercase"
                    placeholder="CONFIDENTIAL, STABLE-V2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Reference Group</label>
                    <input
                      type="text"
                      value={data.documentRefLabel}
                      onChange={(e) => updateField('documentRefLabel', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none font-bold text-[10px] uppercase"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Architecture Label</label>
                    <input
                      type="text"
                      value={data.frameworkLabel}
                      onChange={(e) => updateField('frameworkLabel', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none font-bold text-[10px] uppercase"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Strategic Roadmap Subtitle</label>
                  <textarea
                    value={data.roadmapDescription}
                    onChange={(e) => updateField('roadmapDescription', e.target.value)}
                    className="w-full h-20 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:bg-white/10 transition-all font-bold text-[10px] leading-relaxed resize-none"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: ABOUT US */}
        {activeTab === 'about' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* SECTION 1: CORPORATE NARRATIVE */}
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#1AA3D9]" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Corporate Identity</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Main Header</label>
                    <input
                      type="text"
                      value={data.aboutTitle}
                      onChange={(e) => updateField('aboutTitle', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none text-xs font-black text-slate-900 uppercase"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Subtitle Line</label>
                    <input
                      type="text"
                      value={data.aboutSubtitle}
                      onChange={(e) => updateField('aboutSubtitle', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none text-xs font-black text-slate-900 uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#1AA3D9] px-1">Executive Introduction</label>
                  <textarea
                    value={data.aboutIntroText}
                    onChange={(e) => updateField('aboutIntroText', e.target.value)}
                    className="w-full h-32 px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none text-[11px] font-bold text-slate-600 leading-relaxed resize-none"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 2: VISION & STATS */}
            <section className="bg-slate-900 p-6 rounded-[2rem] text-white space-y-6 shadow-xl shadow-slate-200">
              <div className="flex items-center gap-2 opacity-60">
                <Sparkles className="w-4 h-4" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Strategy & Metrics</h2>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Years Prep</label>
                    <input
                      type="number"
                      value={data.yearsExperience}
                      onChange={(e) => updateField('yearsExperience', Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 outline-none font-black text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Projects Built</label>
                    <input
                      type="number"
                      value={data.projectsDelivered}
                      onChange={(e) => updateField('projectsDelivered', Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 outline-none font-black text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#98BF45] px-1">Mastery Quote</label>
                  <textarea
                    value={data.aboutQuote}
                    onChange={(e) => updateField('aboutQuote', e.target.value)}
                    className="w-full h-20 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:bg-white/10 transition-all font-bold text-[10px] leading-relaxed resize-none italic"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Corporate Manifesto</label>
                  <textarea
                    value={data.aboutManifesto}
                    onChange={(e) => updateField('aboutManifesto', e.target.value)}
                    className="w-full h-24 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:bg-white/10 transition-all font-bold text-[10px] leading-relaxed resize-none"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 3: VISUAL ASSETS */}
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4 text-slate-400" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Section Imagery</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Img Title</label>
                  <input
                    type="text"
                    value={data.aboutImageTitle}
                    onChange={(e) => updateField('aboutImageTitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 outline-none text-[10px] font-black text-slate-900 uppercase"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Img HQ Label</label>
                  <input
                    type="text"
                    value={data.aboutImageSubtitle}
                    onChange={(e) => updateField('aboutImageSubtitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 outline-none text-[10px] font-black text-slate-900 uppercase"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: MODULES */}
        {activeTab === 'modules' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4 text-[#1AA3D9]" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Capability Map</h2>
                </div>
                <button
                  onClick={() => { setEditingModule(null); setShowModuleDesigner(true); }}
                  className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  New Module
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {activeModules.map(module => (
                  <button
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={cn(
                      "group relative px-2.5 py-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-tighter transition-all flex flex-col justify-between items-start h-24",
                      data.selectedModules.includes(module.id)
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex justify-between w-full">
                      <span className="w-6 h-6 rounded-lg bg-slate-100/10 flex items-center justify-center text-[10px]">
                        {data.selectedModules.indexOf(module.id) !== -1 ? `#${data.selectedModules.indexOf(module.id) + 1}` : ''}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); editModule(module); }} className="hover:text-cyan-400"><Settings2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <span className="truncate w-full text-left leading-tight">{module.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB: PRICING */}
        {activeTab === 'pricing' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* CARD 1: GLOBAL FISCAL PARAMETERS */}
            <section className="bg-slate-900 p-6 rounded-[2rem] text-white space-y-6 shadow-xl shadow-slate-200">
              <div className="flex items-center justify-between opacity-60">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Financial Core</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <input
                    type="number"
                    value={data.estimatedDays}
                    onChange={(e) => updateField('estimatedDays', Number(e.target.value))}
                    className="w-12 bg-transparent border-b border-white/20 text-center outline-none font-black text-xs"
                  />
                  <span className="text-[8px] font-black uppercase opacity-60">Days</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block px-1">Base Investment</label>
                    <input
                      type="number"
                      value={data.basePrice}
                      onChange={(e) => updateField('basePrice', Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:bg-white/20 transition-all font-black text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-[#1AA3D9] block px-1">Currency Nexus</label>
                    <select
                      value={data.currency}
                      onChange={(e) => updateField('currency', e.target.value)}
                      className="w-full bg-[#1AA3D9]/10 border border-[#1AA3D9]/20 rounded-xl px-4 py-3 outline-none text-[#1AA3D9] font-black text-lg appearance-none"
                    >
                      {['INR', 'USD', 'EUR', 'GBP', 'AED'].map(curr => (
                        <option key={curr} value={curr} className="text-slate-900">{curr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block px-1">Strategic Tax (%)</label>
                    <input
                      type="number"
                      value={data.taxRate}
                      onChange={(e) => updateField('taxRate', Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2 outline-none font-black text-sm"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="bg-[#98BF45]/10 border border-[#98BF45]/20 rounded-xl px-4 py-2 flex items-center justify-between">
                      <span className="text-[8px] font-black text-[#98BF45] uppercase tracking-widest">Auto-Scale</span>
                      <div className="w-2 h-2 rounded-full bg-[#98BF45] shadow-[0_0_8px_#98BF45]" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CARD 2: DISCOUNT ARCHITECTURE */}
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#98BF45]" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Rebate Engine</h2>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => updateField('discountType', 'percent')}
                    className={cn(
                      "px-2 py-1 rounded-md text-[8px] font-black transition-all",
                      data.discountType === 'percent' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"
                    )}
                  >
                    %
                  </button>
                  <button
                    onClick={() => updateField('discountType', 'flat')}
                    className={cn(
                      "px-2 py-1 rounded-md text-[8px] font-black transition-all",
                      data.discountType === 'flat' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"
                    )}
                  >
                    FLAT
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Primary Discount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={data.discount}
                      onChange={(e) => updateField('discount', Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#98BF4520] outline-none transition-all text-sm font-black text-slate-700"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">
                      {data.discountType === 'percent' ? '%' : data.currency}
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Additional Flat</label>
                  <input
                    type="number"
                    value={data.additionalDiscount}
                    onChange={(e) => updateField('additionalDiscount', Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#98BF4520] outline-none transition-all text-sm font-black text-slate-700"
                  />
                </div>
              </div>
            </section>

            {/* CARD 3: PAYMENT ROADMAP */}
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-slate-400" />
                  <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Terms & Milestones</h2>
                </div>
                <button onClick={addPaymentTerm} className="text-[#1AA3D9] text-[10px] font-black uppercase tracking-wider hover:bg-slate-50 px-2 py-1 rounded-lg transition-colors">+ Add Step</button>
              </div>
              <div className="space-y-3">
                {data.paymentTerms.map((term) => (
                  <div key={term.id} className="flex gap-3 items-center group bg-slate-50 p-3 rounded-2xl border border-transparent hover:border-[#1AA3D920] transition-all">
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={term.label}
                        onChange={(e) => updatePaymentTerm(term.id, 'label', e.target.value)}
                        className="w-full bg-transparent text-[11px] font-black text-slate-700 outline-none uppercase placeholder:text-slate-300"
                      />
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1AA3D9]" style={{ width: `${term.percentage}%` }} />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 w-6">{term.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-20 bg-white border border-slate-200 rounded-xl px-2 flex items-center shadow-sm">
                      <input
                        type="number"
                        value={term.percentage}
                        onChange={(e) => updatePaymentTerm(term.id, 'percentage', Number(e.target.value))}
                        className="w-full bg-transparent text-[11px] font-black text-center outline-none py-2"
                      />
                    </div>
                    <button onClick={() => removePaymentTerm(term.id)} className="opacity-0 group-hover:opacity-100 text-red-400 p-1.5 hover:bg-white rounded-lg transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
              {data.paymentTerms.reduce((sum, t) => sum + t.percentage, 0) !== 100 && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">
                    Milestone total must be 100% (Current: {data.paymentTerms.reduce((sum, t) => sum + t.percentage, 0)}%)
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-[#1AA3D9]" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Showcase (Max 4)</h2>
              </div>
              <button onClick={addPortfolio} className="bg-slate-900 text-white p-2 rounded-lg hover:bg-[#1AA3D9] transition-colors"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              {data.portfolio.map((p, idx) => (
                <div key={p.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 group">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">0{idx + 1}</div>
                    <button onClick={() => removePortfolio(p.id)} className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-4">
                    <input
                      value={p.name}
                      onChange={(e) => updatePortfolio(p.id, 'name', e.target.value)}
                      className="w-full bg-transparent font-black text-sm uppercase tracking-tight outline-none border-b border-transparent focus:border-slate-100"
                      placeholder="Project Name..."
                    />
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl text-[10px] text-slate-400 font-mono overflow-hidden">
                      <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                      <input
                        value={p.url}
                        onChange={(e) => updatePortfolio(p.id, 'url', e.target.value)}
                        className="w-full bg-transparent outline-none truncate"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="space-y-6">
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1AA3D9]" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Future Milestones</h2>
                </div>
                <button onClick={addExpansion} className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase">+ Phase</button>
              </div>
              <div className="space-y-6">
                {data.futureExpansion.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 group">
                    <div className="flex justify-between items-start">
                      <input
                        value={item.title}
                        onChange={(e) => updateExpansion(item.id, 'title', e.target.value)}
                        className="flex-1 bg-transparent font-black text-xs uppercase tracking-tight text-[#1AA3D9] outline-none"
                        placeholder="Phase Title..."
                      />
                      <button onClick={() => removeExpansion(item.id)} className="opacity-0 group-hover:opacity-100 text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateExpansion(item.id, 'description', e.target.value)}
                      className="w-full bg-slate-50/50 p-3 rounded-2xl text-[10px] font-bold text-slate-500 outline-none h-20 resize-none leading-relaxed"
                      placeholder="Describe the vision..."
                    />
                    <div className="flex gap-2 items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      <ImageIcon className="w-3.5 h-3.5 text-slate-300" />
                      <input
                        value={item.image}
                        onChange={(e) => updateExpansion(item.id, 'image', e.target.value)}
                        className="w-full bg-transparent text-[8px] font-mono text-slate-400 outline-none truncate"
                        placeholder="Visual Asset URL..."
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
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-[#1AA3D9]" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Flowchart Visual</h2>
              </div>

              <div className="space-y-4">
                {data.flowchartImage && (
                  <div className="relative group aspect-video rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                    <img
                      src={data.flowchartImage}
                      alt="Flowchart Preview"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-[9px] font-black text-white uppercase tracking-widest">Active Visual</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Section Subtitle</label>
                      <input
                        type="text"
                        value={data.flowchartSubtitle}
                        onChange={(e) => updateField('flowchartSubtitle', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none text-[11px] font-bold text-slate-700"
                        placeholder="e.g., Section 04"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Page Title</label>
                      <input
                        type="text"
                        value={data.flowchartTitle}
                        onChange={(e) => updateField('flowchartTitle', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none text-[11px] font-black text-slate-900"
                        placeholder="e.g., Flowchart."
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Narrative Description</label>
                    <input
                      type="text"
                      value={data.flowchartNote}
                      onChange={(e) => updateField('flowchartNote', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none text-[11px] font-bold text-slate-600"
                      placeholder="Enter subtle roadmap note..."
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <LinkIcon className="w-3.5 h-3.5 text-[#1AA3D9]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Paste Image URL..."
                      value={data.flowchartImage?.startsWith('data:') ? '' : data.flowchartImage}
                      onChange={(e) => updateField('flowchartImage', e.target.value)}
                      className="flex-1 bg-transparent text-[10px] font-bold text-slate-600 outline-none placeholder:text-slate-300"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updateField('flowchartImage', reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-[#1AA3D940] transition-all">
                      <ImageIcon className="w-3.5 h-3.5 text-[#1AA3D9]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1AA3D9]">Upload Local File</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Architectural Note Header</label>
                      <input
                        type="text"
                        value={data.architecturalNoteTitle}
                        onChange={(e) => updateField('architecturalNoteTitle', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 text-white border-2 border-transparent focus:border-[#1AA3D9] outline-none text-[11px] font-black uppercase tracking-widest"
                        placeholder="Architectural Note"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Note Content</label>
                      <textarea
                        value={data.architecturalNoteContent}
                        onChange={(e) => updateField('architecturalNoteContent', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D920] outline-none text-[10px] font-bold text-slate-500 h-20 resize-none"
                        placeholder="Explain the technical sequence..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: STYLE & STRUCTURE */}
        {activeTab === 'pages' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#1AA3D9]" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Visual Palette</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                  <input
                    type="color"
                    value={data.theme.primaryColor}
                    onChange={(e) => updateTheme('primaryColor', e.target.value)}
                    className="w-12 h-12 rounded-xl border-4 border-white shadow-lg overflow-hidden cursor-pointer"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Primary Identity</p>
                    <input
                      type="text"
                      value={data.theme.primaryColor}
                      onChange={(e) => updateTheme('primaryColor', e.target.value)}
                      className="w-full bg-transparent text-sm font-black text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Typography Style</label>
                  <select value={data.theme.fontStyle} onChange={(e) => updateTheme('fontStyle', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#1AA3D905] text-sm font-bold outline-none appearance-none">
                    <option value="Inter">Inter (Global Sans)</option>
                    <option value="Playfair Display">Playfair (Premium Serif)</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layout className="w-4 h-4 text-[#1AA3D9]" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Active Sequence</h2>
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Drag to Sort</span>
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
                        "flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 group cursor-grab active:cursor-grabbing transition-all",
                        draggedIndex === idx ? "opacity-40 scale-[0.98] border-[#1AA3D9]" : "hover:border-slate-200"
                      )}
                    >
                      <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#1AA3D9] transition-colors" />
                      <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">{idx + 1}</div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex-1">{page.label}</span>
                      <button
                        onClick={() => togglePage(pageId)}
                        className="text-slate-300 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-50">
                <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 px-1">Master Library</h3>
                <div className="grid grid-cols-2 gap-2">
                  {PAGES.map(page => (
                    <button
                      key={page.id}
                      onClick={() => togglePage(page.id)}
                      className={cn(
                        "flex items-center gap-2 p-2.5 rounded-lg border-2 transition-all text-left",
                        data.selectedPages.includes(page.id)
                          ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200"
                          : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                      )}
                    >
                      <div className={cn(
                        "w-3 h-3 rounded border flex items-center justify-center",
                        data.selectedPages.includes(page.id) ? "bg-[#1AA3D9] border-[#1AA3D9]" : "border-slate-200"
                      )}>
                        {data.selectedPages.includes(page.id) && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-tighter truncate">{page.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

      </div >

      {showModuleDesigner && (
        <ModuleDesigner
          onClose={() => { setShowModuleDesigner(false); setEditingModule(null); }}
          onSave={handleSaveCustomModule}
          initialModule={editingModule}
        />
      )}
    </div>
  );
};
