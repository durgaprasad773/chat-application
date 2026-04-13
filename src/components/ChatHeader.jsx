import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function ChatHeader({
  clinicName,
  logoUrl,
  onClose,
  brandColour,
  showClose = true
}) {
  return (
    <div
      className="bg-[#0095da] p-4 flex items-center justify-between text-white"
      style={{ backgroundColor: brandColour || '#0095da' }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 border-2 border-white/20">
          {logoUrl ? (
            <AvatarImage src={logoUrl} alt={clinicName || 'AI Assistant'} />
          ) : (
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=AI" />
          )}
          <AvatarFallback className="bg-white/10 text-white font-bold">
            {(clinicName || 'AI')[0]}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold text-lg tracking-tight">
          {clinicName || 'AI Assistant'}
        </span>
      </div>
      {showClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10 rounded-full"
          onClick={onClose}
        >
          <MoreHorizontal size={24} />
        </Button>
      )}
    </div>
  );
}
