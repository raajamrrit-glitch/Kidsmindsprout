"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type Journey = 'starter' | 'builder' | 'legend';

const journeyMeta = {
  starter: {
    title: 'Story Starter',
    price: '₹699',
    promise: 'Quick, joyful, ready in minutes.',
    image: '/assets/covers/ruhi-easter.jpg.png',
  },
  builder: {
    title: 'Story Builder',
    price: '₹1,199',
    promise: 'More personal, more emotionally specific.',
    image: '/assets/covers/little-world-values.jpg.png',
  },
  legend: {
    title: 'Story Legend',
    price: '₹1,799',
    promise: 'Illustrated likeness with keepsake-level finish.',
    image: '/assets/covers/arjun-legends.jpg.png',
  },
} satisfies Record<Journey, { title: string; price: string; promise: string; image: string }>;

const themes = ['Diwali Dream', 'Holi of Colors', 'Birthday Hero', 'Space Mission', 'Indian Legends', 'Alphabet Adventure'];

const traits = ['Curious', 'Brave', 'Kind', 'Creative', 'Funny', 'Loves animals', 'Loves painting', 'Dreams big'];

export default function CreateStoryFlow() {
  const [step, setStep] = useState(1);
  const [journey, setJourney] = useState<Journey>('legend');
  const [childName, setChildName] = useState('Anaya');
  const [age, setAge] = useState('5');
  const [theme, setTheme] = useState('Diwali Dream');
  const [selectedTraits, setSelectedTraits] = useState<string[]>(['Curious', 'Kind']);
  const [includePhoto, setIncludePhoto] = useState(true);

  const currentJourney = journeyMeta[journey];
  const readyForCheckout = childName.trim().length > 1 && theme.trim().length > 1;

  const previewTitle = useMemo(() => `${childName || 'Your child'}'s ${theme}`, [childName, theme]);

  const toggleTrait = (trait: string) => {
    setSelectedTraits((current) =>
      current.includes(trait) ? current.filter((item) => item !== trait) : [...current, trait].slice(-4)
    );
  };

  return (
    <main className="create-page">
      <section className="create-hero section-shell">
        <div className="create-topbar">
          <Link href="/" className="text-link">
            &larr; Back to homepage
          </Link>
          <span className="create-progress-label">Step {step} of 4</span>
        </div>

        <div className="create-shell">
          <div className="create-main">
            <div className="section-heading create-heading">
              <p className="eyebrow">Create their story</p>
              <h1>A guided flow that gets a parent from idea to preview without friction.</h1>
              <p>One question per moment. Clear emotional payoff. A checkout handoff that still feels warm, not transactional.</p>
            </div>

            <div className="create-steps">
              <button className={`create-step-pill ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)} type="button">Journey</button>
              <button className={`create-step-pill ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)} type="button">Child</button>
              <button className={`create-step-pill ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)} type="button">Story</button>
              <button className={`create-step-pill ${step === 4 ? 'active' : ''}`} onClick={() => setStep(4)} type="button">Checkout</button>
            </div>

            <div className="create-card">
              {step === 1 ? (
                <div className="wizard-panel">
                  <div>
                    <p className="eyebrow">Step 1</p>
                    <h2>Choose the depth of magic.</h2>
                    <p>We keep the three journeys emotionally distinct so parents choose the kind of moment they want to create, not just a plan.</p>
                  </div>
                  <div className="journey-choice-grid">
                    {(['starter', 'builder', 'legend'] as Journey[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`journey-choice ${journey === option ? 'selected' : ''}`}
                        onClick={() => {
                          setJourney(option);
                          setIncludePhoto(option === 'legend');
                        }}
                      >
                        <strong>{journeyMeta[option].title}</strong>
                        <span>{journeyMeta[option].promise}</span>
                        <em>{journeyMeta[option].price}</em>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="wizard-panel">
                  <div>
                    <p className="eyebrow">Step 2</p>
                    <h2>Tell us about the child behind the story.</h2>
                    <p>This stage keeps the form light while still capturing the details that make the preview feel unmistakably theirs.</p>
                  </div>
                  <div className="form-stack">
                    <label>
                      Child&apos;s name
                      <input value={childName} onChange={(event) => setChildName(event.target.value)} placeholder="Anaya" />
                    </label>
                    <label>
                      Age
                      <input value={age} onChange={(event) => setAge(event.target.value)} placeholder="5" />
                    </label>
                    {journey === 'legend' ? (
                      <label className="checkbox-row">
                        <input checked={includePhoto} onChange={(event) => setIncludePhoto(event.target.checked)} type="checkbox" />
                        Use 3-5 photos to create an illustrated likeness. Photos stay private and are only used for this book.
                      </label>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="wizard-panel">
                  <div>
                    <p className="eyebrow">Step 3</p>
                    <h2>Shape the story.</h2>
                    <p>Pick the theme, then choose the traits that should echo through the plot, scenes, and emotional arc.</p>
                  </div>
                  <div className="form-stack">
                    <label>
                      Story theme
                      <select value={theme} onChange={(event) => setTheme(event.target.value)}>
                        {themes.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div>
                      <span className="field-label">Traits to weave into the story</span>
                      <div className="trait-grid">
                        {traits.map((trait) => (
                          <button
                            key={trait}
                            type="button"
                            className={`trait-pill ${selectedTraits.includes(trait) ? 'selected' : ''}`}
                            onClick={() => toggleTrait(trait)}
                          >
                            {trait}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="wizard-panel">
                  <div>
                    <p className="eyebrow">Step 4</p>
                    <h2>Preview first. Then checkout with confidence.</h2>
                    <p>This checkout structure keeps the commitment barrier low: preview first, print only when the parent loves it.</p>
                  </div>
                  <div className="checkout-grid">
                    <div className="checkout-card">
                      <strong>What happens next</strong>
                      <ul>
                        <li>Generate soft preview in under 2 minutes</li>
                        <li>Approve before printing</li>
                        <li>Printed in India and delivered in 7 days</li>
                        <li>WhatsApp updates after order confirmation</li>
                      </ul>
                    </div>
                    <div className="checkout-card">
                      <strong>Preferred order path</strong>
                      <div className="checkout-actions">
                        <button className="button button-primary" type="button" disabled={!readyForCheckout}>
                          Generate Free Preview &rarr;
                        </button>
                        <button className="button button-secondary" type="button">
                          Continue on WhatsApp
                        </button>
                      </div>
                      <p className="checkout-note">Secure payment happens only after preview approval.</p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="wizard-nav">
                <button className="button button-secondary" type="button" disabled={step === 1} onClick={() => setStep((current) => current - 1)}>
                  Back
                </button>
                <button className="button button-primary" type="button" disabled={step === 4} onClick={() => setStep((current) => current + 1)}>
                  Next step &rarr;
                </button>
              </div>
            </div>
          </div>

          <aside className="create-sidebar">
            <div className="create-preview-card">
              <div className="preview-media">
                <Image src={currentJourney.image} alt={currentJourney.title} fill sizes="(max-width: 1024px) 100vw, 32vw" className="cover-image" />
              </div>
              <div className="create-preview-copy">
                <span className="preview-tag">{currentJourney.title}</span>
                <h3>{previewTitle}</h3>
                <p>{currentJourney.promise}</p>
                <div className="preview-meta">
                  <span>{currentJourney.price}</span>
                  <span>{age} years</span>
                  <span>{selectedTraits.slice(0, 3).join(' / ') || 'Personalized traits'}</span>
                </div>
              </div>
            </div>

            <div className="checkout-summary">
              <strong>Why this flow converts better</strong>
              <ul>
                <li>Parents see progress immediately</li>
                <li>Preview-first reduces hesitation</li>
                <li>WhatsApp handoff fits India behavior</li>
                <li>School orders can branch from the same system</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
