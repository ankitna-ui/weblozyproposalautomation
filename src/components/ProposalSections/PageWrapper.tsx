import React from 'react';
import { ProposalData } from '../../types';
import { cn } from '../../lib/utils';

export interface SectionProps {
    data: ProposalData;
    pageNumber?: number;
}

export const PageWrapper: React.FC<{
    children: React.ReactNode;
    pageNumber?: number;
    data: ProposalData;
    hideFooter?: boolean;
    className?: string
}> = ({ children, pageNumber, data, hideFooter, className }) => (
    <div className={cn("a4-page proposal-page shadow-2xl mb-12 first:mt-8 last:mb-20 rounded-md overflow-hidden relative", !className?.includes('bg-') && "bg-white", className)}>
        {/* Page Borders/Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-slate-100/50 opacity-50" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-transparent to-slate-100/50 opacity-50" />

        <div className="a4-page-content h-full flex flex-col">
            <div className="flex-1 relative z-10 min-h-0">
                {children}
            </div>

            {!hideFooter && (
                <div className="mt-auto pt-6 flex justify-between items-end border-t border-slate-100">
                    <div className="flex items-center gap-4">
                        <a href="https://www.weblozy.com" target="_blank" rel="noopener noreferrer" className="shrink-0 transition-opacity hover:opacity-80">
                            <img
                                src="/images/banner_image.png"
                                alt="Weblozy"
                                crossOrigin="anonymous"
                                className="h-8 w-auto"
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://picsum.photos/seed/weblozy/100/50"; }}
                            />
                        </a>
                        <div className="h-4 w-px bg-slate-200" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                            {data.companyName} &bull; Confidential &copy; {new Date().getFullYear()}
                        </p>
                    </div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        {pageNumber ? `Page ${String(pageNumber).padStart(2, '0')}` : ''}
                    </div>
                </div>
            )}
        </div>
    </div>
);

export const formatPrice = (amount: number, currency: string) => {
    try {
        const localeSelection = currency === 'INR' ? 'en-IN' : 'en-US';
        return new Intl.NumberFormat(localeSelection, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    } catch (e) {
        return `${currency} ${amount.toLocaleString()}`;
    }
};
