import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#07080E] pt-8 sm:pt-9 pb-24 sm:pb-28 text-center select-none">
      <div className="max-w-md mx-auto px-4 flex flex-col items-center space-y-2.5">
        {/* Privacy Policy | Terms of Service */}
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-zinc-300">
          <Link to="/help" className="hover:text-purple-300 transition-colors">
            Privacy Policy
          </Link>
          <span className="text-zinc-600 font-normal">|</span>
          <Link to="/help" className="hover:text-purple-300 transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Copyright Notice */}
        <p className="text-[11px] text-zinc-400 font-normal tracking-wide">
          © 2026 Hologram. All rights reserved.
        </p>

        {/* Developer Attribution */}
        <p className="text-[11px] text-zinc-400 font-normal">
          Developed by{' '}
          <a
            href="https://sanmora.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-zinc-300 hover:text-purple-300 transition-colors"
          >
            sanmora.in
          </a>
        </p>
      </div>
    </footer>
  );
}
