import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  RefreshCw,
  Check,
  Trash2,
  Sliders,
  Image as ImageIcon
} from 'lucide-react';

export default function ImageTransformControl({
  field,
  value = null, // { assetUrl, zoom: 1, rotate: 0, posX: 0, posY: 0 }
  onChange
}) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const currentTransform = value || {
    assetUrl: field.defaultAsset || '',
    zoom: 1,
    rotate: 0,
    posX: 0,
    posY: 0
  };

  const handleFile = (file) => {
    setError('');
    if (!file) return;

    // Validation: Image types only
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please upload a valid JPG, PNG, or WebP image.');
      return;
    }

    // Validation: Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({
        ...currentTransform,
        assetUrl: e.target.result,
        zoom: 1,
        rotate: 0,
        posX: 0,
        posY: 0
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const updateTransform = (key, val) => {
    onChange({
      ...currentTransform,
      [key]: val
    });
  };

  const resetTransform = () => {
    onChange({
      ...currentTransform,
      zoom: 1,
      rotate: 0,
      posX: 0,
      posY: 0
    });
  };

  return (
    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-serif text-zinc-100 font-medium block">
            {field.label}
          </label>
          <span className="text-[10px] text-zinc-500 font-mono">
            Ratio: {field.aspectRatio || '1:1'} • Max 10MB (PNG/JPG)
          </span>
        </div>

        {currentTransform.assetUrl && (
          <button
            type="button"
            onClick={resetTransform}
            className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-amber-400 transition-colors"
            title="Reset transformations"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {error && (
        <div className="text-[11px] text-red-400 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
          {error}
        </div>
      )}

      {/* Upload Zone / Live Thumbnail Preview */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => handleFile(e.target.files[0])}
        className="hidden"
      />

      {currentTransform.assetUrl ? (
        <div className="space-y-4">
          {/* Visual Crop / Transformation Bounding Box */}
          <div className="relative aspect-video max-h-48 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center p-2">
            <div className="relative w-32 h-32 rounded-lg border-2 border-dashed border-amber-400/50 overflow-hidden bg-zinc-900 flex items-center justify-center shadow-inner">
              <img
                src={currentTransform.assetUrl}
                alt="Upload preview"
                style={{
                  transform: `scale(${currentTransform.zoom}) rotate(${currentTransform.rotate}deg) translate(${currentTransform.posX}px, ${currentTransform.posY}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Replace Button */}
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-md bg-black/70 hover:bg-black text-[10px] font-mono text-zinc-200 border border-white/10"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    assetUrl: '',
                    zoom: 1,
                    rotate: 0,
                    posX: 0,
                    posY: 0
                  })
                }
                className="p-1 rounded-md bg-black/70 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Transformation Sliders & Controls */}
          <div className="space-y-3 pt-2">
            {/* Zoom Slider */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                <span className="flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" /> Zoom
                </span>
                <span>{Math.round(currentTransform.zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={currentTransform.zoom}
                onChange={(e) => updateTransform('zoom', parseFloat(e.target.value))}
                className="w-full accent-amber-400 bg-zinc-800 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Rotation Controls */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                <span className="flex items-center gap-1">
                  <RotateCw className="w-3 h-3" /> Rotation
                </span>
                <span>{currentTransform.rotate}°</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateTransform('rotate', (currentTransform.rotate - 90) % 360)}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
                  title="Rotate -90°"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="5"
                  value={currentTransform.rotate}
                  onChange={(e) => updateTransform('rotate', parseInt(e.target.value))}
                  className="w-full accent-amber-400 bg-zinc-800 h-1 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => updateTransform('rotate', (currentTransform.rotate + 90) % 360)}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
                  title="Rotate +90°"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Position X / Y Nudges */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                <span className="flex items-center gap-1">
                  <Move className="w-3 h-3" /> Position Offset (X / Y)
                </span>
                <span>
                  {currentTransform.posX}px, {currentTransform.posY}px
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={currentTransform.posX}
                  onChange={(e) => updateTransform('posX', parseInt(e.target.value))}
                  className="accent-amber-400 bg-zinc-800 h-1 rounded-lg cursor-pointer"
                  title="Horizontal offset"
                />
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={currentTransform.posY}
                  onChange={(e) => updateTransform('posY', parseInt(e.target.value))}
                  className="accent-amber-400 bg-zinc-800 h-1 rounded-lg cursor-pointer"
                  title="Vertical offset"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-amber-400 bg-amber-500/10'
              : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/40'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center mx-auto mb-2">
            <UploadCloud className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-xs text-zinc-300 font-medium">Click or drag & drop image</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">PNG, JPG, or WebP up to 10MB</p>
        </div>
      )}
    </div>
  );
}
