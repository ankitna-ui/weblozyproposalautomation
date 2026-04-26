/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InputPanel } from './components/InputPanel';
import { ProposalPreview } from './components/ProposalPreview';
import { DEFAULT_PROPOSAL, ProposalData } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Orbit, Loader2, Shield, Zap, ArrowRight } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [proposalData, setProposalData] = React.useState<ProposalData>(DEFAULT_PROPOSAL);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [loadingStep, setLoadingStep] = React.useState(0);

  const loadingMessages = [
    "Initializing Weblozy Core...",
    "Architecting Proposal Logic...",
    "Syncing Digital Assets...",
    "Finalizing Interface..."
  ];

  const handleDataChange = (newData: ProposalData) => {
    setProposalData(newData);
  };

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const startGenerating = () => {
    setIsGenerating(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < loadingMessages.length) {
        setLoadingStep(step);
      } else {
        clearInterval(interval);
      }
    }, 500);

    setTimeout(() => {
      setIsGenerating(false);
      setShowWelcome(false);
      // On mobile, start with sidebar open
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(true);
      }
    }, 2000);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen w-full bg-[#fcfdfe] flex flex-col items-center justify-start md:justify-center p-4 md:p-6 relative overflow-y-auto no-scrollbar">
        {/* Cinematic Background Elements */}
        <div className="bg-mesh" />
        <div className="bg-blob top-[-5%] left-[-5%] bg-[#1AA3D9] opacity-[0.04]" />
        <div className="bg-blob bottom-[-5%] right-[-5%] bg-[#98BF45] opacity-[0.03]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl w-full flex flex-col items-center text-center z-10 py-6 md:py-10"
        >
          {/* Brand Identity */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="mb-6 relative"
          >
            <div className="premium-glow" />
            <div className="logo-container group !p-3 md:!p-4 bg-white/60">
              <img
                src="/images/logo.png"
                alt="Weblozy"
                className="h-14 md:h-16 w-auto object-contain relative drop-shadow-lg transition-transform duration-700 group-hover:rotate-[-2deg]"
                onError={(e: any) => { e.target.src = "https://drive.google.com/uc?id=1yA2uJ5i3yUJirKxQ6ydTzrq_JIIpd-1B"; }}
              />
            </div>
          </motion.div>

          {/* Value Proposition */}
          <div className="space-y-3 mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 justify-center"
            >
              <div className="h-px w-6 bg-slate-200" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#98BF45]">
                Strategic Automation Protocol
              </span>
              <div className="h-px w-6 bg-slate-200" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-tighter leading-[0.9] uppercase italic"
            >
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#1AA3D9] via-[#2563EB] to-[#98BF45]">The Future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm md:text-base text-slate-500 max-w-lg mx-auto font-medium leading-relaxed tracking-tight px-6"
            >
              Transform complex business logic into <span className="text-slate-900 font-bold">master-grade</span> technical roadmaps. 
              Engineered for <span className="text-slate-900 font-black">Precision & Velocity.</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 w-full px-6"
          >
            {[
              { icon: Orbit, label: 'Neural Scoping', color: '#1AA3D9' },
              { icon: Shield, label: 'Enterprise Grade', color: '#98BF45' },
              { icon: Zap, label: 'Instant Delivery', color: '#F59E0B' }
            ].map((feature, i) => (
              <div key={i} className="premium-card p-4 flex flex-col items-center gap-2 group cursor-default relative overflow-hidden bg-white/40 backdrop-blur-sm border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm border border-slate-100">
                  <feature.icon className="w-4 h-4" style={{ color: feature.color }} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-tight text-slate-900">{feature.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Action Core */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative w-full px-6"
          >
            <button
              onClick={startGenerating}
              disabled={isGenerating}
              className={cn(
                "group relative px-8 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-700 shadow-lg overflow-hidden w-full md:w-auto min-w-[280px]",
                isGenerating
                  ? "bg-slate-100 text-slate-400 cursor-wait"
                  : "bg-slate-950 text-white hover:shadow-glow-blue active:scale-[0.98]"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1AA3D9] via-[#2563EB] to-[#98BF45] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 border-2 border-white/20 border-t-[#1AA3D9] rounded-full animate-spin" />
                      <span className="animate-pulse tracking-[0.1em]">{loadingMessages[loadingStep]}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-3"
                  >
                    Launch ProposeFlow v2.0
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <div className="mt-6 flex flex-col items-center gap-1 opacity-50">
              <p className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">© 2026 Weblozy Strategic Systems</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="preview-main">
        <ProposalPreview
          data={proposalData}
          onEdit={() => setShowWelcome(true)}
          onToggleEditor={() => setIsSidebarOpen(!isSidebarOpen)}
          isEditorOpen={isSidebarOpen}
        />
      </div>

      <div className={cn(
        "editor-sidebar",
        !isSidebarOpen && "editor-sidebar-closed"
      )}>
        <InputPanel
          data={proposalData}
          onChange={handleDataChange}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  );
}

