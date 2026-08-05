'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tours', label: 'Tours & Hotspots' },
    { href: '/gallery', label: 'Bird Gallery' },
    { href: '/dashboard', label: 'Admin Panel' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoTitle}>SHUBHAM KUMAR</span>
          <span className={styles.logoSubtitle}>Birds Guide & Expeditions</span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/book" className="btn btn-accent btn-sm">
              Book a Tour
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle button */}
        <button
          className={`${styles.mobileMenuBtn} ${isOpen ? styles.mobileMenuBtnActive : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* Mobile Menu Drawer Overlay */}
        <div
          className={`${styles.mobileOverlay} ${isOpen ? styles.mobileOverlayOpen : ''}`}
          onClick={toggleMenu}
        />

        {/* Mobile Menu Drawer */}
        <div className={`${styles.mobileMenuDrawer} ${isOpen ? styles.mobileMenuDrawerOpen : ''}`}>
          <ul className={styles.mobileNavLinks}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.mobileNavLink} ${isActive ? styles.activeLink : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/book" className="btn btn-accent text-center">
            Book a Tour
          </Link>
        </div>
      </div>
    </nav>
  );
}
