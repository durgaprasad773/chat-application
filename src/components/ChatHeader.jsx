import React from 'react';
import { X } from 'lucide-react';

export function ChatHeader({
  clinicName,
  logoUrl,
  onClose,
  brandColour,
  showClose = true
}) {
  return (
    <div
      className="flex items-center justify-between p-4 text-white"
      style={{ backgroundColor: brandColour || '#667eea' }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/20">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Clinic Logo"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-xl">🤖</span>
          )}
        </div>
        <h3 className="font-bold text-lg truncate max-w-xs">
          {clinicName || 'AI Assistant'}
        </h3>
      </div>
      {showClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:opacity-80 transition"
          title="Close chat"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
