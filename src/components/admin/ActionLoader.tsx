"use client";

import { useEffect, useState } from "react";

interface ActionLoaderProps {
  isLoading: boolean;
  status?: 'loading' | 'success' | 'error';
  message?: string;
}

export default function ActionLoader({ isLoading, status = 'loading', message = "Processing..." }: ActionLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="text-center p-8 bg-tmp-black border border-white/10 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all scale-100 opacity-100">
        
        {/* Animated Icon */}
        <div className="mb-6 flex justify-center">
            {status === 'loading' && (
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-tmp-gold rounded-full border-t-transparent animate-spin"></div>
                </div>
            )}

            {status === 'success' && (
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <i className="fas fa-check text-3xl text-white"></i>
                </div>
            )}

            {status === 'error' && (
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <i className="fas fa-times text-3xl text-white"></i>
                </div>
            )}
        </div>

        {/* Message */}
        <h3 className="text-xl font-bold text-white mb-2 font-serif italic">
            {status === 'success' ? 'Success!' : status === 'error' ? 'Error!' : 'Please Wait'}
        </h3>
        
        <p className="text-gray-400 text-sm animate-pulse">
            {message}
        </p>

        {status === 'loading' && (
             <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
                Do not close this window
             </p>
        )}
      </div>
    </div>
  );
}
