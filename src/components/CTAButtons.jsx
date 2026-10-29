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
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        padding: '16px 18px 4px',
        scrollbarWidth: 'none',
      }}
    >
      {actions.map((action, idx) => (
        <a
          key={idx}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
            padding: '12px 20px',
            fontSize: 15,
            fontWeight: 700,
            border: '2px solid transparent',
            minHeight: 44,
            cursor: 'pointer',
            textDecoration: 'none',
            ...(idx === 0
              ? { background: '#e9f27d', color: '#05405f', border: '2px solid #e9f27d' }
              : { background: '#fff', color: '#075a85', borderColor: '#075a85' }
            ),
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
