import React from 'react';
import { Type, Calendar, AlignCenter } from 'lucide-react';

export function DynamicInput({
  field,
  value = '',
  onChange,
}) {
  const { id, type, label, placeholder, description, required, maxLength = 40 } = field;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-serif text-xs font-semibold tracking-wider text-slate-200 uppercase flex items-center gap-1.5"
        >
          {type === 'date' ? (
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
          ) : id.includes('curved') ? (
            <AlignCenter className="w-3.5 h-3.5 text-gold-400" />
          ) : (
            <Type className="w-3.5 h-3.5 text-gold-400" />
          )}
          <span>{label}</span>
          {required && <span className="text-gold-400">*</span>}
        </label>

        {maxLength && type === 'text' && (
          <span className="text-[10px] font-mono text-slate-500">
            {value.length} / {maxLength}
          </span>
        )}
      </div>

      {description && (
        <p className="text-[11px] text-slate-400 leading-tight">
          {description}
        </p>
      )}

      {type === 'date' ? (
        <input
          type="date"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/40 transition-all"
        />
      ) : (
        <input
          type="text"
          id={id}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `Enter ${label}...`}
          required={required}
          className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs font-medium placeholder-slate-600 focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/40 transition-all tracking-wide"
        />
      )}
    </div>
  );
}
