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
  const actions = [
    { show: bookNowShow, label: bookNowText, onClick: onBookNow, url: bookNowUrl },
    { show: ctaTwoShow, label: ctaTwoText, onClick: onCTATwo, url: ctaTwoUrl },
    { show: sendEmailShow, label: sendEmailText, onClick: onSendEmail, url: null },
    { show: ctaThreeShow, label: ctaThreeText, onClick: onCTAThree, url: ctaThreeUrl }
  ].filter(a => a.show && a.label);

  if (actions.length === 0) return null;

  const colour = brandColour || '#0095da';

  return (
    <div
      className="flex gap-[10px] overflow-x-auto px-4 py-2 border-t border-[#E2E8F0]"
      style={{ scrollbarWidth: 'none' }}
    >
      {actions.map((action, idx) => (
        <a
          key={idx}
          className="flex-none text-center border-2 rounded-full px-[14px] py-[6px] text-[12px] font-semibold transition-all cursor-pointer bg-white"
          style={{
            minWidth: '130px',
            borderColor: colour,
            color: colour,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
          href={action.url || '#'}
          target={action.url && action.url.startsWith('http') ? '_blank' : undefined}
          rel={action.url && action.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          onClick={(e) => {
            if (action.onClick) {
              e.preventDefault();
              action.onClick();
            }
          }}
        >
          {action.label}
        </a>
      ))}
    </div>
  );
}
