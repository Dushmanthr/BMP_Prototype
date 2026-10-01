import React, { useState } from 'react';
import {
  X,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { OccasionGardenConfig } from './types';

interface GardenKeepsakeExportModalProps {
  config: OccasionGardenConfig;
  onClose: () => void;
  onDownload: () => void;
}

export const GardenKeepsakeExportModal: React.FC<GardenKeepsakeExportModalProps> = ({
  config,
  onClose,
  onDownload,
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleStartExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onDownload();
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest block">
              Digital Keepsake Archive
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Download Memory Garden
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-stone-600 font-serif leading-relaxed">
          Export this entire living keepsake for {config.personName}. Preserve every botanical
          memory blossom in high resolution for offline family archives and keepsake printing.
        </p>

        {/* Feature inclusions */}
        <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/70 text-xs text-stone-700">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>High-res printable Botanical Herbarium booklet (.PDF)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Full-resolution photo gallery & video clips (.ZIP)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Voice note recordings exported as audio files</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Standalone offline garden viewer application</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleStartExport}
            disabled={isExporting}
            id="start-garden-export-btn"
            className="w-full py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
          >
            {isExporting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Preparing Botanical Archive (.ZIP)...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Memory Garden Bundle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
