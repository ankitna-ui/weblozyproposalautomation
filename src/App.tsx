/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InputPanel } from './components/InputPanel';
import { ProposalPreview } from './components/ProposalPreview';
import { DEFAULT_PROPOSAL, ProposalData } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Shield, Zap, ArrowRight } from 'lucide-react';
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
    }, 2000);
  };

  if (showWelcome) {
    return (
      <div className="h-screen w-full bg-[#fcfdfe] flex flex-col items-center justify-center p-8 overflow-hidden relative">
        {/* Abstract Background Accents */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1AA3D908] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#98BF4508] rounded-full blur-[100px]" />
        <div className="absolute top-[20%] left-[-5%] w-[20%] h-[20%] bg-[#F59E0B05] rounded-full blur-[80px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl w-full flex flex-col items-center text-center z-10"
        >
          {/* Brand Identity */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <img
              src="/images/logo.png"
              alt="Weblozy"
              className="h-16 w-auto object-contain drop-shadow-sm"
              onError={(e: any) => { e.target.src = "https://drive.google.com/uc?id=1yA2uJ5i3yUJirKxQ6ydTzrq_JIIpd-1B"; }}
            />
          </motion.div>

          {/* Value Proposition */}
          <div className="space-y-6 mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 justify-center mb-2"
            >
              <div className="h-px w-8 bg-slate-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#98BF45]">Weblozy Strategic Systems</span>
              <div className="h-px w-8 bg-slate-200" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95]"
            >
              The Next Evolution of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#98BF45] via-[#1AA3D9] to-[#2563EB]">Enterprise Proposals</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Architect stunning, high-conversion strategic roadmaps in seconds.
              Built for high-growth enterprises that demand precision, speed, and Weblozy-grade aesthetics.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-6 mb-16 w-full max-w-3xl"
          >
            {[
              { icon: Sparkles, label: 'AI Driven', color: '#98BF45' },
              { icon: Shield, label: 'Secure', color: '#1AA3D9' },
              { icon: Zap, label: 'Instant', color: '#F59E0B' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md group">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{feature.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Action Core */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative"
          >
            <button
              onClick={startGenerating}
              disabled={isGenerating}
              className={cn(
                "group relative px-12 py-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] transition-all duration-500",
                isGenerating
                  ? "bg-slate-50 text-slate-400 w-80 cursor-wait"
                  : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-200 hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-slate-200 border-t-[#98BF45] rounded-full animate-spin" />
                      <span>{loadingMessages[loadingStep]}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    Enter ProposeFlow Engine
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <p className="mt-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">© 2026 Weblozy Strategic Systems</p>
          </motion.div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-[#1AA3D920] animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-2 h-2 rounded-full bg-[#98BF4520] animate-pulse [animation-delay:1s]" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <InputPanel
        data={proposalData}
        onChange={handleDataChange}
      />
      <ProposalPreview
        data={proposalData}
        onEdit={() => setShowWelcome(true)}
      />
    </div>
  );
}

