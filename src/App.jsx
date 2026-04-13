import React, { useState } from 'react';
import { motion } from "motion/react";
import { Mountain, Info, Check } from "lucide-react";
import { ChatbotFullPage } from './components/ChatbotFullPage';
import SplashScreen from './components/SplashScreen';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import './index.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div 
        className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-20"
        style={{ 
          opacity: showSplash ? 0 : 1,
          transition: 'opacity 0.3s ease-in'
        }}
      >
        {/* Header */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0095da] rounded-full flex items-center justify-center text-white shadow-sm">
              <Mountain size={22} />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-800">
              Berkshire Pain Clinic
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
            >
              Find the right next step for your pain care
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              Ask Berkshire Pain Clinic's AI assistant about chronic pain, appointments, referrals, fees, and support options.
            </motion.p>
          </section>

          {/* Info Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#eff6ff] border border-blue-100 rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="hidden md:block">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Info className="text-blue-500" size={20} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Not sure where to start?</h3>
                <p className="text-slate-600 leading-relaxed">
                  This assistant can help you understand whether Berkshire Pain Clinic may be right for you and what the next step could be.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Chat Widget - DeepakRavindranAI Style */}
          <section className="relative">
            <Card className="overflow-hidden border-none shadow-2xl rounded-3xl">
              <div className="w-full" style={{ minHeight: '600px', height: 'auto' }}>
                <ChatbotFullPage />
              </div>
            </Card>
          </section>

          {/* Bullet Points Section */}
          <section className="bg-[#eff6ff] rounded-2xl p-8 shadow-sm">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Consultant-led pain care",
                "Holistic and multidisciplinary approach",
                "Insured and self-pay pathways",
                "Based in Berkshire"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Checklist Section */}
          <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-8 space-y-8">
              <h3 className="text-2xl font-bold text-slate-900">This page can help you:</h3>
              <div className="space-y-5">
                {[
                  "Understand Berkshire's approach to ongoing pain",
                  "Decide whether a discovery call or consultation is the better next step",
                  "Ask about referrals, fees, insurance, and first appointments",
                  "Learn about support options such as the From Hurting to Healing membership"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="mt-1 bg-blue-50 text-blue-600 p-1 rounded-md group-hover:bg-blue-100 transition-colors">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <p className="text-slate-600 text-lg leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-slate-50 p-8 border-t border-slate-100 space-y-8">
              <h4 className="text-xl font-bold text-slate-900">
                Would you like our team to help you move forward?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Input placeholder="Name" className="bg-white h-12 rounded-xl border-slate-200 focus-visible:ring-[#0095da]" />
                </div>
                <div className="space-y-2">
                  <Input placeholder="Email" className="bg-white h-12 rounded-xl border-slate-200 focus-visible:ring-[#0095da]" />
                </div>
                <div className="space-y-2">
                  <Input placeholder="Phone (optional)" className="bg-white h-12 rounded-xl border-slate-200 focus-visible:ring-[#0095da]" />
                </div>
              </div>
              <Button className="w-full md:w-auto bg-[#0095da] hover:bg-blue-600 text-white px-10 h-14 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95">
                Submit Request
              </Button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto px-6 mt-16 pb-12 text-center text-slate-400 text-sm">
          <div className="w-12 h-1 bg-slate-200 mx-auto mb-8 rounded-full" />
          <p>&copy; {new Date().getFullYear()} Berkshire Pain Clinic. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
