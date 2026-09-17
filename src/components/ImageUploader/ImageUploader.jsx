import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';
import { uploadAsset } from '../../services/api';

export function ImageUploader({
  label = 'Upload Photo',
  description = 'High resolution PNG or JPG (max 10MB)',
  value,
  onChange,
  required = false,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    setError(null);
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG, or WebP).');
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10MB limit.');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadAsset(file);
      onChange(result.url);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-serif text-xs font-semibold tracking-wider text-slate-200 uppercase">
          {label} {required && <span className="text-gold-400">*</span>}
        </label>
        <span className="text-[10px] text-slate-400 font-sans">
          PNG / JPG
        </span>
      </div>

      {description && (
        <p className="text-[11px] text-slate-400 leading-tight">
          {description}
        </p>
      )}

      {/* Upload Zone or Preview */}
      {value ? (
        <div className="relative rounded-xl border border-gold-500/30 bg-obsidian-900/60 p-3 flex items-center gap-4 group">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black">
            <img
              src={value}
              alt="Uploaded Asset"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>Image Asset Ready</span>
            </div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">
              Ready for high-definition render
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Replace image"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? 'border-gold-400 bg-gold-500/10 scale-[1.01]'
              : 'border-white/15 bg-white/[0.02] hover:border-gold-500/40 hover:bg-white/[0.04]'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-300 group-hover:scale-110 transition-transform">
              {uploading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </div>
            <div className="text-xs font-medium text-slate-200">
              {uploading ? 'Processing asset...' : 'Click to upload or drag & drop'}
            </div>
            <div className="text-[11px] text-slate-500">
              Recommended: 1:1 or 4:5 aspect ratio, max 10MB
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
