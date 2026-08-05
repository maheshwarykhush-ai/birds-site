'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <div className={styles.footerGrid}>
          {/* Col 1: Bio */}
          <div className={styles.footerCol}>
            <h3 className={styles.title}>Shubham Kumar</h3>
            <p className={styles.desc}>
              Indian Bird Guide and Himalayan Specialist. Providing tailored, professional
              birdwatching tours and wildlife photography expeditions for foreign and domestic birders.
            </p>
            <p className={styles.desc}>
              Explore Sattal, Chopta, Manglajodi, and major North India birding hotspots.
            </p>
          </div>

          {/* Col 2: Destinations */}
          <div className={styles.footerCol}>
            <h3 className={styles.title}>Hotspots</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="/tours#sattal" className={styles.link}>
                  Sattal Foothills
                </Link>
              </li>
              <li>
                <Link href="/tours#chopta" className={styles.link}>
                  Chopta Alpine
                </Link>
              </li>
              <li>
                <Link href="/tours#manglajodi" className={styles.link}>
                  Manglajodi Wetlands
                </Link>
              </li>
              <li>
                <Link href="/tours#pangot" className={styles.link}>
                  Pangot Oak Forest
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className={styles.footerCol}>
            <h3 className={styles.title}>Explore</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="/" className={styles.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tours" className={styles.link}>
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/gallery" className={styles.link}>
                  Bird Gallery
                </Link>
              </li>
              <li>
                <Link href="/book" className={styles.link}>
                  Book a Trip
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className={styles.link}>
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className={styles.footerCol}>
            <h3 className={styles.title}>Get in Touch</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>Sattal & major North India hotspots</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>💬</span>
                <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  WhatsApp Chat
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <span>bookings@guidedbirdingtours.com</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <p className={styles.newsletterText}>Subscribe for lifer alerts and tour schedules</p>
              {subscribed ? (
                <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600 }}>
                  ✓ Thank you for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className={styles.form}>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className={styles.submitBtn}>
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Guided Birding Tours. All rights reserved.</p>
          <div className={styles.socials}>
            <a
              href="https://instagram.com/guidedbirdingtours"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              Instagram (@guidedbirdingtours)
            </a>
            <a href="#" className={styles.socialLink}>
              Facebook
            </a>
            <a href="#" className={styles.socialLink}>
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
