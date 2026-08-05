'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './Book.module.css';

interface TourOption {
  id: string;
  name: string;
  price: number;
}

const toursList: TourOption[] = [
  { id: 'chopta', name: 'Chopta Alpine Pheasant Quest', price: 1400 },
  { id: 'sattal', name: 'Sattal Foothills Special', price: 950 },
  { id: 'manglajodi', name: 'Manglajodi Wetland Odyssey', price: 680 },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const initialTour = searchParams.get('tour') || 'chopta';

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Form Fields
  const [selectedTour, setSelectedTour] = useState(initialTour);
  const [startDate, setStartDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('US');
  const [lodging, setLodging] = useState('shared'); // 'shared' or 'single'

  const [tourPacing, setTourPacing] = useState('photography'); // 'photography' or 'listing'
  const [specialRequests, setSpecialRequests] = useState('');

  // Dynamic Prices
  const [basePrice, setBasePrice] = useState(0);
  const [discountMultiplier, setDiscountMultiplier] = useState(1);
  const [lodgingCost, setLodgingCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Update selected tour if url param changes
  useEffect(() => {
    const urlTour = searchParams.get('tour');
    if (urlTour && toursList.some(t => t.id === urlTour)) {
      setSelectedTour(urlTour);
    }
  }, [searchParams]);

  // Pricing calculations
  useEffect(() => {
    const tour = toursList.find((t) => t.id === selectedTour) || toursList[0];
    const rate = tour.price;
    setBasePrice(rate);

    // Multiguers discounts
    let multiplier = 1.0;
    if (guestCount === 2) {
      multiplier = 0.90; // 10% off per person
    } else if (guestCount >= 3) {
      multiplier = 0.85; // 15% off per person
    }
    setDiscountMultiplier(multiplier);

    // Single room occupancy supplement ($150 per person)
    const lodgingAddon = lodging === 'single' ? 150 * guestCount : 0;
    setLodgingCost(lodgingAddon);

    // Total cost
    const tourTotal = Math.round(rate * guestCount * multiplier + lodgingAddon);
    setTotalCost(tourTotal);
  }, [selectedTour, guestCount, lodging]);

  const handleNext = () => {
    if (step === 1 && (!startDate || !selectedTour)) {
      alert('Please select a tour and a valid start date.');
      return;
    }
    if (step === 2 && (!fullName || !email)) {
      alert('Please fill out your name and email address.');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate Booking reference ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `GB-${randomNum}-${selectedTour.substring(0, 3).toUpperCase()}`;
    setBookingRef(ref);

    const tourObj = toursList.find((t) => t.id === selectedTour) || toursList[0];

    const newBooking = {
      id: ref,
      tourId: selectedTour,
      tourName: tourObj.name,
      startDate,
      guestCount,
      fullName,
      email,
      nationality,
      lodging,
      pacing: tourPacing,
      requests: specialRequests,
      price: totalCost,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString(),
    };

    // Save in LocalStorage for admin dashboard to load
    try {
      const existingBookings = localStorage.getItem('bird_bookings');
      const bookingsList = existingBookings ? JSON.parse(existingBookings) : [];
      bookingsList.push(newBooking);
      localStorage.setItem('bird_bookings', JSON.stringify(bookingsList));
    } catch (err) {
      console.error('Error saving booking', err);
    }

    setIsSubmitted(true);
  };

  const currentTourName = toursList.find((t) => t.id === selectedTour)?.name || '';

  if (isSubmitted) {
    return (
      <section className={styles.bookingSection}>
        <div className="container">
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--primary)' }}>
              Booking Request Received!
            </h2>
            <p>
              Your reservation query has been successfully logged. Shubham will review your dates and target lifers
              and email you a custom confirmation detailing pickup logistics.
            </p>

            <div className={styles.successReceipt}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Expedition Details</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>PENDING GUIDE REVIEW</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Booking Reference ID</span>
                <span className={styles.refNumber}>{bookingRef}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Lead Birder</span>
                <span className={styles.summaryValue}>{fullName}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Expedition Tour</span>
                <span className={styles.summaryValue}>{currentTourName}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Preferred Start Date</span>
                <span className={styles.summaryValue}>{startDate}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Group Size</span>
                <span className={styles.summaryValue}>{guestCount} {guestCount === 1 ? 'Birder' : 'Birders'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Occupancy Setting</span>
                <span className={styles.summaryValue}>{lodging === 'single' ? 'Single Room' : 'Shared Double Room'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Expedition Focus</span>
                <span className={styles.summaryValue}>{tourPacing === 'photography' ? 'Photography-oriented' : 'List-building'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontWeight: 700 }}>
                <span>Estimated Price</span>
                <span style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>${totalCost} USD</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
              <Link href="/tours" className="btn btn-secondary">
                Back to Tours
              </Link>
              <Link href="/dashboard" className="btn btn-primary">
                View Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className={styles.pageHeader}>
        <div className={`container ${styles.headerContent}`}>
          <h1>Book a Birding Expedition</h1>
          <p>Design your custom itinerary and dates with Shubham Kumar</p>
        </div>
      </header>

      {/* Booking Form Layout */}
      <section className={styles.bookingSection}>
        <div className={`container ${styles.bookingGrid}`}>
          {/* Form Side */}
          <div>
            {/* Progress Nodes */}
            <div className={styles.progressBar}>
              <div className={`${styles.stepNode} ${step >= 1 ? styles.stepNodeActive : ''} ${step > 1 ? styles.stepNodeCompleted : ''}`}>
                1
                <span className={styles.stepLabel}>Tour Details</span>
              </div>
              <div className={`${styles.stepNode} ${step >= 2 ? styles.stepNodeActive : ''} ${step > 2 ? styles.stepNodeCompleted : ''}`}>
                2
                <span className={styles.stepLabel}>Birder Info</span>
              </div>
              <div className={`${styles.stepNode} ${step >= 3 ? styles.stepNodeActive : ''} ${step > 3 ? styles.stepNodeCompleted : ''}`}>
                3
                <span className={styles.stepLabel}>Preferences</span>
              </div>
            </div>

            {/* Dynamic steps */}
            <form onSubmit={handleSubmit} className={styles.formCard}>
              {step === 1 && (
                <div>
                  <h2 className={styles.stepTitle}>Select Expedition & Dates</h2>
                  <p className={styles.stepDesc}>Pick your target region and when you would like to begin your tour.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="tour-select">Select Tour Hotspot</label>
                      <select
                        id="tour-select"
                        className="form-input"
                        value={selectedTour}
                        onChange={(e) => setSelectedTour(e.target.value)}
                      >
                        {toursList.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} (${t.price} USD / base rate)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.formGrid}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="start-date">Preferred Start Date</label>
                        <input
                          id="start-date"
                          type="date"
                          className="form-input"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="guest-count">Number of Birders</label>
                        <select
                          id="guest-count"
                          className="form-input"
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Birder' : 'Birders'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className={styles.stepTitle}>Birder Information</h2>
                  <p className={styles.stepDesc}>We need your contact and permit details to finalize logistics.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">Full Name</label>
                      <input
                        id="full-name"
                        type="text"
                        placeholder="Arthur Harrison"
                        className="form-input"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formGrid}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="email-address">Email Address</label>
                        <input
                          id="email-address"
                          type="email"
                          placeholder="arthur@example.com"
                          className="form-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="nationality">Nationality</label>
                        <select
                          id="nationality"
                          className="form-input"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                        >
                          <option value="US">United States (USA)</option>
                          <option value="UK">United Kingdom (UK)</option>
                          <option value="DE">Germany (EU)</option>
                          <option value="IN">India (Domestic)</option>
                          <option value="AU">Australia</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Lodging Setup</label>
                      <div className={styles.checkboxGroup}>
                        <div
                          className={`${styles.radioLabel} ${lodging === 'shared' ? styles.radioSelected : ''}`}
                          onClick={() => setLodging('shared')}
                        >
                          <input
                            type="radio"
                            name="lodging"
                            checked={lodging === 'shared'}
                            onChange={() => {}}
                            className={styles.radioInput}
                          />
                          <div className={styles.radioText}>
                            <span className={styles.radioTitle}>Shared Room (Double Occupancy)</span>
                            <span className={styles.radioDesc}>Share a twin room with another group member. Included in base price.</span>
                          </div>
                        </div>
                        <div
                          className={`${styles.radioLabel} ${lodging === 'single' ? styles.radioSelected : ''}`}
                          onClick={() => setLodging('single')}
                        >
                          <input
                            type="radio"
                            name="lodging"
                            checked={lodging === 'single'}
                            onChange={() => {}}
                            className={styles.radioInput}
                          />
                          <div className={styles.radioText}>
                            <span className={styles.radioTitle}>Single Room Supplement</span>
                            <span className={styles.radioDesc}>Private room at all lodges. Adds $150 USD extra per guest.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className={styles.stepTitle}>Expedition Customization</h2>
                  <p className={styles.stepDesc}>Optimize the pacing of your tour and list target lifers.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Guiding Pacing Focus</label>
                      <div className={styles.checkboxGroup}>
                        <div
                          className={`${styles.radioLabel} ${tourPacing === 'photography' ? styles.radioSelected : ''}`}
                          onClick={() => setTourPacing('photography')}
                        >
                          <input
                            type="radio"
                            name="pacing"
                            checked={tourPacing === 'photography'}
                            onChange={() => {}}
                            className={styles.radioInput}
                          />
                          <div className={styles.radioText}>
                            <span className={styles.radioTitle}>Photography & Videography Oriented</span>
                            <span className={styles.radioDesc}>Slower pacing, setup tripod hides, optimize for shadows, light angles, and capture behaviors.</span>
                          </div>
                        </div>
                        <div
                          className={`${styles.radioLabel} ${tourPacing === 'listing' ? styles.radioSelected : ''}`}
                          onClick={() => setTourPacing('listing')}
                        >
                          <input
                            type="radio"
                            name="pacing"
                            checked={tourPacing === 'listing'}
                            onChange={() => {}}
                            className={styles.radioInput}
                          />
                          <div className={styles.radioText}>
                            <span className={styles.radioTitle}>Hardcore Listing & Endemic Search</span>
                            <span className={styles.radioDesc}>Cover more altitude bands, high hiking speed, check off maximum species in checklist.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="requests-notes">Special Requests & Target Bird Lifers</label>
                      <textarea
                        id="requests-notes"
                        rows={4}
                        placeholder="e.g. I am extremely eager to spot the Cheer Pheasant. I need special assistance with high altitude walking."
                        className="form-input"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={styles.btnGroup}>
                {step > 1 ? (
                  <button type="button" className="btn btn-secondary" onClick={handleBack}>
                    Back Step
                  </button>
                ) : (
                  <div></div>
                )}
                {step < 3 ? (
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    Continue
                  </button>
                ) : (
                  <button type="submit" className="btn btn-accent">
                    Submit Booking Request
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Pricing Summary Side */}
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Expedition Invoice Summary</h3>
            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tour</span>
                <span className={styles.summaryValue} style={{ textAlign: 'right', maxWidth: '180px' }}>
                  {currentTourName || 'Select a Tour'}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Start Date</span>
                <span className={styles.summaryValue}>{startDate || 'Not selected'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Group Size</span>
                <span className={styles.summaryValue}>
                  {guestCount} {guestCount === 1 ? 'Birder' : 'Birders'}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Lodging Occupancy</span>
                <span className={styles.summaryValue}>
                  {lodging === 'single' ? 'Single Room' : 'Shared Twin'}
                </span>
              </div>

              {/* Price Details */}
              <div className={styles.priceBreakdown}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Base Rate / Guest</span>
                  <span>${basePrice} USD</span>
                </div>
                {guestCount > 1 && (
                  <div className={styles.summaryRow} style={{ color: '#b78a04' }}>
                    <span className={styles.summaryLabel}>Group Discount</span>
                    <span>
                      {discountMultiplier === 0.90 ? '10% Off (Double group)' : '15% Off (Family/Large group)'}
                    </span>
                  </div>
                )}
                {lodgingCost > 0 && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Single Occupancy Fee</span>
                    <span>+${lodgingCost} USD</span>
                  </div>
                )}

                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total Est.</span>
                  <span className={styles.totalValue}>${totalCost}</span>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--primary-glow)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', lineHeight: '1.4', color: 'var(--primary)', fontWeight: 600 }}>
                  💡 **Notice for International Travelers:** Shubham handles high-altitude border zone permits. Ensure
                  you carry passport scans on arrival.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '10rem 0' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>Loading Form...</h2>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
