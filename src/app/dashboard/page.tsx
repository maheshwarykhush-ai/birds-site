'use client';

import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

interface Booking {
  id: string;
  tourId: string;
  tourName: string;
  startDate: string;
  guestCount: number;
  fullName: string;
  email: string;
  nationality: string;
  lodging: string;
  pacing: string;
  requests: string;
  price: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

const initialSeedBookings: Booking[] = [
  {
    id: 'GB-8419-CHO',
    tourId: 'chopta',
    tourName: 'Chopta Alpine Pheasant Quest',
    startDate: '2026-10-12',
    guestCount: 2,
    fullName: 'Arthur Harrison',
    email: 'arthur.h@example.co.uk',
    nationality: 'UK',
    lodging: 'shared',
    pacing: 'photography',
    requests: 'Keen to secure frames of the Cheer Pheasant. Hauling a 600mm lens.',
    price: 2520, // 1400 * 2 * 0.90
    status: 'Pending',
    createdAt: '2026-07-10',
  },
  {
    id: 'GB-3921-SAT',
    tourId: 'sattal',
    tourName: 'Sattal Foothills Special',
    startDate: '2026-11-05',
    guestCount: 1,
    fullName: 'Markus Keller',
    email: 'm.keller@photomail.de',
    nationality: 'DE',
    lodging: 'single',
    pacing: 'photography',
    requests: 'Need assistance with local hide bookings and scheduling.',
    price: 1100, // 950 + 150
    status: 'Confirmed',
    createdAt: '2026-07-12',
  },
  {
    id: 'GB-7421-MAN',
    tourId: 'manglajodi',
    tourName: 'Manglajodi Wetland Odyssey',
    startDate: '2026-12-20',
    guestCount: 3,
    fullName: 'Sarah Jenkins',
    email: 'sarahj@fieldnature.com',
    nationality: 'US',
    lodging: 'single',
    pacing: 'listing',
    requests: 'List-building focus. Eager to check off Painted Snipe.',
    price: 2184, // 680 * 3 * 0.85 + 450 single supplement
    status: 'Confirmed',
    createdAt: '2026-07-11',
  }
];

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Load from LocalStorage or seed defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bird_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        // Seed default bookings
        localStorage.setItem('bird_bookings', JSON.stringify(initialSeedBookings));
        setBookings(initialSeedBookings);
      }
    } catch (err) {
      console.error('Error reading bookings from localStorage', err);
    }
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    try {
      localStorage.setItem('bird_bookings', JSON.stringify(newBookings));
    } catch (err) {
      console.error('Error saving bookings to localStorage', err);
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: 'Confirmed' | 'Cancelled') => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    saveBookings(updated);
  };

  const handleResetDatabase = () => {
    if (confirm('Are you sure you want to reset the database? This will clear custom bookings and restore the default 3 mock bookings.')) {
      saveBookings(initialSeedBookings);
    }
  };

  // Metrics Calculation
  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const totalRevenue = bookings
    .filter((b) => b.status === 'Confirmed')
    .reduce((sum, b) => sum + b.price, 0);

  // Popularity Calculation
  const getDestinationStats = () => {
    const choptaCount = bookings.filter((b) => b.tourId === 'chopta').length;
    const sattalCount = bookings.filter((b) => b.tourId === 'sattal').length;
    const manglajodiCount = bookings.filter((b) => b.tourId === 'manglajodi').length;
    const maxCount = Math.max(choptaCount, sattalCount, manglajodiCount, 1);

    return [
      { name: 'Chopta Alpine Quest', count: choptaCount, percentage: (choptaCount / maxCount) * 100 },
      { name: 'Sattal Foothills Special', count: sattalCount, percentage: (sattalCount / maxCount) * 100 },
      { name: 'Manglajodi Wetland Odyssey', count: manglajodiCount, percentage: (manglajodiCount / maxCount) * 100 },
    ];
  };

  const destinationStats = getDestinationStats();

  // Filters
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchesQuery =
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div>
      {/* Header */}
      <header className={styles.pageHeader}>
        <div className={`container ${styles.headerContent}`}>
          <h1>Admin Bookings Dashboard</h1>
          <p>Manage reservations, target bird lifers, and guide scheduling details.</p>
        </div>
      </header>

      {/* Main Section */}
      <section className={styles.dashboardSection}>
        <div className="container">
          {/* Stats Summary Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Queries</span>
              <span className={styles.statValue}>{totalBookingsCount}</span>
            </div>
            <div className={styles.statCard} style={{ borderLeft: '4px solid #b78a04' }}>
              <span className={styles.statLabel}>Pending Review</span>
              <span className={styles.statValue} style={{ color: '#b78a04' }}>{pendingCount}</span>
            </div>
            <div className={styles.statCard} style={{ borderLeft: '4px solid var(--primary)' }}>
              <span className={styles.statLabel}>Confirmed Trips</span>
              <span className={styles.statValue}>{confirmedCount}</span>
            </div>
            <div className={styles.statCard} style={{ borderLeft: '4px solid var(--accent)' }}>
              <span className={styles.statLabel}>Confirmed Revenue</span>
              <span className={styles.statValue} style={{ color: 'var(--primary)' }}>${totalRevenue} USD</span>
            </div>
          </div>

          {/* Grid Layout splits: List vs Stats */}
          <div className={styles.dashboardGrid}>
            {/* Left Main Table Column */}
            <div className={styles.controlCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Inbound Tour Inquiries</h3>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {/* Text Search */}
                  <input
                    type="text"
                    placeholder="Search name, tour..."
                    className="form-input"
                    style={{ maxWidth: '200px', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {/* Filters Status */}
                  <div className={styles.tableFilters}>
                    {['All', 'Pending', 'Confirmed', 'Cancelled'].map((status) => (
                      <button
                        key={status}
                        className={`${styles.seedingBtn} ${filterStatus === status ? 'btn-primary' : ''}`}
                        onClick={() => setFilterStatus(status)}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.4rem 0.8rem',
                          border: filterStatus === status ? 'none' : '1px solid var(--border-color)',
                          backgroundColor: filterStatus === status ? 'var(--primary)' : 'transparent',
                          color: filterStatus === status ? '#ffffff' : 'var(--fg-muted)',
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table wrapper */}
              <div className={styles.tableContainer}>
                {filteredBookings.length > 0 ? (
                  <table className={styles.bookingsTable}>
                    <thead>
                      <tr>
                        <th>Ref ID</th>
                        <th>Birder</th>
                        <th>Tour Sighting</th>
                        <th>Start Date</th>
                        <th>Guests</th>
                        <th>Focus</th>
                        <th>Estimated Cost</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((b) => (
                        <tr key={b.id}>
                          <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{b.id}</td>
                          <td>
                            <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{b.fullName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>
                              ✉️ {b.email} ({b.nationality})
                            </div>
                          </td>
                          <td>
                            <div style={{ fontWeight: 500 }}>{b.tourName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>
                              🏡 {b.lodging === 'single' ? 'Single Room' : 'Shared Room'}
                            </div>
                          </td>
                          <td>{b.startDate}</td>
                          <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{b.guestCount}</td>
                          <td>
                            <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                              {b.pacing === 'photography' ? 'Photo' : 'Listing'}
                            </span>
                          </td>
                          <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>${b.price}</td>
                          <td>
                            <span
                              className={`${styles.statusBadge} ${
                                b.status === 'Confirmed'
                                  ? styles.statusConfirmed
                                  : b.status === 'Cancelled'
                                  ? styles.statusCancelled
                                  : styles.statusPending
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td>
                            {b.status === 'Pending' ? (
                              <div className={styles.actionBtnGroup}>
                                <button
                                  className={styles.actionBtnConfirm}
                                  onClick={() => handleStatusChange(b.id, 'Confirmed')}
                                  title="Confirm Booking"
                                >
                                  ✓
                                </button>
                                <button
                                  className={styles.actionBtnCancel}
                                  onClick={() => handleStatusChange(b.id, 'Cancelled')}
                                  title="Cancel Booking"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', fontStyle: 'italic' }}>
                                Locked
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--fg-muted)' }}>
                    No bookings logged matching the current filter filters.
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Column Panels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className={styles.chartCard}>
                <h4 className={styles.chartTitle}>Hotspot Popularity Index</h4>
                <div className={styles.popularityList}>
                  {destinationStats.map((dest) => (
                    <div key={dest.name} className={styles.popItem}>
                      <div className={styles.popHeader}>
                        <span className={styles.popName}>{dest.name.split(' ')[0]}</span>
                        <span className={styles.popCount}>
                          {dest.count} {dest.count === 1 ? 'trip' : 'trips'}
                        </span>
                      </div>
                      <div className={styles.popTrack}>
                        <div className={styles.popBar} style={{ width: `${dest.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Tools Panel */}
              <div className={styles.chartCard} style={{ backgroundColor: 'var(--bg-light)' }}>
                <h4 className={styles.chartTitle}>Dashboard Controls</h4>
                <p style={{ fontSize: '0.8rem', lineHeight: '1.4', color: 'var(--fg-muted)' }}>
                  This dashboard uses browser `localStorage` as a mock database. Use this button to clear changes and seed clean mock enquiries.
                </p>
                <button className={styles.seedingBtn} onClick={handleResetDatabase}>
                  Restore Default Mock Database
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
