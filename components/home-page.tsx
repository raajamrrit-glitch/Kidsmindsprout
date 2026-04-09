"use client";

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type HeroStyle = 'adventurer' | 'dreamer' | 'explorer';
type HairTone = 'dark' | 'brown' | 'auburn';

type ThemeCard = {
  title: string;
  description: string;
  image?: string;
  accent?: 'gold' | 'mint' | 'rose';
};

type CoverAsset = {
  title: string;
  src: string;
  orientation?: 'portrait' | 'landscape';
  tag: string;
};

const storyThemes: ThemeCard[] = [
  {
    title: 'Birthday Hero',
    description: 'A candlelit mission to save the celebration.',
    image: '/assets/covers/ruhi-easter.jpg.png',
    accent: 'gold',
  },
  {
    title: 'Diwali Champion',
    description: 'A glowing festival adventure full of courage and light.',
    image: '/assets/covers/arjun-legends.jpg.png',
    accent: 'rose',
  },
  {
    title: 'Holi of Colors',
    description: 'A joyful story about friendship, mess, and wonder.',
    accent: 'mint',
  },
  {
    title: 'Space Explorer',
    description: 'A launch into bravery, planets, and possibility.',
    accent: 'gold',
  },
  {
    title: 'Jungle Queen',
    description: 'A wild rescue mission led by curiosity and heart.',
    accent: 'mint',
  },
  {
    title: 'Graduation Star',
    description: 'A milestone keepsake for growing up with pride.',
    image: '/assets/covers/little-world-values.jpg.png',
    accent: 'rose',
  },
  {
    title: 'Courage Quest',
    description: 'A confidence-building story for bold little hearts.',
    image: '/assets/covers/pranav-bogus.jpg.png',
    accent: 'gold',
  },
  {
    title: 'Ocean Guardian',
    description: 'An underwater adventure with kindness at the center.',
    accent: 'mint',
  },
  {
    title: 'Alphabet Learning Adventures',
    description: 'A gentle learning-led format for younger readers.',
    image: '/assets/covers/alphabet-learning.jpg.png',
    accent: 'rose',
  },
];

const featuredCovers: CoverAsset[] = [
  { title: "Ruhi's Easter With Bunny Ben", src: '/assets/covers/ruhi-easter.jpg.png', tag: 'Soft wonder' },
  { title: 'Her Little World of Values', src: '/assets/covers/little-world-values.jpg.png', tag: 'Values-led' },
  { title: 'Alphabet Learning Adventures', src: '/assets/covers/alphabet-learning.jpg.png', tag: 'Early learning' },
  { title: 'Pranav & Bogus Always Together', src: '/assets/covers/pranav-bogus.jpg.png', orientation: 'landscape', tag: 'Friendship' },
  { title: 'Arjun Meets the Legends', src: '/assets/covers/arjun-legends.jpg.png', orientation: 'landscape', tag: 'Indian heroes' },
];

const sanitizeName = (value: string) => {
  const trimmed = value.replace(/[^a-zA-Z ]/g, '').trim();
  return trimmed || 'Anaya';
};

export default function HomePage() {
  const [childName, setChildName] = useState('Anaya');
  const [heroStyle, setHeroStyle] = useState<HeroStyle>('adventurer');
  const [hairTone, setHairTone] = useState<HairTone>('dark');
  const [storyTheme, setStoryTheme] = useState('Big Adventure');
  const [compareValue, setCompareValue] = useState(62);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const liveTitle = useMemo(() => `${sanitizeName(childName)}'s ${storyTheme}`, [childName, storyTheme]);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      const footer = document.getElementById('footer-cta');
      const stepNodes = Array.from(document.querySelectorAll<HTMLElement>('.step-card'));

      if (hero && footer) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const footerTop = footer.getBoundingClientRect().top;
        setShowStickyCta(heroBottom < 0 && footerTop > window.innerHeight * 0.75);
      }

      let currentIndex = 0;
      stepNodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.2) {
          currentIndex = index;
        }
      });
      setActiveStep(currentIndex);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#hero" aria-label="KidsMindSprout home">
          <span className="brand-mark">K</span>
          <span className="brand-text">
            <strong>KidsMindSprout</strong>
            <small>Stories where they belong</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#journeys">Journeys</a>
          <a href="#themes">Themes</a>
          <a href="#schools">Schools</a>
        </nav>
        <a className="button button-secondary desktop-only" href="/create">
          See a preview first
        </a>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero-visual">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="book-showcase floating-card breathing">
              <div className="book-spine" />
              <div className={`book-cover hair-${hairTone}`}>
                <div className="book-badge">Most ordered this week: Diwali Champion</div>
                <p className="cover-kicker">Personalized for</p>
                <h2 className="cover-title">{liveTitle}</h2>
                <div className="cover-character">
                  <div className="character-hair" />
                  <div className="character-face" />
                  <div className="character-book" />
                </div>
                <p className="cover-footer">Made in India &bull; Preview before you print</p>
              </div>
            </div>
            <div className="story-landscape">
              <span className="cloud cloud-one" />
              <span className="cloud cloud-two" />
              <span className="tree tree-one" />
              <span className="tree tree-two" />
              <span className="hill hill-one" />
              <span className="hill hill-two" />
            </div>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Every child deserves to be the hero of their own story</p>
            <h1>Your child. Their story. Their magic.</h1>
            <p className="hero-subtitle">
              Personalized books where your little one is the hero with their name, their face, their adventure.
              Made in India, delivered to your door.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/create">
                Create Their Story <span aria-hidden="true">&rarr;</span>
              </a>
              <a className="text-link" href="/create">
                See a preview first
              </a>
            </div>
            <div className="trust-strip">
              <span>&#9733; Rated 4.9</span>
              <span>Printed in India</span>
              <span>Delivered in 7 days</span>
              <span>4,000+ families love it</span>
            </div>
          </div>
        </section>

        <section className="moment-band">
          <div className="section-shell moment-shell">
            <div className="moment-copy">
              <p className="eyebrow eyebrow-light">The reaction is the ad</p>
              <h2>The moment they see themselves in the story... everything changes.</h2>
            </div>
            <div className="video-placeholder">
              <div className="video-frame video-embed-shell">
                <video className="moment-video" autoPlay muted loop playsInline controls poster="/assets/covers/ruhi-easter.jpg.png">
                  <source src="/assets/covers/Ruhi-easter.mp4.mp4" type="video/mp4" />
                </video>
              </div>
              <p>Ruhi&apos;s book moving from image to cinematic keepsake gives the product a premium AI-native proof point.</p>
            </div>
          </div>
        </section>

        <section className="journeys section-shell" id="journeys">
          <div className="section-heading">
            <p className="eyebrow">Choose your journey</p>
            <h2>How deep do you want the magic to go?</h2>
            <p>Every child is different. Every story should be too.</p>
          </div>
          <div className="journey-grid">
            <article className="journey-card starter">
              <div className="portal portal-starter" />
              <p className="journey-label">Story Starter</p>
              <h3>In 2 minutes, your child becomes the hero.</h3>
              <p className="journey-copy">
                A quick, joyful story built from beloved themes like birthdays, Diwali, Holi, space, and jungle adventures.
              </p>
              <p className="journey-price">From ₹699</p>
              <a className="button button-ghost" href="/create?journey=starter">
                Start this journey &rarr;
              </a>
            </article>
            <article className="journey-card builder">
              <div className="portal portal-builder" />
              <p className="journey-label">Story Builder</p>
              <h3>A story only your child could be the hero of.</h3>
              <p className="journey-copy">
                We weave their quirks, dreams, favorite things, and personality into a semi-custom adventure with emotional depth.
              </p>
              <p className="journey-price">From ₹1,199</p>
              <a className="button button-ghost" href="/create?journey=builder">
                Start this journey &rarr;
              </a>
            </article>
            <article className="journey-card legend featured">
              <span className="badge">Most loved</span>
              <div className="portal portal-legend" />
              <p className="journey-label">Story Legend</p>
              <h3>They won&apos;t just read the story. They&apos;ll live it.</h3>
              <p className="journey-copy">
                Upload photos and watch them become an illustrated hero across a premium keepsake book printed on 200gsm pages.
              </p>
              <p className="journey-price">From ₹1,799</p>
              <a className="button button-primary" href="/create?journey=legend">
                Start this journey &rarr;
              </a>
            </article>
          </div>
          <div className="comparison-magic">
            <div className="slider-copy">
              <p className="eyebrow">Before and after personalization</p>
              <h3>Generic stories are forgettable. Personal stories stay on the bedside table.</h3>
            </div>
            <div className="before-after" aria-label="Personalization comparison demo">
              <div className="compare-base compare-generic">
                <span>Generic</span>
                <h4>The Brave Child</h4>
              </div>
              <div className="compare-overlay" style={{ width: `${compareValue}%` }}>
                <div className="compare-personalized">
                  <span>Personalized</span>
                  <h4>Ananya&apos;s Painting Adventure</h4>
                </div>
              </div>
              <input
                className="compare-range"
                type="range"
                min="0"
                max="100"
                value={compareValue}
                onChange={(event) => setCompareValue(Number(event.target.value))}
                aria-label="Drag to compare personalization"
              />
            </div>
          </div>
          <div className="section-cta">
            <a className="button button-primary" href="/create">
              Create Their Story &rarr;
            </a>
          </div>
        </section>

        <section className="cover-reel section-shell" id="featured-covers">
          <div className="section-heading narrow-heading">
            <p className="eyebrow">Real cover storytelling</p>
            <h2>These covers already carry the premium emotional language the brand needs.</h2>
            <p>We use them here as proof of visual quality, depth of imagination, and keepsake-worthy finish.</p>
          </div>
          <div className="cover-reel-grid">
            {featuredCovers.map((cover) => (
              <article className={`cover-reel-card ${cover.orientation === 'landscape' ? 'landscape' : 'portrait'}`} key={cover.title}>
                <div className="cover-image-shell">
                  <Image src={cover.src} alt={cover.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="cover-image" />
                </div>
                <div className="cover-reel-meta">
                  <span>{cover.tag}</span>
                  <strong>{cover.title}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="how-it-works section-shell" id="how-it-works">
          <div className="section-heading">
            <p className="eyebrow">Simple by design</p>
            <h2>From your phone to their hands in 7 days.</h2>
            <p>Preview before you print, then let us handle the rest.</p>
          </div>
          <div className="steps-track">
            {[
              ['Tell us about your child', 'Name, age, interests, and the details that make them unmistakably them.', 'icon-profile'],
              ['Choose their adventure', 'Pick a theme that feels like their world, from festivals to future dreams.', 'icon-portal'],
              ['Upload their photo', 'For Story Legend, their features become a warm illustrated likeness. Your photos are safe and private.', 'icon-photo'],
              ['Preview before you print', 'See the soft copy first, make sure it feels right, and only print when you love it.', 'icon-preview'],
              ['Printed and delivered', 'Your hardcover storybook is printed in India and arrives at your doorstep in 7 days.', 'icon-delivery'],
            ].map(([title, copy, icon], index) => (
              <article className={`step-card ${activeStep === index ? 'active-step' : ''}`} key={title}>
                <div className={`step-icon ${icon}`} />
                <span className="step-index">{`0${index + 1}`}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="demo section-shell" id="demo">
          <div className="section-heading demo-heading">
            <p className="eyebrow">Live personalization demo</p>
            <h2>See the magic happen right now.</h2>
            <p>Type a name, choose a few traits, and watch the cover transform instantly.</p>
          </div>
          <div className="demo-layout">
            <div className="demo-panel form-panel">
              <label htmlFor="childName">Child&apos;s name</label>
              <input
                id="childName"
                name="childName"
                type="text"
                maxLength={18}
                value={childName}
                onChange={(event) => setChildName(sanitizeName(event.target.value))}
                placeholder="Type a name"
              />
              <div className="demo-grid">
                <div>
                  <label htmlFor="childStyle">Hero style</label>
                  <select
                    id="childStyle"
                    name="childStyle"
                    value={heroStyle}
                    onChange={(event) => setHeroStyle(event.target.value as HeroStyle)}
                  >
                    <option value="adventurer">Adventurer</option>
                    <option value="dreamer">Dreamer</option>
                    <option value="explorer">Explorer</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="hairTone">Hair tone</label>
                  <select
                    id="hairTone"
                    name="hairTone"
                    value={hairTone}
                    onChange={(event) => setHairTone(event.target.value as HairTone)}
                  >
                    <option value="dark">Dark</option>
                    <option value="brown">Brown</option>
                    <option value="auburn">Auburn</option>
                  </select>
                </div>
              </div>
              <label htmlFor="storyTheme">Story theme</label>
              <select id="storyTheme" name="storyTheme" value={storyTheme} onChange={(event) => setStoryTheme(event.target.value)}>
                <option value="Big Adventure">Big Adventure</option>
                <option value="Diwali Dream">Diwali Dream</option>
                <option value="Space Mission">Space Mission</option>
                <option value="Jungle Quest">Jungle Quest</option>
              </select>
              <p className="demo-note">Free preview, takes 2 minutes. Preview before you print.</p>
              <a className="button button-primary" href="/create">
                Ready to make the full book? &rarr;
              </a>
            </div>
            <div className="demo-panel cover-panel">
              <div className="demo-book floating-card">
                <div className={`demo-book-inner style-${heroStyle} hair-${hairTone}`}>
                  <p className="cover-kicker">Tonight&apos;s story</p>
                  <h3>{liveTitle}</h3>
                  <div className="demo-character">
                    <div className="demo-hair" />
                    <div className="demo-face" />
                    <div className="demo-outfit" />
                  </div>
                  <p className="cover-footer">Preview before you print &bull; Made in India</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="themes section-shell" id="themes">
          <div className="section-heading">
            <p className="eyebrow">Story themes</p>
            <h2>Every child&apos;s world. Every story theme.</h2>
            <p>Built for birthdays, festivals, milestones, and the little traits parents love most.</p>
          </div>
          <div className="theme-row" aria-label="Story theme catalog preview">
            {storyThemes.map((theme) => (
              <article className={`theme-card ${theme.image ? 'theme-card-image' : ''} accent-${theme.accent ?? 'gold'}`} key={theme.title}>
                {theme.image ? (
                  <div className="theme-media">
                    <Image src={theme.image} alt={theme.title} fill sizes="(max-width: 768px) 80vw, 240px" className="theme-cover-image" />
                  </div>
                ) : null}
                <div className="theme-copy">
                  <strong>{theme.title}</strong>
                  <span>{theme.description}</span>
                </div>
              </article>
            ))}
            <a className="theme-link" href="/create">
              View all 20+ themes &rarr;
            </a>
          </div>
        </section>

        <section className="social-proof section-shell" id="reviews">
          <div className="section-heading">
            <p className="eyebrow">Loved by families</p>
            <h2>What happens when children open their book.</h2>
          </div>
          <div className="quote-feature">
            <p>
              &ldquo;My son didn&apos;t believe it was real. He kept checking every page for his name. He&apos;s asked me to
              read it every night for two weeks.&rdquo;
            </p>
            <span>Priya, Delhi</span>
          </div>
          <div className="ugc-grid desktop-grid">
            <article className="ugc-tile tall"><div className="ugc-photo tone-one" /><p>&ldquo;She gasped at page one.&rdquo;</p><span>Rhea, Bengaluru</span></article>
            <article className="ugc-tile"><div className="ugc-photo tone-two" /><p>&ldquo;My daughter carried it to school.&rdquo;</p><span>Akash, Mumbai</span></article>
            <article className="ugc-tile"><div className="ugc-photo tone-three" /><p>&ldquo;Grandparents cried on the video call.&rdquo;</p><span>Neha, Gurgaon</span></article>
            <article className="ugc-tile wide"><div className="ugc-photo tone-four" /><p>&ldquo;He kept saying, that&apos;s me.&rdquo;</p><span>Farah, Hyderabad</span></article>
          </div>
          <div className="ugc-scroll mobile-grid">
            <article className="ugc-tile"><div className="ugc-photo tone-one" /><p>&ldquo;She gasped at page one.&rdquo;</p><span>Rhea, Bengaluru</span></article>
            <article className="ugc-tile"><div className="ugc-photo tone-two" /><p>&ldquo;My daughter carried it to school.&rdquo;</p><span>Akash, Mumbai</span></article>
            <article className="ugc-tile"><div className="ugc-photo tone-three" /><p>&ldquo;Grandparents cried on the video call.&rdquo;</p><span>Neha, Gurgaon</span></article>
            <article className="ugc-tile"><div className="ugc-photo tone-four" /><p>&ldquo;He kept saying, that&apos;s me.&rdquo;</p><span>Farah, Hyderabad</span></article>
          </div>
          <div className="ratings-row">
            <strong>Google rating 4.9/5</strong>
            <span>2,400+ reviews</span>
            <span>4,000+ families served</span>
          </div>
          <div className="section-cta">
            <a className="button button-primary" href="/create">
              Create Their Story &rarr;
            </a>
          </div>
        </section>

        <section className="schools section-shell" id="schools">
          <div className="schools-panel">
            <div>
              <p className="eyebrow">School partnerships</p>
              <h2>For principals and school coordinators.</h2>
              <p>
                50+ occasions where a personalized book becomes the perfect school moment, from graduation and
                Children&apos;s Day to reading programs and festival celebrations.
              </p>
            </div>
            <div className="school-benefits">
              <div><strong>Bulk pricing</strong><span>Predictable budgets for school-wide moments.</span></div>
              <div><strong>Commission for school</strong><span>A fundraising-friendly model that still feels premium.</span></div>
              <div><strong>Preview before printing</strong><span>Approve every story before books go to press.</span></div>
            </div>
            <a className="button button-secondary" href="/create?school=true">
              Explore school partnerships &rarr;
            </a>
          </div>
        </section>
      </main>

      <footer>
        <section className="footer-cta" id="footer-cta">
          <div className="section-shell footer-cta-inner">
            <div>
              <p className="eyebrow eyebrow-light">One last nudge toward magic</p>
              <h2>The story your child will never forget.</h2>
              <p>Create their book today. Preview it for free. Print it only when you love it.</p>
            </div>
            <div className="footer-actions">
              <a className="button button-light" href="/create">
                Create Their Story &rarr;
              </a>
              <div className="footer-trust">
                <span>Free preview</span>
                <span>No commitment until you print</span>
                <span>Secure payment</span>
                <span>Made in India</span>
              </div>
            </div>
          </div>
        </section>
        <div className="footer-base">
          <div>
            <strong>KidsMindSprout</strong>
            <p>Premium AI-native storybooks designed for Indian families.</p>
          </div>
          <div className="footer-links">
            <a href="#hero">Home</a>
            <a href="#journeys">Journeys</a>
            <a href="#schools">Schools</a>
          </div>
        </div>
      </footer>

      <a className={`sticky-cta ${showStickyCta ? 'visible' : ''}`} href="/create">
        Create Their Story &rarr;
      </a>
    </div>
  );
}
