import React from 'react';
import { ChatbotFullPage } from './components/ChatbotFullPage';
import './index.css';

function App() {
  const scrollToChat = () => {
    const el = document.getElementById('chat-widget');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const quickLinks = [
    {
      icon: '📅',
      href: 'https://go.berkshirepainclinic.co.uk/apply-',
      title: 'Book a Free Discovery Call',
      sub: 'Speak to the team and understand whether the clinic pathway may be suitable.',
    },
    {
      icon: '£',
      href: 'https://www.berkshirepainclinic.co.uk/fees-pain-specialist-reading-berkshire/',
      title: 'Check Fees / Insurance / Self-Pay',
      sub: 'Review practical information before contacting the team.',
    },
    {
      icon: '🌿',
      href: 'https://go.berkshirepainclinic.co.uk/from-hurting-to-healing-membership',
      title: 'From Hurting to Healing Membership',
      sub: 'Educational membership and whole-person pain support resources.',
    },
    {
      icon: '📘',
      href: 'https://go.berkshirepainclinic.co.uk/guide-',
      title: 'Free Pain Guide',
      sub: 'Start with a practical educational guide before deciding your next step.',
    },
    {
      icon: '📖',
      href: 'https://deepakravindran.co.uk/the-pain-free-mindset/',
      title: "The Pain Free Mindset – Dr Deepak's Book",
      sub: "Read the book that shapes the foundations of this assistant and Dr Deepak's pain philosophy.",
    },
    {
      icon: '▶',
      href: 'https://www.berkshirepainclinic.co.uk/dr-deepak-ravindran-videos-pain-specialist-reading-berkshire/',
      title: 'YouTube Videos / Educational Resources',
      sub: 'Watch educational videos on persistent pain, whole-person care and recovery.',
    },
  ];

  const socials = [
    { href: 'https://deepakravindran.co.uk/', label: 'Website' },
    { href: 'https://www.linkedin.com/in/deepak-ravindran-b225a61a/', label: 'LinkedIn' },
    { href: 'https://www.youtube.com/@drdeepakravindran5361', label: 'YouTube' },
    { href: 'https://twitter.com/BerksPainClinic', label: 'X / Twitter' },
    { href: 'https://www.instagram.com/drdeepakravindran/', label: 'Instagram' },
    { href: 'https://www.facebook.com/BerkshirePainClinic/', label: 'Facebook' },
  ];

  return (
    <>
      <main className="ask-page">
        <div className="ask-shell">

          {/* Hero */}
          <header className="ask-hero">
            <div className="ask-expert-identity">
              <div className="ask-expert-photo">
                <img
                  src="/logo.png"
                  alt="Dr Deepak Ravindran"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <h1 className="ask-expert-name">Dr Deepak Ravindran</h1>
              <p className="ask-expert-subtitle">Consultant in Pain Medicine · Berkshire Pain Clinic</p>
              <div className="ask-credential-strip">
                <span>20+ years experience</span>
                <span>The UK's Go-To Doctor in Pain Management</span>
                <span>Best Selling Author</span>
              </div>
            </div>

            <p className="ask-subtitle">
              A simple educational starting point for people living with persistent pain who want to
              understand their options before booking or taking the next step.
            </p>

            <div className="ask-positioning-tabs">
              <span className="ask-tab">Persistent Pain Support</span>
              <span className="ask-tab ask-tab-gold">Consultant-led Education</span>
            </div>
          </header>

          {/* Chat Widget */}
          <section id="chat-widget" style={{ margin: '24px 0 18px' }}>
            <ChatbotFullPage />
          </section>

          {/* Why Ask Deepak exists */}
          <section className="ask-card">
            <h2>Why Ask Deepak exists</h2>
            <p>
              After 20 years in NHS pain medicine, the same questions come up again and again — often
              when clinics are closed and Google is the only option. Ask Deepak is designed to give
              clear, honest educational information based on Dr Deepak's book, approach and clinical
              experience, so people can understand their options before speaking with the team.
            </p>
          </section>

          {/* Useful Links */}
          <div className="ask-section-label">Useful Links</div>
          <section className="ask-quick-links">
            {quickLinks.map((link, i) => (
              <a
                key={i}
                className="ask-link-card"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="ask-icon">{link.icon}</div>
                <div>
                  <div className="ask-link-title">{link.title}</div>
                  <div className="ask-link-sub">{link.sub}</div>
                </div>
                <div className="ask-arrow">→</div>
              </a>
            ))}
          </section>

          {/* What Ask Deepak can help with */}
          <section className="ask-card" style={{ marginTop: '16px' }}>
            <h2>What Ask Deepak can help with</h2>
            <div className="ask-support-grid">
              <div className="ask-support-item">
                <h3>Understanding persistent pain</h3>
                <p>
                  Simple educational explanations around persistent pain, whole-person care and why
                  pain can continue even after tissues have healed.
                </p>
              </div>
              <div className="ask-support-item">
                <h3>Finding the right resource</h3>
                <p>
                  Guidance towards clinic information, the membership, free guides, videos or a
                  discovery call depending on what you ask.
                </p>
              </div>
            </div>
          </section>

          {/* Footer Socials */}
          <div className="ask-footer-socials">
            {socials.map((s, i) => (
              <a
                key={i}
                className="ask-social"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>

          <footer className="ask-footer">
            © Dr Deepak Ravindran · Ask Deepak page powered by{' '}
            <a
              className="ask-powered-link"
              href="https://www.neurascalex.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NeuraScaleX
            </a>
            <br />
            Educational information only. Not a substitute for professional medical advice, diagnosis,
            treatment, medication advice or crisis support.
          </footer>

        </div>
      </main>

      {/* Floating Chat Button */}
      <button
        type="button"
        className="ask-floating-chat"
        onClick={scrollToChat}
        aria-label="Ask Deepak"
      >
        💬 Ask Deepak
      </button>
    </>
  );
}

export default App;