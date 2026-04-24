import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { PageWrapper, SectionProps } from './PageWrapper';

export const FlowchartSection: React.FC<SectionProps> = ({ data, pageNumber }) => {
    const [processedImage, setProcessedImage] = useState<string>(data.flowchartImage || "");

    useEffect(() => {
        if (!data.flowchartImage) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = data.flowchartImage;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Set canvas size to match image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Configure Watermark
            const fontSize = Math.max(canvas.width, canvas.height) / 10;
            ctx.font = `900 ${fontSize}px Inter, sans-serif`;
            ctx.fillStyle = 'rgba(152, 191, 69, 0.12)'; // Weblozy Green (ultra-low opacity)
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Draw diagonal watermark (WEBLOZY ONLY)
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(-Math.PI / 6); // 30 degree diagonal
            ctx.fillText('WEBLOZY', 0, 0);
            ctx.restore();

            setProcessedImage(canvas.toDataURL('image/png'));
        };

        img.onerror = () => {
            console.warn("Could not process image for watermark. Falling back to original.");
            setProcessedImage(data.flowchartImage || "");
        };
    }, [data.flowchartImage]);

    return (
        <PageWrapper data={data} pageNumber={pageNumber}>
            <div className="flex flex-col gap-6 h-full">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1AA3D9] mb-2 block">{data.flowchartSubtitle}</span>
                        <h2 className="text-5xl font-black text-[#0D0D0D] tracking-tighter leading-none uppercase">{data.flowchartTitle}</h2>
                    </div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest max-w-[150px] text-right italic">{data.flowchartNote}</p>
                </div>

                <div className="relative flex-1 min-h-0 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden flex flex-col shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1AA3D9] via-[#98BF45] to-[#F2BB16] z-10" />

                    {/* Dynamic Flex-Scale Image Hub */}
                    <div className="flex-1 min-h-0 relative flex items-center justify-center overflow-hidden bg-[radial-gradient(#e5e7eb_0.5px,transparent_0.5px)] [background-size:15px:15px]">
                        <img
                            src={processedImage || "https://picsum.photos/seed/weblozy-flow/1200/800"}
                            alt="Flowchart Architecture"
                            className="w-full h-full object-contain p-4"
                        />
                    </div>

                    <div className="px-6 pb-6 bg-slate-50/50 border-t border-slate-100">
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {[
                                { label: 'Data Ingestion', color: '#1AA3D9' },
                                { label: 'Core Engine', color: '#98BF45' },
                                { label: 'Client Delivery', color: '#F2BB16' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-1.5">
                                    <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full w-full" style={{ backgroundColor: item.color }} />
                                    </div>
                                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-[2rem] border border-dashed border-slate-200 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                            <Lightbulb className="w-4 h-4 text-[#1AA3D9]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-[#0D0D0D] uppercase tracking-tight mb-1">{data.architecturalNoteTitle}</p>
                            <p className="text-[9px] text-slate-500 font-medium leading-relaxed uppercase">{data.architecturalNoteContent}</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
