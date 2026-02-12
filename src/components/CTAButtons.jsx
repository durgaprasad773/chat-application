import React from 'react';

export function CTAButtons({
  bookNowShow,
  bookNowText,
  bookNowUrl,
  sendEmailShow,
  sendEmailText,
  ctaTwoShow,
  ctaTwoText,
  ctaTwoUrl,
  ctaThreeShow,
  ctaThreeText,
  ctaThreeUrl,
  onBookNow,
  onSendEmail,
  onCTATwo,
  onCTAThree,
  brandColour
}) {
  if (!bookNowShow && !sendEmailShow && !ctaTwoShow && !ctaThreeShow) {
    return null;
  }

  return (
    <div className="px-5 pb-2 overflow-x-auto flex gap-2">
      {bookNowShow && (
        <button
          onClick={onBookNow}
          style={{ borderColor: brandColour || '#667eea', color: brandColour || '#667eea' }}
          className="px-7 py-1 border-2 rounded-2xl text-sm font-medium whitespace-nowrap flex-shrink-0 hover:opacity-80 transition"
        >
          {bookNowText}
        </button>
      )}
      {ctaTwoShow && (
        <button
          onClick={onCTATwo}
          style={{ borderColor: brandColour || '#667eea', color: brandColour || '#667eea' }}
          className="px-7 py-1 border-2 rounded-2xl text-sm font-medium whitespace-nowrap flex-shrink-0 hover:opacity-80 transition"
        >
          {ctaTwoText}
        </button>
      )}
      {sendEmailShow && (
        <button
          onClick={onSendEmail}
          style={{ borderColor: brandColour || '#667eea', color: brandColour || '#667eea' }}
          className="px-7 py-1 border-2 rounded-2xl text-sm font-medium whitespace-nowrap flex-shrink-0 hover:opacity-80 transition"
        >
          {sendEmailText}
        </button>
      )}
      {ctaThreeShow && (
        <button
          onClick={onCTAThree}
          style={{ borderColor: brandColour || '#667eea', color: brandColour || '#667eea' }}
          className="px-7 py-1 border-2 rounded-2xl text-sm font-medium whitespace-nowrap flex-shrink-0 hover:opacity-80 transition"
        >
          {ctaThreeText}
        </button>
      )}
    </div>
  );
}
