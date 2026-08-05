import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image
          src="/images/hero.png"
          alt="Himalayan Birding Expedition"
          fill
          priority
          className={styles.heroBgImg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroPattern}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>Himalayan Specialist</div>
          <h1 className={styles.heroTitle}>
            Find Your Lifers in the Foothills & High Himalayas
          </h1>
          <p className={styles.heroSubtitle}>
            Tailored birdwatching and photography tours across Sattal, Chopta, and major North India hotspots.
            Expert logistics and guiding designed specifically for international birders.
          </p>
          <div className={styles.heroActions}>
            <Link href="/tours" className="btn btn-accent">
              Explore Birding Hotspots
            </Link>
            <Link href="/book" className="btn btn-secondary" style={{ borderColor: '#ffffff', color: '#ffffff' }}>
              Book an Expedition
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>150+</span>
            <span className={styles.statLabel}>Himalayan Species</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>12.6K</span>
            <span className={styles.statLabel}>Instagram Followers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Target Lifer Success</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10+ Years</span>
            <span className={styles.statLabel}>Local Guiding</span>
          </div>
        </div>
      </section>

      {/* Guide Profile Section */}
      <section className={styles.profileSection}>
        <div className={`container ${styles.profileGrid}`}>
          {/* Visual Profile Picture */}
          <div className={styles.profileImageWrapper}>
            <Image
              src="/profile.jpeg"
              alt="Shubham Kumar - Lead Bird Guide & Photographer"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={styles.profileImage}
              priority
            />
          </div>

          {/* Description Content */}
          <div className={styles.profileContent}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSubtitle}>Meet Your Guide</span>
              <h2 className={styles.sectionTitle}>Shubham Kumar</h2>
            </div>
            <p className={styles.profileText}>
              As an experienced Indian Bird Guide and Himalayan Specialist, I design and lead tailored birdwatching
              tours for foreign and domestic birders. My guiding philosophy is centered around safety, persistence,
              and a deep respect for birding ethics. Whether you're tracking down elusive pheasants at 11,000 feet
              or setting up long lens setups for colorful barbets, I arrange all travel, logistics, permissions,
              and spotting.
            </p>
            <p className={styles.profileText}>
              Combining expert field identification with high-end digital photography skills, I help photography-oriented
              travelers secure stable frames, track nesting patterns, and capture behavior highlights, ensuring a true
              once-in-a-lifetime experience.
            </p>

            <div className={styles.profileFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🦅</span>
                <div>
                  <h4 className={styles.featureTitle}>Target Species Focus</h4>
                  <p className={styles.featureDesc}>Expert at finding target endemics and specialty lifers.</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🚗</span>
                <div>
                  <h4 className={styles.featureTitle}>Seamless Logistics</h4>
                  <p className={styles.featureDesc}>Full pickup, comfortable lodging, and 4x4 transport arranged.</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📸</span>
                <div>
                  <h4 className={styles.featureTitle}>Photo Assistance</h4>
                  <p className={styles.featureDesc}>Pacing and location setups optimized for heavy-lens photographers.</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💬</span>
                <div>
                  <h4 className={styles.featureTitle}>Foreigner Tailored</h4>
                  <p className={styles.featureDesc}>Western-friendly guiding, sanitization standards, and English fluent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotspots Section */}
      <section className={styles.hotspotsSection}>
        <div className={`container`}>
          <div className={styles.sectionHeader} style={{ textAlign: 'center', alignItems: 'center' }}>
            <span className={styles.sectionSubtitle}>Where We Explore</span>
            <h2 className={styles.sectionTitle}>Featured Hotspots & Expeditions</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Our curated itineraries cover key altitudinal belts of North India, offering a rich diversity of bird families.
            </p>
          </div>

          <div className={styles.hotspotsGrid}>
            {/* Hotspot 1: Chopta */}
            <div className={`premium-card ${styles.hotspotCard}`}>
              <div className={styles.hotspotHeader}>
                <Image
                  src="/images/chopta.png"
                  alt="Chopta Alpine Expedition"
                  fill
                  className={styles.hotspotHeaderImg}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.hotspotHeaderOverlay} />
                <div className={styles.hotspotHeaderInner}>
                  <div className={styles.hotspotMeta}>
                    <span className={styles.hotspotLocation}>Uttarakhand</span>
                  </div>
                  <h3 className={styles.hotspotCardTitle}>Chopta Alpine Expedition</h3>
                </div>
              </div>
              <div className={styles.hotspotBody}>
                <p className={styles.hotspotDesc}>
                  High-altitude oak and rhododendron forests. The ultimate quest for high Himalayan pheasants and high-elevation endemics.
                </p>
                <div className={styles.hotspotSpecs}>
                  <div>
                    <span className={styles.specLabel}>Key Birds:</span>
                  </div>
                  <div>
                    <span className={styles.specValue}>Himalayan Monal, Cheer & Koklass Pheasant</span>
                  </div>
                  <div>
                    <span className={styles.specLabel}>Best Season:</span>
                  </div>
                  <div>
                    <span className={styles.specValue}>March – May, Oct – Dec</span>
                  </div>
                  <div>
                    <span className={styles.specLabel}>Difficulty:</span>
                  </div>
                  <div>
                    <span className={styles.specValue}>Moderate to Strenuous</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <Link href="/tours#chopta" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  View Full Details
                </Link>
              </div>
            </div>

            {/* Hotspot 2: Sattal */}
            <div className={`premium-card ${styles.hotspotCard}`}>
              <div className={styles.hotspotHeader}>
                <Image
                  src="/images/sattal.png"
                  alt="Sattal Foothills Special"
                  fill
                  className={styles.hotspotHeaderImg}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.hotspotHeaderOverlay} />
                <div className={styles.hotspotHeaderInner}>
                  <div className={styles.hotspotMeta}>
                    <span className={styles.hotspotLocation}>Himalayan Foothills</span>
                  </div>
                  <h3 className={styles.hotspotCardTitle}>Sattal Foothills Special</h3>
                </div>
              </div>
              <div className={styles.hotspotBody}>
                <p className={styles.hotspotDesc}>
                  A subtropical birding paradise. Perfect for getting close-up photography frames of colorful, active forest species.
                </p>
                <div className={styles.hotspotSpecs}>
                  <div>
                    <span className={styles.specLabel}>Key Birds:</span>
                  </div>
                  <div>
                    <span className={styles.specValue}>Laughingthrushes, Barbets, Woodpeckers</span>
                  </div>
                  <div>
                    <span className={styles.specLabel}>Best Season:</span>
                  </div>
                  <div>
                    <span className={styles.specValue}>October – April</span>
                  </div>
                  <div>
                    <span className={styles.specLabel}>Difficulty:</span>
                  </div>
                  <div>
                    <span className={styles.specValue}>Easy / Photography friendly</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <Link href="/tours#sattal" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  View Full Details
                </Link>
              </div>
            </div>

            {/* Hotspot 3: Manglajodi */}
            <div className={`premium-card ${styles.hotspotCard}`}>
              <div className={styles.hotspotHeader}>
                <Image
                  src="/images/manglajodi.png"
                  alt="Manglajodi Waterbird Odyssey"
                  fill
                  className={styles.hotspotHeaderImg}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.hotspotHeaderOverlay} />
                <div className={styles.hotspotHeaderInner}>
                  <div className={styles.hotspotMeta}>
                    <span className={styles.hotspotLocation}>Odisha Wetland</span>
                  </div>
                  <h3 className={styles.hotspotCardTitle}>Manglajodi Waterbird Odyssey</h3>
                </div>
              </div>
              <div className={styles.hotspotBody}>
                <p className={styles.hotspotDesc}>
                  Vast freshwater wetlands of Chilika Lake. Drift quietly in wooden country boats for spectacular, close-range waterbird photography.
                </p>
                <div className={styles.hotspotSpecs}>
                  <div>
                    <span className={styles.specLabel}>Key Birds:</span>
                  </div>
                  <div>
                    <span className={styles.specValue}>Waders, Rails, Migratory Ducks, Snipe</span>
                  </div>
                  <div>
                    <span className={styles.specLabel}>Best Season:</span>
                  </div>
                  <div>
                    <span className={styles.specValue}>November – February</span>
                  </div>
                  <div>
                    <span className={styles.specLabel}>Difficulty:</span>
                  </div>
                  <div>
                    <span className={styles.specValue}>Easy / Boat-based</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <Link href="/tours#manglajodi" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={`container`}>
          <div className={styles.sectionHeader} style={{ textAlign: 'center', alignItems: 'center' }}>
            <span className={styles.sectionSubtitle}>Client Reviews</span>
            <h2 className={styles.sectionTitle}>What Foreign Birders Say</h2>
          </div>

          <div className={styles.testimonialGrid}>
            <div className={`premium-card ${styles.testimonialCard}`}>
              <p className={styles.testimonialText}>
                "Guiding in the Himalayas requires deep patience, and Shubham has plenty of it. He tracked down our main
                target—the Himalayan Monal—at Chopta in freezing conditions. The logistics were flawless, clean, and safe for our UK group."
              </p>
              <div className={styles.testimonialUser}>
                <div className={styles.userAvatar}>AH</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Arthur H.</span>
                  <span className={styles.userCountry}>Bristol, United Kingdom</span>
                </div>
              </div>
            </div>

            <div className={`premium-card ${styles.testimonialCard}`}>
              <p className={styles.testimonialText}>
                "As a photographer hauling a 600mm f/4 prime lens, I appreciate guides who understand light angles and slow pacing.
                Shubham set up beautiful hide locations in Sattal that allowed me to capture barbets and flycatchers at eye-level."
              </p>
              <div className={styles.testimonialUser}>
                <div className={styles.userAvatar}>MK</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Markus K.</span>
                  <span className={styles.userCountry}>Munich, Germany</span>
                </div>
              </div>
            </div>

            <div className={`premium-card ${styles.testimonialCard}`}>
              <p className={styles.testimonialText}>
                "Manglajodi was breathtaking! Handled all the local boatmen and knew exactly where the Painted Snipes and Greater
                Painted-snipes were hidden. Recorded 142 species on a short trip. Fully recommend to any birder visiting India!"
              </p>
              <div className={styles.testimonialUser}>
                <div className={styles.userAvatar}>SL</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Sarah L.</span>
                  <span className={styles.userCountry}>California, USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaContent}`}>
          <h2 className={styles.ctaTitle}>Ready to Check Off Your Lifers?</h2>
          <p className={styles.ctaDesc}>
            Join Shubham Kumar for a custom-crafted birdwatching or photography expedition in India's top hotspots.
          </p>
          <Link href="/book" className="btn btn-accent">
            Plan Your Tour Today
          </Link>
        </div>
      </section>
    </div>
  );
}
