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
      className="flex justify-between items-center gap-[14px] px-[18px] py-[16px] border-b border-[#e3e9ee]"
      style={{ background: '#fff' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex-shrink-0 rounded-full overflow-hidden border-2 border-white bg-white"
          style={{ width: 46, height: 46, boxShadow: '0 8px 18px rgba(18,45,60,.12)' }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={clinicName}
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#075a85]">
              <span className="text-[13px] text-white font-bold">AI</span>
            </div>
          )}
        </div>
        <div>
          <div className="text-[18px] text-[#05405f]" style={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, lineHeight: 1.2 }}>{clinicName}</div>
          <div className="text-[13px]" style={{ color: '#1e8e5a', fontWeight: 600, marginTop: 2 }}>● Online now</div>
        </div>
      </div>
    </div>
  );
}
