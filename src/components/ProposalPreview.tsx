import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProposalData, PAGES } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toJpeg } from 'html-to-image';
import { 
  Orbit, 
  Download, 
  ArrowLeft, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Share2, 
  Printer, 
  Edit3,
  FileText,
  Loader2,
  Monitor,
  Layers,
  Layout,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

// Import All Sections
import { 
  CoverPage, 
  AboutSection, 
  ProblemSection, 
  FlowchartSection, 
  ModulesSection, 
  PricingSection, 
  PortfolioSection, 
  TermsSection, 
  CTASection,
  FutureExpansionSection
} from './ProposalSections';

interface ProposalPreviewProps {
  data: ProposalData;
  onEdit: () => void;
  onToggleEditor?: () => void;
  isEditorOpen?: boolean;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ data, onEdit, onToggleEditor, isEditorOpen }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const [exportProgress, setExportProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [showFormatPortal, setShowFormatPortal] = useState(false);
  const [zoom, setZoom] = useState(0.85);

  // Adaptive Zoom for Mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setZoom(0.4);
      } else if (window.innerWidth < 1024) {
        setZoom(0.6);
      } else {
        setZoom(0.8);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPages = () => {
    const pages = [];
    let pageCount = 1;

    if (data.selectedPages.includes('cover')) {
      pages.push({ id: 'cover', props: { data, pageNumber: pageCount++ } });
    }
    if (data.selectedPages.includes('about')) {
      pages.push({ id: 'about', props: { data, pageNumber: pageCount++ } });
    }
    if (data.selectedPages.includes('problem')) {
      pages.push({ id: 'problem', props: { data, pageNumber: pageCount++ } });
    }
    if (data.selectedPages.includes('flowchart')) {
      pages.push({ id: 'flowchart', props: { data, pageNumber: pageCount++ } });
    }
    if (data.selectedPages.includes('modules')) {
      pages.push({ id: 'modules', props: { data, pageNumber: pageCount } });
      const modulesCount = data.selectedModules.length;
      pageCount += Math.ceil(modulesCount / 3);
    }
    if (data.selectedPages.includes('expansion')) {
      pages.push({ id: 'expansion', props: { data, pageNumber: pageCount++ } });
    }
    if (data.selectedPages.includes('pricing')) {
      pages.push({ id: 'pricing', props: { data, pageNumber: pageCount++ } });
    }
    if (data.selectedPages.includes('portfolio')) {
      pages.push({ id: 'portfolio', props: { data, pageNumber: pageCount++ } });
    }
    if (data.selectedPages.includes('terms')) {
      pages.push({ id: 'terms', props: { data, pageNumber: pageCount++ } });
    }
    if (data.selectedPages.includes('cta')) {
      pages.push({ id: 'cta', props: { data, pageNumber: pageCount++ } });
    }

    return pages;
  };

  const pages = getPages();

  const exportPDF = async () => {
    if (!previewRef.current) return;
    try {
      setShowFormatPortal(false);
      setIsExporting(true);
      setExportProgress(5);
      setExportStatus('Initializing High-Res Engine...');

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pagesElements = Array.from(previewRef.current.querySelectorAll('.proposal-page'));
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // --- Helper: Convert Image to Base64 to bypass CORS and caching issues ---
      const convertImagesToBase64 = async (container: HTMLElement) => {
        const imgs = Array.from(container.querySelectorAll('img'));
        const promises = imgs.map(async (img) => {
          try {
            if (img.src.startsWith('data:')) return;
            const response = await fetch(img.src);
            const blob = await response.blob();
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                img.src = reader.result as string;
                resolve(null);
              };
              reader.readAsDataURL(blob);
            });
          } catch (e) {
            console.warn("Base64 conversion failed for:", img.src, e);
          }
        });
        await Promise.all(promises);
      };

      for (let i = 0; i < pagesElements.length; i++) {
        const el = pagesElements[i] as HTMLElement;
        setExportStatus(`Pixel-Perfect Capture: Page ${i + 1} of ${pagesElements.length}...`);
        
        // Step 1: Force all images to Base64 to bypass CORS/Netlify issues
        await convertImagesToBase64(el);
        
        // Step 2: Extra wait for modern CSS (oklab/oklch) and fonts to settle
        await new Promise(r => setTimeout(r, 150));

        // Step 3: Capture using toJpeg (handles modern CSS perfectly)
        const imgData = await toJpeg(el, {
          quality: 0.95,
          pixelRatio: 2.5,
          cacheBust: true,
          style: { 
            transform: 'scale(1)', 
            margin: '0', 
            boxShadow: 'none', 
            borderRadius: '0',
            width: '794px', 
            height: '1123px'
          }
        });

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        
        // Detect links
        const pageRect = el.getBoundingClientRect();
        const linkElements = el.querySelectorAll('a');
        linkElements.forEach(a => {
          const rect = a.getBoundingClientRect();
          const url = a.getAttribute('href');
          if (url && (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:'))) {
            const x = ((rect.left - pageRect.left) / pageRect.width) * pdfWidth;
            const y = ((rect.top - pageRect.top) / pageRect.height) * pdfHeight;
            const w = (rect.width / pageRect.width) * pdfWidth;
            const h = (rect.height / pageRect.height) * pdfHeight;
            pdf.link(x, y, w, h, { url });
          }
        });

        setExportProgress(Math.floor(((i + 1) / pagesElements.length) * 100));
      }

      pdf.save(`${data.clientName.replace(/\s+/g, '_')}_Proposal.pdf`);
      setTimeout(() => setIsExporting(false), 1000);
    } catch (error: any) {
      console.error('Turbo Export failed:', error);
      setExportStatus('Export Interrupted');
      setTimeout(() => setIsExporting(false), 3000);
    }
  };

  const renderSection = (id: string, props: any) => {
    switch (id) {
      case 'cover': return <CoverPage key={id} {...props} />;
      case 'about': return <AboutSection key={id} {...props} />;
      case 'problem': return <ProblemSection key={id} {...props} />;
      case 'flowchart': return <FlowchartSection key={id} {...props} />;
      case 'modules': return <ModulesSection key={id} {...props} />;
      case 'expansion': return <FutureExpansionSection key={id} {...props} />;
      case 'pricing': return <PricingSection key={id} {...props} />;
      case 'portfolio': return <PortfolioSection key={id} {...props} />;
      case 'terms': return <TermsSection key={id} {...props} />;
      case 'cta': return <CTASection key={id} {...props} />;
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      {/* 1. TOP UTILITY BAR (Sticky) */}
      <div className="sticky top-0 w-full h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 z-[60] px-4 md:px-8 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={onEdit}
            className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-all font-black uppercase tracking-widest text-[9px] md:text-xs"
          >
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">Exit</span>
          </button>
          
          <div className="h-6 w-px bg-slate-200" />

          {onToggleEditor && (
             <button 
                onClick={onToggleEditor}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                  isEditorOpen ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                )}
             >
                <Layout className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEditorOpen ? "Hide Panel" : "Edit Details"}</span>
                <span className="sm:hidden">{isEditorOpen ? "Hide" : "Edit"}</span>
             </button>
          )}

          <div className="hidden md:block h-6 w-px bg-slate-200" />
          <div className="truncate max-w-[80px] sm:max-w-none">
            <h2 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tighter leading-none truncate">{data.clientName}</h2>
            <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">{data.leadId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden xl:flex items-center bg-slate-100 rounded-2xl p-1 mr-4">
            <button 
              onClick={() => setActiveTab('all')}
              className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'all' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >Full View</button>
            <button 
              onClick={() => setActiveTab('focus')}
              className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'focus' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >Focus</button>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button 
              onClick={() => setZoom(Math.max(0.4, zoom - 0.1))}
              className="p-1.5 md:p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
            ><Minimize2 className="w-3.5 h-3.5 md:w-4 h-4" /></button>
            <span className="text-[8px] md:text-[10px] font-black text-slate-400 w-8 md:w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button 
              onClick={() => setZoom(Math.min(1.2, zoom + 0.1))}
              className="p-1.5 md:p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
            ><Maximize2 className="w-3.5 h-3.5 md:w-4 h-4" /></button>
          </div>

          <button 
            onClick={exportPDF}
            disabled={isExporting}
            className="md:ml-4 px-4 md:px-8 py-2 md:py-3 bg-[#0D0D0D] text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-xs flex items-center gap-2 md:gap-3 hover:shadow-premium transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-3 h-3 md:w-4 h-4 animate-spin" /> : <Download className="w-3 h-3 md:w-4 h-4" />}
            <span className="hidden sm:inline">Generate</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {/* 2. EXPORT PROGRESS PORTAL */}
      <AnimatePresence>
        {isExporting && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md"
          >
            <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-white/10 mx-4">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1AA3D910] flex items-center justify-center">
                    <Orbit className="w-4 h-4 text-[#1AA3D9]" />
                  </div>
                  <div>
                    <h1 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Proposal Intelligence</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Drafting Protocol v2.0</p>
                  </div>
                </div>
                <span className="text-xl font-black text-white">{exportProgress}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#1AA3D9] to-[#98BF45]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${exportProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN PREVIEW CANVAS */}
      <div className="flex-1 overflow-y-auto no-scrollbar pt-12 pb-40 px-4 flex flex-col items-center">
        <div 
          ref={previewRef}
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            {pages.map((page, index) => (
              <motion.div
                key={`${page.id}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {renderSection(page.id, page.props)}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. FLOATING FORMAT TOGGLE */}
      <div className="fixed bottom-12 right-12 z-[50]">
        <button 
          onClick={() => setShowFormatPortal(!showFormatPortal)}
          className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border border-slate-100 hover:scale-110 active:scale-95 transition-all text-slate-900 relative group"
        >
          <Layout className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#1AA3D9] rounded-full border-2 border-white" />
        </button>

        <AnimatePresence>
          {showFormatPortal && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: -80 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="absolute bottom-0 right-0 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-6"
            >
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Export Protocol</p>
              <div className="space-y-2">
                <button 
                  onClick={exportPDF}
                  className="w-full p-4 rounded-2xl hover:bg-slate-50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#1AA3D9]" />
                    <span className="text-xs font-black text-slate-900 uppercase">PDF High-Res</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="h-px bg-slate-50 mx-2" />
                <button className="w-full p-4 rounded-2xl opacity-40 cursor-not-allowed flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Printer className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-black text-slate-400 uppercase">Word Doc</span>
                  </div>
                  <Orbit className="w-4 h-4 text-slate-200" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
