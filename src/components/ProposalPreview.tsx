import React from 'react';
import { ProposalData, AVAILABLE_MODULES } from '../types';
import {
  CoverPage, AboutSection, ProblemSection,
  FlowchartSection, ModulesSection,
  PricingSection, PortfolioSection, TermsSection, CTASection,
  FutureExpansionSection
} from './ProposalSections';
import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'motion/react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { Download, Edit3, Eye, Share2, FileText, File as FileIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProposalPreviewProps {
  data: ProposalData;
  onEdit: () => void;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ data, onEdit }) => {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportProgress, setExportProgress] = React.useState(0);
  const [exportStatus, setExportStatus] = React.useState('');
  const [showFormatPortal, setShowFormatPortal] = React.useState(false);

  // Helper to calculate total pages and specific page numbers
  const getPages = () => {
    const pages: { id: string, props: any }[] = [];
    let currentPage = 1;

    // Calculate dynamic pricing to determine if pricing section should be visible
    const modulesMap = new Map();
    AVAILABLE_MODULES.forEach(m => modulesMap.set(m.id, m));
    data.customModules.forEach(m => modulesMap.set(m.id, m));
    const selectedModules = data.selectedModules.map(id => modulesMap.get(id)).filter(Boolean);

    const modulesTotal = selectedModules.reduce((acc, m) => {
      const featuresPrice = m.features.reduce((fAcc, f: any) => f.isSelected ? fAcc + (f.price || 0) : fAcc, 0);
      return acc + m.price + featuresPrice;
    }, 0);
    const subtotal = data.basePrice + modulesTotal;
    const discountAmount = data.discountType === 'percent' ? (subtotal * data.discount / 100) : data.discount;
    const finalPrice = subtotal - discountAmount - data.additionalDiscount;

    data.selectedPages.forEach((pageId) => {
      // Hide pricing section if no amount is added (finalPrice <= 0)
      if (pageId === 'pricing' && finalPrice <= 0) return;

      if (pageId === 'modules') {
        let numBatches = 0;
        let currentBatchWeight = 0;
        const PAGE_HEIGHT_LIMIT = 800;

        selectedModules.forEach((module) => {
          const selectedFeaturesCount = module.features.filter((f: any) => f.isSelected).length;
          // Rule: If > 10 features, take half a page (2 per page). If <= 10, take 1/3 of a page (3 per page).
          const moduleWeight = selectedFeaturesCount > 10 ? 401 : 266;

          if (currentBatchWeight + moduleWeight > PAGE_HEIGHT_LIMIT && currentBatchWeight > 0) {
            numBatches++;
            currentBatchWeight = moduleWeight;
          } else {
            currentBatchWeight += moduleWeight;
            if (numBatches === 0) numBatches = 1;
          }
        });

        if (selectedModules.length === 0) numBatches = 1;

        pages.push({ id: pageId, props: { data, pageNumber: currentPage } });
        currentPage += numBatches;
      } else {
        pages.push({ id: pageId, props: { data, pageNumber: currentPage } });
        currentPage++;
      }
    });
    return pages;
  };

  const pages = getPages();

  const exportPDF = async () => {
    if (!previewRef.current) return;
    try {
      setShowFormatPortal(false);
      setIsExporting(true);
      setExportProgress(10);
      setExportStatus('Initializing High-Res Raster...');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pagesElements = previewRef.current.querySelectorAll('.proposal-page');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pagesElements.length; i++) {
        const pageEl = pagesElements[i] as HTMLElement;
        setExportProgress(Math.floor(10 + (i / pagesElements.length) * 80));
        setExportStatus(`Processing Module ${i + 1} of ${pagesElements.length}...`);

        // Capture Logo Link Position if available
        const logoEl = pageEl.querySelector('img[alt="Weblozy"]');
        let logoLink = null;
        if (logoEl) {
          const rect = logoEl.getBoundingClientRect();
          const pageRect = pageEl.getBoundingClientRect();
          logoLink = {
            x: ((rect.left - pageRect.left) / pageRect.width) * pdfWidth,
            y: ((rect.top - pageRect.top) / pageRect.height) * pdfHeight,
            w: (rect.width / pageRect.width) * pdfWidth,
            h: (rect.height / pageRect.height) * pdfHeight
          };
        }

        // Optimized Jpeg capture for significantly lower file size (MB reduction)
        const imgData = await toJpeg(pageEl, {
          quality: 0.85,
          pixelRatio: 2.5, // Balanced for sharp text but lower weight
          backgroundColor: '#ffffff',
          style: {
            transform: 'scale(1)',
            margin: '0',
            boxShadow: 'none'
          }
        });

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

        // Re-inject clickable link for logo
        if (logoLink) {
          pdf.link(logoLink.x, logoLink.y, logoLink.w, logoLink.h, { url: 'https://www.weblozy.com' });
        }
      }

      setExportProgress(95);
      setExportStatus('Finalizing Document Metadata...');

      const fileName = `${data.clientName.replace(/\s+/g, '_')}_${data.leadId.replace(/#/g, '')}_Proposal.pdf`;
      pdf.save(fileName);
      setExportProgress(100);
      setExportStatus('Success! Download Commenced.');
      setTimeout(() => setIsExporting(false), 2000);
    } catch (error) {
      console.error('PDF Export failed:', error);
      setExportStatus('Export Interrupted. Checking buffer...');
      setTimeout(() => setIsExporting(false), 3000);
    }
  };

  const exportWord = async () => {
    setShowFormatPortal(false);
    setIsExporting(true);
    setExportProgress(20);
    setExportStatus('Constructing Word XML Structure...');

    try {
      const modulesMap = new Map();
      AVAILABLE_MODULES.forEach(m => modulesMap.set(m.id, m));
      data.customModules.forEach(m => modulesMap.set(m.id, m));
      const selectedModules = data.selectedModules.map(id => modulesMap.get(id)).filter(Boolean);

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: `PROPOSAL: ${data.proposalPurpose}`,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Client: ", bold: true }),
                new TextRun(data.clientName),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Lead ID: ", bold: true }),
                new TextRun(data.leadId),
              ],
            }),
            new Paragraph({ text: "Strategic Capable Overview", heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: data.problem }),

            new Paragraph({ text: "Proposed Solution Architecture", heading: HeadingLevel.HEADING_2 }),
            ...selectedModules.flatMap(m => [
              new Paragraph({ text: m.name, heading: HeadingLevel.HEADING_3, spacing: { before: 200 } }),
              ...m.features.filter((f: any) => f.isSelected).map(f => new Paragraph({ text: `• ${f.text}`, bullet: { level: 0 } }))
            ])
          ],
        }],
      });

      setExportProgress(70);
      setExportStatus('Finalizing DOCX Packaging...');

      const blob = await Packer.toBlob(doc);
      const fileName = `${data.clientName.replace(/\s+/g, '_')}_${data.leadId.replace(/#/g, '')}_Proposal.docx`;
      saveAs(blob, fileName);
      setExportProgress(100);
      setExportStatus('Success! Word Document Ready.');
      setTimeout(() => setIsExporting(false), 2000);
    } catch (err) {
      console.error("Word export error:", err);
      setIsExporting(false);
    }
  };

  const renderSection = (id: string, props: any) => {
    switch (id) {
      case 'cover': return <CoverPage key={id} {...props} />;
      case 'about': return <AboutSection key={id} {...props} />;
      case 'problem': return <ProblemSection key={id} {...props} />;
      case 'flowchart': return <FlowchartSection key={id} {...props} />;
      case 'modules': return <ModulesSection key={id} {...props} />;
      case 'pricing': return <PricingSection key={id} {...props} />;
      case 'portfolio': return <PortfolioSection key={id} {...props} />;
      case 'terms': return <TermsSection key={id} {...props} />;
      case 'cta': return <CTASection key={id} {...props} />;
      case 'expansion': return <FutureExpansionSection key={id} {...props} />;
      default: return null;
    }
  };

  return (
    <div className="flex-1 h-screen bg-[#F8F9FA] overflow-y-auto relative custom-scrollbar">
      {/* Toolbar */}
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#1AA3D910] rounded-full border border-[#1AA3D920]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1AA3D9] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1AA3D9]">Live Blueprint</span>
          </div>
          <p className="text-[11px] text-[#6B7280] font-black uppercase tracking-tighter">
            PROPOSAL FOR <span className="text-[#0D0D0D]">{data.clientName}</span> &bull; {pages.length} PAGES
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onEdit}
            className="px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest text-[#0D0D0D] border border-[#E5E7EB] hover:bg-white hover:border-[#0D0D0D] transition-all"
          >
            Configure
          </button>
          <div className="relative">
            <button
              onClick={() => setShowFormatPortal(!showFormatPortal)}
              disabled={isExporting}
              className="flex items-center gap-2.5 px-6 py-2 rounded-xl bg-[#0D0D0D] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#1AA3D9] transition-all disabled:opacity-50 shadow-premium"
            >
              <Download className="w-4 h-4" />
              Generate Proposal
            </button>

            {/* FORMAT SELECTION PORTAL */}
            <AnimatePresence>
              {showFormatPortal && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[60]"
                >
                  <button
                    onClick={exportPDF}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileIcon className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-900">Adobe PDF</p>
                      <p className="text-[8px] font-bold text-slate-400">High-Res & Ultra Lite</p>
                    </div>
                  </button>
                  <button
                    onClick={exportWord}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-900">MS Word</p>
                      <p className="text-[8px] font-bold text-slate-400">Editable Structure</p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* GLOBAL ANIMATED EXPORT OVERLAY */}
      <AnimatePresence>
        {isExporting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 text-center space-y-8"
            >
              <div className="relative w-32 h-32 mx-auto">
                {/* Circular Progress Path */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="364.42"
                    initial={{ strokeDashoffset: 364.42 }}
                    animate={{ strokeDashoffset: 364.42 - (364.42 * exportProgress) / 100 }}
                    className="text-[#1AA3D9]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900 leading-none">{exportProgress}%</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Preparing Strategy Asset</h3>
                <p className="text-[10px] font-black text-[#1AA3D9] uppercase tracking-[0.2em] animate-pulse">{exportStatus}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <CheckCircle2 className={cn("w-4 h-4", exportProgress > 30 ? "text-[#98BF45]" : "text-slate-200")} />
                  <span className="text-[9px] font-black uppercase text-slate-400">Rasterizing Visuals</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <CheckCircle2 className={cn("w-4 h-4", exportProgress > 80 ? "text-[#98BF45]" : "text-slate-200")} />
                  <span className="text-[9px] font-black uppercase text-slate-400">Embedding Links</span>
                </div>
              </div>

              {exportProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                    <CheckCircle2 className="w-3 h-3 text-[#98BF45]" />
                    Asset Dispatched
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Container */}
      <div className="py-12 px-6 flex flex-col items-center gap-8 min-w-[max-content]">
        <div ref={previewRef} className="flex flex-col items-center">
          <AnimatePresence mode="popLayout">
            {pages.map((page, index) => (
              <motion.div
                key={`${page.id}-${page.props.pageNumber}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="print:m-0 print:shadow-none"
              >
                {renderSection(page.id, page.props)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
