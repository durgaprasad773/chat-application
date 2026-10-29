import React from 'react';

export const BOOKING_BASE = 'https://go.berkshirepainclinic.co.uk/apply-';

export const bookingUrl = (content) =>
  `${BOOKING_BASE}?utm_source=askdeepak&utm_medium=askpage&utm_campaign=discovery_call&utm_content=${content}`;

export const FEES_URL = 'https://www.berkshirepainclinic.co.uk/fees-pain-specialist-reading-berkshire/';

export const NAV_LINKS = [
  { href: '#find', label: 'Your situation' },
  { href: '#ask', label: 'Ask a question' },
  { href: '#why', label: 'Why Dr Deepak' },
  { href: '#faq', label: 'FAQs' },
];

export const PROOF_POINTS = [
  '20+ years in NHS and private pain medicine',
  'Honorary Professor, Teesside University',
  <>Author, <em>The Pain-Free Mindset</em> (Penguin)</>,
  <a key="td" href="https://www.topdoctors.co.uk/doctor/deepak-ravindran/">5.0 on Top Doctors (64 reviews)</a>,
  'Featured by the BBC, The Times and Daily Mail',
];

export const PERSONAS = [
  { href: '#back-neck-pain', text: 'My scan is clear, but my back or neck still hurts' },
  { href: '#fibromyalgia', text: 'I have fibromyalgia or pain all over' },
  { href: '#nerve-pain', text: 'I have nerve pain, sciatica or CRPS' },
  { href: '#post-viral', text: "I've had pain and fatigue since a virus or COVID" },
  { href: '#painkillers', text: 'My painkillers have stopped working' },
  { href: '#connected', text: 'I have several diagnoses. Are they connected?' },
  { href: '#carers', text: "I'm supporting someone in pain" },
  { href: '#referrers', text: "I'm a GP, physio or employer" },
];

export const ASK_STARTERS = [
  { href: '#back-neck-pain', text: "My scans show I've healed, so why am I still in pain?" },
  { href: '#fibromyalgia', text: 'I have fibromyalgia. Can Dr Deepak help?' },
  { href: '#post-viral', text: 'How do I recover from post-viral fatigue or long COVID?' },
  { href: '#faq', text: 'How much does it cost, and can I use insurance?' },
];

export const CONDITIONS = [
  {
    id: 'back-neck-pain',
    alt: true,
    eyebrow: 'Persistent back and neck pain',
    title: "Back or neck pain that won't go away, even though your scan is clear",
    answer:
      'Long-lasting back and neck pain is very common, and a clear or "normal for your age" scan does not mean the pain isn\'t real. When pain lasts beyond normal healing time, a sensitised nervous system, poor sleep, stress and losing confidence in movement often keep it going.',
    familiar: [
      'You\'ve been told your MRI shows "wear and tear" or nothing serious',
      'Physio, painkillers or injections helped for a while, then the pain came back',
      "You avoid things you love because you're afraid of making it worse",
    ],
    helps:
      'Dr Deepak starts with a specialist pain assessment and a clear explanation of why your pain persists. He then builds a plan across movement, sleep, stress and, where it is likely to help, medication or interventional treatment.',
    faqs: [
      {
        q: 'Why does my back still hurt when my MRI is normal?',
        a: 'Because persistent pain is often driven more by a sensitised nervous system than by ongoing damage. Scans show structure, not how strongly your nervous system is sounding the alarm, which is affected by sleep, stress, fear of movement and past experiences. A normal scan is good news: it means there is room to reduce the pain by calming that system.',
      },
      {
        q: 'Should I rest or keep moving with chronic back pain?',
        a: 'For most persistent back pain, staying gradually active is better than long periods of rest. Start with gentle movement you can manage and build up slowly. Seek urgent help (call 999 or go to A&E) if you develop numbness around your genitals or bottom, loss of bladder or bowel control, or new weakness in your legs.',
      },
      {
        q: 'Are spinal injections worth it for chronic back pain?',
        a: 'Injections can help some types of spinal pain for a period, especially when used to support a rehabilitation plan, but they rarely work well on their own. A pain specialist can tell you whether your type of pain is likely to benefit and what else should go alongside it.',
      },
    ],
    cta: 'Book a free call about back or neck pain',
  },
  {
    id: 'fibromyalgia',
    eyebrow: 'Fibromyalgia and widespread pain',
    title: 'Fibromyalgia and widespread pain: a specialist who takes it seriously',
    answer:
      'Fibromyalgia is a long-term condition that causes pain all over the body, tiredness, poor sleep and problems with memory and concentration ("fibro fog"). It is real, and it is linked to how the nervous system processes pain, not to damage in the muscles or joints.',
    familiar: [
      'Your pain moves around your body and flares without warning',
      'You wake up exhausted, however long you sleep',
      "You've been told your tests are normal and there's nothing more to do",
    ],
    helps:
      'Dr Deepak has worked with fibromyalgia for many years and helped set up a multidisciplinary fibromyalgia clinic in the NHS. His approach combines medical expertise with sleep, paced activity, nutrition, stress and self-management support.',
    faqs: [
      {
        q: 'Is fibromyalgia real?',
        a: 'Yes. Fibromyalgia is a recognised long-term condition. Research shows people with fibromyalgia process pain signals differently, which is why everyday sensations can hurt and why routine blood tests and scans often look normal.',
      },
      {
        q: 'Can fibromyalgia be cured?',
        a: 'There is no single cure, but many people improve their symptoms and quality of life significantly. What helps most is usually a combination of understanding the condition, paced activity, better sleep, stress management and targeted treatment, rather than medication alone.',
      },
      {
        q: 'Who is the best kind of specialist for fibromyalgia in the UK?',
        a: 'Fibromyalgia is managed by pain medicine, rheumatology and GP-led services. Look for a specialist who takes a whole-person approach and looks at sleep, mood, activity and other conditions as well as pain. Dr Deepak is a consultant in pain, musculoskeletal and lifestyle medicine.',
      },
    ],
    cta: 'Book a free call about fibromyalgia',
  },
  {
    id: 'nerve-pain',
    alt: true,
    eyebrow: 'Nerve pain, sciatica and CRPS',
    title: 'Nerve pain, sciatica and CRPS: burning, shooting or electric pain explained',
    answer:
      'Nerve (neuropathic) pain happens when the nerves themselves are irritated or damaged, for example in sciatica, after shingles, after surgery, in diabetes or in complex regional pain syndrome (CRPS). It feels different from other pain and usually needs a different treatment approach.',
    familiar: [
      'Burning, shooting, stabbing or electric-shock pain',
      'Pins and needles, numbness, or pain from a light touch',
      'Pain that has spread or changed since an injury or operation',
    ],
    helps:
      'Dr Deepak is a consultant in pain medicine with additional qualifications in interventional pain practice. He looks for the cause of nerve pain and combines the right medicines with movement, desensitisation, sleep and psychological support, and procedures where they are likely to help.',
    faqs: [
      {
        q: 'What does nerve pain feel like?',
        a: 'Nerve pain is often described as burning, shooting, stabbing or like an electric shock, sometimes with pins and needles, numbness or extreme sensitivity to touch. It can be constant or come in bursts, and it often gets worse at night.',
      },
      {
        q: 'What is complex regional pain syndrome (CRPS)?',
        a: 'CRPS is a persistent pain condition, usually in an arm or leg after an injury or operation, where the pain is far greater than expected. It can come with swelling, changes in skin colour or temperature, and stiffness. Early specialist assessment matters, and treatment usually combines pain education, movement and physiotherapy, medication and psychological support.',
      },
      {
        q: 'Can nerve pain be treated without strong painkillers?',
        a: 'Often, yes. Standard painkillers usually work poorly for nerve pain. Treatment more often uses medicines designed for nerve pain, alongside movement, desensitisation, sleep support and approaches that calm the nervous system. Some people benefit from interventional procedures.',
      },
    ],
    cta: 'Book a free call about nerve pain',
  },
  {
    id: 'post-viral',
    eyebrow: 'Post-viral fatigue and long COVID',
    title: 'Pain and fatigue since a virus or COVID: what helps recovery',
    answer:
      'Some people are left with exhaustion, muscle and joint pain, headaches or brain fog for months after a viral illness, including COVID-19 and glandular fever. Recovery is usually gradual, and the right pace matters as much as the right treatment.',
    familiar: [
      'You feel worse for a day or more after doing too much',
      "Pain, fatigue or brain fog started after an infection and hasn't lifted",
      "You've tried to push through and ended up crashing",
    ],
    helps:
      'Dr Deepak helped set up the Berkshire Long COVID Integrated Service in 2020. His whole-person approach looks at activity and pacing, sleep, nutrition, pain and stress together, rather than each symptom on its own.',
    faqs: [
      {
        q: 'How long does post-viral fatigue last?',
        a: 'It varies widely, from a few weeks to many months. Some people go on to develop longer-term conditions such as ME/CFS. Pacing your activity early and getting a proper assessment gives you the best chance of steady recovery.',
      },
      {
        q: 'Should I exercise with post-viral fatigue?',
        a: (
          <>
            Not by pushing through. If activity leaves you feeling worse for a day or more afterwards, staying within
            your energy limits (pacing) is usually safer.{' '}
            <a href="https://www.nice.org.uk/guidance/ng206" rel="noopener nofollow" target="_blank">
              NICE's 2021 guidance on ME/CFS
            </a>{' '}
            advises against fixed, steadily increasing exercise programmes. Speak to your GP or a specialist before
            building up activity.
          </>
        ),
      },
      {
        q: 'Does long COVID cause pain?',
        a: 'Yes. Muscle and joint pain, headaches, chest discomfort and nerve-type pain are commonly reported in long COVID, often alongside fatigue and poor sleep. New or severe chest pain or breathlessness needs urgent medical assessment.',
      },
    ],
    cta: 'Book a free call about post-viral symptoms',
  },
  {
    id: 'painkillers',
    alt: true,
    eyebrow: "When medication isn't enough",
    title: 'Painkillers stopped working? What to do next',
    answer: (
      <>
        If you've been taking painkillers for months or years and they no longer help, you're not alone. For many types
        of long-term pain, medicines give limited benefit over time, and some cause side effects or dependence.{' '}
        <a href="https://www.nice.org.uk/guidance/ng193" rel="noopener nofollow" target="_blank">
          NICE's 2021 chronic pain guidance
        </a>{' '}
        recommends exercise programmes and psychological therapies for chronic primary pain, and advises against
        starting opioids for it.
      </>
    ),
    familiar: [
      "You've tried tablet after tablet with little lasting relief",
      "You're worried about side effects or relying on medication",
      "You want to reduce your medication but don't know how",
    ],
    helps:
      "Dr Deepak reviews what you're taking and why, explains what is driving your pain, and builds a plan that relies less on medication over time, alongside movement, sleep, stress and lifestyle support. Never stop or reduce prescribed pain medicine suddenly: some, including opioids, gabapentin and pregabalin, need a gradual, supervised plan.",
    faqs: [
      {
        q: 'Why are my painkillers not working any more?',
        a: 'Because in persistent pain, the main driver is often a sensitised nervous system rather than ongoing injury, and most painkillers do little to change that. The body can also get used to some medicines over time. This is a sign to review your treatment, not a failure on your part.',
      },
      {
        q: 'How can I reduce my pain medication safely?',
        a: 'Talk to your GP or prescriber first and agree a gradual plan; never stop suddenly. Reducing slowly, with support for sleep, movement and flare-ups, makes it far more likely to succeed. A pain specialist can help plan this alongside other treatment.',
      },
      {
        q: 'What helps chronic pain apart from medication?',
        a: 'Understanding your pain, gradually increasing activity, better sleep, stress and mood support, psychological therapies, and lifestyle changes such as nutrition and social connection. Combined in a plan, these often help more than medication alone.',
      },
    ],
    cta: 'Book a free call about your medication',
  },
  {
    id: 'connected',
    eyebrow: 'Several conditions at once',
    title: 'Living with several diagnoses? They may be connected',
    answer:
      'Many people live with several long-term conditions at once, such as fibromyalgia, IBS, migraine, chronic fatigue, jaw or mouth pain and pelvic pain. These often share common drivers: a sensitised nervous system, disrupted sleep and long-term stress. Treating each one separately can leave the bigger picture unaddressed.',
    familiar: [
      'You see a different specialist for each problem',
      'Your list of diagnoses keeps growing',
      "You suspect it's all linked, but nobody has looked at the whole picture",
    ],
    helps:
      "Looking at the whole person is central to Dr Deepak's work. He is one of few UK consultants certified in pain, musculoskeletal and lifestyle medicine, so he can look at how your symptoms connect and build one plan rather than several.",
    faqs: [
      {
        q: 'Why do I have so many chronic conditions?',
        a: 'Conditions such as fibromyalgia, IBS, migraine and chronic fatigue frequently occur together because they share underlying drivers, including how the nervous system processes signals, sleep, stress and past experiences. Having several is common and is not a sign that something has been missed.',
      },
      {
        q: 'Can one specialist look at all my symptoms together?',
        a: 'Yes. A whole-person pain specialist can look at how your symptoms connect, coordinate with your other doctors and help you focus on the changes likely to improve several conditions at once.',
      },
    ],
    cta: 'Book a free call to look at the whole picture',
  },
];

export const CREDENTIALS = [
  'Consultant in Pain Medicine, Hampshire and Isle of Wight Healthcare NHS Foundation Trust',
  'Director of Pain and Lifestyle Medicine, Pembroke Surgery, Reading',
  'Head of Integrative Pain Care, Synthesis Clinic',
  'Honorary Professor, Teesside University; Senior Visiting Fellow, University of Reading',
  <>Founder, Berkshire Pain Clinic · Host of the <a href="https://www.buzzsprout.com/817123"><em>Pain Speak</em> podcast</a></>,
];

export const HOW_IT_WORKS = [
  { title: 'Ask your questions', text: 'Understand your pain and your options in your own time, before speaking to anyone.' },
  {
    title: 'Book a free discovery call',
    text: "Talk to Dr Deepak's team about what you've tried, what you want to change and whether the clinic suits you.",
  },
  { title: 'Get a plan', text: "If it's right for you, see Dr Deepak for a specialist assessment and a whole-person plan." },
];

export const REFERRER_POINTS = [
  'Specialist pain assessment, medication review and interventional options where appropriate',
  'Whole-person plans covering sleep, activity, stress, nutrition and self-management',
  'Clear communication back to the referring clinician',
];

export const GENERAL_FAQS = [
  {
    q: 'How common is chronic pain in the UK?',
    a: (
      <>
        Very common. A{' '}
        <a href="https://bmjopen.bmj.com/content/6/6/e010364" rel="noopener nofollow" target="_blank">
          2016 review in BMJ Open
        </a>{' '}
        estimated that between a third and a half of UK adults live with chronic pain, around 28 million people.
      </>
    ),
  },
  {
    q: 'Can chronic pain be cured?',
    a: "Some chronic pain resolves, and many people reduce their pain and get their lives back, even when it doesn't disappear completely. The best results usually come from a plan that combines understanding your pain with movement, sleep, stress support and the right medical treatment.",
  },
  {
    q: 'What does a pain medicine consultant do?',
    a: 'A pain medicine consultant is a doctor who specialises in assessing and treating long-term pain. They look for what is causing and maintaining the pain, review medication, offer procedures where appropriate, and coordinate a wider plan with physiotherapy, psychology and lifestyle support.',
  },
  {
    q: 'What is the difference between a private and an NHS pain clinic?',
    a: 'Both can offer excellent care. NHS pain clinics often have long waiting lists in many areas; a private clinic usually offers quicker access to a consultant and longer appointments. Dr Deepak worked as an NHS consultant in pain medicine from 2010 and also sees private patients.',
  },
  {
    q: 'Do I need a GP referral to see a private pain specialist?',
    a: "Not usually if you are paying for yourself. If you are using private medical insurance, your insurer may ask for a GP referral first. Dr Deepak's team can explain the options on a free discovery call.",
  },
  {
    q: 'How much does a private pain consultation cost?',
    a: 'Fees vary by clinic and appointment type. Current fees and insurance information for Dr Deepak are listed on the Berkshire Pain Clinic fees page, and the first discovery call is free.',
  },
  {
    q: 'Where does Dr Deepak see patients?',
    a: 'Dr Deepak sees private patients through the Berkshire Pain Clinic in Reading, Berkshire. Clinical consultations are for patients based in the UK.',
  },
  {
    q: 'What is lifestyle medicine, and can it help pain?',
    a: 'Lifestyle medicine uses evidence-based changes to daily life to prevent and manage long-term conditions. The British Society of Lifestyle Medicine describes six pillars: healthy eating, mental wellbeing, healthy relationships, physical activity, minimising harmful substances and restorative sleep. Each can influence how much pain you feel.',
  },
  {
    q: 'Who is Dr Deepak Ravindran?',
    a: (
      <>
        Prof Dr Deepak Ravindran is a UK consultant in pain and lifestyle medicine with over 20 years' experience in the
        NHS and private practice. He is an Honorary Professor at Teesside University, founder of the Berkshire Pain
        Clinic in Reading, host of the Pain Speak podcast and author of the Amazon bestseller{' '}
        <em>The Pain-Free Mindset</em> (Vermilion, 2021).
      </>
    ),
  },
  {
    q: 'Is Ask Deepak medical advice?',
    a: 'No. Ask Deepak gives general educational information based on Dr Deepak\'s book, approach and clinical experience. It cannot diagnose, prescribe or replace a consultation. If you have new, severe or worrying symptoms, contact your GP or NHS 111, and in an emergency call 999.',
  },
];

export const LEARN_LINKS = [
  {
    href: 'https://www.youtube.com/@drdeepakravindran',
    title: 'Watch on YouTube',
    text: 'Dr Deepak explains persistent pain, conditions and recovery.',
  },
  {
    href: 'https://www.buzzsprout.com/817123',
    title: 'Listen to Pain Speak',
    text: 'Conversations with leading pain experts and patients.',
  },
  {
    href: 'https://go.berkshirepainclinic.co.uk/guide-?utm_source=askdeepak&utm_medium=askpage&utm_campaign=guide',
    title: 'Free pain guide',
    text: 'A practical, educational starting point.',
  },
  {
    href: 'https://go.berkshirepainclinic.co.uk/from-hurting-to-healing-membership?utm_source=askdeepak&utm_medium=askpage&utm_campaign=membership',
    title: 'From Hurting to Healing',
    text: "Dr Deepak's pain healing community and programme.",
  },
  {
    href: 'https://www.amazon.co.uk/dp/1785043390',
    title: 'The Pain-Free Mindset',
    text: 'The bestselling book behind his approach.',
  },
  {
    href: 'https://www.berkshirepainclinic.co.uk/dr-deepak-ravindran-videos-pain-specialist-reading-berkshire/',
    title: 'Video answers',
    text: 'Short videos on the questions patients ask most.',
  },
];

export const FOOTER_LINKS = [
  { href: 'https://deepakravindran.co.uk/', label: 'Website' },
  { href: 'https://www.youtube.com/@drdeepakravindran', label: 'YouTube' },
  { href: 'https://www.instagram.com/drdeepakravindran', label: 'Instagram' },
  { href: 'https://www.facebook.com/DrDeepakRavindran/', label: 'Facebook' },
  { href: 'https://www.buzzsprout.com/817123', label: 'Pain Speak podcast' },
  { href: 'https://www.berkshirepainclinic.co.uk/', label: 'Berkshire Pain Clinic' },
];
