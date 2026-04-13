import React from 'react';
import { Button } from "@/components/ui/button";

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

  const buttonStyle = {
    borderColor: brandColour || '#0095da',
    color: brandColour || '#0095da'
  };

  return (
    <div className="bg-white px-6 py-4 flex flex-wrap gap-3">
      {bookNowShow && (
        <Button 
          variant="outline" 
          className="rounded-full border-[#0095da] text-[#0095da] hover:bg-blue-50 px-6 font-medium"
          style={buttonStyle}
          onClick={onBookNow}
        >
          {bookNowText}
        </Button>
      )}
      {ctaTwoShow && (
        <Button 
          variant="outline" 
          className="rounded-full border-[#0095da] text-[#0095da] hover:bg-blue-50 px-6 font-medium"
          style={buttonStyle}
          onClick={onCTATwo}
        >
          {ctaTwoText}
        </Button>
      )}
      {sendEmailShow && (
        <Button 
          variant="outline" 
          className="rounded-full border-[#0095da] text-[#0095da] hover:bg-blue-50 px-6 font-medium"
          style={buttonStyle}
          onClick={onSendEmail}
        >
          {sendEmailText}
        </Button>
      )}
      {ctaThreeShow && (
        <Button 
          variant="outline" 
          className="rounded-full border-[#0095da] text-[#0095da] hover:bg-blue-50 px-6 font-medium"
          style={buttonStyle}
          onClick={onCTAThree}
        >
          {ctaThreeText}
        </Button>
      )}
    </div>
  );
}
