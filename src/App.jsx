import React from 'react';
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
