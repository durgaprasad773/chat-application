import React from 'react';

export function ChatHeader({
  clinicName,
  logoUrl,
  onClose,
  brandColour,
  showClose = true
}) {
  return (
    <div
      className="p-3.5 px-4 border-b border-[#E2E8F0] flex items-center gap-2.5"
      style={{ 
        background: 'linear-gradient(135deg, rgba(0,91,154,.05) 0%, rgba(8,145,178,.03) 100%)'
      }}
    >
      {logoUrl ? (
        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={logoUrl} 
            alt={clinicName} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-[#005B9A] to-[#0891B2] flex items-center justify-center"><span class="text-[11px] text-white font-bold">AI</span></div>';
            }}
          />
        </div>
      ) : (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#005B9A] to-[#0891B2] flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] text-white font-bold">AI</span>
        </div>
      )}
      <div className="flex-1">
        <div className="text-[13px] font-semibold text-[#0F172A]">{clinicName}</div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] inline-block"></span>
          <span className="text-[11px] text-[#059669] font-medium">Online now</span>
        </div>
      </div>
      <div className="ml-auto text-right">
        <div className="text-[10px] text-[#94A3B8] leading-tight">Educational only<br />Not medical advice</div>
      </div>
    </div>
  );
}
