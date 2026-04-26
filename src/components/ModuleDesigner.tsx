import React, { useState, useEffect } from 'react';
import { Orbit, Plus, Trash2, Edit3, Check, X, Loader2, DollarSign, CheckCircle2, Circle, ChevronUp, ChevronDown } from 'lucide-react';
import { Module, ModuleFeature } from '../types';
import { fetchModuleFeatures, suggestExtraFeatures, validateModuleName } from '../services/aiService';
import { cn } from '../lib/utils';
import { getPasteColorFromString } from '../lib/colors';
import { motion, AnimatePresence } from 'motion/react';

interface ModuleDesignerProps {
  onSave: (module: Module) => void;
  onClose: () => void;
  initialModule?: Module;
}

export const ModuleDesigner: React.FC<ModuleDesignerProps> = ({ onSave, onClose, initialModule }) => {
  const [name, setName] = useState(initialModule?.name || '');
  const [features, setFeatures] = useState<ModuleFeature[]>(initialModule?.features || []);
  const [price, setPrice] = useState(initialModule?.price || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [moduleColor, setModuleColor] = useState(initialModule?.color || '#F8FAFC');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [validation, setValidation] = useState<{ isValid: boolean, suggestion?: string } | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (name.trim() && !initialModule) {
      const timer = setTimeout(async () => {
        setIsValidating(true);
        const res = await validateModuleName(name);
        setValidation(res);
        setIsValidating(false);

        // Auto-assign color if it's a new module or color hasn't been manually picked
        if (!initialModule?.color) {
          setModuleColor(getPasteColorFromString(name));
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [name]);

  const handleFetchFeatures = async () => {
    if (!name.trim()) return;
    setIsLoading(true);
    setAiError(null);
    try {
      const fetched = await fetchModuleFeatures(name, customPrompt);
      if (fetched.length === 0) {
        setAiError("Could not fetch features. Please try again or add manually.");
      }
      const newFeatures: ModuleFeature[] = fetched.map(text => ({
        id: Math.random().toString(36).substr(2, 9),
        text,
        isSelected: true
      }));
      setFeatures(newFeatures);
    } catch (e: any) {
      setAiError("AI service is busy. Using professional template.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSuggestions = async () => {
    if (!name.trim()) return;
    setIsSuggesting(true);
    try {
      const suggested = await suggestExtraFeatures(name, features.map(f => f.text));
      setSuggestions(suggested);
    } finally {
      setIsSuggesting(false);
    }
  };

  const addFeature = (text: string) => {
    if (!text.trim()) return;
    if (!features.some(f => f.text === text)) {
      setFeatures([...features, {
        id: Math.random().toString(36).substr(2, 9),
        text,
        isSelected: true
      }]);
    }
    setNewFeature('');
    setSuggestions(s => s.filter(item => item !== text));
  };

  const moveFeature = (index: number, direction: 'up' | 'down') => {
    const newFeatures = [...features];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newFeatures.length) {
      [newFeatures[index], newFeatures[targetIndex]] = [newFeatures[targetIndex], newFeatures[index]];
      setFeatures(newFeatures);
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const toggleSelection = (index: number) => {
    const updated = [...features];
    updated[index].isSelected = !updated[index].isSelected;
    setFeatures(updated);
  };

  const updateFeaturePrice = (index: number, val: string) => {
    const updated = [...features];
    const num = val === '' ? undefined : Number(val);
    updated[index].price = num;
    setFeatures(updated);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditValue(features[index].text);
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const updated = [...features];
      updated[editingIndex].text = editValue;
      setFeatures(updated);
      setEditingIndex(null);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;
    // Only save selected features to the module
    onSave({
      id: initialModule?.id || Math.random().toString(36).substr(2, 9),
      name,
      features,
      price,
      color: moduleColor
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/20 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[75vh]"
      >
        <div className="p-5 md:p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tighter">Design <span className="text-[#1AA3D9]">Module.</span></h2>
            <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Strategic AI Feature Architect</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-5 md:p-8 space-y-6 md:space-y-8 overflow-y-auto custom-scrollbar flex-1">
          {/* Module Name */}
          <div className="space-y-4">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block px-2">Module Identity</label>
            <div className="space-y-2">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Enterprise Lead Management"
                  className={cn(
                    "flex-1 px-5 py-3.5 rounded-xl bg-white border-2 transition-all outline-none font-bold text-slate-800",
                    validation?.isValid === false ? "border-red-200 focus:border-red-400" : "border-slate-100 focus:border-[#1AA3D9]"
                  )}
                />
                <button
                  onClick={handleFetchFeatures}
                  disabled={isLoading || !name.trim()}
                  className="px-6 py-3.5 rounded-xl bg-[#1AA3D9] text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 disabled:opacity-50 hover:bg-[#1A5FA3] transition-all shadow-lg shadow-blue-500/20"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Orbit className="w-4 h-4" />}
                  Analyze
                </button>
              </div>

              {isValidating && (
                <div className="flex items-center gap-2 px-4">
                  <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validating name...</span>
                </div>
              )}

              {aiError && (
                <div className="px-4 py-2 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-2">
                  <Orbit className="w-3 h-3 text-amber-500" />
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-tight">{aiError}</p>
                </div>
              )}

              {validation && !validation.isValid && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-4 py-2 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between"
                >
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">
                    Did you mean: <span className="text-red-700">{validation.suggestion}</span>?
                  </p>
                  <button
                    onClick={() => { setName(validation.suggestion || ''); setValidation(null); }}
                    className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline"
                  >
                    Auto-Correct
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Custom AI Prompt */}
          <div className="space-y-4">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block px-2">AI Guidance (Optional)</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Focus on high-frequency trading, assume a distributed architecture..."
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-100 focus:border-[#1AA3D9] outline-none font-medium text-sm text-slate-600 h-20 resize-none"
            />
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest px-2 italic opacity-60">Influences AI feature generation logic</p>
          </div>

          {/* Module Appearance */}
          <div className="space-y-4">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block px-2">Visual Branding</label>
            <div className="flex flex-wrap gap-4 px-2">
              {[
                { name: 'Sky', hex: '#E0F2FE' },
                { name: 'Emerald', hex: '#F0FDF4' },
                { name: 'Amber', hex: '#FFFBEB' },
                { name: 'Violet', hex: '#F5F3FF' },
                { name: 'Rose', hex: '#FFF1F2' },
                { name: 'Blue', hex: '#EFF6FF' },
                { name: 'Slate', hex: '#F8FAFC' },
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setModuleColor(c.hex)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center",
                    moduleColor === c.hex ? "border-[#1AA3D9] scale-110 shadow-lg shadow-blue-500/10" : "border-transparent"
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {moduleColor === c.hex && <Check className="w-5 h-5 text-[#1AA3D9]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block px-2">Investment Value</label>
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                <DollarSign className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#F2BB16] outline-none font-black text-xl text-slate-900 shadow-inner"
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Core Features</label>
              <span className="text-[10px] font-black text-[#1AA3D9] bg-[#1AA3D9]/10 px-3 py-1 rounded-full uppercase tracking-widest">
                {features.length} Components
              </span>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "group flex items-center gap-4 p-4 rounded-2xl border transition-all",
                    feature.isSelected ? "bg-white border-slate-100 shadow-sm" : "bg-slate-50/50 border-transparent opacity-60"
                  )}
                >
                  <button
                    onClick={() => toggleSelection(index)}
                    className="shrink-0 transition-transform active:scale-90"
                  >
                    {feature.isSelected ? (
                      <CheckCircle2 className="w-6 h-6 text-[#98BF45] fill-[#98BF45]/10" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300" />
                    )}
                  </button>

                  {editingIndex === index ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        autoFocus
                        className="flex-1 bg-transparent border-b-2 border-[#1AA3D9] outline-none font-bold text-slate-700 py-1"
                      />
                      <button onClick={saveEdit} className="p-1 text-[#98BF45] hover:bg-[#98BF45]/10 rounded-lg"><Check className="w-5 h-5" /></button>
                      <button onClick={() => setEditingIndex(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 flex flex-col justify-center">
                        <span className={cn(
                          "text-sm font-bold transition-all",
                          feature.isSelected ? "text-slate-700" : "text-slate-400 line-through"
                        )}>
                          {feature.text}
                        </span>
                      </div>

                      {/* Optional Pricing */}
                      <div className={cn(
                        "flex items-center gap-1.5 bg-slate-100/80 rounded-xl px-3 py-2 transition-all",
                        feature.isSelected ? "opacity-100" : "opacity-0 pointer-events-none"
                      )}>
                        <DollarSign className="w-3 h-3 text-slate-400" />
                        <input
                          type="number"
                          placeholder="0"
                          value={feature.price === undefined ? '' : feature.price}
                          onChange={(e) => updateFeaturePrice(index, e.target.value)}
                          className="w-14 bg-transparent text-[11px] font-black outline-none placeholder:text-slate-300"
                        />
                      </div>

                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => moveFeature(index, 'up')}
                          disabled={index === 0}
                          className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-[#1AA3D9] disabled:opacity-30"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveFeature(index, 'down')}
                          disabled={index === features.length - 1}
                          className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-[#1AA3D9] disabled:opacity-30"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button onClick={() => startEditing(index)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-[#1AA3D9] transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => removeFeature(index)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Add Feature */}
            <div className="flex gap-2 p-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addFeature(newFeature)}
                placeholder="Add manual feature..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-100 text-sm outline-none focus:border-[#1AA3D9]"
              />
              <button
                onClick={() => addFeature(newFeature)}
                className="p-3 bg-slate-900 text-white rounded-xl hover:bg-[#0D0D0D] transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* AI Suggestions */}
            {features.length > 0 && (
              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">AI Recommendations</p>
                  <button
                    onClick={handleGetSuggestions}
                    disabled={isSuggesting}
                    className="text-[10px] font-black text-[#1AA3D9] uppercase tracking-widest hover:underline disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSuggesting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Orbit className="w-3 h-3" />}
                    Refresh
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => addFeature(s)}
                      className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600 hover:border-[#F2BB16] hover:text-[#F2BB16] transition-all"
                    >
                      + {s}
                    </button>
                  ))}
                  {suggestions.length === 0 && !isSuggesting && (
                    <button
                      onClick={handleGetSuggestions}
                      className="text-[10px] font-bold text-slate-400 italic hover:text-[#1AA3D9] transition-colors"
                    >
                      Click to get smart recommendations...
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-[2] px-6 py-3.5 rounded-2xl bg-[#0D0D0D] text-white font-black uppercase tracking-widest text-[10px] shadow-premium hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Save Module
          </button>
        </div>
      </motion.div>
    </div>
  );
};
