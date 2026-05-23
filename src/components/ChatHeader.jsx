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
      className="flex justify-between items-center gap-[14px] px-[18px] py-[16px] border-b border-[#dce8ee]"
      style={{ background: 'linear-gradient(180deg, #fff, #f8fbfb)' }}
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
            <div className="w-full h-full flex items-center justify-center bg-[#1f5f64]">
              <span className="text-[13px] text-white font-bold">AI</span>
            </div>
          )}
        </div>
        <div>
          <div className="text-[16px] font-black text-[#163447]" style={{ fontWeight: 950 }}>{clinicName}</div>
          <div className="text-[12px] font-extrabold" style={{ color: '#22a569', fontWeight: 850, marginTop: 2 }}>● Online now</div>
        </div>
      </div>
    </div>
  );
}
