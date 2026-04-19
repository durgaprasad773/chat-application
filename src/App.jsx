import React from 'react';
import { ChatbotFullPage } from './components/ChatbotFullPage';
import './index.css';

function App() {
  return (
    <>
      <div 
        className="min-h-screen bg-[#F0F4F8] flex justify-center"
        style={{ 
          fontFamily: "'DM Sans', sans-serif"
        }}
      >
        <div className="w-full max-w-[460px] px-4 py-8">
          
          {/* Identity Section */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#005B9A] to-[#0891B2] flex items-center justify-center mx-auto mb-3.5 shadow-[0_0_0_3px_#fff,_0_0_0_5px_#E8F2FB,_0_4px_16px_rgba(0,91,154,.2)]">
              <span className="text-[26px] font-bold text-white font-serif">DR</span>
            </div>
            <h1 className="font-serif text-2xl font-normal text-[#0F172A] mb-1">
              Berkshire Pain Clinic
            </h1>
            <div className="text-[13px] text-[#475569] mb-2 leading-relaxed">
              Prof. Dr Deepak Ravindran &amp; Team<br />
              <span className="text-[#94A3B8]">Consultant Pain Medicine · Reading, Berkshire</span>
            </div>
            <div className="flex justify-center gap-1.5 flex-wrap">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#E8F2FB] text-[#005B9A] font-medium">
                Insured &amp; Self-pay
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#E8F2FB] text-[#005B9A] font-medium">
                Holistic &amp; Integrative
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#E8F2FB] text-[#005B9A] font-medium">
                Consultant-led
              </span>
            </div>
          </div>

          {/* Chat Widget */}
          <div className="mb-5">
            <ChatbotFullPage />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex-1 h-px bg-[#E2E8F0]"></div>
            <span className="text-[11px] text-[#94A3B8] font-medium tracking-wider uppercase">
              Quick links
            </span>
            <div className="flex-1 h-px bg-[#E2E8F0]"></div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 mb-6">
            <a 
              className="flex items-center gap-3 p-3.5 px-4 rounded-[14px] border border-[#005B9A] bg-[#E8F2FB] no-underline"
              href="https://go.berkshirepainclinic.co.uk/dc-"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg w-7 text-center flex-shrink-0">📅</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#005B9A] leading-tight">
                  Book a Free Discovery Call
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">30 minutes · No obligation</div>
              </div>
              <svg className="flex-shrink-0 opacity-40" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a 
              className="flex items-center gap-3 p-3.5 px-4 rounded-[14px] border border-[#059669] bg-white no-underline"
              href="https://go.berkshirepainclinic.co.uk/from-hurting-to-healing-membership"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg w-7 text-center flex-shrink-0">💚</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#059669] leading-tight">
                  From Hurting to Healing Membership
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Guided support · Open now</div>
              </div>
              <svg className="flex-shrink-0 opacity-40" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a 
              className="flex items-center gap-3 p-3.5 px-4 rounded-[14px] border border-[#E2E8F0] bg-white no-underline"
              href="https://go.berkshirepainclinic.co.uk/guide-"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg w-7 text-center flex-shrink-0">🎓</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#0F172A] leading-tight">
                  Free Pain Guide
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Download instantly</div>
              </div>
              <svg className="flex-shrink-0 opacity-40" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a 
              className="flex items-center gap-3 p-3.5 px-4 rounded-[14px] border border-[#E2E8F0] bg-white no-underline"
              href="https://www.youtube.com/channel/UCzahshjoAKhIhQV9UW4xs4A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg w-7 text-center flex-shrink-0">▶️</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#0F172A] leading-tight">
                  Patient Education Videos
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">YouTube · Dr Deepak Ravindran</div>
              </div>
              <svg className="flex-shrink-0 opacity-40" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a 
              className="flex items-center gap-3 p-3.5 px-4 rounded-[14px] border border-[#E2E8F0] bg-white no-underline"
              href="https://www.berkshirepainclinic.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg w-7 text-center flex-shrink-0">🌐</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#0F172A] leading-tight">
                  Berkshire Pain Clinic Website
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">berkshirepainclinic.co.uk</div>
              </div>
              <svg className="flex-shrink-0 opacity-40" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Footer */}
          <div className="text-center pb-2">
            <div className="flex justify-center gap-4 mb-3.5">
              <a 
                className="w-[34px] h-[34px] rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[13px] text-[#475569] no-underline hover:bg-[#F8FAFC]"
                href="https://www.youtube.com/channel/UCzahshjoAKhIhQV9UW4xs4A"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
              >
                ▶
              </a>
              <a 
                className="w-[34px] h-[34px] rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[13px] text-[#475569] no-underline hover:bg-[#F8FAFC]"
                href="https://www.linkedin.com/in/deepak-ravindran-b225a61a/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                in
              </a>
              <a 
                className="w-[34px] h-[34px] rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[13px] text-[#475569] no-underline hover:bg-[#F8FAFC]"
                href="https://www.facebook.com/BerkshirePainClinic/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                f
              </a>
              <a 
                className="w-[34px] h-[34px] rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[13px] text-[#475569] no-underline hover:bg-[#F8FAFC]"
                href="https://twitter.com/BerksPainClinic"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
              >
                𝕏
              </a>
            </div>
            <div className="text-[11px] text-[#94A3B8] mb-1">
              © Berkshire Pain Clinic · berkshirepainclinic.co.uk
            </div>
            <div className="text-[10px] text-[#94A3B8]">
              AI page by <strong className="text-[#005B9A] font-semibold">NeuraScaleX</strong> · ask.berkshirepainclinic.co.uk
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
