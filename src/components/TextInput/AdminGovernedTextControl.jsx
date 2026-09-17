import React from 'react';
import { Type, Palette, AlignLeft, Calendar } from 'lucide-react';

export default function AdminGovernedTextControl({
  field,
  value = '',
  onChange
}) {
  const currentVal = typeof value === 'object' ? value.text || '' : value;
  const currentFont = typeof value === 'object' ? value.font || 'Cinzel' : 'Cinzel';
  const currentColor = typeof value === 'object' ? value.color || '#D4AF37' : '#D4AF37';

  const FONTS = ['Cinzel', 'Playfair Display', 'Plus Jakarta Sans', 'JetBrains Mono', 'Cinematic Serif'];
  const COLORS = ['#D4AF37', '#FFFFFF', '#E2E8F0', '#F59E0B', '#EF4444', '#10B981', '#38BDF8'];

  const handleTextChange = (text) => {
    if (typeof value === 'object') {
      onChange({ ...value, text });
    } else {
      onChange(text);
    }
  };

  const handleFontChange = (font) => {
    onChange({
      text: currentVal,
      font,
      color: currentColor
    });
  };

  const handleColorChange = (color) => {
    onChange({
      text: currentVal,
      font: currentFont,
      color
    });
  };

  if (field.type === 'date') {
    return (
      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-serif text-zinc-100 font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{field.label}</span>
          </label>
          <span className="text-[10px] font-mono text-zinc-500">Date Picker</span>
        </div>
        <input
          type="date"
          value={currentVal}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-amber-400/50"
        />
        {field.description && (
          <p className="text-[10px] text-zinc-500">{field.description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-xs font-serif text-zinc-100 font-medium flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-amber-400" />
          <span>{field.label}</span>
        </label>
        {field.maxChars && (
          <span className="text-[10px] font-mono text-zinc-500">
            {currentVal.length}/{field.maxChars} chars
          </span>
        )}
      </div>

      <input
        type="text"
        maxLength={field.maxChars || 80}
        value={currentVal}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder={`Enter ${field.label}...`}
        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-amber-400/60 placeholder-zinc-600 transition-colors"
      />

      {/* Admin-Allowed Font Selector */}
      {field.allowFontSelection && (
        <div className="pt-2 border-t border-zinc-800/60">
          <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 block">
            Permitted Typography
          </label>
          <div className="flex flex-wrap gap-1.5">
            {FONTS.map((font) => (
              <button
                key={font}
                type="button"
                onClick={() => handleFontChange(font)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  currentFont === font
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                    : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {font}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Admin-Allowed Color Selector */}
      {field.allowColorSelection && (
        <div className="pt-2 border-t border-zinc-800/60">
          <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 block">
            Permitted Accent Color
          </label>
          <div className="flex items-center gap-2">
            {COLORS.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => handleColorChange(col)}
                style={{ backgroundColor: col }}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  currentColor === col ? 'scale-125 border-white shadow-sm' : 'border-transparent hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {field.description && (
        <p className="text-[10px] text-zinc-500">{field.description}</p>
      )}
    </div>
  );
}
