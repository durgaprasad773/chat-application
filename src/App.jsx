import React, { useEffect } from 'react';
import { ChatbotFullPage } from './components/ChatbotFullPage';
import {
  SiteHeader,
  Hero,
  ProofBar,
  PersonaRouter,
  AskSection,
  ConditionSections,
  WhySection,
  HowItWorks,
  CarersSection,
  ReferrersSection,
  FaqSection,
  LearnSection,
  FinalCta,
  SiteFooter,
  FloatingCtas,
} from './components/PageSections';

function App() {
  // "Ask a question" links (#ask) take the visitor straight to the chat and focus its input
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest && e.target.closest('a[href="#ask"]');
      if (!link) return;
      const chat = document.getElementById('askdeepak-chat');
      if (!chat) return;
      e.preventDefault();
      chat.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.history.replaceState(null, '', '#ask');
      setTimeout(() => {
        const input = chat.querySelector('textarea');
        if (input) input.focus({ preventScroll: true });
      }, 500);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProofBar />
        <PersonaRouter />
        <AskSection>
          <ChatbotFullPage />
        </AskSection>
        <ConditionSections />
        <WhySection />
        <HowItWorks />
        <CarersSection />
        <ReferrersSection />
        <FaqSection />
        <LearnSection />
        <FinalCta />
      </main>
      <SiteFooter />
      <FloatingCtas />
    </>
  );
}

export default App;
