import React from 'react';
import {
  bookingUrl,
  FEES_URL,
  NAV_LINKS,
  PROOF_POINTS,
  PERSONAS,
  ASK_STARTERS,
  CONDITIONS,
  CREDENTIALS,
  HOW_IT_WORKS,
  REFERRER_POINTS,
  GENERAL_FAQS,
  LEARN_LINKS,
  FOOTER_LINKS,
} from '../data/pageContent';

const VIDEO_ID = 'v_ysFk8JYBY';
const VIDEO_EMBED = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`;
const VIDEO_FACADE = `<style>*{margin:0;padding:0}html,body{height:100%}a{display:block;height:100%;position:relative}img{width:100%;height:100%;object-fit:cover}span{position:absolute;inset:0;margin:auto;width:76px;height:76px;border-radius:50%;background:#e9f27d;color:#05405f;font:700 30px/76px sans-serif;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.35)}</style><a href='${VIDEO_EMBED}'><img src='https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg' alt='Play video: Dr Deepak introduces Ask Deepak'><span>&#9654;</span></a>`;

export function SiteHeader() {
  return (
    <header className="top">
      <div className="wrap">
        <a className="logo" href="/">
          <img src="/askdeepak-logo.png" alt="Ask Deepak" width="175" height="30" />
        </a>
        <nav className="topnav" aria-label="Page sections">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <a className="btn small-btn" href={bookingUrl('header')}>Book a free call</a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div>
          <div className="eyebrow">NHS pain consultant · Reading, Berkshire</div>
          <h1 id="hero-title">Still in pain after everything you've tried?</h1>
          <p className="lead">
            Prof Dr Deepak Ravindran helps people with persistent pain understand why it hasn't gone away, and what can
            actually help. Ask your questions here, then book a free discovery call with his team.
          </p>
          <div className="actions">
            <a className="btn" href={bookingUrl('hero')}>Book a free discovery call</a>
            <a className="btn ghost" href="#ask">Ask Deepak a question</a>
          </div>
          <p className="reassure">Free · No obligation · Self-pay and insured patients welcome</p>
        </div>
        <div>
          <div className="video">
            <iframe
              title="Dr Deepak Ravindran introduces Ask Deepak"
              loading="lazy"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              src={VIDEO_EMBED}
              srcDoc={VIDEO_FACADE}
            />
          </div>
          <p className="video-cap">▶ Dr Deepak explains how Ask Deepak helps you find the right next step.</p>
        </div>
      </div>
    </section>
  );
}

export function ProofBar() {
  return (
    <div className="proof">
      <ul>
        {PROOF_POINTS.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export function PersonaRouter() {
  return (
    <section id="find" aria-labelledby="find-title">
      <div className="wrap">
        <h2 id="find-title">Which sounds most like you?</h2>
        <p className="sub">Choose your situation for answers written for you, and the right next step.</p>
        <div className="personas">
          {PERSONAS.map((p) => (
            <a key={p.href} className="persona" href={p.href}>
              <span>{p.text}</span>
              <b aria-hidden="true">→</b>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* The assistant renders inline inside #askdeepak-chat (no iframe).
   data-clarity-mask keeps session recordings from capturing what patients type. */
export function AskSection({ children }) {
  return (
    <section className="alt" id="ask" aria-labelledby="ask-title">
      <div className="wrap narrow">
        <h2 id="ask-title">Ask Deepak your question, in your own words</h2>
        <p>
          Clear, educational answers any time of day, based on Dr Deepak's book, approach and clinical experience. When
          you're ready, the assistant can take you straight to a free discovery call.
        </p>
        <div className="ask">
          <div id="askdeepak-chat" data-clarity-mask="true">
            {children}
          </div>
          <div className="starters">
            {ASK_STARTERS.map((s) => (
              <a key={s.href} href={s.href}>{s.text}</a>
            ))}
          </div>
          <p className="small">
            Educational information only. Ask Deepak cannot diagnose, prescribe or replace a consultation. In an
            emergency call 999; for urgent advice contact NHS 111. Please don't share names or contact details in the
            chat.
          </p>
        </div>
      </div>
    </section>
  );
}

function FaqList({ items }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <article key={f.q}>
          <h4>{f.q}</h4>
          <p>{f.a}</p>
        </article>
      ))}
    </div>
  );
}

export function ConditionSection({ c }) {
  return (
    <section className={`cond${c.alt ? ' alt' : ''}`} id={c.id} aria-labelledby={`${c.id}-h`}>
      <div className="wrap narrow">
        <div className="eyebrow dark">{c.eyebrow}</div>
        <h2 id={`${c.id}-h`}>{c.title}</h2>
        <p className="answer">{c.answer}</p>
        <div className="familiar">
          <strong>Sounds familiar?</strong>
          <ul className="ticks">
            {c.familiar.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <h3>How Dr Deepak helps</h3>
        <p>{c.helps}</p>
        <FaqList items={c.faqs} />
        <p className="sec-cta">
          <a className="btn blue" href={bookingUrl(c.id)}>{c.cta}</a>{' '}
          <a className="text-link" href="#ask">or ask a question first</a>
        </p>
      </div>
    </section>
  );
}

export function ConditionSections() {
  return CONDITIONS.map((c) => <ConditionSection key={c.id} c={c} />);
}

export function WhySection() {
  return (
    <section id="why" aria-labelledby="why-title">
      <div className="wrap why">
        <div>
          <figure className="portrait">
            DR
            <img
              src="/deepak_logo.png"
              alt="Prof Dr Deepak Ravindran, consultant in pain and lifestyle medicine"
              width="480"
              height="600"
              loading="lazy"
            />
          </figure>
        </div>
        <div>
          <div className="eyebrow dark">Why Dr Deepak</div>
          <h2 id="why-title">A pain specialist who looks at the whole person</h2>
          <p>
            Dr Deepak has spent over 20 years helping people overcome persistent pain. He was a consultant in pain
            medicine at the Royal Berkshire NHS Foundation Trust from 2010 to 2024, where he helped set up the
            award-winning Integrated Pain and Spinal Service (IPASS) and the Berkshire Long COVID Integrated Service. He
            is one of few UK consultants certified in pain medicine, musculoskeletal medicine and lifestyle medicine.
          </p>
          <ul className="creds">
            {CREDENTIALS.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <p className="small">MD FRCA FFPMRCA EDRA FIPP DMSMed · GMC 6080958</p>
          <blockquote>
            "Great practical, evidence-based book on pain."
            <cite>
              Prof Trish Greenhalgh, University of Oxford, on <em>The Pain-Free Mindset</em>
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="alt" aria-labelledby="how-title">
      <div className="wrap">
        <h2 id="how-title">How it works</h2>
        <div className="steps">
          {HOW_IT_WORKS.map((s) => (
            <div className="step" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 28 }}>
          <a className="btn blue" href={bookingUrl('how_it_works')}>Book a free discovery call</a>
        </p>
      </div>
    </section>
  );
}

export function CarersSection() {
  return (
    <section id="carers" aria-labelledby="carers-title">
      <div className="wrap narrow">
        <div className="eyebrow dark">For family and carers</div>
        <h2 id="carers-title">Supporting someone who lives with chronic pain</h2>
        <p className="answer">
          Start by believing them: their pain is real, even when tests look normal. Avoid suggesting it is in their
          head, learn about persistent pain together, and encourage small, steady steps rather than pushing.
        </p>
        <p>
          Many people find it easier to take the first step with someone beside them. You're welcome to explore this
          page together and book a discovery call together.
        </p>
        <p className="sec-cta">
          <a className="btn blue" href={bookingUrl('carers')}>Book a discovery call together</a>
        </p>
      </div>
    </section>
  );
}

export function ReferrersSection() {
  return (
    <section className="alt" id="referrers" aria-labelledby="ref-title">
      <div className="wrap narrow">
        <div className="eyebrow dark">For GPs, physiotherapists and employers</div>
        <h2 id="ref-title">When to refer to a pain and lifestyle medicine specialist</h2>
        <p className="answer">
          Consider referral when pain has lasted beyond normal healing time despite standard care, when medication is
          escalating without benefit, or when a patient has several overlapping conditions such as fibromyalgia, IBS and
          fatigue.
        </p>
        <ul className="ticks plain">
          {REFERRER_POINTS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p>
          Patients can book a free discovery call directly from this page. For clinical referrals, contact the{' '}
          <a href="https://www.berkshirepainclinic.co.uk/">Berkshire Pain Clinic</a>.
        </p>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="wrap narrow">
        <h2 id="faq-title">Choosing the right pain specialist: common questions</h2>
        <p className="small">Reviewed by Prof Dr Deepak Ravindran · Last reviewed 26 October 2026</p>
        <FaqList items={GENERAL_FAQS} />
        <p className="more">
          <a href={FEES_URL}>See current fees and insurance information →</a>
        </p>
      </div>
    </section>
  );
}

export function LearnSection() {
  return (
    <section className="alt" aria-labelledby="learn-title">
      <div className="wrap">
        <h2 id="learn-title">Not ready for a call yet? Start learning</h2>
        <div className="links">
          {LEARN_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              <strong>{l.title}</strong>
              <span>{l.text}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final" aria-labelledby="final-title">
      <div className="wrap narrow">
        <h2 id="final-title">Find out if Dr Deepak's approach is right for you</h2>
        <p>A free, no-obligation call with his team. Self-pay and insured patients welcome.</p>
        <p style={{ marginTop: 22 }}>
          <a className="btn" href={bookingUrl('final')}>Book a free discovery call</a>
        </p>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="social">
          {FOOTER_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <p>
          © 2026 Dr Deepak Ravindran · Ask Deepak page powered by <a href="https://www.neurascalex.com/">NeuraScaleX</a>
        </p>
        <p>
          Educational information only. Not a substitute for professional medical advice, diagnosis, treatment,
          medication advice or crisis support. In an emergency call 999.
        </p>
      </div>
    </footer>
  );
}

export function FloatingCtas() {
  return (
    <>
      <a className="float" href="#ask">💬 Ask Deepak</a>
      <a className="mobile-bar" href={bookingUrl('mobile_bar')}>Book a free discovery call</a>
    </>
  );
}
